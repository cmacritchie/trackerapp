import axios from 'axios';
import { history } from '../components/App'
import Cookies from 'universal-cookie';

import {
    FETCH_USER,
    FETCH_GUEST, 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    PROGRAMMING_INITIAL_STATE,
    EXERCISE_INITIAL_STATE,
    SLEEP_INITIAL_STATE,
    WEIGHT_INITIAL_STATE
    // CLEAR_PROFILE
  } from './types';

  export const fetchUser = () => async dispatch => {
    const cookies = new Cookies();
    const token = cookies.get('token')
    if(token){
        const res = await axios.get('/api/users/me', { headers: { Authorization: `Bearer ${token}` } })
        dispatch({
            type: FETCH_USER, 
            payload:res.data
        });
    } else {
        const resAlt = await axios.get('/api/users/guest')
        dispatch({
            type: FETCH_GUEST,
            payload:resAlt.data
        })
    }
}


//Login User
export const login = (credentials) => async dispatch => {
    
    const { email, password } = credentials
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    const body = JSON.stringify(credentials);
  
    try {
      const res = await axios.post('/api/users/login', body, config);


      dispatch({ type: PROGRAMMING_INITIAL_STATE})
      dispatch({ type: EXERCISE_INITIAL_STATE})
      dispatch({ type: SLEEP_INITIAL_STATE})
      dispatch({ type: WEIGHT_INITIAL_STATE})
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
  
    } catch (err) {
      const errors = err.response.data.errors;
  
    //Login Fail Add
    }
  };

  export const logout = (token) => async dispatch => {

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`
      }
    };
    
    try {

      const res = await axios.post('/api/users/logout', null, config);

      console.log(res)
      dispatch({ type: LOGOUT });
      dispatch({ type: PROGRAMMING_INITIAL_STATE})
      dispatch({ type: EXERCISE_INITIAL_STATE})
      dispatch({ type: SLEEP_INITIAL_STATE})
      dispatch({ type: WEIGHT_INITIAL_STATE})

      //Navigate?
      history.push('/')
    
    } catch (err) {
      console.log(err)
      const errors = err.response.data.errors;
    }

  };

  export const register = (credentials) => async dispatch => {
    try {
      const res = await axios.post('/api/users', credentials);
      // dispatch({ type: PROGRAMMING_INITIAL_STATE})
      //reset all reducers?
      dispatch({
        type:REGISTER_SUCCESS,
        payload:res.data
      })

    } catch (err) {
      console.log(err)
      dispatch({type:REGISTER_FAIL})
    }
  }