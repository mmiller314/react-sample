import * as types from './actionTypes';
import courseRepository from '../repository/courseRepository.js';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function createCourse(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course: course };
}

export function loadCoursesSuccess(courses) {
  return {
    type: types.LOAD_COURSES_SUCCESS,
    courses: courses
  };
}

export function createCourseSuccess(course) {
  return {
    type: types.CREATE_COURSE_SUCCESS,
    course: course
  };
}

export function updateCourseSuccess(course) {
  return {
    type: types.UPDATE_COURSE_SUCCESS,
    course: course
  };
}

export function deleteCourseSuccess(id) {
  return {
    type: types.DELETE_COURSE_SUCCESS,
    id: id
  };
}

export function loadCourses() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return courseRepository.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      throw(error);
    });
  }
}

export function saveCourse(course) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return courseRepository.saveCourse(course).then(course => {
      course.id ? dispatch(updateCourseSuccess(course)) : dispatch(createCourseSuccess(course));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  }
}

export function deleteCourse(id) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return courseRepository.deleteCourse(id).then(() => {
      dispatch(deleteCourseSuccess(id));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  }
}
