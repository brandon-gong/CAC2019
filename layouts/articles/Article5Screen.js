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

class Article5Screen extends React.Component {

    render() {
        return (
            <ScrollView style={this.styles.container}>
                <Image
                    source={require('../../assets/images/soilhand.png')}
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
                        A Greener Way to Die: Eco-Friendly Ways to Honor the Dead
                    </Text>
                    <View
                        style={{
                            marginLeft: Math.round(Dimensions.get('window').width) - 70,
                            marginTop: 15,
                            marginBottom: 15,
                            height: 8,
                            width: 40,
                            backgroundColor: GlobalData.getInstance()._fgAccentColor}}>
                    </View>
                    <Text style={this.styles.bodyText}>
                        Death may be the end of life, but traditional burial
                        methods are anything but. Embalming, one of the worst
                        practices for the environment, is when bodies are filled
                        with chemicals like formaldehyde to preserve them.
                        {"\n\n"}
                        U.S. morticians today embalm roughly 1 million bodies
                        every year, consuming 3 to 4 gallons of chemicals to
                        preserve an average body. Lots of carcinogens are left
                        floating around, and resources including wood, concrete,
                        and steel are consumed for caskets.
                        {"\n\n"}
                        Even worse, rather than allowing the body to return
                        nutrients like potassium and calcium to the ground,
                        caskets also cause wasting flesh to release methane -
                        a greenhouse gas more potent than the carbon dioxide.
                        {"\n\n"}
                        Another option, which is lighter on chemicals, is
                        cremation, and it is increasing popularity. Cremation
                        does not require a burial site, which keeps its total
                        carbon footprint about 10 percent lower than embalming
                        and burying. However, this procedure is
                        resource-intensive because it takes 28 gallons of fuel
                        to turn one person into ash.
                        {"\n\n"}
                        Global measures are being taken to find options that
                        minimize the environmental impact of their afterlives.
                        One new alternative incorporates compost. Traditional
                        burials and cremations are slowly being replaced with
                        sawdust-filled vessel that reduce dead bodies into
                        compost.
                        {"\n\n"}
                        In fact, Washington became the first state to legalize
                        the process on May 21 of 2019. Each person turned into
                        plant food saves about a metric ton of carbon dioxide.
                        Rather than carrying our pollution to post-mortem,
                        composting is the future for ecofriendly and safe
                        burials.
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
          marginRight: 30,
          marginLeft: 30,
      },
      bodyText: {
          fontFamily: GlobalData.getInstance()._pFontFamily,
          fontSize: 17,
          marginLeft: 30,
          marginRight: 30
      },
    });
}

Article5Screen.navigationOptions = {
  title: 'About Us',
  header: null
};



export default Article5Screen;
