import {
    googleAuthentication,githubAuthentication
} from "../../services/authenticationServices"
import { SIGN_IN_SUCCESS, SIGN_IN_FAIL } from "./userSlice";



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