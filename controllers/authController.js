require('dotenv').config()
const {
    getGoogleAccessTokenFromCode,
    getGoogleUserInfo,
} = require("../services/googleAuthService");
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const {sendVerificationEmail} = require('../services/emailService')
const Mongoose = require("mongoose");
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const {
    getGithubAccessTokenFromCode,
    getGithubUserInfo
} = require('../services/githubAuthServices');
const { verifyAll } = require('../utils/validations');
const Followers =  require('../models/Followers')
const Followings =  require('../models/Followings')
const ConfirmToken = require('../models/ConfirmToken')



module.exports.googleLoginAuthentication = async (req, res, next) => {
    // check code
    // make request
    // send response jwt

    const {
        code
    } = req.body;

    try {
        if (!code) {
            return res.status(400).send({
                error: 'invalid google auth code,try again'
            })
        }
        const userAccessToken = await getGoogleAccessTokenFromCode(code)
        const userinfo = await getGoogleUserInfo(userAccessToken);
        const userDocument = await User.findOne({$or: [ { googleId:userinfo.id }, { email:userinfo.email } ]});
        
        if (userDocument) {
            const followersCount = await Followers.findOne({user:userDocument._id},{followers:1}).size()
            const followingsCount = await Followings.findOne({user:userDocument._id},{followings:1}).size()
            const userDetails = {
                email: userinfo.email,
                fullName: userinfo.name,
                username: 'test',
                avatar: userinfo.picture,
                id: userDocument._id,
                followersCount,
                followingsCount,
            }
            return res.send({
                user: userDetails,
                token: jwt.sign({
                    id: userDocument._id
                }, process.env.JWT_TOKEN_SECRET),
            });
            // user alredy registered send jwt
        } else {
            // create user and send jwt
            const userDetails = {
                email: userinfo.email,
                fullName: userinfo.name,
                username: 'test',
                avatar: userinfo.picture,
                googleId: userinfo.id
            }

            const createNewUser = await User.create(userDetails)
            // now send jwt
            const userDetailsClient = {
                fullName: userinfo.name,
                username: 'test',
                avatar: userinfo.picture,
                id: createNewUser._id
            }
            return res.send({
                user: userDetailsClient,
                token: jwt.sign({
                    id: createNewUser._id
                }, process.env.JWT_TOKEN_SECRET),
            });

        }
    } catch (error) {
        return next(error)
    }
}

module.exports.githubLoginAuthentication = async (req, res, next) => {
    const {
        code
    } = req.body;

    try {
        if (!code) {
            return res.status(400).send({
                error: 'invalid google auth code,try again'
            })
        }
        const userAccessToken = await getGithubAccessTokenFromCode(code)
        const userinfo = await getGithubUserInfo(userAccessToken);
        const userDocument = await User.findOne({
            githubId: userinfo.id
        });
        if (userDocument) {
            const pipeline = [
                {
                    $match:{githubId:userinfo.id}
                },
                {
                    $lookup:{
                        from:'followers',
                        localField:'_id',
                        foreignField:'user',
                        as:'userFollowers'
                    }
                },
                {
                    $lookup:{
                        from:'followings',
                        localField:'_id',
                        foreignField:'user',
                        as:'userFollowings'
                    }
                },
                {
                    $addFields:{
                        followersCount:{$size:'$userFollowers.followers'},
                        followingsCount:{$size:'$userFollowings.followings'}
                    }
                },
                {
                    $project:{
                        'password':0,
                        email:0,
                        '__v':0,
                        userFollowers:0,
                        userFollowings:0,
                    }
                }
            ]
            const userDocument = await User.aggregate(pipeline);

            return res.send({
                user: userDocument[0],
                token: jwt.sign({
                    id: userDocument[0]._id
                }, process.env.JWT_TOKEN_SECRET),
            });
            // user alredy registered send jwt
        } else {
            // create user and send jwt
            const userDetails = {
                email: userinfo.email,
                fullName: userinfo.name,
                username: userinfo.login,
                avatar: userinfo.avatar_url,
                githubId: userinfo.id,
                bio:userinfo.bio,
                location:userinfo.location,
                isVerified:true
            }

            const createNewUser = await User.create(userDetails)
            // now send jwt
            const pipeline = [
                {
                    $match:{githubId:userinfo.id}
                },
                {
                    $lookup:{
                        from:'followers',
                        localField:'_id',
                        foreignField:'user',
                        as:'userFollowers'
                    }
                },
                {
                    $lookup:{
                        from:'followings',
                        localField:'_id',
                        foreignField:'user',
                        as:'userFollowings'
                    }
                },
                {
                    $addFields:{
                        followersCount:{$size:'$userFollowers.followers'},
                        followingsCount:{$size:'$userFollowings.followings'}
                    }
                },
                {
                    $project:{
                        'password':0,
                        '__v':0,
                        email:0,
                        userFollowers:0,
                        userFollowings:0,
                    }
                }
            ]
            const userDocument = await User.aggregate(pipeline);
            return res.send({
                user: userDocument[0],
                token: jwt.sign({
                    id: createNewUser._id
                }, process.env.JWT_TOKEN_SECRET),
            });

        }
    } catch (error) {
        return next(error)
    }
}
module.exports.signupUserWithEmail = async(req,res,next)=>{
    const saltRounds = 10;
    const daysInExpires = 7;
    const rbytes = crypto.randomBytes(20).toString('hex')
    const vlink = `${process.env.HOME_URL}/confirm/${rbytes}` 
            
    // get details

    const {name,email,username,password,confPassword} = req.body;
    // validate details
    try {
        verifyAll(name,email,username,password,confPassword);
        const userDocument = await User.findOne({$or: [ { email }, { username } ]});
        
        if(userDocument){
            const whichOne = userDocument.email === email ? 'email' : 'username'
            throw new Error('User already exist with that ' + whichOne)
        }
        else{
            const hashPass = await bcrypt.hash(password, saltRounds);
            // create user
            const userDetails = {
                email,
                fullName: name,
                username: username,
                password:hashPass,
                avatar: 'https://i.ibb.co/LCk6LbN/default-Profile-Pic-7fe14f0a.jpg', 
            }
            const user = await User.create(userDetails);
            const pipeline = [
                {
                    $match:{_id:Mongoose.Types.ObjectId(user._id)}
                },
                {
                    $lookup:{
                        from:'followers',
                        localField:'_id',
                        foreignField:'user',
                        as:'userFollowers'
                    }
                },
                {
                    $lookup:{
                        from:'followings',
                        localField:'_id',
                        foreignField:'user',
                        as:'userFollowings'
                    }
                },
                {
                    $addFields:{
                        followersCount:{$size:'$userFollowers.followers'},
                        followingsCount:{$size:'$userFollowings.followings'}
                    }
                },
                {
                    $project:{
                        'password':0,
                        '__v':0,
                        email:0,
                        userFollowers:0,
                        userFollowings:0,
                    }
                }
            ]
            const myuser = await User.aggregate(pipeline);
            const user_confirm_token = await ConfirmToken.create({user:user._id,token:rbytes})
            sendVerificationEmail(email,name,vlink)
            return res.send({
                user:myuser[0],
                token: jwt.sign({
                    id: user._id
                }, process.env.JWT_TOKEN_SECRET,{expiresIn:86400*daysInExpires}),
            });

        }
    } catch (error) {
        console.log(error)
        next(error)
    }
    // check if user exist
    
    // if not create it and send jwt

}
module.exports.loginWithToken = async(req,res,next)=>{
    const {token} = req.body;
    try {
        if(!token){
          return  res.status(401).send({error:'Please provide token'})
        }
        try {
            var isValidJwt = jwt.verify(token,process.env.JWT_TOKEN_SECRET);
        
        } catch (error) {
            return res.status(401).send({error:'Invalid token provided'})
        }
        
        const {id} = isValidJwt;
        const pipeline = [
            {
                $match:{_id:Mongoose.Types.ObjectId(id)}
            },
            {
                $lookup:{
                    from:'followers',
                    localField:'_id',
                    foreignField:'user',
                    as:'userFollowers'
                }
            },
            {
                $lookup:{
                    from:'followings',
                    localField:'_id',
                    foreignField:'user',
                    as:'userFollowings'
                }
            },
            {
                $addFields:{
                    followersCount:{$size:'$userFollowers.followers'},
                    followingsCount:{$size:'$userFollowings.followings'}
                }
            },
            {
                $project:{
                    'password':0,
                    '__v':0,
                    email:0,
                    userFollowers:0,
                    userFollowings:0,
                }
            }
        ]
        const userDocument = await User.aggregate(pipeline);
        if(userDocument.length>=1){
            return res.send({
                user: userDocument[0],
                token: token,
            });
        }
        else{
            res.status(404).send({error:"User doesn't exist"})
        }
    } catch (error) {
        next(error)
    }
}

module.exports.loginUserWithEmail = async(req,res,next)=>{

    const {email,password} = req.body;
    try {
        if(!email || !password){
            throw new Error('Email or password not provided');
        }
        const userDocument = await User.findOne({email:email},{__v:0});
        
        if(!userDocument){
            throw new Error('User not exist with that email')
        }
        else{
            const userPass = userDocument.password;
            if(!userPass)throw new Error('Please sign in with other options')
            const isValidPass = await bcrypt.compare(password, userPass);
            if(!isValidPass){
                throw  new Error('Incorrect password provided')
            }
            const pipeline = [
                {
                    $match:{_id:Mongoose.Types.ObjectId(userDocument._id)}
                },
                {
                    $lookup:{
                        from:'followers',
                        localField:'_id',
                        foreignField:'user',
                        as:'userFollowers'
                    }
                },
                {
                    $lookup:{
                        from:'followings',
                        localField:'_id',
                        foreignField:'user',
                        as:'userFollowings'
                    }
                },
                {
                    $addFields:{
                        followersCount:{$size:'$userFollowers.followers'},
                        followingsCount:{$size:'$userFollowings.followings'}
                    }
                },
                {
                    $project:{
                        'password':0,
                        '__v':0,
                        userFollowers:0,
                        userFollowings:0,
                    }
                }
            ]
            const user = await User.aggregate(pipeline);

            return res.send({
                user: user[0],
                token: jwt.sign({
                    id: userDocument._id
                }, process.env.JWT_TOKEN_SECRET),
            });
        }
    } catch (error) {
        next(error)
    }
    

}
module.exports.requireAuth = async(req,res,next)=>{
    const { authorization:token } = req.headers;
    try {
        if(!token){
            return  res.status(401).send({error:'Please provide token'})
          }
          try {
              var isValidJwt = jwt.verify(token,process.env.JWT_TOKEN_SECRET);
          
          } catch (error) {
              return res.status(401).send({error:'Invalid token provided'})
          }
          const {id} = isValidJwt;
        const userDocument = await User.findById(id);
        if(userDocument){
            res.locals.user = userDocument;
            return next()
        }
        else{
            res.status(404).send({error:"User doesn't exist"})
        }
    } catch (error) {
        next(error)
    }
}
module.exports.verifyEmail = async(req,res,next)=>{
    const {token} = req.body;
    const currentUser = res.locals.user;
    try {
        if(!token){
            return  res.status(400).send({error:'Please provide token'})
          }
          const isValidtoken = await ConfirmToken.findOne({token,user:currentUser._id})
          if(!isValidtoken){
            return res.status(404).send({error:'Token not found'})
          }
          await ConfirmToken.deleteOne({token,user:currentUser._id})
          await User.updateOne({_id:currentUser._id},{isVerified:true})
          return res.status(200).send('success')

    } catch (error) {
        next(error)
    }
}