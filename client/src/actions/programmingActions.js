import axios from 'axios';
import { toast } from 'react-toastify';
import { store } from '../index';
import { 
    PROGRAMMING_CREATE,
    PROGRAMMING_ALL_USER,
    PROGRAMMING_FETCHING,
    PROGRAMMING_DONE_FETCHING,
    PROGRAMMING_UPDATE,
    PROGRAMMING_DELETE,
    PROGRAMMING_GUEST
    } from './types';
 

export const createProgrammingEntry = entry => async dispatch => {
    console.log(store.getState())
    axios.defaults.headers.common['Authorization'] =`Bearer ${store.getState().authorized.token}` 
    
    try {
        const res = await axios.post('/api/programming', entry)

        dispatch({
            type:PROGRAMMING_CREATE,
            payload: res.data 
        })
        toast.success("Entry Updated", {
            className: "green lighten-1"
        })

    } catch (err) {
        console.log(err)
    } 
}

export const updateProgrammingEntry = entry => async dispatch => {
    const { authorized } = store.getState();
    axios.defaults.headers.common['Authorization'] =`Bearer ${authorized.token}` 
    
    try {
        const res = await axios.patch(`/api/programming/${entry._id}`, entry)

        dispatch({
            type:PROGRAMMING_UPDATE,
            payload: res.data 
        })
        toast.success("Entry Updated", {
            className: "green lighten-1"
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

export const deleteUserProgramming = (id) => async dispatch => {
    axios.defaults.headers.common['Authorization'] =`Bearer ${store.getState().authorized.token}`

    try{
        const res = await axios.delete(`/api/programming/${id}`)

        dispatch({
            type: PROGRAMMING_DELETE,
            payload:res.data
        })

    } catch (err) {
        console.log(err)
    }
}

export const getGuestProgramming = () => async dispatch => {

    try{
        const res = await axios.get(`/api/programming/guest`)
        dispatch({ type:PROGRAMMING_FETCHING })
        dispatch({
            type: PROGRAMMING_GUEST,
            payload:res.data
        })
        dispatch({ type:PROGRAMMING_DONE_FETCHING }) 

    } catch (err) {
        console.log(err)
    }
}


