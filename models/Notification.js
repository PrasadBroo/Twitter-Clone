const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  sender: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  receiver: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  notificationType: {
    type: String,
    enum: ['follow', 'like','retweet', 'comment', 'mention'],
  },
  createdAt: Date,
  data: Object,
  read: {
    type: Boolean,
    default: false,
  },
});

const Notification = mongoose.model('notification', NotificationSchema);
module.exports = Notification;
