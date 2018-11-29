import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectActions from '../../actions/projectActions.js';
import TaskForm from './TaskForm.js';
import toastr from 'toastr';

class ManageTaskPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      project: Object.assign({}, props.project),
      task: Object.assign({}, props.task),
      completedOptions: [
        {
          text: 'Yes',
          value: 'Yes'
        },
        {
          text: 'No',
          value: 'No'
        }
      ],
      errors: {},
      loading: false
    };

    this.updateTaskState = this.updateTaskState.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.task.id != nextProps.task.id) {
      this.setState({
        project: Object.assign({}, nextProps.project),
        task: Object.assign({}, nextProps.task)
      });
    }
  }

  updateTaskState(e) {
    let task = this.state.task;
    task[e.target.name] = e.target.value;
    return this.setState({task: Object.assign({}, task)});
  }

  saveTask(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });
    this.props.actions.saveProjectTask(this.state.project, this.state.task).then(() => {
      this.redirect()
    }).catch(error => {
      toastr.error(error);
      this.setState({ loading: false });
    });
  }

  redirect() {
    this.setState({
      loading: false
    });
    this.context.router.history.push('/tasks/' + this.state.project.id);
  }

  handleBackClick(e) {
    e.preventDefault();
    this.context.router.history.push('/tasks/' + this.state.project.id);
  }

  render() {
    return (
      <div>
        <h1 className="font-weight-300">Manage Task</h1>
        <div className="row">
          <div className="col-12 col-sm-8">
            <TaskForm
              onChange={this.updateTaskState}
              onBackClick={this.handleBackClick}
              onSave={this.saveTask}
              task={this.state.task}
              allResources={this.props.authors}
              completedOptions={this.state.completedOptions}
              errors={this.state.errors}
              loading={this.state.loading} />
          </div>
        </div>
      </div>
    );
  }
}

function getProjectById(projects, id) {
  const project = projects.filter(p => p.id == id);
  if (project.length) return project[0];
  return null;
}

function getTaskById(tasks, id) {
  const task = tasks.filter(t => t.id == id);
  if (task.length) return task[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const projectId = ownProps.match.params.projectId;
  const taskId = ownProps.match.params.id; // from the path /course/:id

  let project = {
    id: '',
    name: '',
    abbreviation: '',
    description: '',
    totalHours: 0
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

  if (taskId && project.tasks.length > 0) {
    task = getTaskById(project.tasks, taskId);
  }

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    authors: authorsFormattedForDropdown,
    project: project,
    task: task
  };
}

ManageTaskPage.contextTypes = {
  router: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTaskPage);
