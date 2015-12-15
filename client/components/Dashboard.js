'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class Dashboard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleLogOut() {
    console.log(this.props.FB.logout, 'logout');
    this.props.FB.logout();
    this.props.setStateResponse('unknown');
  }

  render() {
    return (
      <div className="wrapperLogin">
        <div onClick={this.handleLogOut.bind(this)}> Log Out </div>
      </div>
      );
  }
};

module.exports = Dashboard;