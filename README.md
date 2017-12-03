# Step 3: Associating Multiple Types

Now that we have our User type, we can create our Pet type following the same conventions from step 2.

Like before, we'll access some data directly from our `pets` table and we'll use resolvers to associate pets with users. This will give us the ability to query a pet's owners and followers.

```js
const PetType = new GraphQLObjectType({
  name: 'Pet',
  fields: () => ({
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
    }
  })
});
```

You might be wondering why I would include a field like total followers. Because GraphQL allows the client to request only the properties it needs, I thought it might be convenient to be able to query just a pet's total number of followers without getting other information about each user that follows them. In my front end GraphQL tutorial (instructions coming soon!), we use this field on the pet profile page.

Since we've defined our Pet type, now we can update our User type with new associations like the pets any given user owns and the pets they follow.

```js
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    friends: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return knex('user_friends').where('user_one', parentValue.id).orWhere('user_two', parentValue.id)
        .join('users', function() {
          this.on('user_friends.user_one', '=', 'users.id').orOn('user_friends.user_two', '=', 'users.id');
        }).then(results => {
          return results.filter(user => {
            return user.id !== parentValue.id && user.status === 'active';
          });
        });
      }
    },
    pets_owned: {
      type: new GraphQLList(PetType),
      resolve(parentValue, args) {
        return knex('pet_owners').where('owner_id', parentValue.id)
        .join('pets', 'pet_owners.pet_id', '=', 'pets.id')
        .then(results => results);
      }
    },
    pets_followed: {
      type: new GraphQLList(PetType),
      resolve(parentValue, args) {
        return knex('pet_followers').where('follower_id', parentValue.id)
        .join('pets', 'pet_followers.pet_id', '=', 'pets.id')
        .then(results => results);
      }
    }
    //will add field for profile pic later step
  })
});
```

Finally, we'll add resolvers for all pets and a single pet within our root query.

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
      args: { id: { type: GraphQLInt} },
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
      args: { id: { type: GraphQLInt} },
      resolve(parentValue, { id }) {
        return knex('pets').where('id', id).then(results => results[0]);
      }
    }
  })
});
```

Refresh Graph*i*QL in your browser and you'll see the documentation updated with information about our Pet type.

You can always find new sample queries on each step in [SampleQueries.md](https://github.com/isaacmillercodes/petstagram-graphql-backend/blob/step-3-pets/SampleQueries.md).

Once you've experimented with our new resource, checkout to step-4-images-and-refactor or the *step 4 instructions* where we'll add our final type, Image, and clean up our project structure. 
