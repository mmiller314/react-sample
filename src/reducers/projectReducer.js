import * as types from '../actions/actionTypes.js';
import initialState from './initialState.js';

export default function projectReducer(state = initialState.projects, action) {
  console.log('projectReducer', action.type);
  switch(action.type) {
    case types.LOAD_PROJECTS_SUCCESS:
      return action.projects;
    case types.CREATE_PROJECT_SUCCESS:
      return [...state, Object.assign({}, action.project)];
    case types.UPDATE_PROJECT_SUCCESS:
      return [
        ...state.filter(c => c.id !== action.project.id),
        Object.assign({}, action.project)
      ];
    case types.CREATE_PROJECT_TASK_SUCCESS:
      let project = Object.assign({}, action.project);

      if (project.tasks.length > 0) {
        project.tasks = [];
        project.tasks.push(action.task);
      } else {
        project.tasks.push(action.task);
      }

      return [
        ...state.filter(p => p.id !== action.project.id),
        project
      ];
    case types.UPDATE_PROJECT_TASK_SUCCESS:
      let proj = Object.assign({}, action.project);

      proj.tasks = [
        ...proj.tasks.filter(t => t.id !== action.task.id),
        action.task
      ];

      return [
        ...state.filter(p => p.id !== action.project.id),
        proj
      ];
    case types.DELETE_PROJECT_SUCCESS:
      return [...state.filter(c => c.id !== action.id)];
    case types.DELETE_PROJECT_TASK_SUCCESS:
      let p = Object.assign({}, action.project);
      p.tasks = [...p.tasks.filter(t => t.id !== action.taskId)];

      console.log('P', p);
      console.log('taskId', action.taskId);

      return [
        ...state.filter(p => p.id !== action.project.id),
        p
      ];

    default:
      return state;
  }
}
