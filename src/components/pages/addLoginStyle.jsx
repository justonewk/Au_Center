import React, { Component } from 'react';

const addLoginStyle = WrappedComponent => class extends Component {

  render() {
    return (<div className="login-from">
      <WrappedComponent  />
    </div>);
  }
};
export default addLoginStyle;
