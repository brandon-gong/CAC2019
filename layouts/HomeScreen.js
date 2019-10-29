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
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Constants from 'expo-constants';
import GlobalData from '../data/GlobalData';
import { Feather as Icon } from '@expo/vector-icons';

class HomeScreen extends React.Component {

    render() {
        return (
            <ScrollView style={this.styles.container}>
                <Text style={this.styles.header}>Good Afternoon!</Text>
                <Text style={this.styles.bodyText}>
                    Welcome to CRIS.
                </Text>
                <Text style={{fontFamily: 'sans-bold', fontSize: 30}}>Your Stats</Text>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                        <Text style={{color: GlobalData.getInstance()._fgAccentColor, fontSize: 50, fontFamily: 'sans-xlight'}}>67</Text>
                        <Text style={{marginTop: 8, color: "#ddd", fontFamily: 'sans-bold', fontSize: 15}}>YOUR SCANS</Text>
                    </View>
                    <View><Text style={{fontSize: 100, fontFamily: 'sans-xlight', color: "#ddd"}}>/</Text></View>
                    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                        <Text style={{color: GlobalData.getInstance()._fgAccentColor, fontSize: 50, fontFamily: 'sans-xlight'}}>75</Text>
                        <Text style={{marginTop: 8, color: "#ddd", fontFamily: 'sans-bold', fontSize: 15}}>YOUR NEXT GOAL</Text>
                    </View>
                </View>
                <Text style={{fontFamily: 'sans-bold', fontSize: 30, marginTop: 40}}>Get Started</Text>
                <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 30}}>
                    <TouchableOpacity style={{flex: 1}} onPress={() => this.props.navigation.navigate("Articles")}>
                        <View style={{backgroundColor: GlobalData.getInstance()._fgAccentColor, height: 180, marginRight: 4, flex: 1, borderRadius: 10, alignItems: "center", justifyContent: "center"}}>
                            <Icon name="file-text" size={50} style={{color: "white"}}/>
                            <Text style={{color: "white", marginTop: 10, fontFamily: 'sans-regular', fontSize: 15}}>Browse Articles</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1}} onPress={() => this.props.navigation.navigate("Catalog")}>
                        <View style={{backgroundColor: GlobalData.getInstance()._fgAccentColor, height: 180, flex: 1, marginLeft: 4, borderRadius: 10, alignItems: "center", justifyContent: "center"}}>
                            <Icon name="camera" size={50} style={{color: "white"}}/>
                            <Text style={{color: "white", marginTop: 10, fontFamily: 'sans-regular', fontSize: 15}}>Quick Scan</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
    styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + 20,
        backgroundColor: GlobalData.getInstance()._bgColor,
        paddingLeft: 20,
        paddingRight: 20,
      },
      header: {
          fontFamily: GlobalData.getInstance()._h1FontFamily,
          fontSize: 50,
      },
      bodyText: {
          fontFamily: GlobalData.getInstance()._pFontFamily,
          fontSize: 25,
          marginTop: 10,
          marginBottom: 40, // IMPORTANT otherwise content gets obscured
      }
    });
}

HomeScreen.navigationOptions = {
  title: 'Home',
  header: null,
};

export default HomeScreen;
