const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookmarkSchema = new Schema({
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId,
    },
    tweet:{
        type:Schema.Types.ObjectId,
        ref:'Tweet'
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
})

const Bookmark = mongoose.model('Bookmark', BookmarkSchema);
module.exports = Bookmark;