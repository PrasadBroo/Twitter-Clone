const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RetweetSchema = new Schema({
    tweet: {
        ref: 'Tweet',
        unique: true,
        type: Schema.Types.ObjectId,
    },
    users: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }

    }]
})

const Retweet = mongoose.model('retweets', RetweetSchema);
module.exports = Retweet;