'use strict';

import React from 'react';
import ReactDOM from 'react-dom';


class ShappWeb extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);

  }

  testAPI() {
    console.log('Welcome!  Fetching your information.... ');

  }

  handleClick() {
    // FB.getLoginStatus(function(response) {
    //   this.statusChangeCallback(response);
    // }.bind(this));

  }

  componentWillMount() {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1528085177508710',
        xfbml      : true,
        version    : 'v2.5'
      });
    }.bind(this);

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  onLoginPress() {
    FB.getLoginStatus(function(response) {

      if (response.status === 'connected') {
        FB.api('/me', function(response) {
          console.log('Successful login for: ' + response.name);
        });
        this.props.handleLogin(true);
      } else if (response.status === 'not_authorized') {
        console.log('not_authorized');
      } else {
        console.log('Please, log in into FB.');
        FB.login(function(response){
          console.log(response);
        });
        this.props.handleLogin(true);
      }

    }.bind(this));


  }

  onLogOutPress() {
    FB.logout(function(response) {
        console.log(response);
    });
  }

  render() {
    return (
      <div className="wrapperLogin">
        <img className='shappIcon' src={'../img/shapp-logo-icon.png'}/>
        <span><h1 className="title">Shap</h1></span>
        <span><h1 className="subtitle">shop and talk</h1></span>

        <img onClick={this.onLoginPress.bind(this)} className='fbButton' src={'../img/fb-login-button.png'}/>
        <div onClick={this.onLogOutPress}>Log out</div>
      </div>
      );
  }
};

module.exports = ShappWeb;