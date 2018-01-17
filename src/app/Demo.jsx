/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import Comp1 from './Comp1';
import Comp2 from './Comp2';

class Demo extends Component {
  render() {
    return (
      <div>
        <Comp1 />
        <Comp2 />
      </div>
    );
  }
}

export default Demo;
