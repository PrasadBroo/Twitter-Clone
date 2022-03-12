const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TweetSchema = new Schema({
    user: {
        ref: 'User',
        unique:true,
        type: Schema.Types.ObjectId,
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    caption:{
        type:String,
        default:null,
        maxlength:700,
    },
    pic:{
        type:String,
        default:null,
    },
    likedBy:[{user: {
        ref: 'User',
        unique:true,
        type: Schema.Types.ObjectId,
    }}]

})

const TweetModel = mongoose.model('Tweets', TweetSchema);
module.exports = TweetModel;