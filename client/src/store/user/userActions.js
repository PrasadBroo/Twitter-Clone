import {
    googleAuthentication,
    githubAuthentication,
    signupWithEmail
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
    SIGN_UP_FAIL
} from "./userSlice";



export const googleSignInStart = (code) => async (dispatch) => {
    try {
        const user = await googleAuthentication(code);
        dispatch(SIGN_IN_SUCCESS(user))
        localStorage.setItem('token', user.token);
    } catch (error) {
        dispatch(SIGN_IN_FAIL(error.message))
    }
}

export const githubSignInStart = (code) => async (dispatch) => {
    try {
        const user = await githubAuthentication(code);
        dispatch(SIGN_IN_SUCCESS(user))
        localStorage.setItem('token', user.token);
    } catch (error) {
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
        console.log(user)
        dispatch(SIGN_UP_SUCCESS(user))
    } catch (error) {
        // signup fail dispatch
        console.log(error)
        dispatch(SIGN_UP_FAIL(error.message))
    }
}