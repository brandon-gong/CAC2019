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
    TextInput,
    View,
    Button,
    TouchableWithoutFeedback
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import Constants from 'expo-constants'
import AppConstants from '../AppConstants'

class SettingsScreen extends React.Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.header}>Settings</Text>
                <Text style={styles.sectionHeader}>G E N E R A L</Text>
                <View style={styles.listElement}>
                    <Icon name="user" size={20} style={{paddingRight: 8}}/>
                    <Text style={styles.listElementText}>Name</Text>
                    <TextInput
                        autoCorrect={false}
                        placeholder="Name"
                        style={{
                            textAlign: 'right',
                            flex: 1,
                            fontFamily: AppConstants.pFontFamily}}
                    />
                </View>
                <View style={styles.listElement}>
                    <Icon name="eye" size={20} style={{paddingRight: 8}}/>
                    <Text style={styles.listElementText}>Theme</Text>
                    <View style={{
                        flexDirection: "row-reverse",
                        flex: 1,
                        alignItems: "center"}}>
                      <TouchableWithoutFeedback hitSlop={{top: 10, left: 50, bottom: 10, right: 50}} onPress={() => this.props.navigation.navigate('ThemePicker')}>
                        <View style={styles.colorSwitchButton}>
                        </View>
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback hitSlop={{top: 10, left: 50, bottom: 10, right: 50}} onPress={() => this.props.navigation.navigate('ThemePicker')}>
                      <Text style={{
                          flex: 0,
                          fontFamily: AppConstants.pFontFamily,
                          marginRight: 5}}>
                          Day Green
                      </Text>
                      </TouchableWithoutFeedback>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  header: {
      fontFamily: AppConstants.h1FontFamily,
      fontSize: 40,
      margin: 20,
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
      height: 40,
      justifyContent: "space-between",
  },
  listElementText: {
      fontFamily: AppConstants.tabFontFamily,
      flex: 0,
      marginRight: 20,
  },
  colorSwitchButton: {
      width: 25,
      height: 25,
      borderRadius: 15,
      backgroundColor: "green",
  }
});

export default SettingsScreen;
