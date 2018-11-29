import * as types from '../actions/actionTypes.js';
import initialState from './initialState.js';

export default function taskReducer(state = initialState.tasks, action) {
  switch(action.type) {
    case types.LOAD_TASKS_SUCCESS:
      return action.tasks;
    case types.CREATE_TASK_SUCCESS:
        return [...state, Object.assign({}, action.task)];
    case types.UPDATE_TASK_SUCCESS:
        return [
          ...state.filter(t => t.id !== action.task.id),
          Object.assign({}, action.task)
        ];
    case types.DELETE_PROJECT_SUCCESS:
        return [...state.filter(t => t.id !== action.id)];

    default:
      return state;
  }
}
