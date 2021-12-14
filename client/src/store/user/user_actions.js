import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    is_sign_fail: null,
    name: null,
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        SIGN_IN_SUCCESS: (state, action) => {
            state = action.payload;
        },
        SIGN_IN_FAIL: (state, action) => {
            state.is_sign_fail = action.payload
        },

    },
})


export const {
    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL
} = userSlice.actions
export default userSlice.reducer;