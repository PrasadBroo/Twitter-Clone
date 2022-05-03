import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    feedTweets:null,
    tweet: {hasParentTweet:null},
    fetchingTweet: true,
    fetchingTweetError: null,
    likedTweets: null,
    mediaTweets: null,
    feedTweetsFetching:true,
    tweets: null,
    tweetsCount: null,
    tweetsFetching: true,
    likedTweetFetching: true,
    mediaTweetsFetching: true,
    tweetFetchingError: null,
    likedTweetsFetchingError: null,
    feedTweetsFetchingError: null,
    mediaTweetsFetchingError: null,
}


export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        TWEETS_FETCH_SUCCESS: (state, action) => {
            state.tweets = action.payload.tweets;
            state.tweetsCount = action.payload.count;
            state.tweetsFetching = false;
        },
        TWEETS_FETCH_FAILED: (state, action) => {
            state.tweetFetchingError = action.payload;
            state.tweetsFetching = false;
        },
        TWEETS_FETCHING_STARTED: (state) => {
            state.tweetsFetching = true;
        },
        FEED_TWEETS_FETCH_SUCCESS: (state, action) => {
            state.feedTweets = action.payload;
            state.feedTweetsFetching = false;
        },
        FEED_TWEETS_FETCH_FAILED: (state, action) => {
            state.feedTweetsFetchingError = action.payload;
            state.feedTweetsFetching = false;
        },
        FEED_TWEETS_FETCHING_STARTED: (state) => {
            state.feedTweetsFetching = true;
        },
        LIKED_TWEETS_FETCH_SUCCESS: (state, action) => {
            state.likedTweets = action.payload.tweets;
            state.tweetsCount = action.payload.count;
            state.likedTweetFetching = false;
        },
        LIKED_TWEETS_FETCH_FAILED: (state, action) => {
            state.likedTweetsFetchingError = action.payload;
            state.likedTweetFetching = false;
        },
        LIKED_TWEETS_FETCHING_STARTED: (state) => {
            state.likedTweetFetching = true;
        },
        MEDIA_TWEETS_FETCH_SUCCESS: (state, action) => {
            state.mediaTweets = action.payload.tweets;
            state.tweetsCount = action.payload.count;
            state.mediaTweetsFetching = false;
        },
        MEDIA_TWEETS_FETCH_FAILED: (state, action) => {
            state.mediaTweetsFetchingError = action.payload;
            state.mediaTweetsFetching = false;
        },
        MEDIA_TWEETS_FETCHING_STARTED: (state) => {
            state.mediaTweetsFetching = true;
        },
        FETCHING_TWEET_STARTED: (state) => {
            state.fetchingTweet = true;
        },
        FETCHING_TWEET_SUCCESS: (state, action) => {
            state.tweet = action.payload;
            state.fetchingTweet = false;
        },
        FETCHING_TWEET_FAIL: (state, action) => {
            state.fetchingTweet = false;
            state.fetchingTweetError = action.payload;
        },
        POSTING_TWEET_REPLY_SUCCESS:(state,action)=>{
            state.tweet.replies.push(action.payload)
        }


    },
})
export const {
    TWEETS_FETCHING_STARTED,
    TWEETS_FETCH_FAILED,
    TWEETS_FETCH_SUCCESS,
    LIKED_TWEETS_FETCHING_STARTED,
    LIKED_TWEETS_FETCH_FAILED,
    LIKED_TWEETS_FETCH_SUCCESS,
    MEDIA_TWEETS_FETCHING_STARTED,
    MEDIA_TWEETS_FETCH_FAILED,
    MEDIA_TWEETS_FETCH_SUCCESS,
    FETCHING_TWEET_FAIL,
    FETCHING_TWEET_STARTED,
    FETCHING_TWEET_SUCCESS,
    FEED_TWEETS_FETCHING_STARTED,
    FEED_TWEETS_FETCH_FAILED,
    FEED_TWEETS_FETCH_SUCCESS,
    POSTING_TWEET_REPLY_SUCCESS
} = feedSlice.actions;
export default feedSlice.reducer;