import React from 'react';
import { Link } from 'react-router-dom';

const AuthorListRow = ({author, handleDelete}) => {
  return (
    <tr>
      <td><Link to={'/author/' + author.id}><i className="fa fa-pencil"></i></Link></td>
      <td>{author.firstName}</td>
      <td>{author.lastName}</td>
      <td><a className="text-danger" href="javascript:void(0)" onClick={handleDelete}><i className="fa fa-trash"></i></a></td>
    </tr>
  );
};

export default AuthorListRow;
