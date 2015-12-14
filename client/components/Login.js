'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class ShappWeb extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onLoginPress() {
    console.log('Login Press');
  }

  render() {
    return (
      <div className="wrapperLogin">
        <img className='shappIcon' src={'../img/shapp-logo-icon.png'}/>
        <span><h1 className="title">Shap</h1></span>
        <span><h1 className="subtitle">shop and talk</h1></span>
        <img onClick={this.onLoginPress.bind(this)} className='fbButton' src={'../img/fb-login-button.png'}/>
      </div>
      );
  }
};

module.exports = ShappWeb;