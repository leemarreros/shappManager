'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import helpers from '../utils/dbHelpers';
import globalVar from '../utils/globalVariables';


class Work extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      price: null,
      category: null,
      description: null,
      tags: null,
      picture: null,
      userInfo: null,
      addingImage: false,
      addingVideo: true,
      mediaFile: null
    };
  }

  onClickPublish() {
    var url = `${globalVar.restUrl}/api/work/${this.props.userInfo.id}`;
    var body = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price,
      category: this.state.category,
      tags: this.state.tags,
      pictures: this.arrayPictures,
      videos: this.arrayVideos,
    };

    fetch(helpers.requestHelper(url, body, 'POST'))
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.status);
      })
      .done();

  }

  onMediaSubmitted(document) {
    console.log('on media submitted');
    var mediaFile = document.getElementById("uploadMedia").files[0];

    if (mediaFile.type === 'video/mp4') {
      console.log('inside if video');
      this.addMediaFileVideo(mediaFile);
      this.setState({addingVideo: true});
      return;
    }

    var fileReader = new FileReader();
    fileReader.readAsDataURL(mediaFile);
    fileReader.onload = function(e) {
      console.log('onload', e.target.result.substring(5, 10));
      if (e.target.result.substring(5, 10) === 'image') {
        this.addMediaFilePicture(e.target.result);
        this.setState({addingImage: true});
        // document.getElementById("uploadPreview").src = e.target.result;
      }
    }.bind(this);
  }

  addMediaFilePicture(picture) {
    this.arrayPictures = this.arrayPictures || [];
    console.log('addMediaFilePicture work button');
    if (this.props.userInfo) {
      var url = `${globalVar.restUrl}/api/workimages/${this.props.userInfo.id}`;
      var body = {
        picture,
      };
      fetch(helpers.requestHelper(url, body, 'POST'))
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.arrayPictures.push(responseData.awsImageURL);
        console.log(this.arrayPictures);
      })
      .done();
    }
  }

  addMediaFileVideo(mediaFile) {
    this.arrayVideos = this.arrayVideos || [];
    console.log('autoclick work button');
    if (this.props.userInfo) {
      var url = `${globalVar.restUrl}/api/workvideos/${this.props.userInfo.id}`;
      var data = new FormData();
      data.append('file', mediaFile);
      fetch(helpers.requestHelperVideo(url, data, 'POST'))
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.arrayVideos.push(responseData.cloudFrontVName);
        console.log(this.arrayVideos);
      })
      .done();
    }

  }

  render() {
    return (
      <div className="wrapperArticles">
        <div><div className="wrappH1"><h1>All Products</h1></div></div>
        <div><input className="inputBox" type="text" placeholder="Product's title"></input></div>
        <div className="twoInputBoxes"><input className="inputBox" type="number" placeholder="Price ($124.00)"></input><input className="inputBox" type="text" placeholder="Category"></input></div>
        <div><textarea className="textArea" rows="4" placeholder="Describe what are you thoughts here!" cols="50"></textarea></div>
        <div><input className="inputBox" type="text" placeholder="Tags (example: metal, glass, gold)"></input></div>
        <div className="addFiles">
          <div className="wrapperButtonsArticle">
            <span className="addFilesButton">
              <input
                className="inputFile"
                type="file"
                name="photo"
                id="uploadMedia"
                onChange={this.onMediaSubmitted.bind(this, document)}/>
                <h1>+ Add Files</h1>
            </span>
          <img className="cameraButton" src={'../img/camera-publish-icon.png'}/></div>
        </div>
        <div className="uploadPreviewWrapper" style={this.state.addingVideo ? {opacity: 1} : {opacity: 0, height: 0}}>
          <div className="uploadPreviewContainer">
            <video controls width="400" heigth="400">
              <source type="video/mp4" src="http://dj9tqqbq16had.cloudfront.net/Browserify-Overview.mp4"/>
            </video>"
          </div>
          <div onClick={this.addMediaFileVideo.bind(this)}><span><h1>Add Media File</h1></span></div>
          <span><h1>Ideal size: 400px x 400px</h1></span>
        </div>
        <div className="uploadPreviewWrapper" style={this.state.addingImage ? {opacity: 1} : {opacity: 0, height: 0}}>
          <div className="uploadPreviewContainer">
            <img className="uploadPreview" id="uploadPreview"/>
          </div>
          <div onClick={this.addMediaFilePicture.bind(this)}><span><h1>Add Media File</h1></span></div>
          <span><h1>Ideal size: 400px x 400px</h1></span>
        </div>
        <div className="wrapperEndButtons">
          <div><span><h1>SAVE CHANGES</h1></span></div>
          <div onClick={this.onClickPublish.bind(this)}>
            <span>
              <h1>PUBLISH</h1>
            </span>
          </div>
        </div>
      </div>
      );
  }
};

module.exports = Work;