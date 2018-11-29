import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Route } from 'react-router-dom';
import * as projectActions from '../../actions/projectActions.js';
import ProjectList from './ProjectList.js';
import LoadingDots from '../common/LoadingDots.js';
import toastr from 'toastr';

class ProjectsPage extends React.Component {

  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  handleDelete(project) {
    this.props.actions.deleteProject(project.id).then(() => {
      toastr.error('Deleted ' + project.name);
    }).catch(error => {
      toastr.error(error);
    });
  }

  redirect() {
    this.context.router.history.push('/project');
  }

  render() {
    return (
      <div>
        <div className="clearfix">
          <div className="float-left">
            <h1 className="font-weight-300">Projects{this.props.loading && <LoadingDots interval={100} dots={3} />}</h1>
          </div>
          <div className="float-right">
            <button
              className="btn btn-primary"
              onClick={this.redirect}><i className="fa fa-plus"></i> Add</button>
          </div>
        </div>

        <ProjectList projects={this.props.projects} handleDelete={this.handleDelete} />
      </div>
    );
  }
}

ProjectsPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    projects: state.projects,
    loading: state.ajaxCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);
