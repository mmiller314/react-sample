import { combineReducers } from 'redux';
import authors from './authorReducer';
import courses from './courseReducer';
import projects from './projectReducer';
import ajaxCallsInProgress from './ajaxStatusReducer.js';

const rootReducer = combineReducers({
  authors,
  courses,
  projects,
  ajaxCallsInProgress
});

export default rootReducer;
