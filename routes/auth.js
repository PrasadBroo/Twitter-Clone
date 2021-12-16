const express = require('express');
const authRouter = express.Router();
const { googleLoginAuthentication,githubLoginAuthentication } = require('../controllers/authController');




authRouter.post('/login/google',googleLoginAuthentication)
authRouter.post('/login/github',githubLoginAuthentication)


module.exports = authRouter;