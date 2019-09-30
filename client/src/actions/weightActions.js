import axios from 'axios';
import { toast } from 'react-toastify';
import { store } from '../index';
import { 
    WEIGHT_CREATE,
    WEIGHT_ALL_USER,
    WEIGHT_FETCHING,
    WEIGHT_DONE_FETCHING,
    WEIGHT_UPDATE,
    WEIGHT_DELETE,
    WEIGHT_GUEST
    } from './types';
 

export const createWeightEntry = entry => async dispatch => {
    console.log(store.getState())
    axios.defaults.headers.common['Authorization'] =`Bearer ${store.getState().authorized.token}` 
    
    try {
        const res = await axios.post('/api/weight', entry)

        dispatch({
            type:WEIGHT_CREATE,
            payload: res.data 
        })
        toast.success("Entry Updated", {
            className: "green lighten-1"
        })

    } catch (err) {
        console.log(err)
    } 
}

export const updateWeightEntry = entry => async dispatch => {
    const { authorized } = store.getState();
    axios.defaults.headers.common['Authorization'] =`Bearer ${authorized.token}` 
    
    try {
        const res = await axios.patch(`/api/weight/${entry._id}`, entry)

        dispatch({
            type:WEIGHT_UPDATE,
            payload: res.data 
        })
        toast.success("Entry Updated", {
            className: "green lighten-1"
        })

    } catch (err) {
        console.log(err)
    } 
}

export const getAllUserWeight = () => async dispatch => {
    axios.defaults.headers.common['Authorization'] =`Bearer ${store.getState().authorized.token}`

    try {
        dispatch({ type:WEIGHT_FETCHING })
        const res = await axios.get('/api/weight/me')
        
        dispatch({
            type:WEIGHT_ALL_USER,
            payload: res.data
        })
        dispatch({ type:WEIGHT_DONE_FETCHING }) 

    } catch (err) {
        console.log(err)
    }
}

export const deleteUserWeight = (id) => async dispatch => {
    axios.defaults.headers.common['Authorization'] =`Bearer ${store.getState().authorized.token}`

    try{
        const res = await axios.delete(`/api/weight/${id}`)

        dispatch({
            type: WEIGHT_DELETE,
            payload:res.data
        })

    } catch (err) {
        console.log(err)
    }
}

export const getGuestWeight = () => async dispatch => {
    try{
        const res = await axios.get('/api/weight/guest')
        dispatch({ type:WEIGHT_FETCHING })
        dispatch({
            type: WEIGHT_GUEST,
            payload:res.data
        })
        dispatch({ type:WEIGHT_DONE_FETCHING }) 

    } catch (err) {
        console.log(err)
    }
}