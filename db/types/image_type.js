const graphql = require('graphql');
const knex = require('../knex');

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} = graphql;

const ImageType = new GraphQLObjectType({
  name: 'Image',
  fields: () => {
    return {
      id: { type: GraphQLInt },
      image_url: { type: GraphQLString },
      caption: { type: GraphQLString },
      likes: { type: GraphQLInt },
      uploaded_at: { type: GraphQLString }
    };
  }
});

module.exports = ImageType;
