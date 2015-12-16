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
        <div className="addFiles">
          <div className="wrapperButtonsArticle"><span className="addFilesButton"><input className="inputFile" type="file" name="photo"/><h1>+ Add Files</h1></span>
          <img className="cameraButton" src={'../img/camera-publish-icon.png'}/></div>
        </div>
        <div className="wrapperEndButtons">
          <div><span><h1>SAVE CHANGES</h1></span></div>
          <div><span><h1>PUBLISH</h1></span></div>
        </div>
      </div>
      );
  }
};

module.exports = Article;