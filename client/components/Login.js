'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';


class ShappWeb extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      response: null,
      FB: null,
      userInfo: null,
    };
  }

  componentWillMount() {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1528085177508710',
        xfbml      : true,
        version    : 'v2.5'
      });

      FB.getLoginStatus(function(response){
        console.log('initialize response', response);
        this.setState({response, FB});
        if (response.status) this.retrieveUserInfo();
      }.bind(this));

    }.bind(this);

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }

  retrieveUserInfo() {
    FB.api('/me?fields=id,name,picture', function(userInfo) {
      console.log('retrieving data', userInfo);
      // console.log(userInfo);
      this.setState({userInfo});
    }.bind(this));

    FB.api(
      "...?fields={fieldname_of_type_ProfilePictureSource}",
      function (response) {
        if (response.error){console.log(response.error)};
        if (response && !response.error) {
          /* handle the result */
          console.log('api', response);
        }
      }
    );
  }

  onLoginPress() {
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        console.log('already logged in');
        this.retrieveUserInfo()
      } else if (response.status === 'not_authorized') {
        console.log('not_authorized');
      } else {
        console.log('Please, log in into FB.');
        FB.login(function(response){
          if (response.status === 'connected') this.retrieveUserInfo();
          this.setState({response});
        }.bind(this), {scope: 'user_photos'});
      }
    }.bind(this));
  }

  setStateResponse(response) {
    this.setState({response});
  }

  render() {
    if (this.state.response === null) {
      return <div>Loading</div>
    }
    console.log('status', this.state.response.status);
    return (
      <div>
        {this.state.response.status === "connected" ?
          <Dashboard
            userInfo={this.state.userInfo}
            setStateResponse={this.setStateResponse.bind(this)}
            FB={this.state.FB}/>
          :
        <div className="wrapperLogin">

          <img className='shappIcon' src={'../img/shapp-logo-icon.png'}/>
          <span><h1 className="title">Shap</h1></span>
          <span><h1 className="subtitle">shop and talk</h1></span>

          <img onClick={this.onLoginPress.bind(this)} className='fbButton' src={'../img/fb-login-button.png'}/>
        </div>
        }
      </div>
      );
  }
};

module.exports = ShappWeb;