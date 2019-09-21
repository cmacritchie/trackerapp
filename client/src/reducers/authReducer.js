import Cookies from 'universal-cookie';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    FETCH_USER
    // ACCOUNT_DELETED
  } from '../actions/types';
  
const cookies = new Cookies();

const initialState = {
    token: cookies.get('token'),   
    isAuthenticated: false, //change to null and refactor later
    loading: true,
    user: null
}

const noUser = {
    isAuthenticated: false,
    loading: false,
    user: null
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    

    switch (type) {
        case FETCH_USER:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            } || noUser;
        case LOGIN_SUCCESS:
            
            cookies.set('token', payload.token);
            
            return {
            ...state,
            ...payload,
            isAuthenticated: true,
            loading: false
            };
        case LOGOUT:
            cookies.remove('token');
            
            return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false
            };
        default:
            return state
    }
}