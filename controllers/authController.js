require('dotenv').config()
const {
    getGoogleAccessTokenFromCode,
    getGoogleUserInfo,
} = require("../services/googleAuthService");


const User = require('../models/User')
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
        const userDocument = await User.findOne({
            googleId: userinfo.id
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
                username: 'test',
                avatar: userinfo.picture,
                googleId: userinfo.id
            }

            const createNewUser = await User.create(userDetails)
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
        const userDocument = await User.findOne({
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

            const createNewUser = await User.create(userDetails)
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
    // get details

    const {name,email,username,password,confPassword} = req.body;
    // validate details
    try {
        verifyAll(name,email,username,password,confPassword);
        const userDocument = await User.findOne({$or: [ { email }, { username } ]});
        console.log(userDocument)
        
        if(userDocument){
            const whichOne = userDocument.email === email ? 'email' : 'username'
            throw new Error('User already exist with that ' + whichOne)
        }
        else{
            // create user
            const userDetails = {
                email,
                fullName: name,
                username: username,
                password,
                avatar: 'https://i.ibb.co/LCk6LbN/default-Profile-Pic-7fe14f0a.jpg', 
            }
            const user = await User.create(userDetails)
            const userDetailsClient = {
                email: user.email,
                fullName: user.name,
                username: user.username,
                avatar: user.avatar_url,
                id: user._id
            }
            return res.send({
                user: userDetailsClient,
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