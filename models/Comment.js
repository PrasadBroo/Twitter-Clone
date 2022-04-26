const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommentSchema = new Schema({
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId,
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    message:{
        type:String,
        default:null,
        maxlength:700,
    },
    pic:{
        type:String,
        default:null,
    },
    tweet:{
        type:Schema.Types.ObjectId,
        ref:'Tweet'
    }
    

})

const CommentModel = mongoose.model('Comments', CommentSchema);
module.exports = CommentModel;