'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';

class ShappWeb extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      response: null,
    };
  }

  render() {
    return (
      <div>
          <Login />
      </div>
      );
  }
};


ReactDOM.render(<ShappWeb />, document.getElementById('react'));
