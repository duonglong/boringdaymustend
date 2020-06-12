const User = require('../schemas/user');
const bcrypt = require('bcryptjs');
const { generateRefreshToken, generateAccessToken } = require('../utils/tokenService');
const { validateLoginInput, validateRegisterInput } = require('../utils/validator');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const { schemaComposer } = require('graphql-compose');
const { UserInputError } = require('apollo-server');
const authCheck = require('../middlewares/authCheck');
const AuthTC = require('./auth');


// UserTC
const userTC = composeWithMongoose(User, {

});

// UserInputTC
const userInputTC = schemaComposer.createInputTC({
    name: 'userInput',
    fields: {
        email: 'String!',
        password: 'String!',
        confirmPassword: 'String!'
    }
});

// Login
userTC.addResolver({
    name: 'login',
    kind: 'mutation',
    type: AuthTC,
    args: {
        email: 'String!',
        password: 'String!'
    },
    resolve: async ({
        source,
        args,
        context,
        info
    }) => {
        const {
            email,
            password
        } = args;
        const {
            errors,
            valid
        } = validateLoginInput(email, password);
        if (!valid) {
            throw new UserInputError('Errors', {
                errors
            });
        }
        const user = await User.findOne({
            email: email
        }).exec();
        if (!user) {
            errors.general = 'User or password is incorrect !';
            throw new UserInputError('Wrong crendetials', {
                errors
            });
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            errors.general = 'User or password is incorrect !';
            throw new UserInputError('Wrong crendetials', {
                errors
            });
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);        
        return {
            accessToken,
            refreshToken
        };
    },
});

// Register
userTC.addResolver({
    name: "register",
    kind: "mutation",
    type: userTC,
    args: { input: userInputTC },
    resolve: async ({
        source,
        args,
        context,
        info
    }) => {
        const {
            email,
            password,
            confirmPassword
        } = args.input;
        const {
            valid,
            errors
        } = validateRegisterInput(
            email,
            password,
            confirmPassword
        );
        if (!valid) {
            throw new UserInputError('Errors', {
                errors
            });
        }
        // TODO: Make sure user doesnt already exist
        const user = await User.findOne({
            email
        });
        if (user) {
            throw new UserInputError('Email is taken', {
                errors: {
                    email: 'This email is taken'
                }
            });
        }

        const newUser = new User({
            email,
            password
        });

        const res = await newUser.save();
        return res;
    }
});

// Register Queries
schemaComposer.Query.addFields({
    userById: userTC.getResolver('findById'),
    userByIds: userTC.getResolver('findByIds'),
    userOne: userTC.getResolver('findOne'),
    userMany: userTC.getResolver('findMany'),
    userCount: userTC.getResolver('count'),
    userConnection: userTC.getResolver('connection'),
    userPagination: userTC.getResolver('pagination'),
});

// Regiseter Resolvers
schemaComposer.Mutation.addFields({
    userCreateOne: userTC.getResolver('createOne', [authCheck]),
    userCreateMany: userTC.getResolver('createMany', [authCheck]),
    userUpdateById: userTC.getResolver('updateById', [authCheck]),
    userUpdateOne: userTC.getResolver('updateOne', [authCheck]),
    userUpdateMany: userTC.getResolver('updateMany', [authCheck]),
    userRemoveById: userTC.getResolver('removeById', [authCheck]),
    userRemoveOne: userTC.getResolver('removeOne', [authCheck]),
    userRemoveMany: userTC.getResolver('removeMany', [authCheck]),

    userRegister: userTC.getResolver('register'),
    userLogin: userTC.getResolver('login'),
});

module.exports = userTC;
