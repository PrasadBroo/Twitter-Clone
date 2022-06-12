const express = require('express');
const tweetRouter = express.Router();
const { requireAuth } = require('../controllers/authController');
const { postTweet,likeTweet,unlikeTweet,fetchTweet ,postTweetReply,postRetweet,deleteRetweet,fetchTweetReplies,bookmarkTweet,removeBookmarkedTweet,fetchRandomTweets} = require('../controllers/tweetController');

tweetRouter.post('/post',requireAuth,postTweet)
tweetRouter.post('/:tweetid/like',requireAuth,likeTweet)
tweetRouter.post('/:tweetid/unlike',requireAuth,unlikeTweet)
tweetRouter.post('/:tweetid',requireAuth,fetchTweet)
tweetRouter.post('/:tweetid/replies',requireAuth,fetchTweetReplies)
tweetRouter.post('/:tweetid/bookmark',requireAuth,bookmarkTweet)
tweetRouter.post('/post/:tweetid/reply',requireAuth,postTweetReply)
tweetRouter.post('/post/:tweetid/retweet',requireAuth,postRetweet)
tweetRouter.post('/random/tweets',requireAuth,fetchRandomTweets)

tweetRouter.delete('/post/:tweetid/retweet/delete',requireAuth,deleteRetweet)
tweetRouter.delete('/:tweetid/bookmark',requireAuth,removeBookmarkedTweet)



module.exports = tweetRouter;

