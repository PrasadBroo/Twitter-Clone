const express = require('express');
const authRouter = express.Router();
const { googleLoginAuthentication,githubLoginAuthentication,signupUserWithEmail } = require('../controllers/authController');




authRouter.post('/login/google',googleLoginAuthentication)
authRouter.post('/login/github',githubLoginAuthentication)
authRouter.post('/signup/email',signupUserWithEmail)


module.exports = authRouter;