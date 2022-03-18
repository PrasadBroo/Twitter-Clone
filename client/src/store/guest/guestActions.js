import {
    likeTheTweet, unlikeTheTweet
} from "../../services/tweetService";
import {
    fetchTheUserTweets,
    fetchUserProfile,
    getUserFollowers,
    getUserFollowings
} from "../../services/userServices"
import {
    FETCHING_GUEST_SUCCESS,
    FETCHING_GUEST_FAIL,
    FETCHING_STARTED,
    FETCHING_FINISHED,
    FETCHING_FOLLOWERS_FAIL,
    FETCHING_FOLLOWERS_SUCCESS,
    FETCHING_FOLLOWERS_START,
    FETCHING_FOLLOWINGS_FAIL,
    FETCHING_FOLLOWINGS_START,
    FETCHING_FOLLOWINGS_SUCCESS,
    TWEETS_FETCHING_STARTED,
    TWEETS_FETCH_SUCCESS,
    TWEETS_FETCH_FAILED,
    TWEET_LIKED_SUCCESS,
    TWEET_LIKED_FAILED,
    TWEET_UNLIKED_SUCCESS,
    TWEET_UNLIKED_FAILED,
} from "./guestSlice"




export const fetchUser = (username) => async (dispatch) => {
    try {
        dispatch(FETCHING_STARTED())
        const guestUser = await fetchUserProfile(username);
        dispatch(FETCHING_GUEST_SUCCESS(guestUser))
    } catch (error) {
        dispatch(FETCHING_GUEST_FAIL(error.message))
        dispatch(FETCHING_FINISHED())
    }
}

export const getFollowers = (userid) => async (dispatch) => {
    try {
        dispatch(FETCHING_FOLLOWERS_START())
        const followers = await getUserFollowers(userid);
        dispatch(FETCHING_FOLLOWERS_SUCCESS(followers))
    } catch (error) {
        dispatch(FETCHING_FOLLOWERS_FAIL(error.message))
    }
}
export const getFollowings = (userid) => async (dispatch) => {
    try {
        dispatch(FETCHING_FOLLOWINGS_START())
        const followings = await getUserFollowings(userid);
        dispatch(FETCHING_FOLLOWINGS_SUCCESS(followings))
    } catch (error) {
        dispatch(FETCHING_FOLLOWINGS_FAIL(error.message))
    }
}

export const fetchUserTweets = (userid) => async (dispatch) => {
    try {
        dispatch(TWEETS_FETCHING_STARTED())
        const tweets = await fetchTheUserTweets(userid);
        dispatch(TWEETS_FETCH_SUCCESS(tweets))
    } catch (error) {
        dispatch(TWEETS_FETCH_FAILED(error.message))

    }
}
export const likeTweet = (tweetid) => async (dispatch) => {
    try {
        dispatch(TWEET_LIKED_SUCCESS(tweetid))
        await likeTheTweet(tweetid);
        
    } catch (error) {
        dispatch(TWEET_LIKED_FAILED(error.message))
    }
}
export const unlikeTweet = (tweetid) => async (dispatch) => {
    try {
        dispatch(TWEET_UNLIKED_SUCCESS(tweetid))
        await unlikeTheTweet(tweetid);
        
    } catch (error) {
        dispatch(TWEET_UNLIKED_FAILED(error.message))
    }
}