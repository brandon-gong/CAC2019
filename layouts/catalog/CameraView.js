import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Feather as Icon } from '@expo/vector-icons';
import GlobalData from '../../data/GlobalData'

const fetch = require("node-fetch");

export default class CameraView extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flash: false,
    ratio: "16:9",
    width: Math.round(Dimensions.get('window').width),
    height: Math.round(Dimensions.get('window').width * 1.77778),
    showThing: false,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    if (this.state.hasCameraPermission === null) {
      return <View />;
    } else if (this.state.hasCameraPermission === false) {
      return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Icon style={{color: GlobalData.getInstance()._fgAccentColor}} name="camera-off" size={70}/>
            <Text style={{fontFamily: GlobalData.getInstance()._pFontFamily, fontSize: 20, marginTop: 8}}>No camera access {"\u00a0"}:(</Text>
        </View>
      );
    } else {
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
          {this.state.showThing && <View style={{width: 100, height: 100, backgroundColor: "white", marginTop: -0.5*(Dimensions.get('window').height)}}></View>}
        </View>
      );
    }
  }

  calcRatio = async () => {
    let bestRatio = "16:9";
    if(this.camera && Platform.OS === "android") {
      let supportedRatios = await this.camera.getSupportedRatiosAsync();
      let maxErr = Infinity;
      let wanted = Math.round(Dimensions.get('window').height/Dimensions.get('window').width);
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
    let unitSize = Math.round(Math.max(Dimensions.get('window').height / brNums[0], Dimensions.get('window').width / brNums[1]));
    this.setState({ratio: bestRatio, width: unitSize*brNums[1], height: unitSize*brNums[0]});
  }

  snap = async () => {
    if (this.camera) {
      this.setState({showThing: true});
      console.log("here");
      let photo = await this.camera.takePictureAsync({base64: true});
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
        this.setState({showThing: false});
      }).then((data) => {
          let candidates = data.responses[0].labelAnnotations.filter((annotation) => annotation.score > 0.80);
          let reccs = [];
          for(let i = 0; i < Math.min(candidates.length, 5); i++) {
            reccs.push({name: candidates[i].description});
          }
          
          console.log(JSON.stringify(candidates, null, 2));
          console.log(JSON.stringify(data));
          this.setState({showThing: false});
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
