# Step Four: Image Type and Project Clean Up

Since we have created a root query with two types and are looking to add a third, it's a good time to clean up our project structure.

Previously, we were creating all of our types inside our schema file. This can get convoluted quickly, so we now have a new folder `db/types` with individual files for users, pets, images, and our root query.

This makes it easier to isolate our code and have every file serve a simple, direct purpose.

Our schema now looks like this:

```js
const graphql = require('graphql');
const { GraphQLSchema } = graphql;
const RootQuery = require('./types/root_query_type');

module.exports = new GraphQLSchema({
  query: RootQuery
});
```

What had been a 120 line file in step three is now only seven! While our types and their associated data may grow, each file is more extensible which leads to a more modular project overall.

We now define our root query in `/types/root_query_type`. We import our previous two types, User and Pet, as well as a new type, Image (we'll look at that next).

```js
const graphql = require('graphql');
const knex = require('../knex');
const PetType = require('./pet_type');
const UserType = require('./user_type');
const ImageType = require('./image_type');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList
} = graphql;
```

Because we have access to an Image type, we'll add resolvers for querying a single image as well as all images of pets.

```js
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return knex('users').then(results => results);
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve(parentValue, { id }) {
        return knex('users').where('id', id).then(results => results[0]);
      }
    },
    pets: {
      type: new GraphQLList(PetType),
      resolve() {
        return knex('pets').then(results => results);
      }
    },
    pet: {
      type: PetType,
      args: { id: { type: GraphQLInt } },
      resolve(parentValue, { id }) {
        return knex('pets').where('id', id).then(results => results[0]);
      }
    },
    pet_images: {
      type: new GraphQLList(ImageType),
      resolve() {
        return knex('pet_images')
        .join('images', 'pet_images.image_id', '=', 'images.id')
        .then(results => results);
      }
    },
    image: {
      type: ImageType,
      args: { id: { type: GraphQLInt } },
      resolve(parentValue, { id }) {
        return knex('images').where('id', id).then(results => results[0]);
      }
    }
  })
});
```

Image is our simplest type yet as it doesn't require any resolvers to access its data. In `/types/image_type.js`, we simply tell GraphQL what columns exist in the images table.

```js
const graphql = require('graphql');
const knex = require('../knex');

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} = graphql;

const ImageType = new GraphQLObjectType({
  name: 'Image',
  fields: () => {
    return {
      id: { type: GraphQLInt },
      image_url: { type: GraphQLString },
      caption: { type: GraphQLString },
      likes: { type: GraphQLInt },
      uploaded_at: { type: GraphQLString }
    };
  }
});

module.exports = ImageType;
```

You'll also find that both our Pet and User types now have a resolver for profile_image, and pets also have a resolver to query all the images of them.

```js
const PetType = new GraphQLObjectType({
  name: 'Pet',
  fields: () => {
    const UserType = require('./user_type');
    const ImageType = require('./image_type');
    return {
      id: { type: GraphQLInt },
      name: { type: GraphQLString },
      species: { type: GraphQLString },
      breed: { type: GraphQLString },
      age: { type: GraphQLFloat },
      owners: {
        type: new GraphQLList(UserType),
        resolve(parentValue, args) {
          return knex('pet_owners').where('pet_id', parentValue.id)
          .join('users', 'pet_owners.owner_id', '=', 'users.id')
          .then(results => results);
        }
      },
      followers: {
        type: new GraphQLList(UserType),
        resolve(parentValue, args) {
          return knex('pet_followers').where('pet_id', parentValue.id)
          .join('users', 'pet_followers.follower_id', '=', 'users.id')
          .then(results => results);
        }
      },
      total_followers: {
        type: GraphQLInt,
        resolve(parentValue, args) {
          return knex('pet_followers').where('pet_id', parentValue.id)
          .join('users', 'pet_followers.follower_id', '=', 'users.id')
          .then(results => results.length);
        }
      },
      profile_image: {
        type: ImageType,
        resolve(parentValue, args) {
          return knex('images').where('id', parentValue.profile_image_id)
          .then(results => results[0]);
        }
      },
      images: {
        type: new GraphQLList(ImageType),
        resolve(parentValue, args) {
          return knex('pet_images').where('pet_id', parentValue.id)
          .join('images', 'pet_images.image_id', '=', 'images.id')
          .then(results => results);
        }
      }
    };
  }
});
```

You can refresh Graph*i*QL and make updated queries featuring our new fields. I've also included some examples in [SampleQueries.md](https://github.com/isaacmillercodes/petstagram-graphql-backend/blob/step-4-images-and-refactor/SampleQueries.md) but wanted to specifically point your attention to SinglePetAndSingleUser:

```js
query SinglePetandSingleUser($pet_id: Int, $user_id: Int){
  pet(id: $pet_id) {
    id
    name
    images {
      uploaded_at
      likes
      image_url
      caption
    }
    total_followers
  }
  user(id: $user_id) {
    id
    name
    email
    profile_image {
      image_url
      caption
    }
  }
}
```

We begin to see more of the power of GraphQL in this query as we request two different types in one request. In a typical REST API, we'd need to make two requests to get this data.

It's important to note that GraphQL executes queries in *parallel*. While you won't get a response from the server until all your types and fields have been resolved, each subquery happens simultaneously.

You can imagine how this might make the client more performant. With GraphQL, you don't need to worry about having a promise chain of multiple requests and responses in order to access data from multiple resources.

In our next step, we'll create our first *mutation* for adding a pet. Once you've gotten comfortable with our new structure and tried some new queries, check out to step-5-add-pet-mutation or head to the [step five instructions](https://github.com/isaacmillercodes/petstagram-graphql-backend/tree/step-5-add-pet-mutation).
