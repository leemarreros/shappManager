'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import helpers from '../utils/dbHelpers';
import globalVar from '../utils/globalVariables';

class Article extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      content: null,
      tags: null,
      picture: null,
      userInfo: null,
      addingFiles: false
    };
  }

  onSaveClick() {
   // var url = `${globalVar.restUrl}/api/sign_s3`;
   // fetch(url)
   //  .then((response) => response.json())
   //  .then((responseData) => {
   //    console.log(responseData);
   //  })
   //  .done();
  }

  onClickPublish() {
    if (this.state.userInfo) {
      var url = `${globalVar.restUrl}/api/articles/${this.state.userInfo.id}`;
      var body = {
        createdBy: this.state.userInfo.id,
        title: this.state.title,
        content: this.state.content,
        tags: this.state.tags,
        picture: null
      };
      if (this.state.addingFiles) body.picture = this.state.picture;

      fetch(helpers.requestHelper(url, body, 'POST'))
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.status);
      })
      .done();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo) {
      this.setState({userInfo: nextProps.userInfo});
    }
  }

  onImageSubmitted(document) {
    var fileReader = new FileReader();
    fileReader.readAsDataURL(document.getElementById("uploadImage").files[0]);
    fileReader.onload = function(e) {
      document.getElementById("uploadPreview").src = e.target.result;
      this.setState({picture: e.target.result});
      this.setState({addingFiles: true});
    }.bind(this);
  }

  render() {
    return (
      <div className="wrapperArticles">
        <div><div className="wrappH1"><h1>All Articles</h1></div></div>
        <div>
          <input
            className="inputBox"
            type="text"
            onChange={(event)=> {this.setState({title: event.target.value})}}
            placeholder="Article's title">
          </input>
        </div>
        <div>
          <textarea
            className="textArea"
            rows="4"
            onChange={(event)=> {this.setState({content: event.target.value})}}
            placeholder="Describe what are you thoughts here!" cols="50">
          </textarea>
        </div>
        <div>
          <input
            className="inputBox"
            type="text"
            onChange={(event)=> {this.setState({tags: event.target.value})}}
            placeholder="Tags (example: metal, glass, gold)">
          </input>
        </div>
        <div className="addFiles">
          <div className="wrapperButtonsArticle">
            <span className="addFilesButton">
              <input
                className="inputFile"
                type="file"
                name="photo"
                id="uploadImage"
                onChange={this.onImageSubmitted.bind(this, document)}/>
              <h1>+ Add File</h1>
            </span>
          <img className="cameraButton" src={'../img/camera-publish-icon.png'}/></div>
        </div>
        <div className="uploadPreviewWrapper" style={this.state.addingFiles ? {opacity: 1} : {opacity: 0, height: 0}}>
          <div className="uploadPreviewContainer">
            <img className="uploadPreview" id="uploadPreview"/>
          </div>
          <span><h1>Ideal size: 400px x 400px</h1></span>
        </div>
        <div className="wrapperEndButtons">
          <div onClick={this.onSaveClick.bind(this)}><span><h1>SAVE CHANGES</h1></span></div>
          <div onClick={this.onClickPublish.bind(this)}>
            <h1>PUBLISH</h1>
          </div>
        </div>
      </div>
      );
  }
};

module.exports = Article;