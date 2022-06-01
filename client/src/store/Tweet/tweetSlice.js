import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    fetching:true,
    tweet:null,
    fetchingTweetError:null,

}


export const tweetSlice = createSlice({
    name: 'tweet',
    initialState,
    reducers: {
        FETCHING_TWEET_SUCCESS: (state,action) => {
            state.tweet = action.payload
            state.fetching = false;
        },
        FETCHING_TWEET_FAILED: (state,action) => {
            state.fetchingTweetError = action.payload
            state.fetching = false;
        },
        FETCHING_TWEET_STARTED:(state)=>{
            state.fetching = true;
        },
        TWEET_LIKED_SUCCESS:(state)=>{
            state.tweet.isLiked = true;
            state.tweet.likesCount+=1;
        },
        TWEET_LIKED_FAILED:(state)=>{
            state.tweet.isLiked = false;
            state.tweet.likesCount-=1;
        },
        TWEET_UNLIKED_SUCCESS:(state)=>{
            state.tweet.isLiked = false;
            state.tweet.likesCount-=1;
        },
        TWEET_UNLIKED_FAILED:(state)=>{
            state.tweet.isLiked = true;
            state.tweet.likesCount+=1;
        },
        TWEET_RETWEETED_SUCCESS:(state)=>{
            state.tweet.isRetweeted = true
            state.tweet.retweetCount+=1;
        },
        TWEET_RETWEETED_FAILED:(state)=>{
            state.tweet.isRetweeted = false;
            state.tweet.retweetCount-=1;
        },
        TWEET_USER_FOLLOW_SUCCESS:(state)=>{
            state.tweet.isFollowing = true;
        },
        TWEET_USER_UNFOLLOW_SUCCESS:(state)=>{
            state.tweet.isFollowing = false;
        },
        TWEET_USER_FOLLOW_FAILED:(state)=>{
            state.tweet.isFollowing = false;
        },
        TWEET_USER_UNFOLLOW_FAILED:(state)=>{
            state.tweet.isFollowing = true;
        },
        TWEET_BOOKMARK_FAILED:(state)=>{
            state.tweet.isBookmarked = false;
        },
        TWEET_BOOKMARK_SUCCESS:(state)=>{
            state.tweet.isBookmarked = true;
        },
        TWEET_REMOVEBOOKMARK_FAILED:(state)=>{
            state.tweet.isBookmarked = true;
        },
        TWEET_REMOVEBOOKMARK_SUCCESS:(state)=>{
            state.tweet.isBookmarked = false;
        },

    },
})


export const {
    FETCHING_TWEET_FAIL,
    FETCHING_TWEET_STARTED,
    FETCHING_TWEET_SUCCESS,
    TWEET_LIKED_FAILED,
    TWEET_LIKED_SUCCESS,
    TWEET_RETWEETED_FAILED,
    TWEET_RETWEETED_SUCCESS,
    TWEET_UNLIKED_FAILED,
    TWEET_UNLIKED_SUCCESS,
    TWEET_USER_FOLLOW_FAILED,
    TWEET_USER_FOLLOW_SUCCESS,
    TWEET_USER_UNFOLLOW_FAILED,
    TWEET_USER_UNFOLLOW_SUCCESS,
    TWEET_BOOKMARK_FAILED,
    TWEET_BOOKMARK_SUCCESS,
    TWEET_REMOVEBOOKMARK_FAILED,
    TWEET_REMOVEBOOKMARK_SUCCESS
} = tweetSlice.actions;
export {initialState};
export default tweetSlice.reducer;