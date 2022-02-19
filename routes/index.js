const express = require('express');
const apiRouter = express.Router()
const authRouter = require('./auth');
const userRouter = require('./user');

apiRouter.use('/auth', authRouter);
apiRouter.use('/user',userRouter)

module.exports = apiRouter;