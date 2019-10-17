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

class Article1Screen extends React.Component {

    render() {
        return (
            <ScrollView style={this.styles.container}>
                <Image
                    source={require('../../assets/images/composting.jpeg')}
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
                        An Easy Guide to Get Started with Composting
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
                        Composting not only rids the waste around your house;
                        the process can add nutrients to the environment as
                        well. With no extra cost and easy steps, composting will
                        be the next small step towards a giant leap in saving
                        planet Earth, all of its plants and wildlife.
                        Here are some steps to get started:
                    </Text>
                    <View style={this.styles.listElement}>
                        <Text style={this.styles.bulletNumber}>1.</Text>
                        <Text style={this.styles.bulletText}>
                            Create an outdoor space of at least 3 square feet.
                        </Text>
                    </View>
                    <View style={this.styles.listElement}>
                        <Text style={this.styles.bulletNumber}>2.</Text>
                        <Text style={this.styles.bulletText}>
                            Get a closed bin to conceal the odor. It can be a
                            handmade container, ordered online, or purchased at
                            the local department store. Look for a bin that is
                            around 3 feet in diameter.
                        </Text>
                    </View>
                    <Text style={this.styles.tipText}>
                        Tip: Use chicken wire or fencing to protect the bin
                        from animals
                    </Text>
                    <View style={this.styles.listElement}>
                        <Text style={this.styles.bulletNumber}>3.</Text>
                        <Text style={this.styles.bulletText}>
                            Place kitchen or yard wastes into the composting
                            bin. Shred the organic materials if you want them to
                            compost quickly. Over this pile, spread soil or
                            “already transformed” compost. This helps keep the
                            surface from drying out.
                        </Text>
                    </View>
                    <View style={this.styles.listElement}>
                        <Text style={this.styles.bulletNumber}>4.</Text>
                        <Text style={this.styles.bulletText}>
                            Adjust the moisture in your compost pile. Add dry
                            straw or sawdust to soggy materials; add water to
                            a pile that is too dry. The materials should be damp
                            to the touch but not too wet that liquid come out
                            when you squeeze it.
                        </Text>
                    </View>
                    <View style={this.styles.listElement}>
                        <Text style={this.styles.bulletNumber}>5.</Text>
                        <Text style={this.styles.bulletText}>
                            Allow the pile to "bake." It should heat up quickly
                            and reach the desired temperature (90° to 140°F, or
                            32° to 60°C) in four to five days.
                        </Text>
                    </View>
                    <Text style={this.styles.tipText}>
                        Tip: Stir your compost as it bakes if you want to speed
                        up the baking time and reduce odor.
                    </Text>
                    <View style={this.styles.listElement}>
                        <Text style={this.styles.bulletNumber}>6.</Text>
                        <Text style={this.styles.bulletText}>
                            If the pile is decreasing height, this is a good
                            sign! This means that the compost is baking
                            properly.
                        </Text>
                    </View>
                    <View style={this.styles.listElement}>
                        <Text style={this.styles.bulletNumber}>7.</Text>
                        <Text style={this.styles.bulletText}>
                            If you mix or turn your compost pile every week, it
                            should ready to use in one to two months. If you
                            don't turn it, the compost should be ready in about
                            six to twelve months.
                        </Text>
                    </View>
                    <View style={this.styles.listElement}>
                        <Text style={this.styles.bulletNumber}>8.</Text>
                        <Text style={this.styles.bulletText}>
                            Time to feed your gardens! Once your compost pile
                            does not give off heat and looks dry, brown, and
                            crumbly, it is ready to be spread among flower beds
                            and trees.
                        </Text>
                    </View>
                    <Text style={this.styles.tipText}>
                        Tip: The Compost Tea Method involves allowing fully
                        formed compost to "steep" in water for several days,
                        then straining it to use as a homemade liquid
                        fertilizer.
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
      bodyText: {
          fontFamily: GlobalData.getInstance()._pFontFamily,
          fontSize: 17,
          margin: 30,
      },
      bulletNumber: {
          fontFamily: GlobalData.getInstance()._pFontFamily,
          fontSize: 17,
          marginLeft: 30
      },
      bulletText: {
          fontFamily: GlobalData.getInstance()._pFontFamily,
          fontSize: 17,
          flex: 1,
          paddingLeft: 5,
          marginRight: 30
      },
      tipText: {
          marginLeft: 30,
          marginRight: 30,
          fontFamily: 'sans-light-italic',
          fontSize: 17,
          marginBottom: 10
      },
      listElement: {
          flexDirection: "row",
          marginBottom: 10
      }
    });
}

Article1Screen.navigationOptions = {
  title: 'About Us',
  header: null
};



export default Article1Screen;
