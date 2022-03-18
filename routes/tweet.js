const express = require('express');
const tweetRouter = express.Router();
const { requireAuth } = require('../controllers/authController');
const { postTweet,likeTweet,unlikeTweet } = require('../controllers/tweetController');

tweetRouter.post('/post',requireAuth,postTweet)
tweetRouter.post('/:tweetid/like',requireAuth,likeTweet)
tweetRouter.post('/:tweetid/unlike',requireAuth,unlikeTweet)




module.exports = tweetRouter;

