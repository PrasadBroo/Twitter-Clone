const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConfirmTokenSchema = new Schema({
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId,
    },
    token: {
        type:String
    }
})

const ConfirmToken = mongoose.model('ConfirmToken', ConfirmTokenSchema);
module.exports = ConfirmToken;