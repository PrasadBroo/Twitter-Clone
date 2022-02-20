const express = require('express');
const { updateProfile,fethUser,followUser } = require('../controllers/userController');
const userRouter = express.Router();
const { requireAuth } = require('../controllers/authController');

userRouter.put('/update/profile',requireAuth,updateProfile)

userRouter.post('/get/profile',requireAuth,fethUser)
userRouter.post('/:userid/follow',requireAuth,followUser)

module.exports = userRouter;