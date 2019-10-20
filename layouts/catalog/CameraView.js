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

export default class CameraView extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flash: false,
    ratio: "16:9",
    width: Math.round(Dimensions.get('window').width),
    height: Math.round(Dimensions.get('window').width * 1.77778),
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
          />
          <View style={this.styles.buttonContainer}>
            <TouchableOpacity style={this.styles.smallButton} onPress={() => this.setState({flash: !this.state.flash})}>
                <Icon style={{color: GlobalData.getInstance()._fgAccentColor}} name={this.state.flash ? "zap" : "zap-off"} size={15}/>
            </TouchableOpacity>
            <TouchableOpacity style={this.styles.bigButton} onPress={null}>
                <Icon style={{color: "white"}} name="camera" size={25}/>
            </TouchableOpacity>
            <TouchableOpacity style={this.styles.smallButton} onPress={null}>
                <Icon style={{color: GlobalData.getInstance()._fgAccentColor}} name="refresh-cw" size={15}/>
            </TouchableOpacity>
          </View>
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
