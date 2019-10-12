import * as actions from '../utils/actionTypes';

const initialState = {
    tasks : [],
    task : null,
    task_created : false
};
  
  export default (state = initialState, action = {}) => {
    switch(action.type) {
      case actions.GET_ALL_TASKS:
        return {
          tasks: action.payload.tasks
        };
      case actions.GET_TASKS_BY_COLLECTION:
        return {
          tasks: action.payload.tasks
        };
      case actions.CREATE_TASK:
        return {
          ...state,
          tasks: state.tasks ? [...state.tasks ,action.payload.task] : [action.payload.task],
          task_created : true
        };
      case actions.GET_TASK:
        return {
          task: action.payload.task
        };
      case actions.UPDATE_TASK_STATUS : 
        return {
          task : action.payload.task
        }
      default: 
        return state;
    }
  }