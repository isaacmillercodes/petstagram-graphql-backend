const graphql = require('graphql');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const PetType = require('./pet_type');
const UserType = require('./user_type');
const ImageType = require('./image_type');
const LoginResponse = require('./login_response');
const FriendConnection = require('./friend_connection');
const PetFollower = require('./pet_follower');
const db = require('../api/mutation_helpers');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull
} = graphql;

const RootMutation = new GraphQLObjectType({
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
        return db.addImage({ image_url: profile_image_url })
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
    },
    addNewUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        profile_image_url: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { name, email, password, profile_image_url }) {
        return db.addImage({ image_url: profile_image_url })
        .then(newImage => {
          const hash = bcrypt.hashSync(password, salt);
          return db.addUser({ name, email, password: hash, profile_image_id: newImage[0].id })
          .then(newUser => {
            return newUser[0];
          });
        });
      }
    },
    loginUser: {
      type: LoginResponse,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { email, password }) {
        return db.findUserByEmail(email)
        .then(foundUser => {
          const user = foundUser[0];
          let token;
          let user_id;
          let message;
          if (bcrypt.compareSync(password, user.password)) {
            token = jwt.sign({data: user}, process.env.SECRET_KEY, {
              expiresIn: '30 days'
            });
            user_id = user.id;
            message = 'Successfully logged in.';
          } else {
            token = '';
            user_id = -1;
            message = 'Incorrect email or password.';
          }

          return { token, user_id, message };

        }).catch(noUserFound => {
          return { token: '', user_id: -1, message: 'Incorrect email or password.' };
        });
      }
    },
    friendRequest: {
      type: FriendConnection,
      args: {
        user_one: { type: new GraphQLNonNull(GraphQLInt) },
        user_two: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, { user_one, user_two }) {
        return db.friendRequest(user_one, user_two)
        .then(friendRequest => friendRequest[0]);
      }
    },
    updateFriendConnection: {
      type: FriendConnection,
      args: {
        user_one: { type: new GraphQLNonNull(GraphQLInt) },
        user_two: { type: new GraphQLNonNull(GraphQLInt) },
        status: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { user_one, user_two, status }) {
        return db.updateFriendConnection(user_one, user_two, status)
        .then(friendConnection => friendConnection[0]);
      }
    },
    followPet: {
      type: PetFollower,
      args: {
        pet_id: { type: new GraphQLNonNull(GraphQLInt) },
        follower_id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, { pet_id, follower_id }) {
        return db.addFollower(pet_id, follower_id)
        .then(petFollower => petFollower[0]);
      }
    },
    addImage: {
      type: ImageType,
      args: {
        image_url: { type: new GraphQLNonNull(GraphQLString) },
        caption: { type: GraphQLString },
      },
      resolve(parentValue, { image_url, caption }) {
        return db.addImage({ image_url, caption })
        .then(newImage => newImage[0]);
      }
    },
    addPetImage: {
      type: ImageType,
      args: {
        pet_id: { type: new GraphQLNonNull(GraphQLInt) },
        image_url: { type: new GraphQLNonNull(GraphQLString) },
        caption: { type: GraphQLString },
      },
      resolve(parentValue, { pet_id, image_url, caption }) {
        return db.addImage({ image_url, caption })
        .then(newImage => {
          return db.addPetImage(pet_id, newImage[0].id)
          .then(newPetImage => newImage[0]);
        });
      }
    },
    likeImage: {
      type: ImageType,
      args: {
        image_id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, { image_id }) {
        return db.likeImage(image_id)
        .then(updatedImage => updatedImage[0]);
      }
    }
  })
});

module.exports = RootMutation;
