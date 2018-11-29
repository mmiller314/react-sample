import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectActions from '../../actions/projectActions.js';
import toastr from 'toastr';
import * as utilities from '../../utilities/utilities.js';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import UserAvatar from 'react-user-avatar';

class EntryPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      project: Object.assign({}, props.project),
      task: Object.assign({}, props.task),
      entry: {
        'dateEntered': moment(new Date(), 'MM/DD/YYYY')
      },
      errors: {},
      loading: false
    };

    this.updateEntryState = this.updateEntryState.bind(this);
    this.saveEntry = this.saveEntry.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.project.id != nextProps.project.id) {
      this.setState({
        course: Object.assign({}, nextProps.project)
      });
    }
  }

  updateEntryState(e) {
    let entry = this.state.entry;
    entry[e.target.name] = e.target.value;
    return this.setState({entry: Object.assign({}, entry)});
  }

  saveEntry(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });
    this.props.actions.saveCourse(this.state.course).then(() => {
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
    this.context.router.history.push('/');
  }

  handleBackClick(e) {
    e.preventDefault();
    this.context.router.history.push('/');
  }

  handleDateChange(date, e) {
    let entry = this.state.entry;
    entry['dateEntered'] = date;
    return this.setState({entry: Object.assign({}, entry)});
  }

  render() {
    return (
      <div>
        <h1 className="font-weight-300">{this.state.project.name}</h1>
        <div className="row">
          <div className="col-12 col-sm-8">
            <div>
              <label>Task Name:</label>
            </div>
            <label>{this.state.task.name}</label>

            <div>
              <label>Description:</label>
            </div>
            <p>{this.state.task.description}</p>

            <div className="form-group">
              <label htmlFor="">Hours</label>
              <input type="text" className="form-control" />
            </div>

            <div className="form-group">
              <label>Date</label>
              <DatePicker
                selected={this.state.entry.dateEntered}
                onChange={this.handleDateChange}
                className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="">Work Performed</label>
              <textarea className="form-control" rows="6"></textarea>
            </div>

            <div className="text-right">
              <button
                className="btn btn-outline-secondary"
                onClick={this.handleBackClick}>Back</button>

              <input
                type="submit"
                disabled={this.state.loading}
                value={this.state.loading ? 'Saving...' : 'Save'}
                className="btn btn-primary pushleft-5"
                onClick={this.saveEntry} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function getCourseById(courses, id) {
  const course = courses.filter(c => c.id == id);
  if (course.length) return course[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const projectId = ownProps.match.params.projectId;
  const taskId = ownProps.match.params.id;

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
    project = utilities.getProjectById(state.projects, projectId);
  }

  if (taskId && project.tasks.length > 0) {
    task = utilities.getTaskById(project.tasks, taskId);
  }

  return {
    project: project,
    task: task,
    loading: state.ajaxCallsInProgress > 0
  };
}

EntryPage.contextTypes = {
  router: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryPage);
