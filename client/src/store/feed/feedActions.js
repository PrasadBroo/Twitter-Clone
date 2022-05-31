import {
    fetchTheTweet,
} from "../../services/tweetService";
import {
    fetchTheUserLikedTweets,
    fetchTheUserMediaTweets,
    fetchTheUserTweets
} from "../../services/userServices";

import {
    TWEETS_FETCHING_STARTED,
    TWEETS_FETCH_SUCCESS,
    TWEETS_FETCH_FAILED,
    LIKED_TWEETS_FETCHING_STARTED,
    LIKED_TWEETS_FETCH_FAILED,
    LIKED_TWEETS_FETCH_SUCCESS,
    MEDIA_TWEETS_FETCHING_STARTED,
    MEDIA_TWEETS_FETCH_SUCCESS,
    MEDIA_TWEETS_FETCH_FAILED,
    FETCHING_TWEET_STARTED,
    FETCHING_TWEET_SUCCESS,
    FETCHING_TWEET_FAIL,
} from "./feedSlice"
import cogoToast from 'cogo-toast';

export const fetchUserTweets = (userid, offset) => async (dispatch) => {
    try {
        dispatch(TWEETS_FETCHING_STARTED())
        const tweets = await fetchTheUserTweets(userid, offset);
        dispatch(TWEETS_FETCH_SUCCESS(tweets))
    } catch (error) {
        cogoToast.error(error.message)
        dispatch(TWEETS_FETCH_FAILED(error.message))

    }
}

export const fetchUserLikedTweets = (userid, offset) => async (dispatch) => {
    try {
        dispatch(LIKED_TWEETS_FETCHING_STARTED())
        const tweets = await fetchTheUserLikedTweets(userid, offset);
        dispatch(LIKED_TWEETS_FETCH_SUCCESS(tweets))
    } catch (error) {
        cogoToast.error(error.message)
        dispatch(LIKED_TWEETS_FETCH_FAILED(error.message))

    }
}

export const fetchUserMediaTweets = (userid, offset) => async (dispatch) => {
    try {
        dispatch(MEDIA_TWEETS_FETCHING_STARTED())
        const tweets = await fetchTheUserMediaTweets(userid, offset);
        dispatch(MEDIA_TWEETS_FETCH_SUCCESS(tweets))
    } catch (error) {
        cogoToast.error(error.message)
        dispatch(MEDIA_TWEETS_FETCH_FAILED(error.message))

    }
}
export const fetchTweet = (tweetid) => async (dispatch) => {
    try {
        if (!tweetid) throw new Error('No tweet id provided')
        dispatch(FETCHING_TWEET_STARTED())
        const data = await fetchTheTweet(tweetid);
        dispatch(FETCHING_TWEET_SUCCESS(data.tweet))
    } catch (error) {
        cogoToast.error(error.message)
        dispatch(FETCHING_TWEET_FAIL(error.message))
    }
}