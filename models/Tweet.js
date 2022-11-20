const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TweetSchema = new Schema({
    user: {
        ref: 'User',
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
    in_reply_to_status_id:{
        type:Schema.Types.ObjectId,
        default:null
    },
    media_type:{
        type:Number,
        default:null,
    },
    video_src:{
        type:String,
        default:null,
    }

})

const TweetModel = mongoose.model('Tweets', TweetSchema);
module.exports = TweetModel;