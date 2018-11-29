import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions.js';
import CourseForm from './CourseForm.js';
import toastr from 'toastr';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, props.course),
      errors: {},
      loading: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id != nextProps.course.id) {
      this.setState({
        course: Object.assign({}, nextProps.course)
      });
    }
  }

  updateCourseState(e) {
    let course = this.state.course;
    course[e.target.name] = e.target.value;
    return this.setState({course: Object.assign({}, course)});
  }

  saveCourse(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });
    this.props.actions.saveCourse(this.state.course).then(() => {
      this.redirect()
    }).catch(error => {
      toastr.error(error);
      this.setState({ loading: false });
    });
  }

  redirect() {
    this.setState({
      loading: false
    });
    this.context.router.history.push('/courses');
  }

  handleBackClick(e) {
    e.preventDefault();
    this.context.router.history.push('/courses');
  }

  render() {
    return (
      <div>
        <h1 className="font-weight-300">Manage Course</h1>
        <div className="row">
          <div className="col-12 col-sm-8">
            <CourseForm
              allAuthors={this.props.authors}
              onChange={this.updateCourseState}
              onBackClick={this.handleBackClick}
              onSave={this.saveCourse}
              course={this.state.course}
              errors={this.state.errors}
              loading={this.state.loading} />
          </div>
        </div>
      </div>
    );
  }
}

function getCourseById(courses, id) {
  const course = courses.filter(c => c.id == id);
  if (course.length) return course[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.match.params.id; // from the path /course/:id
  let course = {
    id: '',
    watchHref: '',
    title: '',
    authorId: '',
    length: '',
    category: ''
  };

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    authors: authorsFormattedForDropdown,
    course: course
  };
}

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch) // course => dispatch(courseActions.createCourse(course))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
