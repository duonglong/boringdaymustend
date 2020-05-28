const mongoose = require('mongoose');
const bcrypt = require('mongoose-bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
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
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    avatar: {
        type: String,
        required: true,
        trim: true
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
    active: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

userSchema.plugin(bcrypt);
module.exports = mongoose.model('user', userSchema);