'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class Article extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="wrapperArticles">
        <div><div className="wrappH1"><h1>All Articles</h1></div></div>
        <div><input className="inputBox" type="text" placeholder="Article's title"></input></div>
        <div><textarea className="textArea" rows="4" placeholder="Describe what are you thoughts here!" cols="50"></textarea></div>
        <div><input className="inputBox" type="text" placeholder="Tags (example: metal, glass, gold)"></input></div>
      </div>
      );
  }
};

module.exports = Article;