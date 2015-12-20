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
      video: null,
      userInfo: null,
      addingImage: false,
      addingVideo: false
    };
  }

  onClickPublish() {
    console.log('publish work button');
    if (this.props.userInfo) {
      var url = `${globalVar.restUrl}/api/work/${this.props.userInfo.id}`;
      var body = {
        title: this.state.title,
        description: this.state.description,
        price: this.state.price,
        category: this.state.category,
        tags: this.state.tags,
        picture: null,
        video: null,
      };
      if (this.state.addingImage) body.picture = this.state.picture;
      if (this.state.addingVideo) body.video = this.state.video;
      console.log('body.video', body.video);
      console.log('before fetching');
      fetch(helpers.requestHelper(url, body, 'POST'))
      .then((response) => response.json())
      .then((responseData) => {
        console.log('data s3 url');
        console.log(responseData.status);
      })
      .done();
      console.log('after fetching');
    }
  }

  onMediaSubmitted(document) {
    console.log('on media submitted');
    var fileReader = new FileReader();
    fileReader.readAsDataURL(document.getElementById("uploadMedia").files[0]);
    fileReader.onload = function(e) {
      // Binary64-url
      console.log('onload', e.target.result.substring(5, 10));
      if (e.target.result.substring(5, 10) === 'image') {
        this.setState({picture: e.target.result});
        this.setState({addingImage: true, addingVideo: false});
        document.getElementById("uploadPreview").src = e.target.result;
      } else if ( e.target.result.substring(5, 10) === 'video') {
        this.setState({addingImage: false, addingVideo: true});
        this.setState({video: e.target.result});
      }
    }.bind(this);
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
              <source type="video/mp4" src={this.state.video}/>
            </video>"
          </div>
          <span><h1>Ideal size: 400px x 400px</h1></span>
        </div>
        <div className="uploadPreviewWrapper" style={this.state.addingImage ? {opacity: 1} : {opacity: 0, height: 0}}>
          <div className="uploadPreviewContainer">
            <img className="uploadPreview" id="uploadPreview"/>
          </div>
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