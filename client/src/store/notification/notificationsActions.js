import {
    getNotifications,
    getMentionsNotifications
} from "../../services/userServices"
import {
    FETCHING_NOTIFICATIONS_FAILED,
    FETCHING_NOTIFICATIONS_STARTED,
    FETCHING_NOTIFICATIONS_SUCCESS,
    FETCHING_MENTIONS_NOTIFICATIONS_FAILED,
    FETCHING_MENTIONS_NOTIFICATIONS_STARTED,
    FETCHING_MENTIONS_NOTIFICATIONS_SUCCESS
} from "./notificationsSlice"


export const fetchNotifications = (offset=0) => async (dispatch) => {
    try {
        dispatch(FETCHING_NOTIFICATIONS_STARTED())
        const notifications = await getNotifications(offset);
        dispatch(FETCHING_NOTIFICATIONS_SUCCESS(notifications))
    } catch (error) {
        dispatch(FETCHING_NOTIFICATIONS_FAILED(error.message))
    }
}

export const fetchMentionsNotifications = (offset=0) => async (dispatch) => {
    try {
        dispatch(FETCHING_MENTIONS_NOTIFICATIONS_STARTED())
        const notifications = await getMentionsNotifications(offset);
        dispatch(FETCHING_MENTIONS_NOTIFICATIONS_SUCCESS(notifications))
    } catch (error) {
        dispatch(FETCHING_MENTIONS_NOTIFICATIONS_FAILED(error.message))
    }
}