/*
 * Copyright 2019 Brandon Gong
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Platform
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Feather as Icon } from '@expo/vector-icons';
import GlobalData from '../../data/GlobalData';
import dataL from '../../assets/data.json';
import Fuse from 'fuse.js';
import ConfigStorage from '../../data/ConfigStorage';

const fetch = require("node-fetch");

/**
 * Camera controller.  Renders camera and control buttons.
 * @author Brandon Gong, Abhishek Menothu
 */
export default class CameraView extends React.Component {

  // `width` and `height` are just default and
  // are modified when the camera loads
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flash: false,
    ratio: "16:9",
    width: Math.round(Dimensions.get('window').width),
    height: Math.round(Dimensions.get('window').width * 1.77778),
    showThinking: 2,
  };

  // Don't try to load the camera if we don't have access
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    // We can afford to return an empty View while we wait for `askAsync` because this
    // will be wrapped in `CatalogScreen`
    if (this.state.hasCameraPermission === null) {
      return <View />;
    } else if (this.state.hasCameraPermission === false) {

      // No camera access, make user aware of it (so it doesn't look like a glitch
      // that the camera doesn't show up)
      return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Icon style={{color: GlobalData.getInstance()._fgAccentColor}} name="camera-off" size={70}/>
            <Text style={{
              fontFamily: GlobalData.getInstance()._pFontFamily,
              fontSize: 20,
              marginTop: 8}}>
                No camera access :(
            </Text>
        </View>
      );
    } else {

      // Render camera and buttons.
      // Camera calls `calcRatio` on load.
      return (
        <View style={{backgroundColor: "black"}}>
          <Camera
            ref={(ref) => this.camera = ref}
            style={{
              width: this.state.width,
              height: this.state.height,
              marginLeft: Math.round(0.5*(Dimensions.get('window').width - this.state.width)),
              marginTop: Math.round(0.5*(Dimensions.get('window').height - this.state.height))
            }}
            type={this.state.type}
            autoFocus={Camera.Constants.AutoFocus.on}
            whiteBalance={Camera.Constants.WhiteBalance.auto}
            onCameraReady={this.calcRatio}
            ratio={this.state.ratio}
            zoom={0}
            flashMode={this.state.flash ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off}
          />
          <View style={this.styles.buttonContainer}>
            <TouchableOpacity style={this.styles.smallButton} onPress={() => this.setState({flash: !this.state.flash})}>
                <Icon style={{color: GlobalData.getInstance()._fgAccentColor}} name={this.state.flash ? "zap" : "zap-off"} size={15}/>
            </TouchableOpacity>
            <TouchableOpacity style={this.styles.bigButton} onPress={this.snap}>
                <Icon style={{color: "white"}} name="camera" size={25}/>
            </TouchableOpacity>
            <TouchableOpacity 
              style={this.styles.smallButton}
              onPress={() => this.setState({
                type: (this.state.type === Camera.Constants.Type.back)
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back})}>
                <Icon style={{color: GlobalData.getInstance()._fgAccentColor}} name="refresh-cw" size={15}/>
            </TouchableOpacity>
          </View>
          {this.state.showThinking === 1 && 
            (<View style={{
                position: "absolute",
                width: 250,
                height: 150,
                backgroundColor: "white",
                borderRadius: 15,
                padding: 15,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 0.5*(Dimensions.get('window').height - 150),
                marginLeft: 0.5*(Dimensions.get('window').width - 250),
              }}>
                <Icon style={{color: GlobalData.getInstance()._fgAccentColor}} name="eye" size={28}/>
                <Text style={{fontFamily: 'sans-xlight', fontSize: 20, marginTop: 8}}>Thinking...</Text>
            </View>)}
        </View>
      );
    }
  }

  // The phone's supported ratios may not include on that is exactly the size of the screen.
  // In this case, we have to find the closest ratio to the phone's screen ratio,
  // calculate the proper width and height to ensure its not distorted, and then calculate
  // margins to center the camera output on the screen.
  calcRatio = async () => {
    let bestRatio = "16:9";

    // Only need to recalculate on android; on iOS we assume 16:9 because
    // `getSupportedRatiosAsync()` is not supported
    if(this.camera && Platform.OS === "android") {
      let supportedRatios = await this.camera.getSupportedRatiosAsync();
      let maxErr = Infinity;
      let wanted = Math.round(Dimensions.get('window').height/Dimensions.get('window').width);

      // find the ratio that deviates the least from screen ratio
      for(let sr of supportedRatios) {
        srInts = sr.split(":").map((x) => parseInt(x));
        curRatio = srInts[0] / srInts[1];
        if(Math.abs(wanted - curRatio) < maxErr) {
          bestRatio = sr;
          maxErr = Math.abs(wanted - curRatio);
        }
      }
    }
    let brNums = bestRatio.split(":").map((x) => parseInt(x));

    // Find the size of a unit square (3x4 screen has 12 unit squares, 16x9 has 144)
    let unitSize = Math.round(
      Math.max(Dimensions.get('window').height / brNums[0],
      Dimensions.get('window').width / brNums[1]));
    this.setState({ratio: bestRatio, width: unitSize*brNums[1], height: unitSize*brNums[0]});
  }

  // Handle photo capture.
  // Update UI to show response and then upload image to Cloud AI for labelling
  snap = async () => {
    if (this.camera) {
      this.setState({showThinking: 1});
      let photo = await this.camera.takePictureAsync({base64: true, quality: 0});
      let opts = {
        "requests":[
            {
                "image":{
                    "content": photo.base64
                },
                "features":[
                    {
                        "type":"LABEL_DETECTION",
                        "maxResults":10
                    }
                ]
            }
        ]
      }
      fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAr3tUJjFH9fXUfu7yA_o2KRWYRcfjC8Nk', {
          method: 'post',
          body: JSON.stringify(opts)
      }).then((response) => {
          return response.json();
      }, (error) => {
        console.log(error);
        this.setState({showThinking: 0});
      }).then((data) => {

        // PARSE DATA
        let options = {
          shouldSort: true,
          threshold: 0.3,
          distance: 0,    
          keys: [{
              name: 'name',
              weight: 0.7
          }, {
              name: 'keywords',
              weight: 0.3
          }]  //end keys weight
        }; //end options 
        let fuse = new Fuse(dataL, options);
        let fullList = data.responses[0].labelAnnotations.filter((annotation) => annotation.score > 0.80);
        let reccs = [];
        let filterReccs = [];
          
        for(let i = 0; i < Math.min(fullList.length, 5); i++) {
          reccs.push({name : fullList[i].description});
          filterReccs.push((JSON.stringify(reccs[i].name)).replace('"', ''))    
          }

      let weights = {}
      for(let j = 0; j < filterReccs.length; j++){
          let tmp = (filterReccs[j].replace('"',''))
          let value = tmp
          unverResult = fuse.search(value)

          for(let g=0; g< Math.min(unverResult.length, 5); g++){
            {
              let tmp2 = JSON.stringify(unverResult[g].name)
              if (weights[tmp2] === undefined){
                weights[tmp2] = (6-g)/6
              }
              else{
                weights[tmp2] = weights[tmp2] + (6-g)/6
              }
            }             
          }
      }

      let x = Object.keys(weights).sort((a, b) => weights[b] - weights[a]).slice(0, 5);
      for(let i = 0; i < x.length; i++) {
        x[i] = x[i].substr(1, x[i].length - 2);
      }
      ConfigStorage.getInstance().setNumScans(ConfigStorage.getInstance().getNumScans() + 1);
      this.props.navfunc("VisionResults", {items: x});
      });
    }
  };

  styles = StyleSheet.create({
    buttonContainer: {
      flexDirection: "row",
      marginTop: 0.5*(Dimensions.get('window').height - this.state.height) - 160,
      alignItems: "center",
      justifyContent:"space-between",
      marginLeft: Dimensions.get('window').width / 4 - 40,
      marginRight: Dimensions.get('window').width / 4 - 40,
      shadowColor: "black",
      shadowOpacity: 0.5,
      shadowRadius: 2,
      shadowOffset: {width: 2, height: 2}
    },
    smallButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center"
    },
    bigButton: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: GlobalData.getInstance()._fgAccentColor,
      alignItems: "center",
      justifyContent: "center"
    }
  });
}
