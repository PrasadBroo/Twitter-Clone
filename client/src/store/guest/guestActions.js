import {
    fetchUserProfile
} from "../../services/userServices"
import {
    FETCHING_GUEST_SUCCESS,
    FETCHING_GUEST_FAIL,
    FETCHING_STARTED,
    FETCHING_FINISHED
} from "./guestSlice"




export const fetchUser = (username) => async (dispatch) => {
    try {
        dispatch(FETCHING_STARTED())
        const guestUser = await fetchUserProfile(username);
        dispatch(FETCHING_GUEST_SUCCESS(guestUser))
    } catch (error) {
        dispatch(FETCHING_GUEST_FAIL(error.message))
        dispatch(FETCHING_FINISHED())
    }
}