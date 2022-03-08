import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    unfollowModel: {
        fetching: false,
        type:null,
        isUnfollowModelopen: false,
        userToUnfollow: null
    }

}


export const modelSlice = createSlice({
    name: 'model',
    initialState,
    reducers: {
        SHOW_UNFOLLOW_MODEL: (state,action) => {
            state.unfollowModel.userToUnfollow = action.payload.user;
            state.unfollowModel.isUnfollowModelopen = true;
            state.unfollowModel.type = action.payload.type;
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