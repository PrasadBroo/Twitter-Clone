import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    signInStart: false,
    signInFail: false,
    signUpFail: false,
    signUPStart: false,
    fetching: true,
    currentUser: null,
    token: localStorage.getItem('token')
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        FETCHING_STARTED:(state)=>{
            state.fetching  = true;
        },
        FETCHING_FINISHED:(state)=>{
            state.fetching  = false;
        },
        SIGN_IN_START: (state) => {
            state.signInStart = true
        },
        SIGN_UP_START: (state) => {
            state.signUPStart = true
        },
        SIGN_IN_SUCCESS: (state, action) => {
            state.currentUser = action.payload.user;
            state.token = action.payload.token
            state.signInStart = false
        },
        SIGN_IN_FAIL: (state, action) => {
            state.signInFail = action.payload
            state.signInStart = false
        },
        SIGN_UP_SUCCESS: (state, action) => {
            state.currentUser = action.payload.user;
            state.token = action.payload.token
            state.signUPStart = false
        },
        SIGN_UP_FAIL: (state, action) => {
            state.signUpFail = action.payload;
            state.signUPStart = false

        }

    },
})


export const {
    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL,
    SIGN_IN_START,
    SIGN_UP_START,
    SIGN_UP_FAIL,
    SIGN_UP_SUCCESS,
    FETCHING_FINISHED,
    FETCHING_STARTED,
} = userSlice.actions
export default userSlice.reducer;