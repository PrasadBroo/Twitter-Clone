import {
    googleAuthentication,
    githubAuthentication,
    signupWithEmail,
    signInUserWithToken
} from "../../services/authenticationServices"
import {
    verifyEmail,
    verifyName,
    verifyPassword,
    verifyUsername
} from "../../utils/validations";
import {
    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    FETCHING_FINISHED,
    FETCHING_STARTED,
} from "./userSlice";



export const googleSignInStart = (code) => async (dispatch) => {
    try {
        dispatch(FETCHING_STARTED())
        const user = await googleAuthentication(code);
        dispatch(SIGN_IN_SUCCESS(user))
        localStorage.setItem('token', user.token);
        dispatch(FETCHING_FINISHED())
    } catch (error) {
        dispatch(FETCHING_FINISHED())
        dispatch(SIGN_IN_FAIL(error.message))
    }
}

export const githubSignInStart = (code) => async (dispatch) => {
    try {
        dispatch(FETCHING_STARTED())
        const user = await githubAuthentication(code);
        dispatch(SIGN_IN_SUCCESS(user))
        localStorage.setItem('token', user.token);
        dispatch(FETCHING_FINISHED())
    } catch (error) {
        dispatch(FETCHING_FINISHED())
        dispatch(SIGN_IN_FAIL(error.message))
    }
}

export const signupUser = (name, email, username, password, confPassword) => async (dispatch) => {
    try {
        verifyName(name)
        verifyUsername(username)
        verifyPassword(password, confPassword);
        verifyEmail(email);
        const user = await signupWithEmail(name, email, username, password, confPassword);
        // signup success dispatch
        localStorage.setItem('token',user.token)
        dispatch(SIGN_UP_SUCCESS(user))
    } catch (error) {
        // signup fail dispatch
        console.log(error)
        dispatch(SIGN_UP_FAIL(error.message))
    }
}

export const signInStart = ()=>async(dispatch)=>{
    try {
        dispatch(FETCHING_STARTED())
        const token = localStorage.getItem('token');
        if(!token)return dispatch(FETCHING_FINISHED());
        const user = await signInUserWithToken(token);
        dispatch(SIGN_IN_SUCCESS(user));
        dispatch(FETCHING_FINISHED())
    } catch (error) {
        dispatch(FETCHING_FINISHED())
        dispatch(SIGN_IN_FAIL(error.message))
    }
}