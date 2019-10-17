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

class Article4Screen extends React.Component {

    render() {
        return (
            <ScrollView style={this.styles.container}>
                <Image
                    source={require('../../assets/images/crab.png')}
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
                        Plastic-Filled Crabs Found in Thames River
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
                        Crabs found in the Thames River were ingesting excessive
                        amounts of plastic according to researchers. After
                        dissection, they realized nearly all of the 55 shore
                        crabs and 37 mitten crabs had plastic in stomachs,
                        intestines, or gills.
                        {"\n\n"}
                        The most alarming news was that the plastic was made up
                        of over 100 fibers tightly wounded together to
                        completely consume stomach space. Crabs, in general,
                        tend to contain and retain plastic for long periods.
                        {"\n\n"}
                        Similar to this Thames situation, beaches and shores
                        have been progressively covered in plastic, setting up
                        the stage for more animals to consume plastics. Plastic
                        pollution and litter in the Thames River mainly come
                        from household washing machines: nylon, polyester, and
                        acrylic materials shed millions of plastic microfibers
                        into waterways. One of the biggest polluters in the
                        Thames is wet wipes and sanitary products, which are
                        often flushed down toilets. These are blocking sewage
                        systems and are a huge issue both for the environment
                        and also for water systems.
                        {"\n\n"}
                        This problem is emerging everywhere, from the deep
                        Mariana Trench to the Artic Ocean. The impact of
                        chemicals from these plastics are killing creatures and
                        disrupting the growth of their embryos. 4.7 billion
                        plastic straws… 316 million plastic stirrers… 1.8 billion
                        cotton buds are solely used in England every year. Let’s
                        become more environmentally aware and reduce these
                        numbers. It is the least we can do to save future crabs
                        at the Thames.
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
          marginLeft: 30,
          marginRight: 30
      },
    });
}

Article4Screen.navigationOptions = {
  title: 'About Us',
  header: null
};



export default Article4Screen;
