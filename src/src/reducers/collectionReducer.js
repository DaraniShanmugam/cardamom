import * as actions from '../utils/actionTypes';

const initialState = {
    collections : [],
    collection_created : false
};
  
  export default (state = initialState, action = {}) => {
    switch(action.type) {
      case actions.GET_ALL_COLLECTIONS:
        return {
          collections: action.payload.collections
        };
      case actions.CREATE_COLLECTION:
        return {
          ...state,
          collections: [...state.collections,action.payload.collection],
          collection_created : true
        };
      default: 
        return state;
    }
  }