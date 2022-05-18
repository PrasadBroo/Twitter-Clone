const express = require('express');
const searchRouter = express.Router();
const { requireAuth } = require('../controllers/authController');
const { searchTweets } = require('../controllers/searchController');

searchRouter.post('/tweets',requireAuth,searchTweets)



module.exports = searchRouter;

