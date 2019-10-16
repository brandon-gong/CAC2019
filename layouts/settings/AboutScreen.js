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
import GlobalData from '../../GlobalData'

class AboutScreen extends React.Component {

    render() {
        return (
            <ScrollView style={this.styles.container}>
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
                    <Text style={this.styles.header}>About Us</Text>
                </View>
                <Image
                    source={require('../../assets/images/640x360.png')}
                    style={{
                        width: 640/2,
                        height: 360/2,
                        marginLeft: (Math.round(Dimensions.get('window').width)-640/2)/2,
                        marginTop: 30,
                        marginBottom: 10}}/>
                    <Text style={this.styles.bodyText}>
                        Hello about us Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Tellus at urna condimentum mattis pellentesque id nibh. Est
                        pellentesque elit ullamcorper dignissim. Nec tincidunt praesent
                        semper feugiat nibh sed pulvinar proin gravida. Sem viverra
                        aliquet eget sit. Nibh praesent tristique magna sit amet. Sed
                        odio morbi quis commodo odio aenean sed. Non enim praesent
                        elementum facilisis leo vel fringilla est. Eget felis eget nunc
                        lobortis mattis. Neque aliquam vestibulum morbi blandit.
                    </Text>
            </ScrollView>
        );
    }
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
      bodyText: {
          fontFamily: GlobalData.getInstance()._pFontFamily,
          fontSize: 17,
          margin: 20,
          marginBottom: 70, // IMPORTANT otherwise content gets obscured
      }
    });
}

AboutScreen.navigationOptions = {
  title: 'About Us',
  header: null
};



export default AboutScreen;
