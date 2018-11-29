import * as types from '../actions/actionTypes.js';
import initialState from './initialState.js';

export default function courseReducer(state = initialState.courses, action) {
  switch(action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.CREATE_COURSE_SUCCESS:
        // state.push(action.course);
        return [...state, Object.assign({}, action.course)];
    case types.UPDATE_COURSE_SUCCESS:
        return [
          ...state.filter(c => c.id !== action.course.id),
          Object.assign({}, action.course)
        ];
    case types.DELETE_COURSE_SUCCESS:
        return [...state.filter(c => c.id !== action.id)];

    default:
      return state;
  }
}
