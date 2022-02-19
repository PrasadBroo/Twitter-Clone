const express = require('express');
const { updateProfile } = require('../controllers/userController');
const userRouter = express.Router();
const { requireAuth } = require('../controllers/authController');

userRouter.put('/update/profile',requireAuth,updateProfile)

module.exports = userRouter;