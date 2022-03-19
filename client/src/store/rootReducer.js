import {
    combineReducers
} from 'redux'
import userReducer from './user/userSlice'
import guestReducer from './guest/guestSlice'
import modelReducer from './model/modelSlice'
import feedReducer from './feed/feedSlice'

export default combineReducers({
    user: userReducer,
    guestUser: guestReducer,
    model: modelReducer,
    feed: feedReducer
})