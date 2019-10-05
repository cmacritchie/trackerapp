import Cookies from 'universal-cookie';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    FETCH_USER,
    FETCH_GUEST
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
    user: null,
    token: null
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
        case FETCH_GUEST:
                return {
                    ...state,
                    isAuthenticated: false,
                    loading: false,
                    user: payload
                } || noUser;
        case REGISTER_SUCCESS:
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