const express = require('express');
const apiRouter = express.Router()
const authRouter = require('./auth');
const tweetRouter = require('./tweet');
const userRouter = require('./user');
const searchRouter = require('./search');


apiRouter.use('/auth', authRouter);
apiRouter.use('/user',userRouter)
apiRouter.use('/tweet',tweetRouter)
apiRouter.use('/search',searchRouter);

module.exports = apiRouter;