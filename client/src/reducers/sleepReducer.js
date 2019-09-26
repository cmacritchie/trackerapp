import { 
    SLEEP_CREATE,
    SLEEP_ALL_USER,
    SLEEP_FETCHING,
    SLEEP_DONE_FETCHING,
    SLEEP_UPDATE,
    SLEEP_DELETE,
    SLEEP_INITIAL_STATE,
    SLEEP_GUEST
    } from '../actions/types';


const initialState = {
    fetchingSleep: false,
    sleepLoaded: false,
    sleepList:[]
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    
    switch(type){
        case SLEEP_CREATE:
            return {
                ...state,
                sleepList: [payload, ...state.sleepList]
            }
        case SLEEP_GUEST:
        case SLEEP_ALL_USER:
            return{
                ...state,
                sleepList: [...payload]
            }
        case SLEEP_FETCHING:
            return {
                ...state,
                fetchingSleep: true
            }
        case SLEEP_DONE_FETCHING:
            return {
                ...state,
                fetchingSleep: false,
                sleepLoaded: true,
            }
        case SLEEP_UPDATE:
            return {
                ...state,
                sleepList: state.sleepList.map(item => {
                    if(item._id == payload._id)
                    {
                        return payload
                    }

                    return item
                })
            }
        case SLEEP_DELETE:
            return {
                ...state,
                sleepList: state.sleepList.filter(item => item._id != payload._id)
            }
        case SLEEP_INITIAL_STATE:
            return initialState;
        
        default:
            return state
    }
}