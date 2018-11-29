import React from 'react';
import TaskListRow from './TaskListRow.js';

class TaskList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="table-responsive-sm">
        <table className="table">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Name</th>
              <th>Description</th>
              <th>Assigned To</th>
              <th>Completion Date</th>
              <th>Total Hours</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
          {this.props.project.tasks.map(t =>
            <TaskListRow key={t.id} projectId={this.props.project.id} task={t} handleDelete={() => {this.props.handleDelete(this.props.project, t)}} />
          )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TaskList;
