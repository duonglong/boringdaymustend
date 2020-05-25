const express = require('express');
const http = require('http');
const path = require('path');
const mongoose =  require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const schema = require('./schemasgpl/index');
const {
    fileLoader,
    mergeTypes,
    mergeResolvers
} = require('merge-graphql-schemas');
const {
    ApolloServer
} = require('apollo-server-express');
// Load env
require('dotenv').config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT;
const mongo_server = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?retryWrites=true`;
const app = express();

const apolloServer = new ApolloServer({
    schema
});

// Plug GraphQL Middleware
apolloServer.applyMiddleware({
    app
});

const db = mongoose.connect(mongo_server, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => {
    console.log(`Connected to db: ${DB_NAME}`);
    app.listen({
        port: PORT,
    }, function () {
        console.log(`Server is listening on port: ${PORT}`);
    });
})
.catch((e) => {
    console.log(`Failed to connect to: ${mongo_server}`);
    console.log(e);
});

// Server configuration
app.use(bodyParser.json());
app.use('*', cors());
