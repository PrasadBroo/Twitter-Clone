const express = require('express');
const {
    updateProfile,
    fethUser,
    followUser,
    getFollowers,
    getFollowings
} = require('../controllers/userController');
const userRouter = express.Router();
const {
    requireAuth
} = require('../controllers/authController');

userRouter.put('/update/profile', requireAuth, updateProfile)

userRouter.post('/get/profile', requireAuth, fethUser)
userRouter.post('/:userid/follow', requireAuth, followUser)
userRouter.post('/:userid/followers', requireAuth, getFollowers)
userRouter.post('/:userid/followings', requireAuth, getFollowings)

module.exports = userRouter;