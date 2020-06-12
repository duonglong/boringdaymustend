
const { AuthenticationError } = require('apollo-server');

module.exports = async function authMiddleware(resolve, source, args, context, info) {
    if (context.req.isAuth) {
        return resolve(source, args, context, info);
    }
    throw new AuthenticationError('UNAUTHORIZED');
}