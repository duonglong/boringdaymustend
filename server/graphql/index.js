const {
    schemaComposer
} = require('graphql-compose');

// Put schemas here ...
const productTC = require('./product');
const productCategoryTC = require('./product_category');
const authTC = require('./auth');
const userTC = require('./user');

// Add relations
productCategoryTC.addRelation(
    'products', {
        resolver: () => productTC.getResolver('findMany'),
        prepareArgs: {
            filter: source => ({
                category_id: source._id
            }),
        },
        projection: {
            _id: true
        },
    }
);


productTC.addRelation('category_id', {
    resolver: () => productCategoryTC.getResolver('findById'),
    prepareArgs: {
        _id: source => source.category_id,
        skip: null,
        sort: null,
    },
    projection: {
        _id: true
    },
})

// Build schemas
const graphqlSchema = schemaComposer.buildSchema();

module.exports = graphqlSchema;
