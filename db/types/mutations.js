const graphql = require('graphql');
const knex = require('../knex');
const PetType = require('./pet_type');
const UserType = require('./user_type');
const ImageType = require('./image_type');
const db = require('../api/mutation_helpers');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLList
} = graphql;

const mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addPet: {
      type: PetType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        species: { type: GraphQLString },
        breed: { type: GraphQLString },
        age: { type: GraphQLFloat }
      },
      resolve(parentValue, args) {
        return db.addPet(args)
        .then(newPet => newPet[0]);
      }
    }
  })
});

module.exports = mutations;
