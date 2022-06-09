import {
    combineReducers
} from 'redux'
import userReducer from './user/userSlice'
import guestReducer from './guest/guestSlice'
import modelReducer from './model/modelSlice'
import feedReducer from './feed/feedSlice'
import bookmarksReducer from './bookmarks/bookmarksSlice'
import notificationReducer from './notification/notificationsSlice';
import suggUsersReducer  from './suggestedUsers/suggestedUsersSlice'
import navigationReducer from './navigation/navigationSlice';

export default combineReducers({
    user: userReducer,
    guestUser: guestReducer,
    model: modelReducer,
    feed: feedReducer,
    bookmarks:bookmarksReducer,
    suggestedUsers:suggUsersReducer,
    notifications:notificationReducer,
    navigation:navigationReducer,
})