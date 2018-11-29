import React from 'react';
import Header from './shared/Header.js';
import Main from './shared/Main.js';
import { connect } from 'react-redux';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      headerLinks: [
        { 'id': 1, 'name': 'Home', 'link': '/' },
        { 'id': 2, 'name': 'Projects', 'link': '/projects' },
        { 'id': 3, 'name': 'Courses', 'link': '/courses' },
        { 'id': 4, 'name': 'Resources', 'link': '/authors' }
      ]
    }
  }

  render() {
    return (
      <div>
        <Header links={this.state.headerLinks} />
        <Main />
      </div>
    );
  }
}

export default App;
