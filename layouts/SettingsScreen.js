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
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Switch
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import Constants from 'expo-constants'
import GlobalData from '../data/GlobalData'
import ConfigStorage from '../data/ConfigStorage'

class SettingsScreen extends React.Component {

    state = {
        switch1Active: ConfigStorage.getInstance().getNotificationsOn(),
        nameInputVal: ConfigStorage.getInstance().getName()
    }

    render() {
        return (
            <ScrollView style={this.styles.container}>
                <Text style={this.styles.header}>Settings</Text>
                <Text style={this.styles.sectionHeader}>G E N E R A L</Text>
                <View style={this.styles.listElement}>
                    <Icon name="user" size={20} style={this.styles.leftIcons}/>
                    <Text style={this.styles.listElementText}>Name</Text>
                    <TextInput
                        autoCorrect={false}
                        placeholder="Name"
                        value={this.state.nameInputVal}
                        onChangeText={(val) => {this.setState({nameInputVal: val}); ConfigStorage.getInstance().setName(val)}}
                        style={{
                            textAlign: 'right',
                            flex: 1,
                            fontFamily: GlobalData.getInstance()._pFontFamily}}
                    />
                </View>
                <View style={this.styles.listElement}>
                    <View style={{flexDirection: "row"}}>
                        <Icon name={(this.state.switch1Active) ? "bell" : "bell-off"} size={20} style={this.styles.leftIcons}/>
                        <Text style={this.styles.listElementText}>Daily Tip Notification</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: "row-reverse"}}>
                        <Switch
                            value={this.state.switch1Active}
                            onValueChange={(val) => {this.setState({switch1Active: val}); ConfigStorage.getInstance().setNotificationsOn(val)}}
                            thumbColor="white"
                            trackColor={ {false: GlobalData.getInstance()._fgAccentColor, true: GlobalData.getInstance()._fgAccentColor} }
                            style={{marginRight: -5}}/>
                    </View>
                </View>
                <View style={this.styles.listElement}>
                    <Icon name="hard-drive" size={20} style={this.styles.leftIcons}/>
                    <Text style={this.styles.listElementText}>Cache</Text>
                    <TouchableOpacity
                        hitSlop={{top: 10, left: 50, bottom: 10, right: 50}}
                        onPress={ () => {

                            Alert.alert(
                              'Clear Local Storage',
                              'Are you sure you want to clear out cache memory?',
                                [
                                    {text: 'Clear', onPress: () => console.log('OK Pressed')},
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel',
                                    },
                                ],
                                {cancelable: false},
                            )

                        }}
                        style={{alignItems:"center", flex: 1, flexDirection: "row-reverse"}}>
                        <Text style={{
                            flex: 1,
                            fontFamily: GlobalData.getInstance()._pFontFamily,
                            textAlign: "right",
                            color: "#00aaff"}}>
                            Clear Local Storage
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={this.styles.listElement}>
                    <Icon name="bar-chart-2" size={20} style={this.styles.leftIcons}/>
                    <Text style={this.styles.listElementText}>Progress</Text>
                    <TouchableOpacity
                        hitSlop={{top: 10, left: 50, bottom: 10, right: 50}}
                        onPress={ () => {

                            Alert.alert(
                              'Reset Statistics',
                              'Are you sure you want to restart progress?  This action cannot be undone.',
                                [
                                    {text: 'Reset', onPress: () => ConfigStorage.getInstance().setNumScans(0)},
                                    {
                                        text: 'Cancel',
                                        onPress: () => {},
                                        style: 'cancel',
                                    },
                                ],
                                {cancelable: false},
                            )
                        }}
                        style={{alignItems:"center", flex: 1, flexDirection: "row-reverse"}}>
                        <Text style={{
                            flex: 1,
                            fontFamily: GlobalData.getInstance()._pFontFamily,
                            textAlign: "right",
                            color: "#eb4034"}}>
                            Reset Statistics
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={this.styles.sectionHeader}>I N F O R M A T I O N</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("About")}>
                    <View style={this.styles.listElement}>
                        <Icon name="info" size={20} style={this.styles.leftIcons}/>
                        <Text style={this.styles.listElementText}>About Us</Text>
                        <Icon name="chevrons-right" size={20} style={{paddingRight: 8, flex: 1, textAlign: "right", marginRight: -5}}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Licenses")}>
                    <View style={this.styles.listElement}>
                        <Icon name="package" size={20} style={this.styles.leftIcons}/>
                        <Text style={this.styles.listElementText}>3rd-Party Sources</Text>
                        <Icon name="chevrons-right" size={20} style={{paddingRight: 8, flex: 1, textAlign: "right", marginRight: -5}}/>
                    </View>
                </TouchableOpacity>
                <View style={this.styles.listElement}>
                    <Icon name="git-merge" size={20} style={this.styles.leftIcons}/>
                    <Text style={this.styles.listElementText}>Version</Text>
                    <Text style={{
                        flex: 1,
                        fontFamily: GlobalData.getInstance()._pFontFamily,
                        textAlign: "right",
                        color: "#aaa", fontSize: 15}}>
                        v1.0.0
                    </Text>
                </View>
            </ScrollView>
        );
    }

    styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: GlobalData.getInstance()._bgColor,
        paddingTop: Constants.statusBarHeight,
      },
      header: {
          fontFamily: GlobalData.getInstance()._h1FontFamily,
          fontSize: 40,
          margin: 20,
      },
      sectionHeader: {
          fontFamily:GlobalData.getInstance()._pFontFamily,
          color: "#aaa",
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
      },
      listElementText: {
          fontFamily: GlobalData.getInstance()._tabFontFamily,
          flex: 0,
          marginRight: 20,
      },
      colorSwitchButton: {
          width: 25,
          height: 25,
          borderRadius: 15,
          backgroundColor: "green",
      },
      leftIcons: {
          paddingRight: 8,
          color: GlobalData.getInstance()._fgAccentColor
      }
    });

}

SettingsScreen.navigationOptions = {
  title: 'Settings',
  header: null,
};

export default SettingsScreen;
