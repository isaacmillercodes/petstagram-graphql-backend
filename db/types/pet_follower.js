const graphql = require('graphql');
const knex = require('../knex');
const {
  GraphQLObjectType,
  GraphQLInt
} = graphql;

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

module.exports = PetFollower;
