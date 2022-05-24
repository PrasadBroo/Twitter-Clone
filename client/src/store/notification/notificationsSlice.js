import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    fetching:true,
    fetchingMentionNotifications:true,
    notifications:[],
    mentionsNotifications:[],
    fetchingError:null,
    mentionsFetchError:null
}


export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        FETCHING_NOTIFICATIONS_SUCCESS: (state,action) => {
            state.notifications = action.payload
            state.fetching = false;
        },
        FETCHING_NOTIFICATIONS_FAILED: (state,action) => {
            state.fetchingError = action.payload
            state.fetching = false;
        },
        FETCHING_NOTIFICATIONS_STARTED:(state)=>{
            state.fetching = true;
        },
        FETCHING_MENTIONS_NOTIFICATIONS_SUCCESS: (state,action) => {
            state.mentionsNotifications = action.payload
            state.fetchingMentionNotifications = false;
        },
        FETCHING_MENTIONS_NOTIFICATIONS_FAILED: (state,action) => {
            state.mentionsFetchError = action.payload
            state.fetchingMentionNotifications = false;
        },
        FETCHING_MENTIONS_NOTIFICATIONS_STARTED:(state)=>{
            state.fetchingMentionNotifications = true;
        }

    },
})


export const {
    FETCHING_NOTIFICATIONS_FAILED,
    FETCHING_NOTIFICATIONS_STARTED,
    FETCHING_NOTIFICATIONS_SUCCESS,
    FETCHING_MENTIONS_NOTIFICATIONS_FAILED,
    FETCHING_MENTIONS_NOTIFICATIONS_STARTED,
    FETCHING_MENTIONS_NOTIFICATIONS_SUCCESS
} = notificationSlice.actions;
export default notificationSlice.reducer;
