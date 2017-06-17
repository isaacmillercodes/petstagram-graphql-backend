const graphql = require('graphql');
const knex = require('./knex');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;

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
    }
    //will add field for profile pic later step
  })
});

const PetType = new GraphQLObjectType({
  name: 'Pet',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    species: { type: GraphQLString },
    breed: { type: GraphQLString },
    age: { type: GraphQLInt },
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

module.exports = new GraphQLSchema({
  query: RootQuery
});
