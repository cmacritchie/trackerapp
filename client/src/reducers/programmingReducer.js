import { 
    PROGRAMMING_CREATE,
    PROGRAMMING_ALL_USER,
    PROGRAMMING_FETCHING,
    PROGRAMMING_DONE_FETCHING
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
                debugger;
            return {
                ...state,
                programmingList: [payload, ...state.programmingList]
            }
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
        default:
            return state
    }
}