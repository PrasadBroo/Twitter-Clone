require('dotenv').config();
const axios = require('axios');
const RequestError = require('../errorTypes/requestError');


module.exports.getGithubAccessTokenFromCode = async (code) => {
    try {
        const {
            data
        } = await axios({
            url: 'https://github.com/login/oauth/access_token',
            method: 'get',
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
                redirect_uri: `${process.env.HOME_URL}/authenticate/github`,
                code,
            },
        });
        /**
         * GitHub returns data as a string we must parse.
         */
        
        const parsedData = data.split('&')[0].split('=')[1];
        return parsedData;
    } catch (error) {
        console.log(error)
        throw new RequestError('Invalid github  code', 401)
    }
}

module.exports.getGithubUserInfo = async(access_token)=>{

    try {
        const { data } = await axios({
            url: 'https://api.github.com/user',
            method: 'get',
            headers: {
              Authorization: `token ${access_token}`,
            },
          });
          return data;
    } catch (error) {
        throw new Error(error.message)
    }

}