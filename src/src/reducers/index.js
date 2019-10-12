import { combineReducers } from 'redux';
import authReducer from './authReducer';
import collectionReducer from './collectionReducer';
import taskReducer from './taskReducer';
import usersReducer from './usersReducer';

const appReducer =  combineReducers({
    authReducer,
    collectionReducer,
    usersReducer,
    taskReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
      state = undefined
    }
  
    return appReducer(state, action)
  }

  export default rootReducer;
