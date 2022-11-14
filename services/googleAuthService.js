require('dotenv').config();
const axios = require('axios');
const RequestError = require('../errorTypes/requestError');

module.exports.getGoogleAccessTokenFromCode = async (code) => {
    try {
        const {
            data
        } = await axios({
            url: `https://oauth2.googleapis.com/token`,
            method: 'post',
            data: {
                client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
                client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
                redirect_uri: `${process.env.HOME_URL}/authenticate/google`,
                grant_type: 'authorization_code',
                code,
            },
        });
        return data.access_token;
    } catch (error) {
        throw new RequestError('Invalid google  code', 401)
    }
}

module.exports.getGoogleUserInfo = async (access_token) => {
    try {
        const {
            data
        } = await axios({
            url: 'https://www.googleapis.com/oauth2/v2/userinfo',
            method: 'get',
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return data;
    } catch (error) {
        throw new Error(error.message)
    }

};

