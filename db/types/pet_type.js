const graphql = require('graphql');
const knex = require('../knex');
// const ImageType = require('./image_type');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql;

const PetType = new GraphQLObjectType({
  name: 'Pet',
  fields: () => {
    const UserType = require('./user_type');
    return {
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
    };
  }
});

module.exports = PetType;
