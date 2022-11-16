import axios from "./axios";
import * as queryString from 'query-string';

export const googleAuthenticationUrl = () => {

    const stringifiedParams = queryString.stringify({
        client_id: '498497953371-4h3t8oorr2j3mvhrmpvj6h244qqqlcoq.apps.googleusercontent.com', //add env variable later
        redirect_uri: `${window.location.protocol+'//'+window.location.hostname}/authenticate/google`,
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

export const githubAuthenticationUrl = () => {
    const params = queryString.stringify({
        client_id: '219c7536dccdba993577',
        redirect_uri: `${window.location.protocol+'//'+window.location.hostname}/authenticate/github`,
        scope: ['read:user', 'user:email'].join(' '), // space seperated string
        allow_signup: true,
    });

    const githubLoginUrl = `https://github.com/login/oauth/authorize?${params}`;
    return githubLoginUrl;
}

export const googleAuthentication = async (code) => {
    try {
        const response = await axios.post('/api/auth/login/google', {
            code,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}

export const githubAuthentication = async (code) => {
    try {
        const response = await axios.post('/api/auth/login/github', {
            code,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}

export const signupWithEmail = async (name, email, username, password, confPassword) => {
    try {
        const response = await axios.post('/api/auth/signup/email', {

            name,
            email,
            username,
            password,
            confPassword
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }

}
export const signInUserWithToken = async (token) => {
    try {
        const response = await axios.post('/api/auth/login/token', {
            token
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}
export const loginWithEmail = async (email, password) => {
    try {
        const response = await axios.post('/api/auth/login/email', {

            email,
            password
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }

}

export const verifyEmailToken = async (token) => {
    try {
        const response = await axios.post('/api/auth/confirm/email', {
            token
        },{
            headers: {
                authorization: localStorage.getItem('token'),
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}