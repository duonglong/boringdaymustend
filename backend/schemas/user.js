const mongoose = require('mongoose');
const bcrypt = require('mongoose-bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    login: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        hash: {
            type: String,
            required: true,
            bcrypt: true,
        },
        recovery: {
            type: String,
            trim: true,
            default: '',
        },
    },
    permissions: [
        {
            title: {
                type: String,
                default: '',
            },
            scope: {
                type: String,
                enum: [
                    'system',
                    'admin',
                    'moderator',
                    'user',
                ],
                default: 'user',
            },
            organization: {
                type: Schema.Types.ObjectId,
                ref: 'Organization',
            },
        },
    ],
    preferences: {
        email: {
            updates: {
                daily: {
                    type: Boolean,
                    default: false,
                },
                weekly: {
                    type: Boolean,
                    default: false,
                },
                monthly: {
                    type: Boolean,
                    default: true,
                },
            },
        },
    },
    active: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

userSchema.plugin(bcrypt);
module.exports = mongoose.model('user', userSchema);