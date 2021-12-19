const express = require('express');
const authRouter = express.Router();
const { googleLoginAuthentication,githubLoginAuthentication,signupUser } = require('../controllers/authController');




authRouter.post('/login/google',googleLoginAuthentication)
authRouter.post('/login/github',githubLoginAuthentication)
authRouter.post('/signup/email',signupUser)


module.exports = authRouter;