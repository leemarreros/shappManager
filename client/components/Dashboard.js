'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class Dashboard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      picture: null,
    };
  }

  handleLogOut() {
    console.log('logout');
    this.props.FB.logout();
    this.props.setStateResponse('unknown');
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps.userInfo);
    if (nextProps.userInfo) {
      this.props.FB.api('/me/picture?height=300', function(picture) {
      console.log('retrieving picture', picture);
      this.setState({picture});
      this.setState({loading: false});
    }.bind(this));
    }
  }

  render() {
    return (
      <div className="wrapperLogin">
        <span className="textWelcome"><h1>Welcome maker!</h1></span>
        <div className="wrapperPic">
          {this.state.loading ?
            <div className="divLoading"/>
            :
            <img className="profilePic" src={this.state.picture.data.url}/>}
        </div>
        <div onClick={this.handleLogOut.bind(this)}> Log Out </div>
      </div>
      );
  }
};

module.exports = Dashboard;