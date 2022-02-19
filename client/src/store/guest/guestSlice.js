import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    fetching: true,
    guestUser: null,
    fetchingError:null,
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
        }

    },
})


export const {
    FETCHING_GUEST_SUCCESS,
    FETCHING_GUEST_FAIL,
    FETCHING_FINISHED,
    FETCHING_STARTED,
} = guestSlice.actions
export default guestSlice.reducer;