import * as types from '../actions/actionTypes.js';
import initialState from './initialState.js';

export default function authorReducer(state = initialState.authors, action) {
  switch(action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;
    case types.CREATE_AUTHOR_SUCCESS:
      return [...state, Object.assign({}, action.author)];
    case types.UPDATE_AUTHOR_SUCCESS:
      return [
        ...state.filter(a => a.id !== action.author.id),
        Object.assign({}, action.author)
      ];
    case types.DELETE_AUTHOR_SUCCESS:
      return [...state.filter(a => a.id !== action.id)];
    default:
      return state;
  }
}
