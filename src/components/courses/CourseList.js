import React from 'react';
import CourseListRow from './CourseListRow.js';

class CourseList extends React.Component {
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
              <th>Link</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Length</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
          {this.props.courses.map(c =>
            <CourseListRow key={c.id} course={c} handleDelete={() => {this.props.handleDelete(c)}} />
          )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CourseList;
