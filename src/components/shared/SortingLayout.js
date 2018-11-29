import React from 'react';
import SideNavigation from './SideNavigation.js';

class SortingLayout extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row flex-xl-nowrap">
        <SideNavigation />
        <main className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content">
          <h1 className="font-weight-300">{this.props.title}</h1>
        </main>
      </div>
    );
  }
}

export default SortingLayout;
