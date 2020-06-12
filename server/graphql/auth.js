const { schemaComposer } = require('graphql-compose');
const { generateRefreshToken, generateAccessToken } = require('../utils/tokenService');
const jwt = require('jsonwebtoken');
const User = require('../schemas/user');
// AuthTC
const AuthTC = schemaComposer.createObjectTC({
    name: 'AuthTC',
    fields: {
        accessToken: 'String!',
        refreshToken: 'String!'
    }
});

// Login
AuthTC.addResolver({
    name: 'refreshToken',
    kind: 'mutation',
    type: AuthTC,
    args: {
        refreshToken: 'String!',
    },
    resolve: async ({
        source,
        args,
        context,
        info
    }) => {
        const { refreshToken } = args;        
        const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken.userId).exec();
        if (!user) {
            throw new UserInputError('Wrong credentials !', {
                errors
            });
        }
        const accessToken = generateAccessToken(user);
        return {
            accessToken,
            refreshToken
        };
    },
});
schemaComposer.Mutation.addFields({
    refreshToken: AuthTC.getResolver('refreshToken')
})

module.exports = AuthTC;
