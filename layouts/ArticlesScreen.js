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
    Image,
    View,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';
import Constants from 'expo-constants'
import GlobalData from '../data/GlobalData'

class ArticlesScreen extends React.Component {

    bigThumbX = Math.round(Dimensions.get('window').width) - 70;
    bigThumbY = (Math.round(Dimensions.get('window').width) - 70) * 0.5625;

    state = {
        currentThumb: 0,
    }

    render() {
        // don't even ask what my setstate calculation means
        return (
            <ScrollView style={this.styles.container}>
                <Text style={this.styles.header}>Articles</Text>
                <ScrollView horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            onScroll={(event) => this.setState({currentThumb: Math.floor(3*(event.nativeEvent.contentOffset.x + this.bigThumbX/2)/(3*this.bigThumbX+100))})}>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Article1")}>
                        <View style={this.styles.bigCard}>
                            <Image
                              style={this.styles.bigCardThumb}
                              source={require('../assets/images/composting.jpeg')}
                            />
                            <Text style={this.styles.bigCardHeadline}>
                                An Easy Guide to Get Started with Composting
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Article2")}>
                        <View style={this.styles.bigCard}>
                            <Image
                              style={this.styles.bigCardThumb}
                              source={require('../assets/images/4water.jpeg')}
                            />
                            <Text style={this.styles.bigCardHeadline}>
                                4 Ways to Conserve Water & Turn the Water Crisis Around
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Article3")}>
                        <View style={this.styles.bigCard}>
                            <Image
                              style={this.styles.bigCardThumb}
                              source={require('../assets/images/tree.jpeg')}
                            />
                            <Text style={this.styles.bigCardHeadline}>
                                A Feast for Your Trees: {"\n"}5 Simple and Nutritious Recipes
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{width: 10}}></View>
                </ScrollView>
                <View style={{flexDirection: "row", justifyContent: "center", marginTop: 12}}>
                    <View style={{width: 5, height: 5, borderRadius: 5, margin: 8, backgroundColor: (this.state.currentThumb == 0) ? GlobalData.getInstance()._fgAccentColor : "#aaa"}}></View>
                    <View style={{width: 5, height: 5, borderRadius: 5, margin: 8, backgroundColor: (this.state.currentThumb == 1) ? GlobalData.getInstance()._fgAccentColor : "#aaa"}}></View>
                    <View style={{width: 5, height: 5, borderRadius: 5, margin: 8, backgroundColor: (this.state.currentThumb == 2) ? GlobalData.getInstance()._fgAccentColor : "#aaa"}}></View>
                </View>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Article4")}>
                    <View style={{flexDirection: "row", marginTop: 30, paddingLeft: 20, paddingRight: 20, justifyContent: "space-between"}}>
                        <Text style={{width: Math.round(Dimensions.get('window').width) - 180, fontSize: 18, fontFamily: "sans-bold"}}>Plastic-Filled Crabs Found in Thames River</Text>
                        <Image
                          style={{width: 120, height: 120, borderRadius: 10}}
                          source={require('../assets/images/crab.png')}
                        />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Article5")}>
                    <View style={{flexDirection: "row", marginTop: 30, paddingLeft: 20, paddingRight: 20, justifyContent: "space-between"}}>
                        <Text style={{width: Math.round(Dimensions.get('window').width) - 180, fontSize: 18, fontFamily: "sans-bold"}}>A Greener Way to Die: Eco-Friendly Ways to Honor the Dead</Text>
                        <Image
                          style={{width: 120, height: 120, borderRadius: 10}}
                          source={require('../assets/images/soilhand.png')}
                        />
                    </View>
                </TouchableWithoutFeedback>
                <View style={{height: 70}}></View>
            </ScrollView>
        );
    }

    styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight,
      },
      header: {
          fontFamily: GlobalData.getInstance()._h1FontFamily,
          fontSize: 40,
          margin: 20,
          marginBottom: 30
      },
      bigCard: {
          width: this.bigThumbX,
          marginLeft: 20,
          marginRight: 10
      },
      bigCardHeadline: {
          fontSize: 25,
          fontFamily: "sans-bold",
          marginLeft: 5
      },
      bigCardThumb: {
          width: this.bigThumbX,
          height: this.bigThumbY,
          borderRadius: 15,
          marginBottom: 5
      }
    });
}

ArticlesScreen.navigationOptions = {
  title: 'Articles',
  header: null,
};

export default ArticlesScreen;
