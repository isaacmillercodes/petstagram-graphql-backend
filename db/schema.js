const graphql = require('graphql');
const { GraphQLSchema } = graphql;
const RootQuery = require('./types/root_query_type');
const RootMutation = require('./types/mutations');

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
