const { schemaComposer } = require('graphql-compose');

// Put schemas here ...
const product = require('./product');

// Build schemas
const graphqlSchema = schemaComposer.buildSchema();

module.exports = graphqlSchema;
