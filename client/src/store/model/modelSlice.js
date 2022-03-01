import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    unfollowModel: {
        fetching: false,
        isUnfollowModelopen: false,
        userToUnfollow: null
    }

}


export const modelSlice = createSlice({
    name: 'model',
    initialState,
    reducers: {
        SHOW_UNFOLLOW_MODEL: (state,action) => {
            state.unfollowModel.userToUnfollow = action.payload;
            state.unfollowModel.isUnfollowModelopen = true;
        },
        HIDE_UNFOLLOW_MODEL: (state) => {
            state.unfollowModel.isUnfollowModelopen = false;
        }

    },
})


export const {
    SHOW_UNFOLLOW_MODEL,
    HIDE_UNFOLLOW_MODEL

} = modelSlice.actions
export default modelSlice.reducer;