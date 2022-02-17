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
    tweets: {
        type: Array,
        default: null
    },
    backgroundImage: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        default: null
    },
    location: {
        type: String,
        default: 'Bangalore'
    },
    website: {
        type: String,
        default: null,
    },
    joindate: {
        type: Date,
        default: new Date().getUTCMilliseconds()
    },
    following: {
        type: Array,
        default: null,
    },
    followers: {
        type: Array,
        default: null,
    },
    likedTweets: {
        type: Array,
        default: null,
    },
    bookmarks: {
        type: Array,
        default: null,
    },
    notifications: {
        type: Array,
        default: null,
    },
    isVerified:{
        type:Boolean,
        default:false,
    }

})

const User = mongoose.model('User', UserSchema);
module.exports = User;