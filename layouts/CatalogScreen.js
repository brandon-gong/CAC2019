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
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text
} from 'react-native';
import Constants from 'expo-constants'
import CameraWrapper from './catalog/CameraWrapper'
import GlobalData from '../data/GlobalData'
import { Feather as Icon } from '@expo/vector-icons';
import Fuse from "fuse.js"

import data from "../assets/data.json"

class CatalogScreen extends React.Component {

  state = {
    text: "",
    reccs: [],
    barIsFocused: false,
  }

  options = {
    shouldSort: true,
    threshold: 0.3,
    
    keys: [{
      name: 'name',
      weight: 0.7
    }, {
      name: 'keywords',
      weight: 0.3
    }],
  }

  constructor(props) {
    super(props);
  }
  

    render() {
        let x;
        if(this.state.reccs.length === 0) {
          x = (
            <View style={{backgroundColor:"white", zIndex: 2, marginTop: -24, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, padding: 15, paddingLeft: 20}}>
              <View style={{height: 14}}></View>
              <Text style={{fontFamily: 'sans-light-italic'}}>No results found.</Text>
            </View>
          );
        } else {
          x = (
            <View style={{backgroundColor:"white", zIndex: 2, marginTop: -24, borderBottomLeftRadius: 24, borderBottomRightRadius: 24}}>
              <View style={{height: 24}}></View>
              {this.state.reccs.map((result) => {
                return (
                  <TouchableOpacity key={result.name} style={this.styles.searchResultTouchable} onPress={null}>
                    <Text style={{fontFamily: GlobalData.getInstance()._pFontFamily}}>{result.name}</Text>
                  </TouchableOpacity>
                );
                })
              }
            </View>
          );
        }
        
        return (
          <View style={{flex: 1}}>
            <View style={this.styles.searchContainer}>
              <View style={{flex: 1, flexDirection: "column"}}>
                <TextInput 
                  style={this.styles.searchBar}
                  placeholder="Search..."
                  value={this.state.text}
                  onChangeText={this.handleInput}
                  onFocus={() => this.setState({barIsFocused: true})}
                  onBlur={() => this.setState({barIsFocused: false})}/>
                {this.state.barIsFocused && x}
              </View>
              <TouchableOpacity style={this.styles.catalogButton} onPress={null}>
                <Icon style={{color: "white"}} name="layers" size={15}/>
              </TouchableOpacity>
            </View>
            <CameraWrapper />
          </View>
        );
    }

    handleInput = (e) => {
      this.setState({text: e});
      this.setState({reccs: new Fuse(data, this.options).search(e).slice(0,5)});
      // let fuse = new Fuse(data, this.options);
      // let results = fuse.search(e);
      // let suggestions = [];
      // for (let i = 0; i < Math.min(results.length, 5); i++) {
      //   suggestions.push(JSON.stringify(results[i].name));
      // }
      // console.log("suggestions are = " + suggestions)
    }

    styles = StyleSheet.create({
      searchContainer: {
        paddingTop: Constants.statusBarHeight + 8,
        zIndex: 1,
        marginLeft: 30,
        marginRight: 30,
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {width: 2, height: 2},
        flexDirection: "row",
        height: 99999, // this is the dumbest thing ive ever seen
        marginBottom: -99999
      },
      searchBar: {
        borderRadius: 24,
        backgroundColor: "white",
        paddingLeft: 17,
        paddingRight: 17,
        fontFamily: 'sans-bold',
        fontSize: 17,
        height: 47,
        zIndex: 3
      },
      catalogButton: {
        width: 47,
        height: 47,
        borderRadius: 24,
        backgroundColor: GlobalData.getInstance()._fgAccentColor,
        alignItems: "center",
        justifyContent: "center",
        flex: 0,
        marginLeft: 15
      },
      searchResultTouchable: {
        borderTopColor: "#ccc",
        borderTopWidth: 0.5,
        paddingLeft: 17,
        paddingRight: 17,
        height: 43,
        fontSize: 15,
        justifyContent: "center",
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24
      }
    });
}

CatalogScreen.navigationOptions = {
  title: 'Catalog',
  header: null,
};

export default CatalogScreen;
