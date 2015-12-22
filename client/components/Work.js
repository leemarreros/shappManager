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
      mediaFilePicturesArray: null,
      mediaFileVideosArray: null,
      showAllProducts: false,
      listOfProducts: null,
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
    console.log(this.state.arrayPictures);
    fetch(helpers.requestHelper(url, body, 'POST'))
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.status);
        this.arrayPictures = [];
        this.arrayVideos = [];
        this.setState({listOfProducts: null, showAllProducts: true});
        this.setState({mediaFilePicturesArray: null});
        this.setState({mediaFileVideosArray: null});
      })
      .done();

  }

  onMediaSubmitted(document) {
    console.log('on media submitted');
    this.arrayPictures = this.arrayPictures || [];
    this.arrayVideos = this.arrayVideos || [];
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
      }
    }.bind(this);
  }

  addMediaFilePicture(picture) {
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
        this.showPreviewOfMediaFiles();
        console.log(this.arrayPictures);
      })
      .done();
    }
  }

  addMediaFileVideo(mediaFile) {
    console.log('addMediaFileVideo work button');
    if (this.props.userInfo) {
      var url = `${globalVar.restUrl}/api/workvideos/${this.props.userInfo.id}`;
      var data = new FormData();
      data.append('file', mediaFile);
      fetch(helpers.requestHelperVideo(url, data, 'POST'))
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.arrayVideos.push(responseData.cloudFrontVName);
        this.showPreviewOfMediaFiles();
        console.log(this.arrayVideos);
      })
      .done();
    }

  }

  showPreviewOfMediaFiles() {
    var prevArrVideos = prevArrVideos || null;
    var prevArrPictures = prevArrPictures || null;

    if (this.arrayVideos.length === 1 && prevArrVideos === null) {
      prevArrVideos === 0;
    }

    if (this.arrayPictures.length === 1 && prevArrPictures === null) {
      prevArrPictures === 0;
    }

    if (this.arrayPictures.length !=0) {
      if (this.arrayVideos.length != prevArrVideos) {
        this.setState({mediaFilePicturesArray: this.arrayPictures});
        prevArrVideos = this.arrayVideos.length;
      }
    }

    if (this.arrayVideos.length !=0) {
      if (this.arrayPictures.length != prevArrPictures) {
        this.setState({mediaFileVideosArray: this.arrayVideos});
        prevArrPictures = this.arrayPictures.length;
      }
    }

  }

  onAllProductsClick() {
    this.setState({showAllProducts: !this.state.showAllProducts});
    if (this.state.listOfProducts === null) {
      var url = `${globalVar.restUrl}/api/work/${this.props.userInfo.id}`;

      fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({listOfProducts: responseData.data});
      })
      .done();
    }
  }

  render() {
    return (
      <div className="wrapperArticles">
        <div>
          <div className="wrappH1" onClick={this.onAllProductsClick.bind(this)}>
            {this.state.showAllProducts ?
              <h1>Add a product</h1>
              :
              <h1>All Products</h1>
            }
          </div>
        </div>

        { this.state.showAllProducts ?
          <div className="wrapperAllProducts">
            { this.state.listOfProducts && this.state.listOfProducts.map(function(product, i){
                return (
                  <div key={i} className="wrapperProuct">
                    <div className="wrapperText">
                      <div className="titleProduct"><h1>{product.title}</h1></div>
                      <div className="descriptionProduct"><h1>{product.description}</h1></div>
                    </div>
                    <div className="wrapperImage">
                      {
                        !!product.pictures.length ?
                        <div className="wrapperPictureList">
                          <img className="pictureList" src={product.pictures[0]}/>
                        </div>
                        :
                        <div className="noPictureList"/>
                      }
                      </div>
                  </div>
                );
              })
            }
          </div>
          :
          <div>
          <div>
            <input
              className="inputBox"
              type="text"
              onChange={(event)=> {this.setState({title: event.target.value})}}
              placeholder="Product's title"/>
          </div>
          <div className="twoInputBoxes">
            <input
              className="inputBox"
              type="number"
              onChange={(event)=> {this.setState({price: event.target.value})}}
              placeholder="Price ($124.00)"/>
            <input
              className="inputBox"
              type="text"
              onChange={(event)=> {this.setState({category: event.target.value})}}
              placeholder="Category"/>
          </div>
          <div>
            <textarea
              className="textArea"
              rows="4"
              onChange={(event)=> {this.setState({description: event.target.value})}}
              placeholder="Describe what are you thoughts here!" cols="50"/>
          </div>
          <div>
            <input
              className="inputBox"
              type="text"
              onChange={(event)=> {this.setState({tags: event.target.value})}}
              placeholder="Tags (example: metal, glass, gold)"/>
          </div>
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

          <div className="displayPreview">

            <div className="picturesDisplay">
              {this.state.mediaFilePicturesArray && this.state.mediaFilePicturesArray.map(function(picture, i){
                return (
                  <div key={i} className="pictureWrapper">
                    <img className="picture" src={picture}/>
                  </div>
                );
              })}
            </div>

            <div className="videosDisplay">
              {this.state.mediaFileVideosArray && this.state.mediaFileVideosArray.map(function(video, i){
                return (
                  <div key={i} className="videoWrapper">
                    <video  className="video" controls width="400" heigth="400">
                      <source type="video/mp4" src={video}/>
                    </video>
                  </div>
                );
              })}
            </div>
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
        }
      </div>
      );
  }
};

module.exports = Work;