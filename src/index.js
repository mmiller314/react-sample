import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore.js';
import { loadCourses } from './actions/courseActions.js';
import { loadAuthors } from './actions/authorActions.js';
import { loadProjects } from './actions/projectActions.js';
import { loadAllTasks } from './actions/taskActions.js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import '../node_modules/toastr/build/toastr.min.css';

const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthors());
store.dispatch(loadProjects());

render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
