import { combineReducers } from 'redux'
import authReducer from './authReducer'
import programmingReducer from './programmingReducer'

export default combineReducers({
   authorized: authReducer,
   programming: programmingReducer
})