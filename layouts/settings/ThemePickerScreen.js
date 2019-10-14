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
    TouchableWithoutFeedback
} from 'react-native';
import { StackActions } from 'react-navigation';
import Constants from 'expo-constants'
import { Feather as Icon } from '@expo/vector-icons';
import AppConstants from '../../AppConstants'

class ThemePickerScreen extends React.Component {
    render() {
        return (
            <ScrollView style={styles.container}>
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
                    <Text style={styles.header}>Themes</Text>
                </View>

                <Text style={styles.sectionHeader}>L I G H T {'\u00A0'} T H E M E S</Text>
                <TouchableWithoutFeedback onPress={null}>
                    <View style={styles.listElement}>
                        <View style={{height: 60, width: 60, borderRadius: 30, backgroundColor: "green", marginRight: 20}}>
                        </View>
                        <Text style={styles.listElementText}>Day Green</Text>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
}

ThemePickerScreen.navigationOptions = {
  title: 'Theme Picker',
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  header: {
      fontFamily: AppConstants.h1FontFamily,
      fontSize: 40,
  },
  sectionHeader: {
      fontFamily:AppConstants.pFontFamily,
      color: "#ccc",
      marginTop: 20,
      marginLeft: 10,
      marginBottom: 5
  },
  listElement: {
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 5,
      paddingBottom: 5,
      borderBottomColor: "#ddd",
      borderBottomWidth: 0.5,
      borderTopColor: "#ddd",
      borderTopWidth: 0.5,
      marginTop: -0.5,
      height: 80,
  },
  listElementText: {
      fontFamily: AppConstants.pFontFamily,
      fontSize: 25,
      flex: 0,
  },
});

export default ThemePickerScreen;
