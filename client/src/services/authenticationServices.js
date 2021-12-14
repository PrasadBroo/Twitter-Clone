import axios from 'axios'
import * as queryString from 'query-string';

export const googleAuthenticationUrl = () => {

    const stringifiedParams = queryString.stringify({
        client_id: process.env.GOOGLE_CLIENT_ID, //add env variable later
        redirect_uri: 'http://localhost:3000/authenticate/google',
        scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ].join(' '), // space seperated string
        response_type: 'code',
        access_type: 'offline',
        prompt: 'consent',
    });

    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
    return googleLoginUrl;


}

export const googleAuthentication = async(code)=>{
    try {
        const response = await axios.post('/api/auth/login/github', {
            code,
          });
          return response.data;
    } catch (error) {
        throw new Error(error.message)
    }
}