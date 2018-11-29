import React from 'react';
import AuthorListRow from './AuthorListRow.js';

class AuthorList extends React.Component {
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
              <th>First Name</th>
              <th>Last Name</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
          {this.props.authors.map(a =>
            <AuthorListRow key={a.id} author={a} handleDelete={() => {this.props.handleDelete(a)}} />
          )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AuthorList;
