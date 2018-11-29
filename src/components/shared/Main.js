import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from '../home/Dashboard.js';
import BubbleSort from '../sorting/BubbleSort.js';
import MergeSort from '../sorting/MergeSort.js';
import ProjectsPage from '../projects/ProjectsPage.js';
import ManageProjectPage from '../projects/ManageProjectPage.js';
import CoursesPage from '../courses/CoursesPage.js';
import ManageCoursePage from '../courses/ManageCoursePage.js';
import AuthorsPage from '../authors/AuthorsPage.js';
import ManageAuthorPage from '../authors/ManageAuthorPage.js';
import TasksPage from '../tasks/TasksPage.js';
import ManageTaskPage from '../tasks/ManageTaskPage.js';
import EntryPage from '../entry/EntryPage.js';
import '../../content/css/bootstrap.min.css';
import '../../content/css/styles.css';

const Main = () => (
  <main>
    <div className="container">
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/sorting/bubblesort' component={BubbleSort} />
        <Route exact path='/sorting/mergesort' component={MergeSort} />
        <Route exact path='/projects' component={ProjectsPage} />
        <Route path='/project/:id' component={ManageProjectPage} />
        <Route path='/project' component={ManageProjectPage} />
        <Route path='/courses' component={CoursesPage} />
        <Route path='/course/:id' component={ManageCoursePage} />
        <Route path='/course' component={ManageCoursePage} />
        <Route path='/authors' component={AuthorsPage} />
        <Route path='/author/:id' component={ManageAuthorPage} />
        <Route path='/author' component={ManageAuthorPage} />
        <Route path='/tasks/:id' component={TasksPage} />
        <Route path='/task/:projectId/:id' component={ManageTaskPage} />
        <Route path='/task/:projectId' component={ManageTaskPage} />
        <Route path='/entry/:projectId/:id' component={EntryPage} />
      </Switch>
    </div>
  </main>
);

export default Main;
