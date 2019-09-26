import { 
    EXERCISE_CREATE,
    EXERCISE_ALL_USER,
    EXERCISE_FETCHING,
    EXERCISE_DONE_FETCHING,
    EXERCISE_UPDATE,
    EXERCISE_DELETE,
    EXERCISE_INITIAL_STATE,
    EXERCISE_GUEST
    } from '../actions/types';


const initialState = {
    fetchingExercise: false,
    exerciseLoaded: false,
    exerciseList:[]
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    
    switch(type){
        case EXERCISE_CREATE:
            return {
                ...state,
                exerciseList: [payload, ...state.exerciseList]
            }
        case EXERCISE_GUEST:
        case EXERCISE_ALL_USER:
            return{
                ...state,
                exerciseList: [...payload]
            }
        case EXERCISE_FETCHING:
            return {
                ...state,
                fetchingExercise: true
            }
        case EXERCISE_DONE_FETCHING:
            return {
                ...state,
                fetchingExercise: false,
                exerciseLoaded: true,
            }
        case EXERCISE_UPDATE:
            return {
                ...state,
                exerciseList: state.exerciseList.map(item => {
                    if(item._id == payload._id)
                    {
                        return payload
                    }

                    return item
                })
            }
        case EXERCISE_DELETE:
            return {
                ...state,
                exerciseList: state.exerciseList.filter(item => item._id != payload._id)
            }
        case EXERCISE_INITIAL_STATE:
            return initialState;
        
        default:
            return state
    }
}