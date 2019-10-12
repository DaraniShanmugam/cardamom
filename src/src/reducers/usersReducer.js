import * as actions from '../utils/actionTypes';

const initialState = {
    users : [],
    user_created : false
};
  
  export default (state = initialState, action = {}) => {
    switch(action.type) {
      case actions.GET_ALL_USERS:
        return {
          users: action.payload.users
        };
      case actions.CREATE_USER:
        return {
          ...state,
          users: [...state.users,action.payload.user],
          user_created : true
        };
      default: 
        return state;
    }
  }