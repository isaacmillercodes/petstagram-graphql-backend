const graphql = require('graphql');
const knex = require('../knex');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList
} = graphql;

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

module.exports = PetType;
