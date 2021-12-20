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
        SIGN_IN_SUCCESS: (state, action) => {
            state.currentUser = action.payload.user;
            state.token = action.payload.token
        },
        SIGN_IN_FAIL: (state, action) => {
            state.signInFail = action.payload
        },
        SIGN_UP_SUCCESS: (state, action) => {
            state.currentUser = action.payload.user;
            state.token = action.payload.token
        },
        SIGN_UP_FAIL: (state, action) => {
            state.signUpFail = action.payload;

        }

    },
})


export const {
    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL,
    SIGN_UP_FAIL,
    SIGN_UP_SUCCESS,
    FETCHING_FINISHED,
    FETCHING_STARTED,
} = userSlice.actions
export default userSlice.reducer;