import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList.js';
import { Redirect, Route } from 'react-router-dom';
import LoadingDots from '../common/LoadingDots.js';
import toastr from 'toastr';

class CoursesPage extends React.Component {

  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  handleDelete(course) {
    this.props.actions.deleteCourse(course.id).then(() => {
      toastr.error('Deleted ' + course.title);
    }).catch(error => {
      toastr.error(error);
    });
  }

  redirect() {
    this.context.router.history.push('/course');
  }

  renderTotalCourses() {
    if (!this.props.loading) {
      return (
        <small>({this.props.courses.length})</small>
      );
    }
  }

  render() {
    return (
      <div>
        <div className="clearfix">
          <div className="float-left">
            <h1 className="font-weight-300">Courses{this.props.loading && <LoadingDots interval={100} dots={3} />}</h1>
          </div>
          <div className="float-right">
          <button
            className="btn btn-primary"
            onClick={this.redirect}><i className="fa fa-plus"></i> Add</button>
          </div>
        </div>

        {this.props.courses.length > 0 && <CourseList courses={this.props.courses} handleDelete={this.handleDelete} />}
      </div>
    );
  }
}

CoursesPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses,
    loading: state.ajaxCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch) // course => dispatch(courseActions.createCourse(course))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
// const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectedStateAndProps(CoursesPage);
