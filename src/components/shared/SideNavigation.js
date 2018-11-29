import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class SideNavigation extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-12 col-md-2 col-xl-2 bd-sidebar">
        <nav className="collapse bd-links" id="bd-docs-nav">
          <div className="bd-toc-item active">
            <a className="bd-toc-link" href="#">Algorithms</a>
            <ul className="nav bd-sidenav">
              <li className="active bd-sidenav-active">
                <a href="#">Sorting</a>
              </li>
              <li>
                <NavLink to="/sorting/mergesort">Merge Sort</NavLink>
              </li>
              <li>
                <NavLink to="/sorting/bubblesort">Bubble Sort</NavLink>
              </li>
              <li>
                <a href="#">Heap Sort</a>
              </li>
            </ul>
          </div>

          <div className="bd-toc-item active">
            <a className="bd-toc-link" href="#">Administration</a>
            <ul className="nav bd-sidenav">
              <li className="active bd-sidenav-active">
                <a href="#">Manage Users</a>
              </li>
              <li>
                <a href="#">Manage Apps</a>
              </li>
              <li>
                <a href="#">Company Profile</a>
              </li>
              <li>
                <a href="#">Security Controls</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default SideNavigation;
