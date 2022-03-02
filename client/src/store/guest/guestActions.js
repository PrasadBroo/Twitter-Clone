import {
    fetchUserProfile, getUserFollowers,getUserFollowings
} from "../../services/userServices"
import {
    FETCHING_GUEST_SUCCESS,
    FETCHING_GUEST_FAIL,
    FETCHING_STARTED,
    FETCHING_FINISHED,
    FETCHING_FOLLOWERS_FAIL,
    FETCHING_FOLLOWERS_SUCCESS,
    FETCHING_FOLLOWERS_START,
    FETCHING_FOLLOWINGS_FAIL,
    FETCHING_FOLLOWINGS_START,
    FETCHING_FOLLOWINGS_SUCCESS,
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

export const getFollowers = (userid) => async (dispatch) => {
    try {
        dispatch(FETCHING_FOLLOWERS_START())
        const followers = await getUserFollowers(userid);
        console.log(followers)
        dispatch(FETCHING_FOLLOWERS_SUCCESS(followers))
    } catch (error) {
        console.log(error)
        dispatch(FETCHING_FOLLOWERS_FAIL(error.message))
    }
}
export const getFollowings = (userid) => async (dispatch) => {
    try {
        dispatch(FETCHING_FOLLOWINGS_START())
        const followings = await getUserFollowings(userid);
        console.log(followings)
        dispatch(FETCHING_FOLLOWINGS_SUCCESS(followings))
    } catch (error) {
        console.log(error)
        dispatch(FETCHING_FOLLOWINGS_FAIL(error.message))
    }
}