import * as types from './actionTypes';
import projectRepository from '../repository/projectRepository.js';
import taskRepository from '../repository/taskRepository.js';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function createProject(project) {
  return { type: types.CREATE_PROJECT_SUCCESS, project: project };
}

export function loadProjectsSuccess(projects) {
  return {
    type: types.LOAD_PROJECTS_SUCCESS,
    projects: projects
  };
}

export function createProjectSuccess(project) {
  return {
    type: types.CREATE_PROJECT_SUCCESS,
    project: project
  };
}

export function updateProjectSuccess(project) {
  return {
    type: types.UPDATE_PROJECT_SUCCESS,
    project: project
  };
}

export function updateProjectTaskSuccess(project, task) {
  return {
    type: types.UPDATE_PROJECT_TASK_SUCCESS,
    project: project,
    task: task
  };
}

export function createProjectTaskSuccess(project, task) {
  return {
    type: types.CREATE_PROJECT_TASK_SUCCESS,
    project: project,
    task: task
  };
}

export function deleteProjectSuccess(id) {
  return {
    type: types.DELETE_PROJECT_SUCCESS,
    id: id
  };
}

export function deleteProjectTaskSuccess(project, taskId) {
  return {
    type: types.DELETE_PROJECT_TASK_SUCCESS,
    project: project,
    taskId: taskId
  };
}

export function loadProjects() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return projectRepository.getAllProjects().then(projects => {
      dispatch(loadProjectsSuccess(projects));
    }).catch(error => {
      throw(error);
    });
  }
}

export function saveProject(project) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return projectRepository.saveProject(project).then(project => {
      project.id ? dispatch(updateProjectSuccess(project)) : dispatch(createProjectSuccess(project));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  }
}

export function saveProjectTask(project, task) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return taskRepository.saveTask(project.id, task).then(task => {
      task.id ? dispatch(updateProjectTaskSuccess(project, task)) : dispatch(createProjectTaskSuccess(project, task));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  }
}

export function deleteProject(id) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return projectRepository.deleteProject(id).then(() => {
      dispatch(deleteProjectSuccess(id));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  }
}

export function deleteProjectTask(project, taskId) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return taskRepository.deleteTask(project.id, taskId).then(() => {
      dispatch(deleteProjectTaskSuccess(project, taskId));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  }
}
