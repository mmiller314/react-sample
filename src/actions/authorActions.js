import * as types from './actionTypes';
import authorRepository from '../repository/authorRepository.js';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function loadAuthorsSuccess(authors) {
  return {
    type: types.LOAD_AUTHORS_SUCCESS,
    authors: authors
  };
}

export function createAuthorSuccess(author) {
  return {
    type: types.CREATE_AUTHOR_SUCCESS,
    author: author
  };
}

export function updateAuthorSuccess(author) {
  return {
    type: types.UPDATE_AUTHOR_SUCCESS,
    author: author
  };
}

export function deleteAuthorSuccess(id) {
  return {
    type: types.DELETE_AUTHOR_SUCCESS,
    id: id
  };
}

export function loadAuthors() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return authorRepository.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch(error => {
      throw(error);
    });
  }
}

export function saveAuthor(author) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return authorRepository.saveAuthor(author).then(author => {
      author.id ? dispatch(updateAuthorSuccess(author)) : dispatch(createAuthorSuccess(author));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  }
}

export function deleteAuthor(id) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return authorRepository.deleteAuthor(id).then(() => {
      dispatch(deleteAuthorSuccess(id));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  }
}
