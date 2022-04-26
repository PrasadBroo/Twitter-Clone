const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowingsSchema = new Schema({
    user: {
        ref: 'User',
        unique:true,
        type: Schema.Types.ObjectId,
    },
    followings: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
})

const Followings = mongoose.model('Followings', FollowingsSchema);
module.exports = Followings;