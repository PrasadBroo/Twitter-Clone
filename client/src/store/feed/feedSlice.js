import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    tweet: null,
    fetchingTweet: true,
    fetchingTweetError: null,
    likedTweets: null,
    mediaTweets: null,
    tweets: null,
    tweetsCount: null,
    tweetsFetching: true,
    likedTweetFetching: true,
    mediaTweetsFetching: true,
    tweetFetchingError: null,
    likedTweetsFetchingError: null,
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
        TWEET_LIKED_SUCCESS: (state, action) => {

            const {
                tweetid,
                from
            } = action.payload;
            const tweets = state.tweets;
            const likedTweets = state.likedTweets;
            if (from === 'tweets') {
                tweets.find(tweet => tweet._id === tweetid).isLiked = true
                tweets.find(tweet => tweet._id === tweetid).likesCount += 1
            } else {
                likedTweets.find(tweet => tweet._id === tweetid).isLiked = true
                likedTweets.find(tweet => tweet._id === tweetid).likesCount += 1
            }

        },
        TWEET_LIKED_FAILED: (state, action) => {
            const {
                tweetid,
                from
            } = action.payload;

            const tweets = state.tweets;
            const likedTweets = state.likedTweets;
            if (from === 'tweets') {
                tweets.find(tweet => tweet._id === tweetid).isLiked = false
                tweets.find(tweet => tweet._id === tweetid).likesCount -= 1
            } else {
                likedTweets.find(tweet => tweet._id === tweetid).isLiked = false
                likedTweets.find(tweet => tweet._id === tweetid).likesCount -= 1
            }
        },
        TWEET_UNLIKED_SUCCESS: (state, action) => {
            const {
                tweetid,
                from
            } = action.payload;

            const tweets = state.tweets;
            const likedTweets = state.likedTweets;
            if (from === 'tweets') {
                tweets.find(tweet => tweet._id === tweetid).isLiked = false
                tweets.find(tweet => tweet._id === tweetid).likesCount -= 1
            } else {
                likedTweets.find(tweet => tweet._id === tweetid).isLiked = false
                likedTweets.find(tweet => tweet._id === tweetid).likesCount -= 1
            }
        },
        TWEET_UNLIKED_FAILED: (state, action) => {
            const {
                tweetid,
                from
            } = action.payload;

            const tweets = state.tweets;
            const likedTweets = state.likedTweets;
            if (from === 'tweets') {
                tweets.find(tweet => tweet._id === tweetid).isLiked = true
                tweets.find(tweet => tweet._id === tweetid).likesCount += 1
            } else {
                likedTweets.find(tweet => tweet._id === tweetid).isLiked = true
                likedTweets.find(tweet => tweet._id === tweetid).likesCount += 1
            }
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
        }

    },
})
export const {
    TWEETS_FETCHING_STARTED,
    TWEETS_FETCH_FAILED,
    TWEETS_FETCH_SUCCESS,
    TWEET_LIKED_FAILED,
    TWEET_LIKED_SUCCESS,
    TWEET_UNLIKED_FAILED,
    TWEET_UNLIKED_SUCCESS,
    LIKED_TWEETS_FETCHING_STARTED,
    LIKED_TWEETS_FETCH_FAILED,
    LIKED_TWEETS_FETCH_SUCCESS,
    MEDIA_TWEETS_FETCHING_STARTED,
    MEDIA_TWEETS_FETCH_FAILED,
    MEDIA_TWEETS_FETCH_SUCCESS,
    FETCHING_TWEET_FAIL,
    FETCHING_TWEET_STARTED,
    FETCHING_TWEET_SUCCESS
} = feedSlice.actions;
export default feedSlice.reducer;