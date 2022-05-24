import {
    combineReducers
} from 'redux'
import userReducer from './user/userSlice'
import guestReducer from './guest/guestSlice'
import modelReducer from './model/modelSlice'
import feedReducer from './feed/feedSlice'
import notificationReducer from './notification/notificationsSlice';
import suggUsersReducer  from './suggestedUsers/suggestedUsersSlice'
export default combineReducers({
    user: userReducer,
    guestUser: guestReducer,
    model: modelReducer,
    feed: feedReducer,
    suggestedUsers:suggUsersReducer,
    notifications:notificationReducer,
})