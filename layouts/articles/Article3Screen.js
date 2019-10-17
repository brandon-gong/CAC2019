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
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import { StackActions } from 'react-navigation';
import Constants from 'expo-constants'
import { Feather as Icon } from '@expo/vector-icons';
import GlobalData from '../../data/GlobalData'

// if we want border outline its borderTopWidth: 8, borderLeftWidth: 8, marginLeft: -10, borderColor: GlobalData.getInstance()._fgAccentColor

class Article3Screen extends React.Component {

    render() {
        return (
            <ScrollView style={this.styles.container}>
                <Image
                    source={require('../../assets/images/tree.jpeg')}
                    style={{
                        width: Math.round(Dimensions.get('window').width),
                        height: Math.round(Dimensions.get('window').width * 0.75)}}/>
                <TouchableOpacity
                    hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
                    onPress={() => this.props.navigation.dispatch(StackActions.pop({n:1}))}
                    style={{marginLeft: 10,
                            marginTop: Constants.statusBarHeight - Math.round(Dimensions.get('window').width * 0.75) + 10}}>
                    <Icon name="x" size={35} style={{color: "white"}}/>
                </TouchableOpacity>
                <View style={{backgroundColor: "white", borderTopLeftRadius: 50, marginTop: Math.round(Dimensions.get('window').width * 0.5625) - 45 - Constants.statusBarHeight}}>
                    <Text style={this.styles.header}>
                        A Feast for Your Trees: 5 Simple and Nutritious Recipes
                    </Text>
                    <View
                        style={{
                            marginLeft: Math.round(Dimensions.get('window').width) - 70,
                            marginTop: 15,
                            height: 8,
                            width: 40,
                            backgroundColor: GlobalData.getInstance()._fgAccentColor}}>
                    </View>
                    <Text style={this.styles.subHeader}>Plant Themed Recipe</Text>
                    <Text style={this.styles.subSubHeader}>Ingredients</Text>
                    <Text style={this.styles.bodyText}>
                        1 part fresh grass clippings{"\n"}
                        1 part dry leaves{"\n"}
                        1 part good garden soil{"\n"}
                    </Text>
                    <Text style={this.styles.subSubHeader}>Instructions</Text>
                    <Text style={this.styles.bodyText}>
                        Spread the ingredients in 3-inch-deep layers to a
                        height of 3 to 4 feet.
                    </Text>

                    <Text style={this.styles.subHeader}>Dry Time Recipe</Text>
                    <Text style={this.styles.subSubHeader}>Ingredients</Text>
                    <Text style={this.styles.bodyText}>
                        2 parts fresh grass clippings{"\n"}
                        2 parts straw or spoiled hay{"\n"}
                        1 part good garden soil{"\n"}
                    </Text>
                    <Text style={this.styles.subSubHeader}>Instructions</Text>
                    <Text style={this.styles.bodyText}>
                        Spread ingredients in 4-inch layers, adding water
                        if needed.
                    </Text>

                    <Text style={this.styles.subHeader}>Combo Recipe</Text>
                    <Text style={this.styles.subSubHeader}>Ingredients</Text>
                    <Text style={this.styles.bodyText}>
                        2 parts dry leaves{"\n"}
                        1 part fresh grass clippings{"\n"}
                        1 part food scraps{"\n"}
                    </Text>
                    <Text style={this.styles.subSubHeader}>Instructions</Text>
                    <Text style={this.styles.bodyText}>
                        Spread ingredients in 4-inch layers, adding water
                        if needed.
                    </Text>

                    <Text style={this.styles.subHeader}>Deficiency Recipe</Text>
                    <Text style={this.styles.subSubHeader}>Ingredients</Text>
                    <Text style={this.styles.bodyText}>
                        2 parts wood ashes (avoid charcoal-burned wood){"\n"}
                        1 part vegetable scraps{"\n"}
                    </Text>
                    <Text style={this.styles.subSubHeader}>Instructions</Text>
                    <Text style={this.styles.bodyText}>
                        As proven to help with iron, phosphorous, calcium, and
                        potassium deficiencies, the ingredients must be spread
                        The pile must be between four and ten feet in diameter
                        and no taller than five feet high.
                    </Text>

                    <Text style={this.styles.subHeader}>Farmer's Recipe</Text>
                    <Text style={this.styles.subSubHeader}>Ingredients</Text>
                    <Text style={this.styles.bodyText}>
                        1 part food scraps{"\n"}
                        1 part horse manure{"\n"}
                        2 parts leaves{"\n"}
                    </Text>
                    <Text style={this.styles.subSubHeader}>Instructions</Text>
                    <Text style={this.styles.bodyText}>
                        Spread ingredients in 4-inch layers, adding water if
                        needed.
                    </Text>
                </View>
                <View style={{height: 30}}></View>
            </ScrollView>
        );
    }
    styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      header: {
          fontFamily: GlobalData.getInstance()._h1FontFamily,
          fontSize: 35,
          textAlign: "right",
          lineHeight: 40,
          marginTop: 30,
          marginRight: 30
      },
      subHeader: {
          fontFamily: 'sans-bold',
          fontSize: 24,
          marginLeft: 30,
          marginBottom: 10,
          marginTop: 30
      },
      subSubHeader: {
          fontFamily: 'sans-light-italic',
          fontSize: 20,
          marginLeft: 30,
          marginBottom: 5
      },
      bodyText: {
          fontFamily: GlobalData.getInstance()._pFontFamily,
          fontSize: 17,
          marginLeft: 40,
          marginRight: 40
      },
    });
}

Article3Screen.navigationOptions = {
  title: 'About Us',
  header: null
};



export default Article3Screen;
