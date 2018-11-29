import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectActions from '../../actions/projectActions.js';
import ProjectForm from './ProjectForm.js';
import toastr from 'toastr';
import * as utilities from '../../utilities/utilities.js';

class ManageProjectPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      project: Object.assign({}, props.project),
      errors: {},
      loading: false
    };

    this.updateProjectState = this.updateProjectState.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.project.id != nextProps.project.id) {
      this.setState({
        course: Object.assign({}, nextProps.project)
      });
    }
  }

  updateProjectState(e) {
    let project = this.state.project;
    project[e.target.name] = e.target.value;
    return this.setState({project: Object.assign({}, project)});
  }

  saveProject(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });
    this.props.actions.saveProject(this.state.project).then(() => {
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
    this.context.router.history.push('/projects');
  }

  handleBackClick(e) {
    e.preventDefault();
    this.context.router.history.push('/projects');
  }

  render() {
    return (
      <div>
        <h1 className="font-weight-300">Manage Project</h1>
        <div className="row">
          <div className="col-12 col-sm-8">
            <ProjectForm
              onChange={this.updateProjectState}
              onBackClick={this.handleBackClick}
              onSave={this.saveProject}
              project={this.state.project}
              errors={this.state.errors}
              loading={this.state.loading} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const projectId = ownProps.match.params.id; // from the path /course/:id

  let project = {
    id: '',
    name: '',
    abbreviation: '',
    description: '',
    totalHours: 0
  };

  if (projectId && state.projects.length > 0) {
    project = utilities.getProjectById(state.projects, projectId);
  }

  return {
    project: project
  };
}

ManageProjectPage.contextTypes = {
  router: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageProjectPage);
