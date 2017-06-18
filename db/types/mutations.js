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
  GraphQLNonNull
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
    },
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
  })
});

module.exports = mutations;
