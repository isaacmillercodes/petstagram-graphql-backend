# Step Six: Relational Mutations

If we think about how a user will experience Petstagram, one of the first features they might need would be adding one of their pets.

When adding a pet, it could make sense to add a profile picture at the same time. We could also have a new pet default to having their owner as a follower.

If we wanted to accomplish this within a RESTful API, we would need up to five requests and responses in order to:

* Add an image to our `images` table
* Add a pet to our `pets` table
* Associate a user with a pet as an owner through the `pet_owners` table
* Associate a user with a pet as a follower through the `pet_followers` table
* Associate an image with a pet through the `pet_images` table

Because mutations run *serially*, you might assume that we can independently define each step of this mutation like we would with a query. Unfortunately, at this time, you can not use data returned from a mutation in a subsequent mutation: they are treated independently.

Instead, we'll use Knex to do the "heavy lifting" of performing each of these steps and promises to ensure the correct order of these asynchronous operations.

In `db/api/mutation_helpers.js`, I've added helper functions in order to complete each of the above mentioned steps:

```js
const knex = require('../knex');

const addPet = (petObject) => knex('pets').insert(petObject).returning('*');
const addImage = (image_url) => knex('images').insert({ image_url }).returning('*');
const addOwner = (pet_id, owner_id) => knex('pet_owners').insert({ pet_id, owner_id });
const addFollower = (pet_id, follower_id) => knex('pet_followers').insert({ pet_id, follower_id });
const addPetImage = (pet_id, image_id) => knex('pet_images').insert({ pet_id, image_id });

module.exports = {
  addPet,
  addImage,
  addOwner,
  addFollower,
  addPetImage
};
```

Now we'll go back to our root query and define a new field, `addPetWithOwnerAndImage`.

```js
addPetWithOwnerAndImage: {
  type: PetType,
  args: {
    owner_id: { type: new GraphQLNonNull(GraphQLInt) },
    profile_image_url: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    species: { type: GraphQLString },
    breed: { type: GraphQLString },
    age: { type: GraphQLFloat }
  },
  resolve(parentValue, { owner_id, profile_image_url, name, species, breed, age }) {
    return db.addImage(profile_image_url)
    .then(newImage => {
      return db.addPet({ name, species, breed, age, profile_image_id: newImage[0].id })
      .then(newPet => {
        return Promise.all([
          db.addOwner(newPet[0].id, owner_id),
          db.addFollower(newPet[0].id, owner_id),
          db.addPetImage(newPet[0].id, newImage[0].id)
        ])
        .then(() => {
          return newPet[0];
        });
      });
    });
  }
}
```

In our previous mutation `addPet`, only `name` was a required argument. We'll now add `owner_id` and `profile_image_url` as required fields, and later we'll get the `id` of our new image to use in our `addPet` function.

Once the new rows from `addImage` and `addPet` have been resolved, we wrap `addOwner`, `addFollower`, and `addPetImage` in a `Promise.all`.

We want to allow the front end to query any fields on the new pet like any other Pet type, so we'll finish our promise chain by returning the data from our new pet.

We can test our new mutation in Graph*i*QL by adding a pet and requesting every possible field on our Pet type.

```js
mutation AddPetWithOwnerAndImage {
  addPetWithOwnerAndImage(
    owner_id: 7
    profile_image_url: "http://cdn1-www.cattime.com/assets/uploads/gallery/persian-cats-and-kittens/persian-cats-and-kittens-8.jpg"
    name: "Queen"
    species: "Cat"
    breed: "Persian"
    age: 4
  ) {
    id
    name
    species
    breed
    age
    owners {
      name
    }
    followers {
      name
    }
    total_followers
    profile_image {
      uploaded_at
      image_url
    }
    images {
      id
      likes
    }
  }
}
```

We should receive a response that looks like this:

![Add Pet with Owner and Image](https://i.imgur.com/29uzowA.png)

And that's it! You now have a fully functional GraphQL server featuring queries and mutations with relational data.

From here, you could continue to explore creating types, queries, and mutations, or continue on through this tutorial if you'd like to get your project in sync with my [front end GraphQL tutorial](https://github.com/isaacmillercodes/petstagram-graphql-frontend) using React and Apollo.

For the Petstagram front end, I want users to be able to register and log in. So in the next step, I'll be adding some simple auth. Checkout to `step-7-auth` or head to the [step seven instructions](https://github.com/isaacmillercodes/petstagram-graphql-backend/tree/step-7-auth).
