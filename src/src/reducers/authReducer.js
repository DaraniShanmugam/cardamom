import * as actions from '../utils/actionTypes';

const initialState = {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    error : null,
    user: {
      token : localStorage.getItem('token') ? localStorage.getItem('token') : null,
      is_manager : localStorage.getItem('is_manager') ? JSON.parse(localStorage.getItem('is_manager')) : null
    }
  };
  
  export default (state = initialState, action = {}) => {
    switch(action.type) {
      case actions.LOGIN_SUCCESS:
        return {
          isAuthenticated: action.payload.isAuthenticated,
          user: action.payload.user
        };
      case actions.LOGIN_ERROR:
        return {
          error: action.payload.error
        };
      case actions.LOGOUT:
        return {
          isAuthenticated: action.payload.isAuthenticated,
          user: action.payload.user
        };
      default: 
        return state;
    }
  }