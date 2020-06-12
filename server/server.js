require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const schema = require('./graphql/index');
const { ApolloServer } = require('apollo-server-express');
const logger = require('./logger');
const gqlLogger = require('./gqlplugin/logger')
const isAuth = require('./utils/auth');
// Load env

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT;
const mongo_server = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?retryWrites=true`;
const app = express();

const apolloServer = new ApolloServer({
    schema,
    engine: {
        debugPrintReports: true,
    },
    plugins: [
        gqlLogger
    ],
    context: ({ req }) => {
        isAuth(req);
        return { req };
    },
});

// add middlewares
app.use(bodyParser.json());
app.use('*', cors());
// app.use(isAuth);


const db = mongoose.connect(mongo_server, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => {
        logger.info(`Connected to db: ${DB_NAME}`);
        app.listen({
            port: PORT,
        }, function () {
            logger.info(`Server is listening on port: ${PORT}`);
        });
    })
    .catch((e) => {
        logger.error(`Failed to connect to: ${mongo_server}`);
        logger.error(e);        
    });

// Plug GraphQL Middleware
apolloServer.applyMiddleware({
    app
});