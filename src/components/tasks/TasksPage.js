import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Route } from 'react-router-dom';
import * as projectActions from '../../actions/projectActions.js';
import TaskList from './TaskList.js';
import LoadingDots from '../common/LoadingDots.js';
import toastr from 'toastr';

class TasksPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      project: Object.assign({}, props.project)
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  handleDelete(project, task) {
    this.props.actions.deleteProjectTask(project, task.id).then(() => {
      toastr.error('Deleted ' + task.name);
    }).catch(error => {
      toastr.error(error);
    });
  }

  redirect() {
    this.context.router.history.push('/task/' + this.state.project.id);
  }

  displayProjectName() {
    const spanStyle = {
      fontSize: '1.1rem'
    };
    if (!this.props.loading) {
      return (
        <span style={spanStyle}>{this.state.project.name}</span>
      );
    }
  }

  render() {
    return (
      <div>
        <div className="clearfix">
          <div className="float-left">
            <h1 className="font-weight-300">Tasks{this.props.loading && <LoadingDots interval={100} dots={3} />} {this.displayProjectName()}</h1>
          </div>
          <div className="float-right">
            <input type="submit"
                   value="Add Task"
                   className="btn btn-primary"
                   onClick={this.redirect} />
          </div>
        </div>

        <TaskList
          project={this.props.project}
          handleDelete={this.handleDelete} />
      </div>
    );
  }
}

TasksPage.contextTypes = {
  router: PropTypes.object
};

function getProjectById(projects, id) {
  const project = projects.filter(p => p.id == id);
  if (project.length) return project[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const projectId = ownProps.match.params.id;
  const taskId = ownProps.match.params.id;

  let project = {
    id: '',
    name: '',
    abbreviation: '',
    description: '',
    totalHours: 0,
    tasks: []
  };

  let task = {
    id: '',
    name: '',
    description: '',
    assignToId: '',
    hours: 0
  };

  if (projectId && state.projects.length > 0) {
    project = getProjectById(state.projects, projectId);
  }

  return {
    project: project,
    loading: state.ajaxCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);
