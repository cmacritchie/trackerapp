import axios from 'axios';
import { FETCH_USER } from './types';
import Cookies from 'universal-cookie';

export const fetchUser = () => async dispatch => {
        const cookies = new Cookies();
        const token = cookies.get('token')
        const res = await axios.get('/api/users/me', { headers: { Authorization: `Bearer ${token}` } })
       
        dispatch({type: FETCH_USER, payload:res.data});
    }
