const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommentSchema = new Schema({
    user: {
        ref: 'User',
        unique:true,
        type: Schema.Types.ObjectId,
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    content:{
        type:String,
        default:null,
        maxlength:700,
    },
    pic:{
        type:String,
        default:null,
    },
    likedBy:[{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
    

})

const CommentModel = mongoose.model('Tweets', CommentSchema);
module.exports = CommentModel;