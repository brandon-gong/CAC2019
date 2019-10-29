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
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { StackActions } from 'react-navigation';
import Constants from 'expo-constants'
import { Feather as Icon } from '@expo/vector-icons';
import GlobalData from '../../data/GlobalData';

/**
 * Loaded once camera receives data back from image labelling and we search our
 * data json for top results.  Flexibly displays up to the top 5 results.
 * 
 * @author Brandon Gong
 */
class VisionResultsScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  // Render vision results
  render() {
    // Try to get search results, but if there
    // are no search results, `items` will be empty.
    let xs = this.props.navigation.getParam("items", false);
    let body;

    // If empty display a little message for the user
    // instead of just a blank white screen
    if(xs == false) {
      body = (
        <View style={this.styles.body}>
            <Icon 
                style={{color: GlobalData.getInstance()._fgAccentColor}}
                name="eye-off"
                size={70}/>
            <Text style={{
                fontFamily: 'sans-xlight',
                fontSize: 28, marginTop: 8}}>
                We couldn't find anything :(
            </Text>
        </View>
        );
    } else {
      // The .map() will dynamically generate JSX depending on how long the
      // list of recommendations is
      body = (<View style={this.styles.body}>
        {xs.map(x => (
            <TouchableOpacity
              style={this.styles.resultContainer}
              key={x}
              onPress={() => this.props.navigation.navigate("CatalogList", {focus: x})}>
                <Text style={this.styles.resultText}>
                  {x.toUpperCase()}
                </Text>
            </TouchableOpacity>)
        )}
        </View>);
    }

    // Put everything together and return
    return (
      <View style={this.styles.container}>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          marginLeft: 20}}>
          <TouchableOpacity
            hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
            onPress={() => this.props.navigation.dispatch(
              StackActions.pop({n:1}))}>
            <Icon name="arrow-left" size={30} style={{paddingRight: 15}}/>
          </TouchableOpacity>
          <Text style={this.styles.header}>Recommendations</Text>
        </View>
        {body}
      </View>
    );
  }

  // JSX styles
  styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    },
    header: {
      fontFamily: GlobalData.getInstance()._h1FontFamily,
      fontSize: 40,
    },
    body: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    resultContainer: {
        width: Dimensions.get("window").width - 80,
        height: (Dimensions.get('window').height - 200)/5 - 10,
        marginTop: 10,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: "white",
        borderColor: GlobalData.getInstance()._fgAccentColor,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    resultText: {
        fontSize: 17,
        fontFamily: 'sans-bold',
        color: GlobalData.getInstance()._fgAccentColor
    }
  });
}

VisionResultsScreen.navigationOptions = {
  title: 'Vision Results',
  header: null
};



export default VisionResultsScreen;
