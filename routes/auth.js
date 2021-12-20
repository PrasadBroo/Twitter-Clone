const express = require('express');
const authRouter = express.Router();
const { googleLoginAuthentication,githubLoginAuthentication,signupUserWithEmail,loginWithToken } = require('../controllers/authController');




authRouter.post('/login/google',googleLoginAuthentication)
authRouter.post('/login/github',githubLoginAuthentication)
authRouter.post('/signup/email',signupUserWithEmail)
authRouter.post('/login/token',loginWithToken)


module.exports = authRouter;