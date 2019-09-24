import axios from 'axios';
import { store } from '../index';
import { 
    PROGRAMMING_CREATE,
    PROGRAMMING_ALL_USER,
    PROGRAMMING_FETCHING,
    PROGRAMMING_DONE_FETCHING
    } from './types';
 

export const createProgrammingEntry = entry => async dispatch => {
    console.log(store.getState())
    axios.defaults.headers.common['Authorization'] =`Bearer ${store.getState().authorized.token}` 
    
    try {
        const res = await axios.post('/api/programming', entry)

        debugger;
        dispatch({
            type:PROGRAMMING_CREATE,
            payload: res.data 
        })

    } catch (err) {
        console.log(err)
    } 
}

export const getAllUserProgramming = () => async dispatch => {
    axios.defaults.headers.common['Authorization'] =`Bearer ${store.getState().authorized.token}`

    try {
        dispatch({ type:PROGRAMMING_FETCHING })
        const res = await axios.get('/api/programming/me')
        
        dispatch({
            type:PROGRAMMING_ALL_USER,
            payload: res.data
        })
        dispatch({ type:PROGRAMMING_DONE_FETCHING }) 

    } catch (err) {
        console.log(err)
    }
}


