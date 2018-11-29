import React from 'react';
import { Link } from 'react-router-dom';

const CourseListRow = ({course, handleDelete}) => {
  return (
    <tr>
      <td><Link to={'/course/' + course.id}><i className="fa fa-pencil"></i></Link></td>
      <td><a href={course.watchHref} target="_blank">Watch</a></td>
      <td>{course.title}</td>
      <td>{course.authorId}</td>
      <td>{course.category}</td>
      <td>{course.length}</td>
      <td><a className="text-danger" href="javascript:void(0)" onClick={handleDelete}><i className="fa fa-trash"></i></a></td>
    </tr>
  );
};

export default CourseListRow;
