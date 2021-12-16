import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    signInStart: false,
    signInFail: false,
    fetching:false,
    user: null,
    token:localStorage.getItem('token')
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        SIGN_IN_SUCCESS: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token
        },
        SIGN_IN_FAIL: (state, action) => {
            state.signInFail = action.payload
        },

    },
})


export const {
    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL
} = userSlice.actions
export default userSlice.reducer;