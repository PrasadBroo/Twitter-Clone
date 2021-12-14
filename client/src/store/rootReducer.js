import { combineReducers } from 'redux'
import userReducer from './user/user_actions'


export default combineReducers({user:userReducer})
