const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MentionsSchema = new Schema({
    tweet: {
        ref: 'Tweet',
        unique: true,
        type: Schema.Types.ObjectId,
    },
    mentions: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }

    }]
})

const Mentions = mongoose.model('mentions', MentionsSchema);
module.exports = Mentions;