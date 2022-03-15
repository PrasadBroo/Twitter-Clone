const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HashtagsSchema = new Schema({
    tweet: {
        ref: 'Tweet',
        unique:true,
        type: Schema.Types.ObjectId,
    },
    hashtags: [{
        type:String,
        lowercase:true,
    }]
})

const Hashtags = mongoose.model('hashtags', HashtagsSchema);
module.exports = Hashtags;