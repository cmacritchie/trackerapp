// import axios from 'axios';
// import { FETCH_USER, FETCH_GUEST } from './types';
// import Cookies from 'universal-cookie';

// export const fetchUser = () => async dispatch => {
//         const cookies = new Cookies();
//         const token = cookies.get('token')
//         if(token){
//             const res = await axios.get('/api/users/me', { headers: { Authorization: `Bearer ${token}` } })
//             dispatch({
//                 type: FETCH_USER, 
//                 payload:res.data
//             });
//         } else {
//             const resAlt = await axios.get('/api/users/guest')
//             dispatch({
//                 type: FETCH_GUEST,
//                 payload:resAlt.data
//             })
//         }
//     }
