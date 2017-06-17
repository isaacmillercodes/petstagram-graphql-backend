const graphql = require('graphql');
const knex = require('../knex');
const PetType = require('./pet_type');
const UserType = require('./user_type');
const ImageType = require('./image_type');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList
} = graphql;

const mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addPet: {
      type: PetType,
      args: {
        owner_id: { type: GraphQLInt },
        species: { type: GraphQLString },
        breed: { type: GraphQLString },
        age: {}
      },
      resolve(parentValue, { title }) {
        return (new Song({ title })).save();
      }
    }
  })
});

module.exports = mutations;
