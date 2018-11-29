import React from 'react';
import SortingLayout from '../shared/SortingLayout.js';

class MergeSort extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid">
        <SortingLayout title="Merge Sort" />
      </div>
    );
  }

}

export default MergeSort;
