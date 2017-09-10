const graphql = require('graphql');
const knex = require('../knex');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} = graphql;

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

module.exports = FriendConnection;
