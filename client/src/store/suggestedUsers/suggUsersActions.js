import cogoToast from "cogo-toast";
import {
    fetchSuggstedUsers
} from "../../services/userServices";
import {
    FETCHING_USERS_STARTED,
    FETCHING_USERS_FAIL,
    FETCHING_USERS_SUCCESS
} from "./suggestedUsersSlice"





export const fetchSuggUsers = () => async (dispatch) => {
    try {
        dispatch(FETCHING_USERS_STARTED())
        const users = await fetchSuggstedUsers();
        dispatch(FETCHING_USERS_SUCCESS(users))
    } catch (error) {
        cogoToast.error(error.message)
        dispatch(FETCHING_USERS_FAIL(error.message))
    }
}