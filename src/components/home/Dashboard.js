import React from 'react';
import { connect } from 'react-redux';
import SideNavigation from '../shared/SideNavigation.js';
import ProjectTask from '../projects/ProjectTask.js';
import LoadingDots from '../common/LoadingDots.js';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="row flex-xl-nowrap">
          <SideNavigation />
          <main className="col-12 col-md-9 col-xl-7 py-md-3 pl-md-5 bd-content">
            <h1 className="font-weight-300 pushdown-20">Dashboard{this.props.loading && <LoadingDots interval={100} dots={3} />}</h1>
            <ProjectTask />
          </main>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(Dashboard);
