const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email: {
        required: true,
        type: String,
        unique: true,
        lowercase: true,
        validate: (value) => {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email address.');
            }
        }
    },
    fullName: {
        required: true,
        type: String,
    },
    username: {
        required: true,
        type: String,
        unique: true,
        lowercase: true,
        minlength: 3,
    },
    password: {
        type: String,
        minlength: 8,
    },
    avatar: String,
    githubId: Number,
    googleId: Number,
    confirmed: {
        type: Boolean,
        default: false,
    },
})

const User = mongoose.model('User', UserSchema);
module.exports = User;