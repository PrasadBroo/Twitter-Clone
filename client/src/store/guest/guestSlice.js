import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    fetching: true,
    guestUser: null,
    fetchingError:null,
    followers:{users:[],count:0},
    followings:{users:[],count:0},
    hasMoreFollowers:true,
    hasMoreFollowings:true,
    fetchingFollowers:true,
    fetchingFollowings:true,
    fetchingFollowingsError:null,
    fetchingFollowersError:null,

}


export const guestSlice = createSlice({
    name: 'guest',
    initialState,
    reducers: {
        FETCHING_STARTED:(state)=>{
            state.fetching  = true;
        },
        FETCHING_FINISHED:(state)=>{
            state.fetching  = false;
        },
        FETCHING_GUEST_SUCCESS:(state,action)=>{
            state.guestUser = action.payload;
            state.fetching = false;
            state.fetchingError = null;
        },
        FETCHING_GUEST_FAIL:(state,action)=>{
            state.fetchingError = action.payload;
            state.fetching = false;
        },
        FETCHING_FOLLOWERS_START:(state)=>{
            state.fetchingFollowers = true;
        },
        FETCHING_FOLLOWINGS_START:(state)=>{
            state.fetchingFollowings = true;
        },
        FETCHING_FOLLOWERS_SUCCESS:(state,action)=>{
            if(action.payload.users.length < 20){
                state.hasMoreFollowers = false;
            }
            state.followers.users = state.followers.users.concat(action.payload.users);
            state.followers.count = action.payload.count
            state.fetchingFollowers = false;
        },
        FETCHING_FOLLOWINGS_SUCCESS:(state,action)=>{
            if(action.payload.users.length < 20){
                state.hasMoreFollowings = false;
            }
            state.followings.users = state.followings.users.concat(action.payload.users);
            state.followings.count = action.payload.count
            state.fetchingFollowings = false;
        },
        FETCHING_FOLLOWERS_FAIL:(state,action)=>{
            state.fetchingFollowersError = action.payload;
            state.fetchingFollowers = false;
        },
        FETCHING_FOLLOWINGS_FAIL:(state,action)=>{
            state.fetchingFollowingsError = action.payload;
            state.fetchingFollowings = false;
        },
        UNFOLLOWED_FROM_FOLLOWERS:(state,action)=>{
            const userid = action.payload
            state.followers.users.find(user => user._id === userid).isFollowing = false;
        },
        FOLLOWED_FROM_FOLLOWERS:(state,action)=>{
            const userid = action.payload
            state.followers.users.find(user => user._id === userid).isFollowing = true;
        },
        UNFOLLOWED_FROM_FOLLOWINGS:(state,action)=>{
            const userid = action.payload
            state.followings.users.find(user => user._id === userid).isFollowing = false;
        },
        FOLLOWED_FROM_FOLLOWINGS:(state,action)=>{
            const userid = action.payload
            state.followings.users.find(user => user._id === userid).isFollowing = true;
        },
        UNFOLLOWED_FROM_PROFILE:(state)=>{
            state.guestUser.isFollowing = false;
        },
        FOLLOWED_FROM_PROFILE:(state)=>{
            state.guestUser.isFollowing = true;
        },
        CLEAR_GUEST_USER:(state)=>{
            state.fetching = true;
            // misleading action name :(
        },
        CLEAR_FOLLOWERS:(state)=>{
            state.followers.users = [];
            state.followers.count = 0;
            state.hasMoreFollowers = true;
            // misleading action name :(
        },
        CLEAR_FOLLOWINGS:(state)=>{
            state.followings.users = [];
            state.followings.count = 0;
            state.hasMoreFollowings = true;
            // misleading action name :(
        },


    },
})


export const {
    FETCHING_GUEST_SUCCESS,
    FETCHING_GUEST_FAIL,
    FETCHING_FINISHED,
    FETCHING_STARTED,
    FETCHING_FOLLOWERS_FAIL,
    FETCHING_FOLLOWERS_SUCCESS,
    FETCHING_FOLLOWERS_START,
    FETCHING_FOLLOWINGS_FAIL,
    FETCHING_FOLLOWINGS_START,
    FETCHING_FOLLOWINGS_SUCCESS,
    UNFOLLOWED_FROM_FOLLOWERS,
    FOLLOWED_FROM_FOLLOWERS,
    FOLLOWED_FROM_FOLLOWINGS,
    UNFOLLOWED_FROM_FOLLOWINGS,
    FOLLOWED_FROM_PROFILE,
    UNFOLLOWED_FROM_PROFILE,
    TWEETS_FETCHING_STARTED,
    TWEETS_FETCH_FAILED,
    TWEETS_FETCH_SUCCESS,
    TWEET_LIKED_FAILED,
    TWEET_LIKED_SUCCESS,
    TWEET_UNLIKED_FAILED,
    TWEET_UNLIKED_SUCCESS,
    CLEAR_GUEST_USER,
    CLEAR_FOLLOWERS,
    CLEAR_FOLLOWINGS
} = guestSlice.actions
export default guestSlice.reducer;