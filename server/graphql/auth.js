const {
    schemaComposer,
} = require("graphql-compose");

const AuthTC = schemaComposer.createObjectTC({
    name: 'AuthTC',
    fields: {
        accessToken: 'String!',
    }
});

module.exports = AuthTC;
