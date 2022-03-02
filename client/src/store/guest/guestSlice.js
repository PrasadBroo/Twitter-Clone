import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    fetching: true,
    guestUser: null,
    fetchingError:null,
    followers:[],
    followings:[],
    fetchingFollowers:null,
    fetchingFollowings:null,
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
            state.followers = action.payload;
            state.fetchingFollowers = false;
        },
        FETCHING_FOLLOWINGS_SUCCESS:(state,action)=>{
            state.followings = action.payload;
            state.fetchingFollowings = false;
        },
        FETCHING_FOLLOWERS_FAIL:(state,action)=>{
            state.fetchingFollowersError = action.payload;
            state.fetchingFollowers = false;
        },
        FETCHING_FOLLOWINGS_FAIL:(state,action)=>{
            state.fetchingFollowingsError = action.payload;
            state.fetchingFollowings = false;
        }

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
    
} = guestSlice.actions
export default guestSlice.reducer;