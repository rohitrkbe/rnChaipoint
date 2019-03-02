import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
import SampleReducer from './SampleReducer';
import { USER_LOGOUT } from '../actionConstant';

const appReducer =  combineReducers({
    // formReducer, // if redux form is used in project. then use this reducer
    SampleReducer,
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = {};
  }
  return appReducer(state, action);
};

export default rootReducer;