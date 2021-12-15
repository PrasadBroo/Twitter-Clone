require('dotenv').config()
const {
    getGoogleAccessTokenFromCode,
    getGoogleUserInfo
} = require("../services/googleAuthService");
const User = require('../models/User')
const jwt = require('jsonwebtoken');



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
        console.log(userinfo);
        const userDocument = await User.findOne({
            googleId: userinfo.id
        });
        console.log(userDocument)
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