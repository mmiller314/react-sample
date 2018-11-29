import React from 'react';
import ProjectListRow from './ProjectListRow.js';

class ProjectList extends React.Component {
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
              <th>Abbreviation</th>
              <th>Description</th>
              <th>Total Hours</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
          {this.props.projects.map(p =>
            <ProjectListRow key={p.id} project={p} handleDelete={() => {this.props.handleDelete(p)}} />
          )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProjectList;
