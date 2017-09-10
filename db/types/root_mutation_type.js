const graphql = require('graphql');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const PetType = require('./pet_type');
const UserType = require('./user_type');
const ImageType = require('./image_type');
const LoginResponse = require('./login_response');
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
        return db.addImage(profile_image_url)
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
    }
  })
});

module.exports = RootMutation;
