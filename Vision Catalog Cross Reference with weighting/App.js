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

import ControlEntry from './controllers/ControlEntry';
import ConfigStorage from './data/ConfigStorage'

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

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
        <ControlEntry />
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    ConfigStorage.getInstance().init(),
    Asset.loadAsync([
      // require('./assets/images/some-image.png'),
      // require('./assets/images/some-other-image.png'),
    ]),
    Font.loadAsync({
      ...Feather.font,
      'sans-regular': require('./assets/fonts/SourceSansPro-Regular.otf'),
      'sans-bold': require('./assets/fonts/SourceSansPro-Semibold.otf'),
      'sans-light': require('./assets/fonts/SourceSansPro-Light.otf'),
      'sans-light-italic': require('./assets/fonts/SourceSansPro-LightIt.otf'),
      'serif-regular': require('./assets/fonts/SourceSerifPro-Regular.otf'),
    })
  ]);

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
