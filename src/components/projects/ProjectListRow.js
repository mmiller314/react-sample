import React from 'react';
import { Link } from 'react-router-dom';

const ProjectListRow = ({project, handleDelete}) => {
  return (
    <tr>
      <td>
        <Link to={'/project/' + project.id}><i className="fa fa-pencil"></i></Link>
        <Link to={'/tasks/' + project.id} className="pushleft-5"><i className="fa fa-tasks"></i></Link>
      </td>
      <td>{project.name}</td>
      <td>{project.abbreviation}</td>
      <td>{project.description.substring(0, 20)}...</td>
      <td>{project.totalHours}</td>
      <td><a className="text-danger" href="javascript:void(0)" onClick={handleDelete}><i className="fa fa-trash"></i></a></td>
    </tr>
  );
};

export default ProjectListRow;
