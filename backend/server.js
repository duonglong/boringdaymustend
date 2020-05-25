const express = require('express');
const http = require('http');
const path = require('path')
const {
    fileLoader,
    mergeTypes,
    mergeResolvers
} = require('merge-graphql-schemas')
const {
    ApolloServer
} = require('apollo-server-express');

require('dotenv').config();
const app = express();
const schemas = mergeTypes(fileLoader(path.join(__dirname, './schemas')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))
const apolloServer = ApolloServer({

})

app.get('/', function (req, res, next) {

})

app.listen(process.env.PORT, function () {
    console.log(`Server is listening on port ${process.env.PORT}`)
})