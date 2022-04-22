import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    users:[],
    fetching:true,
    fetchingError:null,

}


export const suggestedUsersSlice = createSlice({
    name: 'suggestedUsers',
    initialState,
    reducers: {
        FETCHING_USERS_SUCCESS: (state,action) => {
            state.users = action.payload;
            state.fetching = false;
        },
        FETCHING_USERS_FAIL: (state,action) => {
            state.users = null;
            state.fetching = false;
            state.fetchingError = action.payload;
        },
        FETCHING_USERS_STARTED: (state) => {
            state.fetching = true;
        },

    },
})


export const {
    FETCHING_USERS_FAIL,
    FETCHING_USERS_STARTED,
    FETCHING_USERS_SUCCESS
} = suggestedUsersSlice.actions
export default suggestedUsersSlice.reducer;