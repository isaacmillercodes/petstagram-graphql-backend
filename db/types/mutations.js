const graphql = require('graphql');
const knex = require('../knex');
const PetType = require('./pet_type');
const UserType = require('./user_type');
const ImageType = require('./image_type');
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
        owner_id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        species: { type: GraphQLString },
        breed: { type: GraphQLString },
        age: { type: GraphQLFloat },
        profile_image_url: { type: GraphQLString },
      },
      resolve(parentValue, { owner_id, name, species, breed, age, profile_image_url }) {
        const addPet = (petObject) => knex('pets').insert(petObject).returning('*');
        const addOwner = (pet_id, owner_id) => knex('pet_owners').insert({ pet_id, owner_id });
        const addFollower = (pet_id, follower_id) => knex('pet_followers').insert({ pet_id, follower_id });
        const addPetImage = (pet_id, image_id) => knex('pet_images').insert({ pet_id, image_id });

        if (profile_image_url) {
          return knex('images').insert({ image_url: profile_image_url }).returning('*')
          .then(newImage => {
            return addPet({ name, species, breed, age, profile_image_id: newImage[0].id })
            .then(newPet => {
              return Promise.all([
                addOwner(newPet[0].id, owner_id),
                addFollower(newPet[0].id, owner_id),
                addPetImage(newPet[0].id, newImage[0].id)
              ])
              .then((newPetStuff) => {
                return newPet[0];
              })
              .catch(err => { console.log(err); });
            })
            .catch(err => { console.log(err); });
          })
          .catch(err => { console.log(err); });
        } else {
            return addPet({ name, species, breed, age })
            .then(newPet => {
              return Promise.all([
                addOwner(newPet[0].id, owner_id),
                addFollower(newPet[0].id, owner_id)
              ])
              .then((newPetStuff) => {
                return newPet[0];
              })
              .catch(err => { console.log(err); });
            })
            .catch(err => { console.log(err); });
        }

      }
    }
  })
});

module.exports = mutations;
