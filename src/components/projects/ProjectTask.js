import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Route } from 'react-router-dom';
import * as projectActions from '../../actions/projectActions.js';
import { Link } from 'react-router-dom';
import * as utilities from '../../utilities/utilities.js';

class ProjectTask extends React.Component {

  constructor(props) {
    super(props);
  }

  renderRow(projectId, task) {
    if (task.completed == 'Yes') {
      return (
        <tr className="text-muted" key={task.id}>
          <td><i className="fa fa-check"></i> <Link to={'/entry/' + projectId + '/' + task.id} className="text-muted">{task.name}</Link></td>
          <td>{task.description}</td>
          <td>{task.assignToId}</td>
          <td>{task.hours}</td>
        </tr>
      );
    } else {
      return (
        <tr key={task.id}>
          <td><Link to={'/entry/' + projectId + '/' + task.id}>{task.name}</Link></td>
          <td>{task.description}</td>
          <td>{task.assignToId}</td>
          <td>{task.hours}</td>
        </tr>
      );
    }
  }

  renderTotal(tasks) {
    return (
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>{utilities.sumTaskHours(tasks)}</td>
      </tr>
    );
  }

  render() {
    return (
      <div>
        {this.props.projects.map(p =>
          <div>
            {p.tasks && p.tasks.length > 0 &&
            <div className="pushdown-40">
              <div>
                <h3>{p.name}</h3>
              </div>
              <div className="table-responsive-sm">
                <table className="table dashboard">
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Description</th>
                      <th>Assigned</th>
                      <th>Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                  {p.tasks.map(t =>
                    this.renderRow(p.id, t)
                  )}
                  {this.renderTotal(p.tasks)}
                  </tbody>
                </table>
              </div>
            </div>
            }
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    projects: state.projects,
    loading: state.ajaxCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTask);
