import React from 'react';

class HeaderTitle extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <h1 className="weight-300">{this.props.title}</h1>
        </div>
      </div>
    );
  }
}

export default HeaderTitle;
