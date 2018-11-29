import * as types from './actionTypes';
import taskRepository from '../repository/taskRepository.js';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function loadTasksSuccess(tasks) {
  return {
    type: types.LOAD_TASKS_SUCCESS,
    tasks: tasks
  };
}

export function createTaskSuccess(task) {
  return {
    type: types.CREATE_TASK_SUCCESS,
    task: task
  };
}

export function updateTaskSuccess(task) {
  return {
    type: types.UPDATE_TASK_SUCCESS,
    task: task
  };
}

export function deleteTaskSuccess(id) {
  return {
    type: types.DELETE_TASK_SUCCESS,
    id: id
  };
}

export function loadAllTasks() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return taskRepository.getAllTasks().then(tasks => {
      dispatch(loadTasksSuccess(tasks));
    }).catch(error => {
      throw(error);
    });
  }
}

export function loadTasks(projectId) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return taskRepository.getAllTasks(projectId).then(tasks => {
      dispatch(loadTasksSuccess(tasks));
    }).catch(error => {
      throw(error);
    });
  }
}

export function saveTask(projectId, task) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return taskRepository.saveTask(projectId, task).then(task => {
      task.id ? dispatch(updateTaskSuccess(task)) : dispatch(createTaskSuccess(task));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  }
}

export function deleteTask(projectId, id) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return taskRepository.deleteTask(projectId, id).then(() => {
      dispatch(deleteTaskSuccess(id));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  }
}
