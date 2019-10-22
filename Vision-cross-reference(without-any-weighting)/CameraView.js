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
                    "content": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTERMTEBEWExUXFRYXFxgVGBUZFhsTFxgXFxgXFhcYICggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAMsA+AMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAwQCBQYHAf/EADwQAAIBAgQEAgcHAgUFAAAAAAABAgMRBAUhMQYSQVFhcQciMoGRocETI0JSsdHwgvEWM2JjkhRyg8Lh/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAECAwQFBv/EADERAQACAgEDAgQEBgIDAAAAAAABAgMRIQQSMUFRBRMiMnGRsdEUFUJhoeFS8CMzgf/aAAwDAQACEQMRAD8A9xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD43bcD5TmpJOLTTV007pp9U+oTMTHEsggAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHnPpWxdeDpJrmw81Zpdai1al7rW8mef11sldTE/S7+i7Ofd1HAsZLAUFO2kXa35eZ8q9y09x0dJabYazLn6nXzJ03x0MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcD6TMY1Uw9NxvC1Se341aMbeXM/ijzPiV+2Kw7+jxxatp9eHUcJ0uXBYdf7cZf8vWt8zs6WvbhrH9nLn/8AZb8W2N2QAAAAAAAAAAAAAAAAAAAAAAAAAKuPzGlRjzVqsKa7zkl8L7kTMQvTHa86rG3MYz0l4CDtGpOo/wDRCVm/BuxSclXbT4Z1FvTX4yho+kB1VfD4KpJfmqzjSj+kn8iPme0NP5bFfvvEfhG/2/VN/ifEO940YdkuabXm/Vv8Ce6UfweKPEzP5R+5S4irr2p0pf0SX/uO6UT0uP0ifz/0sQ4rmvboKS7wnr/xkl+pPepPRR6W/OP2/Zo+LM0hiXS5Yzg4wrJ86S1mocqUr21cTg63HbLNdR4if8xw26fp7Y9+J5jw73ARSpQimnaMVptokj0axqNPMv8AdKwSqAAAAAAAAAAAAAAAAAAAAAAAPkpJJtuyWrb2sB5/xNx9a8cI0oq6daSum/8Aaj+LzehlbJrw9Ppuhm33/l+7yzH4+dablKUpyb9qo+aT8uxzzO3vY8Vccajhucny2MLSqetPx2XgXrXTny5bWnUeG3q5h00SRM2Urh4VKme04vWfmV74b16W1o4hIuJKMlo7dPf5j5kK/wAFkiRZvB+zL5iMiZ6a3rC5RzLTV6Fu5hOD2XsDmEqbToTdO+8VrB+cHp79ye7XhlfDF/vjf6/m6HD8ZSirV6N3raVN6f1Req81fyLxk93FboItP0W/P/v7N3heIsNOKarRXdN6p9mujLRevu5L9LlpOprK3RzKjP2asH5SV/gTF6z6s7Yr18xK0WZgAAAAAAAAAAAAAAAAAAAedce8RqSnTjK1CF/tGt6k1+BP8nfuzO9tPR6Pp5mYn1/T+7x3Ns4lVl2XRLouhyzbb6PHirjrqGeQV06t5bLa43CbVm1eHRY3Nowje5M3Y0wTvlzOPzqc9IuyM5s6q9scQpKo+5Xboi3ApkbTEpI1n0J2mFyhmNSLsn8SdqzjrPo2NLiCpBq+v0G2NumrZ0OW8R0pJJy1ff8Acn5mnBl6S0Tw2kqVKo+a2v5ou1/huO+LMIvkx8LMKcLWav4/XzJ+mVJvbe4SUc4xOFadKq6lNP2KjclZ9pbor82+OeJ4JwYc/Fo1PvDsuGeLKGLXLF8lVLWnLfTrF/iXz8DsxZ65PxeV1XQ5On5nmPd0Bs4gAAAAAAAAAAAAAAABoeKc3VKKpRbVSotGltG9m79G9Uv/AIYZs9cet+ZdGDFNvqnxDzTN8klXg4uThy35IxStpsnc8+3UWtafZ6vT9TXFbxvfmXltSLu11va3W+1jWHtTz4bHC5TX6UZ694tfqZ/Nr7pjLirHNo/NJWybEt2dOTI+dT3VnqMX/KFCtgqkXaUJLzTLRes+JTWa28Sjaa0asS1gigmu9pIINKs6d7/uQnbGtLt2Csyyw8mtlciSvhuMHmkoLd7mcwyvjizqcqzVT06mFsk1ebnw9vLPHYtuMkrrQfO2jHERMS5ahjp0qqqRlaSd013W3ka1tPmHo2rXJTtl7fwRxXHGU7TsqqV7fmj+ZLo09GvLuergzd8c+XynW9HOC3Hh1Bu4QAAAAAAAAAAAAAADi8yyOtia1StOKSjLlhG7vaD0kl33dzzM/T5M15t4iPD0a56YqRSvr5/+sKmDadmiJpMcS59ufXCtCnUlUVNSnKTk5S1ak236vRblMlJmNQ67dbltEV3qI44bKWFInFpzdzGWAT/Cr+Bhbp98QmMswgq4FR3iR/D9nmFvnTPqqYrAUKitOEZecURbX9M6aY+oyUncS4LN+GZ0by3hd2a1sm9L9uhvTJviX0XS9ZTNxH3NZTwit7S+peZdiKlT9pdv5oJlPgUFboO5Z8pRte2pMqxp8qb3fRkR4Q2OXYqz8fAwyVY5Kbhv411yxe8tnft4nJaOXDNOZj0avH0NXyrxfv8A7GmK/HLXFeV/g+eIp4hSoxb5fXv0uuja6PWLXiddcvZPcz635c4/rnzw95ynMI16MKsNpLVPdSWkovxTuvcexS8XrFofLZcc47TWVwszAAAAAAAAAAAAAAAPlgKWY5dGom1pLv8ARmWTFFlq205XGUHTbi90cFomnEt4navUl1Rnedcp0rzrvZsznJvjZpFKkn4GdvaUwjqYZSi4ytKLVmn1RMRGuE1vasxaPMKNLJ6C2oQ+CG5bz1vUT5vLOGX0VflpwX9KImN+qs9VmnzafzRV8ui48sVyL/Qor4q1n7yPmZK+J4bY+ryRO5nf4uXzDhSceacJufZWSdvNO1/cI6nx3Rp6uL4jW2otGmiwuEqVHywg5SXReHc6JmteXfbJWkd1p1Dpsj4OrTfNWtTj2Wsn8NEZzbu4q8/qPimKkap9U/4dEuEIxi+WpK/jb6GFsV3n/wAztM81aSrlE3X5N5X2XbpcrjpM8OuvUVjH3+jsMlyZUOfld+dqVui01S8L3OmuPXEvK6nqpza/s3HDU508VKC/yqibt+WqvxLzS+SOvpLzW8458ejHJ23xbnzH6f6diek5AAAAAAAAAAAAAAAAAA57iqioxVVLW9n9P0OHrPoj5kN8PM9rmp11fwf1OK2WGsVR14eBnaJjwSg5GzG0TKYTUoNl8W5RZHOm1oTzCqKUWim5hMQkolqzvymY0njLS1kVmeNaGdKFNN8sEr72S1ZpWa61ota1uJldpTUVszopqsb0ymNvtNyk7d+haJmTS/huHpqUp2SlJK930XkbV6a/M+5OaZrFfSG4wOVqK+8Sk/kdGPBEfdzLKbeyzhcJGC0Wr3fU1pSK+ETO1gugAAAAAAAAAAAAAAAAAKGeqLw9Tn0XL8+nzsYdT2/Kt3ey+PfdGnnkY+rJPpt5HhVj6Jj2d1vuXsM+emm9/wBup047d+PnyxvGpfY0N2U+Xxs2iUuV+Bzd81tw17dwnxLVk7HTkycb0ziqBK62MYvuJ4T26S/Z6JpF5me2JiFfV9p0m9enQilbWnaZ0klBxV7a9Dbc0rtXW5QUlKT8znrN7yvqIdlk+XqEFKUfX8eh7mDDFa7ny5b23LZnQoAAAAAAAAAAAAAAAAAAAAA1+fwvh6iXZfJpnP1cbw2hpin6oeczqOLa/lup4GKZjcPQtETy2OBd6a8b28jqxz/42F45WsPzWtJCs2iNTDOdbVq8bNW7nJeJidw3r4ZKF14F4jcE8LFHCaa9jeuPhlNmVSGiSRW++IiCEtJaW2sdFPt0iUU9WuhjNt62tEaXeHKV6u3spv6fU6Oir9f4K5uKurPWcoAAAAAAAAAAAAAAAAAAAAABBjop05319V/oVvG6ymvl5hi42k+7R87avbt6ETuG4wtJOMVa1ktPE6K1i1YhjaeWyikzadSzUFQdm+zZxxjmYmWvckoo0r4RMrKkbRMqo5yvOKRha28kRCY8Eom8whBNbs5bVjy1iW64Xo6Sk1vZJ9PFeex6PQUmIm0sc8+jfnoucAAAAAAAAAAAAAAAAAAAAB8k7avQDU5vmsFTag1JyTWnS/VnPlzVivDStJ3y43CYfnm5P8PzZ5cVm1t+zomdQ29LDaXLxjnyzmyRqy03E+BLGl6ti1aarpG+VOdJxfq6oxtW1J4Wi0SlpO5es7jZKZ0+vUtNOe5G0UoDRtH9l3MuyPVfubzh32JK+t/lbc9Ho/tmGOXy252MgAAAAAAAAAAAAAAAAAAAKmPxfIrJ+s9vLuZ5L64jytEbaPFYhyVpSbXmcl7TPmV44UayUmopf2KW1PELR7rMYJaJCfaEJrkTIxmU2PsJaFonglHUZEz6D5BJCsRHBtI3cWEd90ViUyjktDO0LRK7ldeUJWX4mlqdOC81n8VLRt0Z6TEAAAAAAAAAAAAAAAAAAFDMMTOm01Zxffo/cY5b2pPHhesRLSzxEqknKT20Ofum87lbWkVaLsVtWUwgwcHzSbKUiYmdrT4X00abhRHVkZXlMPnNoRuEs6RescKywqIpNRgpE6H3nEzsZEaSXsTwh9sQltsux70hP3P9zsw5d8SpaG0OlQAAAAAAAAAAAAAAAAAKuZ4Z1KUox3a0/wC5aozy076TELVnU8uHxuYOhaMo7aS1ad+vQ4Ld1Ih6GHpoyx5UsTxTDllyJ3S2ZnOe3o1r8OvuO6eHO4bjOrGbc0pRb22aXgU+qJ3t6N/hmK1dV4l0OD4yw83ZycW+6dvitCfm68w87J8MzV5jlLiuLsNC96nM0r2im/mlYj5keiuP4dnv/Tr8VzKM5p4impw67rqn2YreN6lh1HT2wXmtm0hVsbxZzaYykV5EMpWG9JQV66S55aR79Oi+q+Jla+vq9F60m06jysUKqaTTui9LRMbhS0THErKsaxpVjexEx7JfHUK92pStUM6VJfey9Tu+n7m9Oo7fu8EYpvOqwzyDO54qpKUIcmHinyuS9acrqz/0q19N2dGO9rzvWoa5+nrhrETO7fp/tvzZyAAAAAAAAAAAAAAAADlON8q54faRV7e19GY5qbh29Hm7Lal5RmEeVs8+a8vocdu6GjxSvv8A2J06a20rzk1ZFO1bb5z20T1+hXS222yXMJ0XenK386oxyRzthnx1yxq8O2wPGUNFVi1pe61X7k0y2jy8bJ8Lt5pLYf4sw1l94tddnc1/iOPDn/l2f/ioZlxfQjFuF5PpZaGdstrcRDXF8MyzP1cOGxeeVaknzTbvra+luyQjHw97F0+PHEdsL2S8XToeq1zx0Vm9V5MmMcxzDDqegx5ufEuhp+kCn1pyv4NFotd58/CLb4tDGv6QYOPq0pe9pEzN1q/Bbb5tClkHF7VSf/UTbUtVtaNru1vkV1aPHLfq/htZpHyo1Mf5X8DTqZjiqe8acX6sb6PrzSXuOnBim07ljaadFimI5tPr+z13B4WNKChBWSPSiNPn7Wm07lOSqAAAAAAAAAAAAAAAAMakE001dNWa8APJeO8hdCfMk3Tls+if5X4nFmx6nb3ug6iLx2z5cJVgjB6m1GvCxGl4ttXUtUNLbXcJJGN4VtL5LEPXQjsITUqa3bKT7HfPhVxcuxpWF4sqSn4msVW7huxOkdz5zeOpOkbSKXX+XI00iy5leGlVnGMU227ad/A0rTbHLmildy9/4N4eWFpJyX3jWvh4L6ndSnbD5Pq+onNffo6Iu5QAAAAAAAAAAAAAAAAAAQY7Bwq05U6sVKMlZp/zciY3xK1bTWdx5eMcZcDVsNJzw8lWp78t0qiXk/a818DlvgmPD2cHxGLRq7iZVbvlmnCS6Sun8zC1Zjy9CmWtuayrVaTT28iG0WZ0mys12dya9yOxSbjqNbtLzsiflK/OrCpUqw61I/FGsYZ9mVutxx/Ujw9alKXKp3fk0viy1qdscs46+lp1ErtbDWM29cu1SUdeo06a2hayrLamIqKnRg5yutFrv+hetJnwrlz1x17rcPc+AuCY4OKqVrSrNadVBW2XeXiddMfa+d6zrJzTqPH6u0NHAAAAAAAAAAAAAAAAAAAABp+IMLiqkbYarCHe90/ir/QiVqzX1eeZxwDmdRNqvTl4KpNP5wt8ysxLaMlHJ4v0R5nJ35abff7VXI7ZW+ZSPEyjpejLOY6KnTa8akGUnDEuinXWr67/ABXKfo5za3+RRX/kj+5HyIaT8Sn2Q1fRbm8vw0kuyqxX0LxiiHPfrL29dIV6HMyb9aNLzdW/0L6c02ifMtlhPQfi2/vcRh4LvD7Sbv5OMf1GpV3VtMN6CY2+9xzvfTkppfrIaO7XhsqPobjFWWYVWuzpwf1M5wVdNOtvRboeiDD6faYqvLW7UVSimr7ey2vcyYw1hefiOWfGnbZHkVDCU1Tw9NRSvrvJt7tyer2RpERHhy5c18tu687lsiWQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/9k="
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
      console.log((data.responses[0].labelAnnotations))
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
      for(let j = 0; j < filterReccs.length; j++){
          let tmp = (filterReccs[j].replace('"',''))
          let value = tmp
          unverResult = fuse.search(value)
          //console.log("j: " + j + "result" + unverResult)
        
          console.log("reccs: " + value)
          for(let g=0; g< Math.min(unverResult.length, 5); g++){
            {
              listAll[counter] = JSON.stringify(unverResult[g].name)
              
              console.log(" --: " + listAll[counter])
              counter = counter + 1  
            }
              //possibleResult.push(JSON.stringify(unverResult[g].name))               
          }
      }
      console.log("listAll : " + listAll) 
      console.log("length is: " + listAll.length)  
      //console.log(unverResult)
      //console.log(possibleResult)
      
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

      console.log("most probable without weight: " + mostProbable)

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
