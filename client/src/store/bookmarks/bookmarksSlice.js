import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    fetching:true,
    bookmarks:[],
    fetchingError:null,
    hasMore:true,
}


export const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        FETCHING_BOOKMARKS_SUCCESS: (state,action) => {
            if(action.payload.length < 10){
                state.hasMore = false;
            }
            state.bookmarks = state.bookmarks.concat(action.payload)
            state.fetching = false;
        },
        FETCHING_BOOKMARKS_FAILED: (state,action) => {
            state.fetchingError = action.payload
            state.fetching = false;
        },
        FETCHING_BOOKMARKS_STARTED:(state)=>{
            state.fetching = true;
        },
        CLEAR_BOOKMARKS:(state)=>{
            state.bookmarks = []
            state.hasMore = true;
        }

    },
})


export const {
    FETCHING_BOOKMARKS_FAILED,
    FETCHING_BOOKMARKS_STARTED,
    FETCHING_BOOKMARKS_SUCCESS,
    CLEAR_BOOKMARKS
} = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
