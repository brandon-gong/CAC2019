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
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

import ControlEntry from './controllers/Controller';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  state = {

      bgColor: "",
      fgPrimaryColor: "",
      fgAccentColor: "",

      lazyRendering: false,

      // Tab bar styles
      tabIconSize: 20,
      tabIconMarginBottom: -5,
      tabIconColorInactive: '#ccc',
      tabIconColorActive: '#2f95dc',
      tabHomeLabel: "Home",
      tabHomeIconName: 'home', // Drawing from the `feather` icon set.
      tabArticlesLabel: 'Articles',
      tabArticlesIconName: 'file-text',
      tabCatalogLabel: 'Catalog',
      tabCatalogIconName: 'layers',
      tabSettingsLabel: 'Settings',
      tabSettingsIconName: 'settings',
      tabFontSize: 10,
      tabFontMarginBottom: 5,
      tabFontStyle: 'normal', // either 'italics' or 'normal'
      tabFontFamily: 'sans-regular',
      tabBarColor: 'black', // TODO change
      tabBarBorderTopColor: 'transparent',
      tabBarBorderTopWidth: 0,
      tabBarHeight: 50,

      h1FontFamily: 'serif-regular',
      pFontFamily: 'sans-light',
      empFontFamily: 'sans-bold'
  };

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <Controller globalState=this.state setState={ p => this.setState(p) }/>
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      // require('./assets/images/some-image.png'),
      // require('./assets/images/some-other-image.png'),
    ]),
    Font.loadAsync({
      ...Feather.font,
      'sans-regular': require('./assets/fonts/SourceSansPro-Regular.otf'),
      'sans-bold': require('./assets/fonts/SourceSansPro-Semibold.otf'),
      'sans-light': require('./assets/fonts/SourceSansPro-Light.otf'),
      'serif-regular': require('./assets/fonts/SourceSerifPro-Regular.otf'),
    }),
  ]);
  FileSystem.getInfoAsync(FileSystem.documentDirectory + "config", {})
            .then(({ exists }) => {
                if(!exists) {
                    // TODO maybe create a tutorial or welcome slides for first-timers
                    FileSystem.writeAsStringAsync(
                        FileSystem.documentDirectory + "config",
                        "\ndg\n", {}
                    );
                }
            });
  FileSystem.readAsStringAsync(FileSystem.documentDirectory + "config", {})
            .then((contents) => {
                if(contents.split("\n")[1] === "dg") {
                    console.log("here");
                    this.setState({bgColor: "green"});
                } else {
                    this.setState({bgColor: "white"});
                }
            });
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

function handleLoadingError(error) {
  console.warn(error);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
