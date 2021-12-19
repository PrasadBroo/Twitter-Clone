import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    signInStart: false,
    signInFail: false,
    signUpFail: false,
    signUPStart: false,
    fetching: false,
    currentUser: null,
    token: localStorage.getItem('token')
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
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
} = userSlice.actions
export default userSlice.reducer;