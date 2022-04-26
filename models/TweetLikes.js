const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetLikesSchema = new Schema({
    tweet: {
        ref: 'Tweet',
        unique: true,
        type: Schema.Types.ObjectId,
    },
    likedBy: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }

    }]
})

const TweetLikes = mongoose.model('tweetlikes', TweetLikesSchema);
module.exports = TweetLikes;