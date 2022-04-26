const mongoose = require('mongoose');
const validator = require('validator');
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
    backgroundImage: {
        type: String,
        default: 'https://i.ibb.co/RvWK1Nf/giphy-1.gif',
    },
    bio: {
        type: String,
        default: null,
        maxlength:300,
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
        default: new Date()
    },
    isVerified:{
        type:Boolean,
        default:false,
    }

})

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;