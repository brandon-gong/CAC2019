import React from 'react';
import Fuse from 'fuse.js';
import dataW2 from './dataW2.json';
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
                    "content": "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"
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
          // let candidates = data.responses[0].labelAnnotations.filter((annotation) => annotation.score > 0.80);
          // let reccs = [];
          // for(let i = 0; i < Math.min(candidates.length, 5); i++) {
          //   reccs.push({name: candidates[i].description});
          // }
          
          // console.log(JSON.stringify(candidates, null, 2));
          // console.log(JSON.stringify(data));
          // this.setState({showThing: false});
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
        //let fuse = new Fuse(dataW2, options);
        let fuse = new Fuse(dataW2, options);
        let fullList = data.responses[0].labelAnnotations.filter((annotation) => annotation.score > 0.80);
        let reccs = [];
        let filterReccs = [];
        let possibleResult = [];
          
        for(let i = 0; i < Math.min(fullList.length, 5); i++) {
          reccs.push({name : fullList[i].description});
          filterReccs.push((JSON.stringify(reccs[i].name)).replace('"', ''))    
          }
      //console.log((data.responses[0].labelAnnotations))
      //console.log(reccs)
      //reccs = reccs.replace('name:', '')
      //console.log(filterReccs.length)
      //console.print(dataW2.length)
      //console.log(dataW2.length)
      //console.log("filter rreccs " + filterReccs)
      //console.log((filterReccs[0]).replace('"', ''))
      // tmp1 = ((filterReccs[0]).replace('"',''))
      // tmp2 = fuse.search(tmp1)

      // console.log("tmp1 is " + tmp1)
      // console.log(tmp2)
    
      let listAll = []
      let counter = 0
      
      let weights = {}
      //else add the i/5 

      //TAKES KEYWORDS FROM GOOGLE AND FUSE SEARCHES THEM 
      //AND AUTOMATICALLY SCORES THEM AND POPULATES THE WEIGHTS{} DICT 
 
      for(let j = 0; j < filterReccs.length; j++){
          let tmp = (filterReccs[j].replace('"',''))
          let value = tmp
          unverResult = fuse.search(value)
          //console.log("j: " + j + "result" + unverResult)
        
          console.log("reccs: " + value)
          for(let g=0; g< Math.min(unverResult.length, 5); g++){
            {
              let tmp2 = JSON.stringify(unverResult[g].name)
              if (weights[tmp2] === undefined){
                weights[tmp2] = (6-g)/6
              }
              else{
                weights[tmp2] = weights[tmp2] + (6-g)/6
              }
              
              //console.log(" --: " + listAll[counter])
              //counter = counter + 1  
            }
              //possibleResult.push(JSON.stringify(unverResult[g].name))               
          }
      }
      // console.log("listAll : " + listAll) 
      // console.log("length is: " + listAll.length)  
      console.log("total weight: " + JSON.stringify(weights))
            
      //DETERMINING WHICH HAS THE HIGHEST WEIGHT SCORE
      let max = -1 
      let finalItem
      let pop
      for (pop in weights){
        // console.log("for pop: " + pop)
        // console.log("pop value: " + weights[pop])
        if (weights[pop] > max){
          max = weights[pop]
          finalItem = pop 
          
        }
      }
      console.log("max: " + max)
      console.log("finalItem: " + finalItem)

      //FINALiTEM IS THE MOST PROBABLE ITEM BASED ON WEIGHTING

      //console.log(unverResult)
      //console.log(possibleResult)
      /*      
      let counts = []
      let compare = -1
      let mostProbable

      for(let h = 0; h < listAll.length; h++ ){
        let item = listAll[h]
        if (counts[item] === undefined){
          counts[item] = 1
        }
        else{
          counts[item] = counts[item] + 1
        }
        if (counts[item] > compare){
          compare = counts[item]
          mostProbable = listAll[h]
        }
      }
      */

      //console.log("most probable without weight: " + mostProbable)

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
