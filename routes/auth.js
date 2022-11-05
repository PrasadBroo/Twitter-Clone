const express = require('express');
const authRouter = express.Router();
const { googleLoginAuthentication,githubLoginAuthentication,signupUserWithEmail,loginWithToken,loginUserWithEmail,verifyEmail, requireAuth } = require('../controllers/authController');




authRouter.post('/login/google',googleLoginAuthentication)
authRouter.post('/login/github',githubLoginAuthentication)
authRouter.post('/login/token',loginWithToken)
authRouter.post('/confirm/email',requireAuth,verifyEmail)
authRouter.post('/signup/email',signupUserWithEmail)
authRouter.post('/login/email',loginUserWithEmail)



module.exports = authRouter;