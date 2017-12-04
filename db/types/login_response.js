const graphql = require('graphql');
const knex = require('../knex');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = graphql;

const LoginResponse = new GraphQLObjectType({
  name: 'LoginResponse',
  fields: () => {
    return {
      token: { type: GraphQLString },
      user_id: { type: GraphQLInt },
      message: { type: GraphQLString }
    };
  }
});

module.exports = LoginResponse;
