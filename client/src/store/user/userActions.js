import {
    googleAuthentication,
    githubAuthentication,
    signupWithEmail,
    signInUserWithToken,
    loginWithEmail,
} from "../../services/authenticationServices"
import {
    postTheTweet, postTheTweetReply
} from "../../services/tweetService";
import {
    updateUserProfile
} from "../../services/userServices";

import {
    verifyEmail,
    verifyName,
    verifyPassword,
    verifyUsername,
} from "../../utils/validations";
import {
    FOLLOWED_FROM_FOLLOWERS,
    FOLLOWED_FROM_FOLLOWINGS,
    FOLLOWED_FROM_PROFILE,
    UNFOLLOWED_FROM_FOLLOWERS,
    UNFOLLOWED_FROM_FOLLOWINGS,
    UNFOLLOWED_FROM_PROFILE
} from "../guest/guestSlice";
import {
    HIDE_UNFOLLOW_MODEL
} from "../model/modelSlice";
import {
    followUser,
    unfollowUser
} from './../../services/userServices';
import {

    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL,
    SIGN_IN_START,
    SIGN_UP_START,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    FETCHING_FINISHED,
    LOGOUT_USER,
    FETCHING_STARTED,
    UPDATING_PROFILE_FINISHED,
    UPDATING_PROFILE_STARTED,
    UPDATING_PROFILE_ERROR,
    ERROR_WHILE_FOLLOWING,
    ERROR_WHILE_UNFOLLOWING,
    POSTING_TWEET_STARTED,
    POSTING_TWEET_FINISED,
    POSTING_TWEET_FAILED,
    POSTING_TWEET_REPLY_FAILED,
    POSTING_TWEET_REPLY_STARTED,
    POSTING_TWEET_REPLY_FINISED,
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
        dispatch(SIGN_UP_START())
        verifyName(name)
        verifyUsername(username)
        verifyPassword(password, confPassword);
        verifyEmail(email);
        const user = await signupWithEmail(name, email, username, password, confPassword);
        // signup success dispatch
        localStorage.setItem('token', user.token)
        dispatch(SIGN_UP_SUCCESS(user))
    } catch (error) {
        // signup fail dispatch
        console.log(error)
        dispatch(SIGN_UP_FAIL(error.message))
    }
}
export const loginUser = (emailOrPhone, password) => async (dispatch) => {
    try {
        dispatch(SIGN_IN_START())
        const user = await loginWithEmail(emailOrPhone, password);
        localStorage.setItem('token', user.token)
        dispatch(SIGN_IN_SUCCESS(user))
    } catch (error) {
        dispatch(SIGN_IN_FAIL(error.message))
    }
}

export const signInStart = () => async (dispatch) => {
    try {
        dispatch(FETCHING_STARTED())
        const token = localStorage.getItem('token');
        if (!token) return dispatch(FETCHING_FINISHED());
        const user = await signInUserWithToken(token);
        dispatch(SIGN_IN_SUCCESS(user));
        dispatch(FETCHING_FINISHED())
    } catch (error) {
        // localStorage.removeItem('token')
        dispatch(FETCHING_FINISHED())
        dispatch(SIGN_IN_FAIL(error.message))
    }
}
export const logout = () => dispatch => {
    localStorage.removeItem('token')
    dispatch(LOGOUT_USER())
}
export const updateProfile = (bcPic, profilePic, fullName, bio, website, location) => async (dispatch) => {
    try {
        // dispatch update profile start
        dispatch(UPDATING_PROFILE_STARTED())
        await updateUserProfile(bcPic, profilePic, fullName, bio, website, location);
        // dispatch update profile success
        dispatch(UPDATING_PROFILE_FINISHED())
    } catch (error) {
        dispatch(UPDATING_PROFILE_ERROR(error.message))
        dispatch(UPDATING_PROFILE_FINISHED())
    }
}

export const followTheUser = (userid, type) => async (dispatch) => {
    try {
        if (String(type) === 'followers') dispatch(FOLLOWED_FROM_FOLLOWERS(userid))
        if (String(type) === 'followings') dispatch(FOLLOWED_FROM_FOLLOWINGS(userid))
        if (String(type) === 'profile') dispatch(FOLLOWED_FROM_PROFILE())
        await followUser(userid);
        
    } catch (error) {
        if (String(type) === 'followers') dispatch(UNFOLLOWED_FROM_FOLLOWERS(userid))
        if (String(type) === 'followings') dispatch(UNFOLLOWED_FROM_FOLLOWINGS(userid))
        if (String(type) === 'profile') dispatch(UNFOLLOWED_FROM_PROFILE())
        dispatch(ERROR_WHILE_FOLLOWING(error.message))
    }
}
export const unfollowTheUser = (userid, type) => async (dispatch) => {
    try {
        if (String(type) === 'followers') dispatch(UNFOLLOWED_FROM_FOLLOWERS(userid))
        if (String(type) === 'followings') dispatch(UNFOLLOWED_FROM_FOLLOWINGS(userid))
        if (String(type) === 'profile') dispatch(UNFOLLOWED_FROM_PROFILE())
        dispatch(HIDE_UNFOLLOW_MODEL())
        await unfollowUser(userid);
        
    } catch (error) {
        if (String(type) === 'followers') dispatch(FOLLOWED_FROM_FOLLOWERS(userid))
        if (String(type) === 'followings') dispatch(FOLLOWED_FROM_FOLLOWINGS(userid))
        if (String(type) === 'profile') dispatch(FOLLOWED_FROM_PROFILE())
        dispatch(ERROR_WHILE_UNFOLLOWING(error.message))
        dispatch(HIDE_UNFOLLOW_MODEL())
    }
}
export const postTweet = (caption, pic = null,tweet) => async (dispatch) => {
    try {
        // if(!caption) dispatch error
        if(!caption){
           return dispatch(POSTING_TWEET_FAILED('No caption provided'))
        }
        dispatch(POSTING_TWEET_STARTED())
        if(!tweet)await postTheTweet(caption, pic,null);
        else{
            await postTheTweet(caption, pic,tweet._id);
        }
        
        // dispatch success
        dispatch(POSTING_TWEET_FINISED())
    } catch (error) {
        dispatch(POSTING_TWEET_FAILED(error.message))
    }
}
export const postTweetReply = (tweetText,tweetPic=null,tweetid) => async (dispatch) => {
    try {
        // if(!caption) dispatch error
        if(!tweetText || !tweetid){
           return dispatch(POSTING_TWEET_REPLY_FAILED('Insufficent data provided'))
        }
        dispatch(POSTING_TWEET_REPLY_STARTED())
        await postTheTweetReply(tweetText, tweetPic,tweetid);
        // dispatch success
        dispatch(POSTING_TWEET_REPLY_FINISED())
    } catch (error) {
        dispatch(POSTING_TWEET_REPLY_FAILED(error.message))
    }
}