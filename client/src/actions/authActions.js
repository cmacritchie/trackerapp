import axios from 'axios';
import { history } from '../components/App'

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    PROGRAMMING_INITIAL_STATE
    // CLEAR_PROFILE
  } from './types';

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
  
      console.log(res.data);

    debugger;

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
  
    //   dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
  
    //   if (errors) {
    //     errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    //   }
  
    //   dispatch({
    //     type: LOGIN_FAIL
    //   });
    }
  };

  export const logout = (token) => async dispatch => {
    debugger;
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
      history.push('/',[])
      
  
  
    } catch (err) {
      console.log(err)
      const errors = err.response.data.errors;
      debugger
    //   if (errors) {
    //     errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    //   }
  
    //   dispatch({
    //     type: LOGIN_FAIL
    //   });
    }

  };