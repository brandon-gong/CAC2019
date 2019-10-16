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
} from 'react-native';
import { StackActions } from 'react-navigation';
import Constants from 'expo-constants'
import { Feather as Icon } from '@expo/vector-icons';
import GlobalData from '../../GlobalData'

class LicensesScreen extends React.Component {

    render() {
        return (
            <ScrollView style={this.styles.container}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 20,
                    marginBottom: 0}}>
                    <TouchableOpacity
                        hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
                        onPress={() => this.props.navigation.dispatch(
                            StackActions.pop({n:1}))}>
                        <Icon name="arrow-left" size={30} style={{paddingRight: 15}}/>
                    </TouchableOpacity>
                    <Text style={this.styles.header}>Licenses</Text>
                </View>
                    <Text style={this.styles.sectionHeader}>Expo 3.0.10</Text>
                    <Text style={this.styles.bodyText}>
                        The MIT License (MIT)
                        {"\n\n"}
                        Copyright (c) 2015-present 650 Industries, Inc. (aka Expo)
                        {"\n\n"}
                        Permission is hereby granted, free of charge, to any person obtaining a copy
                        of this software and associated documentation files (the "Software"), to deal
                        in the Software without restriction, including without limitation the rights
                        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                        copies of the Software, and to permit persons to whom the Software is
                        furnished to do so, subject to the following conditions:
                        {"\n\n"}
                        The above copyright notice and this permission notice shall be included in all
                        copies or substantial portions of the Software.
                        {"\n\n"}
                        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                        SOFTWARE.
                    </Text>
                    <Text style={this.styles.sectionHeader}>Fuse.js 3.4.5</Text>
                    <Text style={this.styles.bodyText}>
                        Copyright 2017 Kirollos Risk
                        {"\n\n"}
                        Licensed under the Apache License, Version 2.0 (the "License");
                        you may not use this file except in compliance with the License.
                        You may obtain a copy of the License at
                        {"\n\n"}
                            http://www.apache.org/licenses/LICENSE-2.0
                        {"\n\n"}
                        Unless required by applicable law or agreed to in writing, software
                        distributed under the License is distributed on an "AS IS" BASIS,
                        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                        See the License for the specific language governing permissions and
                        limitations under the License.
                    </Text>
                    <Text style={this.styles.sectionHeader}>nodejs-vision 1.5.0</Text>
                    <Text style={this.styles.bodyText}>
                    Copyright 2019 Google LLC
                    {"\n\n"}
                    Licensed under the Apache License, Version 2.0 (the "License");
                    you may not use this file except in compliance with the License.
                    You may obtain a copy of the License at
                    {"\n\n"}
                        https://www.apache.org/licenses/LICENSE-2.0
                    {"\n\n"}
                    Unless required by applicable law or agreed to in writing, software
                    distributed under the License is distributed on an "AS IS" BASIS,
                    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                    See the License for the specific language governing permissions and
                    limitations under the License.
                    </Text>
                    <Text style={this.styles.sectionHeader}>React Native 0.59.8</Text>
                    <Text style={this.styles.bodyText}>
                        MIT License
                        {"\n\n"}
                        Copyright (c) Facebook, Inc. and its affiliates.
                        {"\n\n"}
                        Permission is hereby granted, free of charge, to any person obtaining a copy
                        of this software and associated documentation files (the "Software"), to deal
                        in the Software without restriction, including without limitation the rights
                        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                        copies of the Software, and to permit persons to whom the Software is
                        furnished to do so, subject to the following conditions:
                        {"\n\n"}
                        The above copyright notice and this permission notice shall be included in all
                        copies or substantial portions of the Software.
                        {"\n\n"}
                        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                        SOFTWARE.
                    </Text>
                    <View style={{height: 70}}></View>
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
          fontSize: 12,
          marginLeft: 20,
          marginRight: 20,
      },
      sectionHeader: {
          marginLeft: 20,
          fontSize: 20,
          marginBottom: 5,
          marginTop: 20,
          fontFamily: "sans-bold",
      }
    });
}

LicensesScreen.navigationOptions = {
  title: '3rd-Party Licenses',
  header: null
};



export default LicensesScreen;
