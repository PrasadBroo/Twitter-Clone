const express = require('express');
const tweetRouter = express.Router();
const { requireAuth } = require('../controllers/authController');
const { postTweet,likeTweet,unlikeTweet,fetchTweet ,postTweetReply} = require('../controllers/tweetController');

tweetRouter.post('/post',requireAuth,postTweet)
tweetRouter.post('/:tweetid/like',requireAuth,likeTweet)
tweetRouter.post('/:tweetid/unlike',requireAuth,unlikeTweet)
tweetRouter.post('/:tweetid',requireAuth,fetchTweet)
tweetRouter.post('/post/:tweetid/reply',requireAuth,postTweetReply)




module.exports = tweetRouter;

