const express = require('express');
const tweetRouter = express.Router();
const { requireAuth } = require('../controllers/authController');
const { postTweet } = require('../controllers/tweetController');

tweetRouter.post('/post',requireAuth,postTweet)





module.exports = tweetRouter;

