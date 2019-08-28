import {ADD_PLACE,DELETE_PLACE,SELECT_PLACE,DESELECT_PLACE} from '../actions/actionTypes';

const intialState={
    places:[],
    selectedPlace:null
}

const reducer= (state=intialState,action) =>{

    switch (action.type)
    {
        case ADD_PLACE:
            return {
                ...state,
                newplace:action.placeName
            }
        default:
            return state;
    }

}

export default reducer;