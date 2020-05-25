const { gpl } = require('apollo-server-express');

module.exports = gpl`
    type Query {
        totalProducts: Int!
        allProducts: [Product!]!
    }

    type Product {
        id: ID!
        name: String!
        image: String
        description: String

    }

    type ProductInput {
        name: String!
        image: String!
        description: String!
    }

    type Mutation {
        newProduct: 
    }
`;