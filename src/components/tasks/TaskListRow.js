import React from 'react';
import { Link } from 'react-router-dom';

const TaskListRow = ({task, projectId, handleDelete}) => {
  return (
    <tr>
      <td><Link to={'/task/' + projectId + '/' + task.id}><i className="fa fa-pencil"></i></Link></td>
      <td>{task.name}</td>
      <td>{task.description}</td>
      <td>{task.assignToId}</td>
      <td>{task.completionDate}</td>
      <td>{task.hours}</td>
      <td><a className="text-danger" href="javascript:void(0)" onClick={handleDelete}><i className="fa fa-trash"></i></a></td>
    </tr>
  );
};

export default TaskListRow;
