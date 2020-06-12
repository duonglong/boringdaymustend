const logger = require('../logger');
module.exports = {
    // Fires whenever a GraphQL request is received from a client.
    requestDidStart(requestContext) {
        logger.info('Request started! Query:\n' + requestContext.request.query);
        return {
            // Fires whenever Apollo Server will parse a GraphQL
            // request to create its associated document AST.
            parsingDidStart(requestContext) {
                logger.info('Parsing started!');
            },

            // Fires whenever Apollo Server will validate a
            // request's document AST against your GraphQL schema.
            validationDidStart(requestContext) {
                logger.info('Validation started!');
            }

        }
    },
};