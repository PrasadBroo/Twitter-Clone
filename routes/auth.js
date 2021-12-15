const express = require('express');
const authRouter = express.Router();
const { googleLoginAuthentication } = require('../controllers/authController');




authRouter.post('/login/google',googleLoginAuthentication)


module.exports = authRouter;