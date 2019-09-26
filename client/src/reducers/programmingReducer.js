import { 
    PROGRAMMING_CREATE,
    PROGRAMMING_ALL_USER,
    PROGRAMMING_FETCHING,
    PROGRAMMING_DONE_FETCHING,
    PROGRAMMING_UPDATE,
    PROGRAMMING_DELETE,
    PROGRAMMING_INITIAL_STATE,
    PROGRAMMING_GUEST
    } from '../actions/types';


const initialState = {
    fetchingProgramming: false,
    programmingLoaded: false,
    programmingList:[]
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    
    switch(type){
        case PROGRAMMING_CREATE:
            return {
                ...state,
                programmingList: [payload, ...state.programmingList]
            }
        case PROGRAMMING_GUEST:
        case PROGRAMMING_ALL_USER:
            return{
                ...state,
                programmingList: [...payload]
            }
        case PROGRAMMING_FETCHING:
            return {
                ...state,
                fetchingProgramming: true
            }
        case PROGRAMMING_DONE_FETCHING:
            return {
                ...state,
                fetchingProgramming: false,
                programmingLoaded: true,
            }
        case PROGRAMMING_UPDATE:
            return {
                ...state,
                programmingList: state.programmingList.map(item => {
                    if(item._id == payload._id)
                    {
                        return payload
                    }

                    return item
                })
            }
        case PROGRAMMING_DELETE:
            return {
                ...state,
                programmingList: state.programmingList.filter(item => item._id != payload._id)
            }
        case PROGRAMMING_INITIAL_STATE:
            return initialState;
        
        default:
            return state
    }
}