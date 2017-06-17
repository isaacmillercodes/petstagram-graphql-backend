const graphql = require('graphql');
const knex = require('../knex');
const PetType = require('./pet_type');
const UserType = require('./user_type');
// const ImageType = require('./image_type');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql;

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

module.exports = RootQuery;
