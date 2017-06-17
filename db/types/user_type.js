const graphql = require('graphql');
const knex = require('../knex');
// const ImageType = require('./image_type');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql;


const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => {
    const PetType = require('./pet_type');
    return {
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
      },
      pets_owned: {
        type: new GraphQLList(PetType),
        resolve(parentValue, args) {
          return knex('pet_owners').where('owner_id', parentValue.id)
          .join('pets', 'pet_owners.pet_id', '=', 'pets.id')
          .then(results => results);
        }
      },
      pets_followed: {
        type: new GraphQLList(PetType),
        resolve(parentValue, args) {
          return knex('pet_followers').where('follower_id', parentValue.id)
          .join('pets', 'pet_followers.pet_id', '=', 'pets.id')
          .then(results => results);
        }
      }
    };
    //will add field for profile pic later step
  }
});

module.exports = UserType;
