import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    unfollowModel: {
        fetching: false,
        type:null,
        isUnfollowModelopen: false,
        userToUnfollow: null
    },
    composeTweet:{
        type:null,
        posting:false,
        tweet:null,
        retweet:null,
    }

}


export const modelSlice = createSlice({
    name: 'model',
    initialState,
    reducers: {
        SHOW_UNFOLLOW_MODEL: (state,action) => {
            state.unfollowModel.userToUnfollow = action.payload.user;
            state.unfollowModel.isUnfollowModelopen = true;
            state.unfollowModel.type = action.payload.type;
        },
        HIDE_UNFOLLOW_MODEL: (state) => {
            state.unfollowModel.isUnfollowModelopen = false;
        },
        SET_TWEET_TYPE:(state,action)=>{
            state.composeTweet.type =action.payload.type;
            state.composeTweet.tweet = action.payload.tweet;
            state.composeTweet.retweet = action.payload.retweet;
        }

    },
})


export const {
    SHOW_UNFOLLOW_MODEL,
    HIDE_UNFOLLOW_MODEL,
    SET_TWEET_TYPE
} = modelSlice.actions
export default modelSlice.reducer;