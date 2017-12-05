# Step Eight: Adding Friends and Following Pets

Now that we can authenticate which user is logged in, we can add types for two new mutations: associating two users as friends and associating a user with a pet as a follower.

Inside `/db/types/friend_connection.js`, we now have a FriendConnection type:

```js
const FriendConnection = new GraphQLObjectType({
  name: 'FriendConnection',
  fields: () => {
    const UserType = require('./user_type');
    return {
      user_one: { type: GraphQLInt },
      user_two: { type: GraphQLInt },
      user_one_details: {
        type: UserType,
        resolve(parentValue, args) {
          return knex('users').where('id', parentValue.user_one)
          .then(results => results[0]);
        }
      },
      user_two_details: {
        type: UserType,
        resolve(parentValue, args) {
          return knex('users').where('id', parentValue.user_two)
          .then(results => results[0]);
        }
      },
      status: { type: GraphQLString }
    };
  }
});
```

Whenever we want to return our FriendConnection type, we can query just the users' `id`s, all of their fields, and the status of their friendship. We can use this new type in two new mutations, `addFriend` and `updateFriendConnection`:

```js
friendRequest: {
  type: FriendConnection,
  args: {
    user_one: { type: new GraphQLNonNull(GraphQLInt) },
    user_two: { type: new GraphQLNonNull(GraphQLInt) }
  },
  resolve(parentValue, { user_one, user_two }) {
    return db.friendRequest(user_one, user_two)
    .then(friendRequest => friendRequest[0]);
  }
},
updateFriendConnection: {
  type: FriendConnection,
  args: {
    user_one: { type: new GraphQLNonNull(GraphQLInt) },
    user_two: { type: new GraphQLNonNull(GraphQLInt) },
    status: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(parentValue, { user_one, user_two, status }) {
    return db.updateFriendConnection(user_one, user_two, status)
    .then(friendConnection => friendConnection[0]);
  }
}
```

Our `user_friends` table is set to default the `status` column on any new row as "pending," so we only need the two users' `id`s to send the request. For `updateFriendConnection`, we also require the new `status` so we can update the column for that row.

We can also create a PetFollower type now inside of `/db/types/pet_follower.js`:

```js
const PetFollower = new GraphQLObjectType({
  name: 'PetFollower',
  fields: () => {
    const UserType = require('./user_type');
    const PetType = require('./pet_type');
    return {
      pet_id: { type: GraphQLInt },
      follower_id: { type: GraphQLInt },
      pet_details: {
        type: PetType,
        resolve(parentValue, args) {
          return knex('pets').where('id', parentValue.pet_id)
          .then(results => results[0]);
        }
      },
      follower_details: {
        type: UserType,
        resolve(parentValue, args) {
          return knex('users').where('id', parentValue.follower_id)
          .then(results => results[0]);
        }
      },
    };
  }
});
```

Like we did with FriendConnection, we'll allow our client to directly access the pet and user `id`s directly from the table and add resolves to get all the fields for the pet and user as well.

In our root mutation in `/db/root_mutation_type.js`, we'll create a mutation for adding a follower for a pet.

```js
followPet: {
  type: PetFollower,
  args: {
    pet_id: { type: new GraphQLNonNull(GraphQLInt) },
    follower_id: { type: new GraphQLNonNull(GraphQLInt) }
  },
  resolve(parentValue, { pet_id, follower_id }) {
    return db.addFollower(pet_id, follower_id)
    .then(petFollower => petFollower[0]);
  }
}
```

Now our logged in users can send friend requests, accept friend requests, block users, and follow pets.

In our next step, we'll add mutations to allow our users to add and like images. Checkout to branch `step-9-image-mutations` or head to the [step nine instructions](https://github.com/isaacmillercodes/petstagram-graphql-backend/tree/step-9-image-mutations).
