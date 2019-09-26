import { combineReducers } from 'redux'
import authReducer from './authReducer'
import programmingReducer from './programmingReducer'
import exerciseReducer from './exerciseReducer'
import sleepReducer from './sleepReducer'
import weightReducer from './weightReducer'

export default combineReducers({
   authorized: authReducer,
   programming: programmingReducer,
   exercise: exerciseReducer,
   sleep: sleepReducer,
   weight: weightReducer
})