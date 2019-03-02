import * as ActionCons from '../actionConstant';
  
const initialState = {
    getAPIResponse:null,
};
  
export default (state = initialState, action) => {
    switch (action.type) {
        case ActionCons.API_CALL_RESPONSE:
            return {
                ...state,
                getAPIResponse: action.data
            };
        default:
            return state;
    }
};