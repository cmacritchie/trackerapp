import axios from 'axios';
import { toast } from 'react-toastify';
import { store } from '../index';
import { 
    SLEEP_CREATE,
    SLEEP_ALL_USER,
    SLEEP_FETCHING,
    SLEEP_DONE_FETCHING,
    SLEEP_UPDATE,
    SLEEP_DELETE,
    SLEEP_GUEST
    } from './types';
 

export const createSleepEntry = entry => async dispatch => {
    console.log(store.getState())
    axios.defaults.headers.common['Authorization'] =`Bearer ${store.getState().authorized.token}` 
    
    try {
        const res = await axios.post('/api/sleep', entry)

        debugger;
        dispatch({
            type:SLEEP_CREATE,
            payload: res.data 
        })
        toast.success("Entry Updated", {
            className: "green lighten-1"
        })

    } catch (err) {
        console.log(err)
    } 
}

export const updateSleepEntry = entry => async dispatch => {
    debugger;
    const { authorized } = store.getState();
    axios.defaults.headers.common['Authorization'] =`Bearer ${authorized.token}` 
    
    try {
        const res = await axios.patch(`/api/sleep/${entry._id}`, entry)

        debugger;
        dispatch({
            type:SLEEP_UPDATE,
            payload: res.data 
        })
        toast.success("Entry Updated", {
            className: "green lighten-1"
        })

    } catch (err) {
        console.log(err)
    } 
}

export const getAllUserSleep = () => async dispatch => {
    axios.defaults.headers.common['Authorization'] =`Bearer ${store.getState().authorized.token}`

    try {
        dispatch({ type:SLEEP_FETCHING })
        const res = await axios.get('/api/sleep/me')
        
        dispatch({
            type:SLEEP_ALL_USER,
            payload: res.data
        })
        dispatch({ type:SLEEP_DONE_FETCHING }) 

    } catch (err) {
        console.log(err)
    }
}

export const deleteUserSleep = (id) => async dispatch => {
    axios.defaults.headers.common['Authorization'] =`Bearer ${store.getState().authorized.token}`

    try{
        const res = await axios.delete(`/api/programming/${id}`)

        dispatch({
            type: SLEEP_DELETE,
            payload:res.data
        })

    } catch (err) {
        console.log(err)
    }
}

export const getGuestSleep = () => async dispatch => {
    debugger;
    try{
        const res = await axios.get(`/api/sleep/guest`)
        debugger;
        dispatch({ type:SLEEP_FETCHING })
        dispatch({
            type: SLEEP_GUEST,
            payload:res.data
        })
        dispatch({ type:SLEEP_DONE_FETCHING }) 

    } catch (err) {
        console.log(err)
    }
}