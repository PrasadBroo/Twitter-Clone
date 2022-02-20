const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowersSchema = new Schema({
    user: {
        ref: 'User',
        unique:true,
        type: Schema.Types.ObjectId,
    },
    followers: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
})

const Followers = mongoose.model('Followers', FollowersSchema);
module.exports = Followers;