const user = require('../schemas/user');
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

const userTC = composeWithMongoose(user, {

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
    kind: 'query',
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
        const user = await user.findOne({
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
        const token = generateToken(user);
        return {
            token
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
        } = args;
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
            username
        });
        if (user) {
            throw new UserInputError('Username is taken', {
                errors: {
                    username: 'This username is taken'
                }
            });
        }
        // hash password and create an auth token
        password = await bcrypt.hash(password, 12);

        const newUser = new User({
            email,
            username,
            password,
            createdAt: new Date().toISOString()
        });

        const res = await newUser.save();

        const token = generateToken(res);

        return {
            ...res._doc,
            id: res._id,
            token
        };
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
    userLogin: userTC.getResolver('login'),
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
});

module.exports = userTC;
