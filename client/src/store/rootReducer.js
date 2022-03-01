import { combineReducers } from 'redux'
import userReducer from './user/userSlice'
import guestReducer from './guest/guestSlice'
import modelReducer from './model/modelSlice'

export default combineReducers({user:userReducer,guestUser:guestReducer,model:modelReducer})
