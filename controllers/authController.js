require('dotenv').config()
const {
    getGoogleAccessTokenFromCode,
    getGoogleUserInfo,
} = require("../services/googleAuthService");
const bcrypt = require('bcrypt');

const UserModel = require('../models/User')
const jwt = require('jsonwebtoken');
const {
    getGithubAccessTokenFromCode,
    getGithubUserInfo
} = require('../services/githubAuthServices');
const { verifyAll } = require('../utils/validations');



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
        const userDocument = await UserModel.findOne({$or: [ { googleId:userinfo.id }, { email:userinfo.email } ]});
        if (userDocument) {
            const userDetails = {
                email: userinfo.email,
                fullName: userinfo.name,
                username: 'test',
                avatar: userinfo.picture,
                id: userDocument._id
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

            const createNewUser = await UserModel.create(userDetails)
            // now send jwt
            const userDetailsClient = {
                email: userinfo.email,
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
        const userDocument = await UserModel.findOne({
            githubId: userinfo.id
        });
        if (userDocument) {
            const userDetails = {
                email: userinfo.email,
                fullName: userinfo.name,
                username: 'test',
                avatar: userinfo.picture,
                id: userDocument._id
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
                username: userinfo.login,
                avatar: userinfo.avatar_url,
                githubId: userinfo.id
            }

            const createNewUser = await UserModel.create(userDetails)
            // now send jwt
            const userDetailsClient = {
                email: userinfo.email,
                fullName: userinfo.name,
                username: userinfo.login,
                avatar: userinfo.avatar_url,
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
module.exports.signupUserWithEmail = async(req,res,next)=>{
    const saltRounds = 10;
    // get details

    const {name,email,username,password,confPassword} = req.body;
    // validate details
    try {
        verifyAll(name,email,username,password,confPassword);
        const userDocument = await UserModel.findOne({$or: [ { email }, { username } ]});
        
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
            const user = await UserModel.create(userDetails);
            return res.send({
                user,
                token: jwt.sign({
                    id: user._id
                }, process.env.JWT_TOKEN_SECRET),
            });
        }
    } catch (error) {
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
        const userDocument = await UserModel.findById(id,{password:0,__v:0});
        if(userDocument){
            return res.send({
                user: userDocument,
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
        const userDocument = await UserModel.findOne({email:email},{__v:0});
        
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
            
            const userDetailsClient = {
                email: userDocument.email,
                fullName: userDocument.fullName,
                username: userDocument.username,
                avatar: userDocument.avatar_url,
                id: userDocument._id
            }
            return res.send({
                user: userDetailsClient,
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
        const userDocument = await UserModel.findById(id);
        if(userDocument){
            res.locals.user = userDocument;
            return next()
        }
        else{
            res.status(404).send({error:"User doesn't exist"})
        }
    } catch (error) {
        
    }
}