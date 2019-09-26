import axios from 'axios';
import { toast } from 'react-toastify';
import { store } from '../index';
import { 
    EXERCISE_CREATE,
    EXERCISE_ALL_USER,
    EXERCISE_FETCHING,
    EXERCISE_DONE_FETCHING,
    EXERCISE_UPDATE,
    EXERCISE_DELETE,
    EXERCISE_GUEST
    } from './types';


export const createExerciseEntry = entry => async dispatch => {
    axios.defaults.headers.common['Authorization'] =`Bearer ${store.getState().authorized.token}` 
    
    try {
        const res = await axios.post('/api/exercise', entry)

        debugger;
        dispatch({
            type:EXERCISE_CREATE,
            payload: res.data 
        })
        toast.success("Entry Updated", {
            className: "green lighten-1"
        })

    } catch (err) {
        console.log(err)
    } 
}

export const updateExerciseEntry = entry => async dispatch => {
    debugger;
    const { authorized } = store.getState();
    axios.defaults.headers.common['Authorization'] =`Bearer ${authorized.token}` 
    
    try {
        const res = await axios.patch(`/api/exercise/${entry._id}`, entry)

        debugger;
        dispatch({
            type:EXERCISE_UPDATE,
            payload: res.data 
        })
        toast.success("Entry Updated", {
            className: "green lighten-1"
        })

    } catch (err) {
        console.log(err)
    } 
}

export const getAllUserExercise = () => async dispatch => {
    axios.defaults.headers.common['Authorization'] =`Bearer ${store.getState().authorized.token}`

    try {
        dispatch({ type:EXERCISE_FETCHING })
        const res = await axios.get('/api/exercise/me')
        
        dispatch({
            type:EXERCISE_ALL_USER,
            payload: res.data
        })
        dispatch({ type:EXERCISE_DONE_FETCHING }) 

    } catch (err) {
        console.log(err)
    }
}

export const deleteUserExercise = (id) => async dispatch => {
    axios.defaults.headers.common['Authorization'] =`Bearer ${store.getState().authorized.token}`

    try{
        const res = await axios.delete(`/api/exercise/${id}`)

        dispatch({
            type: EXERCISE_DELETE,
            payload:res.data
        })

    } catch (err) {
        console.log(err)
    }
}

export const getGuestExercise = () => async dispatch => {

    try{
        const res = await axios.get(`/api/exercise/guest`)
        dispatch({ type:EXERCISE_FETCHING })
        dispatch({
            type: EXERCISE_GUEST,
            payload:res.data
        })
        dispatch({ type:EXERCISE_DONE_FETCHING }) 

    } catch (err) {
        console.log(err)
    }
}