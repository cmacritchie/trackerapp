import { 
    WEIGHT_CREATE,
    WEIGHT_ALL_USER,
    WEIGHT_FETCHING,
    WEIGHT_DONE_FETCHING,
    WEIGHT_UPDATE,
    WEIGHT_DELETE,
    WEIGHT_INITIAL_STATE,
    WEIGHT_GUEST
    } from '../actions/types';


const initialState = {
    fetchingWeight: false,
    weightLoaded: false,
    weightList:[]
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    
    switch(type){
        case WEIGHT_CREATE:
            return {
                ...state,
                weightList: [payload, ...state.weightList]
            }
        case WEIGHT_GUEST:
        case WEIGHT_ALL_USER:
            return{
                ...state,
                weightList: [...payload]
            }
        case WEIGHT_FETCHING:
            return {
                ...state,
                fetchingWeight: true
            }
        case WEIGHT_DONE_FETCHING:
            return {
                ...state,
                fetchingWeight: false,
                weightLoaded: true,
            }
        case WEIGHT_UPDATE:
            return {
                ...state,
                weightList: state.weightList.map(item => {
                    if(item._id == payload._id)
                    {
                        return payload
                    }

                    return item
                })
            }
        case WEIGHT_DELETE:
            return {
                ...state,
                weightList: state.weightList.filter(item => item._id != payload._id)
            }
        case WEIGHT_INITIAL_STATE:
            return initialState;
        
        default:
            return state
    }
}