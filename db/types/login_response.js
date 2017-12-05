const graphql = require('graphql');

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
