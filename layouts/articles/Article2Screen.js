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

class Article2Screen extends React.Component {

    render() {
        return (
            <ScrollView style={this.styles.container}>
                <Image
                    source={require('../../assets/images/water.jpeg')}
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
                        4 Ways to Conserve Water & Turn the Water Crisis Around
                    </Text>
                    <View
                        style={{
                            marginLeft: Math.round(Dimensions.get('window').width) - 70,
                            marginTop: 15,
                            height: 8,
                            width: 40,
                            backgroundColor: GlobalData.getInstance()._fgAccentColor}}>
                    </View>
                    <Text style={this.styles.bodyText}>
                        What's the world's most prized possession? Some argue
                        that it's money...others reply with "KFC obviously?!"
                        Despite them all, this is the one thing we all take for
                        granted: WATER. Every day, an average American uses more
                        than 300 gallons. That's just for twenty-four hours!
                        Several places in our planet, people die of dehydration;
                        however, we continue our one-hour showers and leave
                        dripping taps. It has been predicted that 50% of our
                        existing water will vanish by the year 2030. Even though
                        this may not seem near, it is only thirteen years away.
                        We all want to live-for a lot more than 13 years-so here
                        are some few tips CRIS highly recommends to preserve
                        water and create a healthier environment.
                    </Text>
                    <Text style={this.styles.subHeader}>1. Take Shorter Showers.</Text>
                    <Image
                        source={require('../../assets/images/shower.png')}
                        style={{
                            width: Math.round(Dimensions.get('window').width) - 60,
                            marginLeft: 30,
                            height: Math.round(Dimensions.get('window').width * 0.5),
                            borderRadius: 5}}/>
                    <Text style={this.styles.bodyText}>
                        This is like "killing two birds with a stone." You can
                        save water, lower your water bill, and have spare time
                        to do more effective activities.
                    </Text>
                    <Text style={this.styles.subHeader}>2. Reuse "dirty" or leftover water for plants.</Text>
                    <Image
                        source={require('../../assets/images/plant.png')}
                        style={{
                            width: Math.round(Dimensions.get('window').width) - 60,
                            marginLeft: 30,
                            height: Math.round(Dimensions.get('window').width * 0.5),
                            borderRadius: 5}}/>
                    <Text style={this.styles.bodyText}>
                        Instead of pouring out the aftermath of your weekly fish
                        tank water replenishment, water your plants with this
                        water. Reusing water by watering plants not only helps
                        yourself but the environment around you.
                    </Text>
                    <Text style={this.styles.subHeader}>3. Wash the dishes with minimal water.</Text>
                    <Image
                        source={require('../../assets/images/fork.png')}
                        style={{
                            width: Math.round(Dimensions.get('window').width) - 60,
                            marginLeft: 30,
                            height: Math.round(Dimensions.get('window').width * 0.5),
                            borderRadius: 5}}/>
                    <Text style={this.styles.bodyText}>
                        Washing the dishes is a huge hassle when it takes a big
                        account on your water usage and the overall bill.
                        Instead use the dishwasher (fully loaded) or wash the
                        dishes by hand with less water. Every drop wasted could
                        replenish an unfortunate, unprivileged person.
                    </Text>
                    <Text style={this.styles.subHeader}>4. Try Water "Recycling."</Text>
                    <Image
                        source={require('../../assets/images/bucket.png')}
                        style={{
                            width: Math.round(Dimensions.get('window').width) - 60,
                            marginLeft: 30,
                            height: Math.round(Dimensions.get('window').width * 0.5),
                            borderRadius: 5}}/>
                    <Text style={this.styles.bodyText}>
                        Leave a bucket in your backyard or patio and let the
                        rain water fil it. There are hundreds of ways to re-USE
                        this water. Give to the plants or filter it for drinking.
                        {"\n\n"}
                        These few steps can make a HUGE difference and can
                        impact the state of 2030's water condition. Please try
                        at least one of these helpful tips to save the planet
                        from future drought problems!
                    </Text>

                </View>
                <View style={{height: 10}}></View>
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
          marginBottom: 15
      },
      bodyText: {
          fontFamily: GlobalData.getInstance()._pFontFamily,
          fontSize: 17,
          margin: 30,
      },
    });
}

Article2Screen.navigationOptions = {
  title: 'About Us',
  header: null
};



export default Article2Screen;
