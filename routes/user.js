const express = require('express');
const {
    updateProfile,
    fethUser,
    followUser,
    getFollowers,
    getFollowings,
    unfollowUser,
    getUserTweets,
    getUserLikedTweets,
    getUserMediaTweets,
    getUserFeedTweets,
    getUsersSuggetions,
    searchUsers
} = require('../controllers/userController');
const userRouter = express.Router();
const {
    requireAuth
} = require('../controllers/authController');
const { retrieveNotifications,retrieveMentonsNotifications } = require('../controllers/notificationController');
const { fetchBookmarks } = require('../controllers/tweetController');

userRouter.put('/update/profile', requireAuth, updateProfile)

userRouter.post('/get/profile', requireAuth, fethUser)
userRouter.post('/:userid/follow', requireAuth, followUser)
userRouter.post('/:userid/unfollow', requireAuth, unfollowUser)
userRouter.post('/:userid/followers', requireAuth, getFollowers)
userRouter.post('/:userid/followings', requireAuth, getFollowings)
userRouter.post('/:userid/tweets', requireAuth, getUserTweets)
userRouter.post('/:userid/tweets/liked', requireAuth, getUserLikedTweets)
userRouter.post('/:userid/tweets/media', requireAuth, getUserMediaTweets)
userRouter.post('/:userid/tweets/feed', requireAuth, getUserFeedTweets)
userRouter.post('/users_suggestions', requireAuth, getUsersSuggetions)
userRouter.post('/search/users', requireAuth, searchUsers)
userRouter.post('/notifications',requireAuth,retrieveNotifications)
userRouter.post('/bookmarks',requireAuth,fetchBookmarks)
userRouter.post('/notifications/mentions',requireAuth,retrieveMentonsNotifications)

module.exports = userRouter;