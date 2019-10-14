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
    Text
} from 'react-native';
import Constants from 'expo-constants'
import * as AppConstants from '../AppConstants'

class HomeScreen extends React.Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.header}>Home Layout & Content Here</Text>
                <Text style={styles.bodyText}>
                    This is a font text.
                    Header font is {AppConstants.h1FontFamily};
                    body font is {AppConstants.pFontFamily}.
                    Tab bar font is {AppConstants.tabFontFamily}.
                    {"\n\n"}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Tellus at urna condimentum mattis pellentesque id nibh. Est
                    pellentesque elit ullamcorper dignissim. Nec tincidunt praesent
                    semper feugiat nibh sed pulvinar proin gravida. Sem viverra
                    aliquet eget sit. Nibh praesent tristique magna sit amet. Sed
                    odio morbi quis commodo odio aenean sed. Non enim praesent
                    elementum facilisis leo vel fringilla est. Eget felis eget nunc
                    lobortis mattis. Neque aliquam vestibulum morbi blandit.
                    {"\n\n"}
                    Volutpat maecenas volutpat blandit aliquam etiam erat velit.
                    Est lorem ipsum dolor sit. Mi quis hendrerit dolor magna eget.
                    Interdum posuere lorem ipsum dolor. Facilisis gravida neque
                    convallis a cras semper. Sit amet consectetur adipiscing elit
                    pellentesque habitant morbi tristique. Suspendisse faucibus
                    interdum posuere lorem ipsum dolor sit amet consectetur. Mus
                    mauris vitae ultricies leo integer malesuada nunc vel. Gravida
                    rutrum quisque non tellus orci ac auctor augue mauris.
                    Scelerisque varius morbi enim nunc faucibus a pellentesque sit.
                    Gravida arcu ac tortor dignissim. Tristique et egestas quis
                    ipsum suspendisse ultrices gravida dictum.
                    {"\n\n"}
                    Fermentum et sollicitudin ac orci phasellus egestas tellus.
                    Dignissim convallis aenean et tortor at risus viverra. Velit
                    euismod in pellentesque massa placerat duis ultricies. Nunc
                    lobortis mattis aliquam faucibus. Nisl suscipit adipiscing
                    bibendum est. Nulla aliquet porttitor lacus luctus accumsan
                    tortor posuere ac ut. Aliquam etiam erat velit scelerisque in
                    dictum non. Est lorem ipsum dolor sit. Facilisi cras fermentum
                    odio eu feugiat. Quisque id diam vel quam elementum. Tellus
                    integer feugiat scelerisque varius morbi enim. At erat
                    pellentesque adipiscing commodo elit at. Ultrices in iaculis
                    nunc sed augue lacus. Purus in massa tempor nec feugiat nisl
                    pretium fusce id. Lobortis elementum nibh tellus molestie nunc
                    non blandit. Massa eget egestas purus viverra accumsan in nisl
                    nisi. Leo urna molestie at elementum eu facilisis sed odio.
                    {"\n\n"}
                    Lacus laoreet non curabitur gravida arcu. Nisi scelerisque eu
                    ultrices vitae auctor. A erat nam at lectus urna duis convallis.
                    In aliquam sem fringilla ut morbi tincidunt augue. Malesuada
                    fames ac turpis egestas. Turpis massa sed elementum tempus
                    egestas sed. Tellus orci ac auctor augue mauris. Tristique risus
                    nec feugiat in fermentum posuere. Ut consequat semper viverra
                    nam libero justo. Tempor orci eu lobortis elementum nibh.
                    Ultrices neque ornare aenean euismod elementum nisi. Erat
                    imperdiet sed euismod nisi porta lorem. Eu non diam phasellus
                    vestibulum lorem sed risus ultricies.
                </Text>
            </ScrollView>
        );
    }
}

HomeScreen.navigationOptions = {
  title: 'Home',
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: AppConstants.getBackgroundColor(),
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
      fontFamily: AppConstants.h1FontFamily,
      fontSize: 40,
  },
  bodyText: {
      fontFamily: AppConstants.pFontFamily,
      fontSize: 17,
      marginTop: 20,
      marginBottom: 70, // IMPORTANT otherwise content gets obscured
  }
});

export default HomeScreen;
