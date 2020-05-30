const User = require('../schemas/user');
const bcrypt = require('bcryptjs');
const {
    validateLoginInput,
    validateRegisterInput
} = require('../utils/validator');
const {
    composeWithMongoose
} = require('graphql-compose-mongoose');
const {
    schemaComposer
} = require('graphql-compose');
const {
    UserInputError
} = require('apollo-server');
const jwt = require('jsonwebtoken');
const AuthTC = require('./auth');
const SECRET_KEY = process.env.SECRET_KEY;


const userTC = composeWithMongoose(User, {

});
const userInputTC = schemaComposer.createInputTC({
    name: 'userInput',
    fields: {
        email: 'String!',
        password: 'String!',
        confirmPassword: 'String!'
    }
});
// Generate token function
function generateToken(user) {
    return jwt.sign({
            id: user.id,
            email: user.email
        },
        SECRET_KEY, {
            expiresIn: '1h'
        }
    );
}

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
        const accessToken = generateToken(user);
        return {
            accessToken
        };
    },
});

// Register
userTC.addResolver({
    name: "register",
    kind: "mutation",
    type: userTC,
    args: {input: userInputTC},
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
        // hash password and create an auth token
        //password = await bcrypt.hash(password, 12);

        const newUser = new User({
            email,
            password
        });

        const res = await newUser.save();
        generateToken(res);
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
    userCreateOne: userTC.getResolver('createOne'),
    userCreateMany: userTC.getResolver('createMany'),
    userUpdateById: userTC.getResolver('updateById'),
    userUpdateOne: userTC.getResolver('updateOne'),
    userUpdateMany: userTC.getResolver('updateMany'),
    userRemoveById: userTC.getResolver('removeById'),
    userRemoveOne: userTC.getResolver('removeOne'),
    userRemoveMany: userTC.getResolver('removeMany'),
    userRegister: userTC.getResolver('register'),
    userLogin: userTC.getResolver('login'),
});

module.exports = userTC;
