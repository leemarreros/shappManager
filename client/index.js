'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

class ShappWeb extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  handleLogin(bool) {
    console.log('inside handleLogin');
    this.setState({loggedIn: bool});
  }

  componentWillMount() {

  }

  componentDidMount(){


  }

  render() {
    return (
      <div>
        {this.state.loggedIn ?
          <Dashboard />
          :
          <Login handleLogin={this.handleLogin.bind(this)} />}
      </div>
      );
  }
};


ReactDOM.render(<ShappWeb />, document.getElementById('react'));
