import cogoToast from "cogo-toast";
import { fetchBookmarks } from "../../services/userServices";
import { FETCHING_BOOKMARKS_SUCCESS,FETCHING_BOOKMARKS_FAILED,FETCHING_BOOKMARKS_STARTED } from "./bookmarksSlice";


export const fetchUserBookmarks = (offset=0) => async (dispatch) => {
    try {
        dispatch(FETCHING_BOOKMARKS_STARTED())
        const bookmarks = await fetchBookmarks(offset);
        dispatch(FETCHING_BOOKMARKS_SUCCESS(bookmarks))
    } catch (error) {
        cogoToast.error(error.message)
        dispatch(FETCHING_BOOKMARKS_FAILED(error.message))
    }
}

