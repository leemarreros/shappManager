'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Article from './Article';
import Work from './Work';

class Dashboard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      picture: null,
      option: 'art'
    };
  }

  handleLogOut() {
    this.props.FB.logout();
    this.props.setStateResponse('unknown');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo) {
      this.props.FB.api('/me/picture?height=300', function(picture) {
      this.setState({picture});
      this.setState({loading: false});
    }.bind(this));
    }
  }

  handleClick (option) {
    this.setState({option})
  }

  render() {
    return (
      <div className="wrapperLogin">
        <span className="textWelcome"><h1>Welcome maker!</h1></span>
        <div className="wrapperPic">
          {this.state.loading ? <div className="divLoading"/> : <img className="profilePic" src={this.state.picture.data.url}/>}
        </div>
        <div className="wrapperButtons">
          <div onClick={this.handleClick.bind(this, 'art')} style={ this.state.option === 'art' ? styles.underline : null}><h1>Write an article</h1></div>
          <div onClick={this.handleClick.bind(this, 'work')} style={ this.state.option === 'work' ? styles.underline : null}><h1>Upload your work</h1></div>
        </div>
        <div className="line"/>
        <div className="bodyContent">
          {this.state.option === "art" ? <Article userInfo={this.props.userInfo}/> : <Work userInfo={this.props.userInfo}/>}
        </div>
        <div onClick={this.handleLogOut.bind(this)}> Log Out </div>
      </div>
      );
  }
};

var styles = {
  underline: {
    borderBottomStyle: 'solid',
    borderBottomWidth: 3,
    borderBottomColor: "#285DA1",
  }
}

module.exports = Dashboard;