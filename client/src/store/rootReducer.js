import { combineReducers } from 'redux'
import userReducer from './user/userSlice'
import guestReducer from './guest/guestSlice'

export default combineReducers({user:userReducer,guestUser:guestReducer})
