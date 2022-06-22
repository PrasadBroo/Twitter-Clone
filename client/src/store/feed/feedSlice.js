import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    feedTweets:[],
    hasMoreFeedTweets:true,
    tweet: {hasParentTweet:null},
    fetchingTweet: true,
    fetchingTweetError: null,
    likedTweets: [],
    mediaTweets: [],
    feedTweetsFetching:true,
    hasMoreUserTweets:true,
    hasMoreMediaTweets:true,
    hasMoreLikesTweets:true,
    hasMoreTweetReplies:true,
    tweets: [],
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
            if(action.payload.tweets.length < 5){
                state.hasMoreUserTweets = false;
            }
            state.tweets = state.tweets.concat(action.payload.tweets);
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
            if(action.payload.length < 5){
                state.hasMoreFeedTweets = false;
            }
            state.feedTweets = state.feedTweets.concat(action.payload);
            state.feedTweetsFetching = false;
        },
        CLEAR_FEED_TWEETS: (state) => {
            state.feedTweets = [];
            state.hasMoreFeedTweets = true;
        },
        CLEAR_MEDIA_TWEETS:(state)=>{
            state.mediaTweets = []
        },
        CLEAR_LIKED_TWEETS:(state)=>{
            state.likedTweets = []
        },
        CLEAR_USER_TWEETS: (state) => {
            state.tweets = [];
            state.hasMoreUserTweets = true;
        },
        FEED_TWEETS_FETCH_FAILED: (state, action) => {
            state.feedTweetsFetchingError = action.payload;
            state.feedTweetsFetching = false;
        },
        FEED_TWEETS_FETCHING_STARTED: (state) => {
            state.feedTweetsFetching = true;
        },
        LIKED_TWEETS_FETCH_SUCCESS: (state, action) => {
            if(action.payload.tweets.length < 5){
                state.hasMoreLikesTweets = false;
            }
            state.likedTweets = state.likedTweets.concat(action.payload.tweets);
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
            if(action.payload.tweets.length < 5){
                state.hasMoreMediaTweets = false;
            }
            state.mediaTweets = state.mediaTweets.concat(action.payload.tweets);
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
            state.tweet.replies.splice(0,0,action.payload)
        },
        FETCHING_TWEET_REPLIES_SUCCESS:(state,action)=>{
            if(action.payload.length < 10){
                state.hasMoreTweetReplies = false;
            }
            state.tweet.replies = state.tweet.replies.concat(action.payload)
        },
        SET_TWEET_COUNT:(state,action)=>{
            state.tweetsCount = action.payload;
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
    POSTING_TWEET_REPLY_SUCCESS,
    CLEAR_FEED_TWEETS,
    CLEAR_USER_TWEETS,
    CLEAR_LIKED_TWEETS,
    CLEAR_MEDIA_TWEETS,
    FETCHING_TWEET_REPLIES_SUCCESS,
    SET_TWEET_COUNT
} = feedSlice.actions;
export default feedSlice.reducer;

