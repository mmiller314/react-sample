import React from 'react';
import SideNavigation from '../shared/SideNavigation.js';
import SortingLayout from '../shared/SortingLayout.js';

class BubbleSort extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      array: [],
      ms: '',
      loading: true
    };

    this.handleGenerateClick = this.handleGenerateClick.bind(this);
    this.handleBubbleSortClick = this.handleBubbleSortClick.bind(this);
  }

  componentDidMount() {
    let arr = [];

    for (let i = 0; i < 50; i++) {
      const min = 1;
      const max = 500;
      const rand = Math.floor(min + Math.random() * (max - min));
      let obj = { key: i, value: rand };
      arr.push(obj);
    }

    this.setState({
      array: arr,
      loading: false
    });
  }

  handleGenerateClick(e) {
    e.preventDefault();

    let arr = [];

    for (let i = 0; i < 100; i++) {
      const min = 1;
      const max = 500;
      const rand = Math.floor(min + Math.random() * (max - min));
      let obj = { key: i, value: rand };
      arr.push(obj);
    }

    this.setState({
      array: arr,
      ms: ''
    });
  }

  handleBubbleSortClick(e) {
    e.preventDefault();
    const start = performance.now();
    let arr = this.state.array;

    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < (arr.length - i - 1); j++) {
        if (arr[j].value > arr[j + 1].value) {
          let tmp = arr[j].value;
          arr[j].value = arr[j + 1].value;
          arr[j + 1].value = tmp;
        }
      }
    }
    const end = performance.now();

    this.setState({
      array: arr,
      ms: (end - start) + 'ms'
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <div className="row flex-xl-nowrap">
            <SideNavigation />
            <main className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content">
              <h1 className="font-weight-300">Loading...</h1>
            </main>
          </div>
        </div>
      )
    } else {
    return (
      <div>
        <div className="row flex-xl-nowrap">
          <SideNavigation />
          <main className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content">
            <h1 className="font-weight-300">Bubble Sort</h1>

            <div className="number-array pushdown-20">
              <div className="pushdown-20">
                <span>[
                {this.state.array.map((a, index) => (
                  <span key={a.key}>{ (index ? ', ' : '') + a.value }</span>
                ))}
                ]</span>
              </div>
              {this.state.ms.length > 0 &&
              <div>Sorted in {this.state.ms}</div>
              }
            </div>
            <div>
              <button className="btn btn-secondary" onClick={this.handleGenerateClick}>Generate</button>
              <button className="btn btn-primary pushleft-5" onClick={this.handleBubbleSortClick}>Sort</button>
            </div>
          </main>
        </div>
      </div>
    );
    }
  }

}

export default BubbleSort;
