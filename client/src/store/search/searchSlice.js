import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    fetching:true,
    fetchingTweetError:null,
    tweets:[],
}


export const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
        FETCHING_TWEETS_SUCCESS: (state,action) => {
            state.tweets = action.payload
            state.fetching = false;
        },
        FETCHING_TWEETS_FAILED: (state,action) => {
            state.fetchingTweetError = action.payload
            state.fetching = false;
        },
        FETCHING_TWEETS_STARTED:(state)=>{
            state.fetching = true;
        },

    },
})


export const {
    FETCHING_TWEETS_FAILED,
    FETCHING_TWEETS_STARTED,
    FETCHING_TWEETS_SUCCESS
} = searchSlice.actions;
export {initialState};
export default searchSlice.reducer;