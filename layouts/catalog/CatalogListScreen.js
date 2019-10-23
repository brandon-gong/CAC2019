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
    SectionList,
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
import GlobalData from '../../data/GlobalData';
import data from '../../assets/data.json'

class CatalogItem extends React.Component {

    state = {
        isOpen: false
    }

    expandType = {
        "g" : "nitrogenous",
        "b" : "carbonaceous",
        "n" : "non-compostable"
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (this.state.isOpen)
            ? (
                <View>
                    <TouchableOpacity onPress={() => this.setState({isOpen: false})}>
                        <View style={{
                            height: 60,
                            borderTopColor: "#eee",
                            borderBottomColor:"#eee",
                            borderBottomWidth: 1,
                            flexDirection: "row",
                            borderTopWidth: 1,
                            marginTop: -1,
                            alignItems: "center",
                            paddingLeft: 20,
                            paddingRight: 20,
                            justifyContent: "space-between"}}>
                            <Text style={{fontSize: 17, fontFamily: GlobalData.getInstance()._pFontFamily}}>{this.props.attrs[0]}</Text>
                            <Icon name="chevron-up" size={20} style={{paddingLeft: 10}}/>
                        </View>
                    </TouchableOpacity>
                    <View style={{backgroundColor: "#eee", padding: 20}}>
                        <View style={{flexDirection: "row", alignItems: "center", marginBottom: 15}}>
                            <View style={{
                                height: 30,
                                width: 30,
                                borderRadius: 15,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: (this.props.attrs[1] === 'g')
                                    ? "#197f57"
                                    : (this.props.attrs[1] === 'b')
                                        ? "#e6ac00"
                                        : "#ad0000"}}>
                                <Text style={{color: "white", fontFamily: 'sans-bold'}}>{this.props.attrs[1].toUpperCase()}</Text>
                            </View>
                            <Text style={{fontFamily: GlobalData.getInstance()._pFontFamily, flex: 1, paddingLeft: 15, fontSize: 17}}>
                                {((this.props.attrs[0].substr(-1) === "s") ? this.props.attrs[0] + " are " : this.props.attrs[0] + " is ")}
                                <Text style={{fontFamily: 'sans-bold'}}>{this.expandType[this.props.attrs[1]]}</Text>.
                            </Text>
                        </View>
                        <Text style={{fontFamily: GlobalData.getInstance()._pFontFamily, fontSize: 15}}>
                            {(this.props.attrs[1] === "g")
                                ? "Items that are nitrogenous (containing nitrogen) tend to be wet and green, and decompose more quickly. Examples include fruit scraps and grass clippings."
                                : (this.props.attrs[1] === "b")
                                    ? "Items that are carbonaceous (containing carbon) tend to be dry and brown, and take much longer to decompose. Examples include leaves, straw, and paper."
                                    : "Non-compostable items should not be composted because they may be harmful to you or your composting mix."
                            }
                            {"\n\n"}
                            The recommended mix of B & G components in a compost pile
                            is about 4:1 browns to greens. Still, adjust your pile based
                            on your items. If your compost pile is not heating up,
                            then you may need to add more greens to the compost. If your compost
                            pile is starting to smell, you may need to add more browns.
                            {(this.props.attrs[2] !== null) && "\n\nExtra tip: " + this.props.attrs[2]}
                        </Text>
                    </View>
                </View>
              )
            : (
                <View>
                    <TouchableOpacity onPress={() => this.setState({isOpen: true})}>
                        <View style={{
                            height: 60,
                            borderTopColor: "#eee",
                            flexDirection: "row",
                            borderBottomColor:"#eee",
                            borderBottomWidth: 1,
                            borderTopWidth: 1,
                            marginTop: -1,
                            alignItems: "center",
                            paddingLeft: 20,
                            paddingRight: 20,
                            justifyContent: "space-between"}}>
                            <Text style={{fontSize: 17, fontFamily: GlobalData.getInstance()._pFontFamily}}>{this.props.attrs[0]}</Text>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <View style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: (this.props.attrs[1] === 'g')
                                        ? "#197f57"
                                        : (this.props.attrs[1] === 'b')
                                            ? "#e6ac00"
                                            : "#ad0000"}}>
                                    <Text style={{color: "white", fontFamily: 'sans-bold'}}>{this.props.attrs[1].toUpperCase()}</Text>
                                </View>
                                <Icon name="chevron-down" size={20} style={{paddingLeft: 10}}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            );
    }

}

class CatalogListScreen extends React.Component {

    constructor(props) {
        super(props);
        this.fData = [];
        let _tempDict = {};
        for(let element of data) {
          if(_tempDict[element.parent] === undefined) _tempDict[element.parent] = [];
          _tempDict[element.parent].push([element.name, element.type, element.tips]);
        }
        for(let [section, elements] of Object.entries(_tempDict)) {
          this.fData.push({title: section, data: elements});
        }
    }

    render() {
        return (
            <View style={this.styles.container}>
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
                    <Text style={this.styles.header}>Catalog</Text>
                </View>
                <SectionList
                    sections={this.fData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <CatalogItem attrs={item}/>}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={{backgroundColor: "white", paddingTop: 40, paddingLeft: 20, paddingBottom: 10, borderBottomColor: "#eee", borderBottomWidth: 1}}>
                            <Text style={{fontSize: 35, fontFamily: GlobalData.getInstance()._h1FontFamily}}>{title}</Text>
                        </View>
                    )}
                />
            </View>
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
          fontSize: 17,
          margin: 20,
          marginBottom: 70, // IMPORTANT otherwise content gets obscured
      }
    });
}

CatalogListScreen.navigationOptions = {
  title: 'About Us',
  header: null
};



export default CatalogListScreen;
