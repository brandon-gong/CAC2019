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
import { Platform } from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import { Feather as Icon } from '@expo/vector-icons';

import GlobalData from '../data/GlobalData'

import HomeScreen from '../layouts/HomeScreen';
import ArticlesScreen from '../layouts/ArticlesScreen';
import CatalogScreen from '../layouts/CatalogScreen';
import SettingsScreen from '../layouts/SettingsScreen';
import LicensesScreen from '../layouts/settings/LicensesScreen'
import AboutScreen from '../layouts/settings/AboutScreen'

/////////////////////////////////////////
//               HOME                  //
/////////////////////////////////////////
const HomeStack = createStackNavigator({
    Home: HomeScreen,
});
HomeStack.path = '';
HomeStack.navigationOptions = {
    tabBarLabel: GlobalData.getInstance()._tabHomeLabel,
    tabBarIcon: ({ focused }) => (
        <Icon
            name={ GlobalData.getInstance()._tabHomeIconName }
            size={ GlobalData.getInstance()._tabIconSize }
            style={{ marginBottom: GlobalData.getInstance()._tabIconMarginBottom }}
            color={ focused
                ? GlobalData.getInstance()._tabIconColorActive
                : GlobalData.getInstance()._tabIconColorInactive
            }
        />
    )
};


/////////////////////////////////////////
//             ARTICLES                //
/////////////////////////////////////////
const ArticlesStack = createStackNavigator({
    Articles: ArticlesScreen,
});
ArticlesStack.path = '';
ArticlesStack.navigationOptions = {
    tabBarLabel: GlobalData.getInstance()._tabArticlesLabel,
    tabBarIcon: ({focused}) => (
        <Icon
            name={ GlobalData.getInstance()._tabArticlesIconName }
            size={ GlobalData.getInstance()._tabIconSize }
            style={{ marginBottom: GlobalData.getInstance()._tabIconMarginBottom }}
            color={ focused
                ? GlobalData.getInstance()._tabIconColorActive
                : GlobalData.getInstance()._tabIconColorInactive
            }
        />
    )
};


/////////////////////////////////////////
//             CATALOG                 //
/////////////////////////////////////////
const CatalogStack = createStackNavigator({
    Catalog: CatalogScreen,
});
CatalogStack.path = '';
CatalogStack.navigationOptions = {
    tabBarLabel: GlobalData.getInstance()._tabCatalogLabel,
    tabBarIcon: ({focused}) => (
        <Icon
            name={ GlobalData.getInstance()._tabCatalogIconName }
            size={ GlobalData.getInstance()._tabIconSize }
            style={{ marginBottom: GlobalData.getInstance()._tabIconMarginBottom }}
            color={ focused
                ? GlobalData.getInstance()._tabIconColorActive
                : GlobalData.getInstance()._tabIconColorInactive
            }
        />
    )
};


/////////////////////////////////////////
//             SETTINGS                //
/////////////////////////////////////////
const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
    Licenses: LicensesScreen,
    About: AboutScreen
});
SettingsStack.path = '';
SettingsStack.navigationOptions = {
    tabBarLabel: GlobalData.getInstance()._tabSettingsLabel,
    tabBarIcon: ({focused}) => (
        <Icon
            name={ GlobalData.getInstance()._tabSettingsIconName }
            size={ GlobalData.getInstance()._tabIconSize }
            style={{ marginBottom: GlobalData.getInstance()._tabIconMarginBottom }}
            color={ focused
                ? GlobalData.getInstance()._tabIconColorActive
                : GlobalData.getInstance()._tabIconColorInactive
            }
        />
    )
};


/////////////////////////////////////////
//         COMBINE EVERYTHING          //
/////////////////////////////////////////
const coreComponent = createBottomTabNavigator(
    {
        HomeStack,
        ArticlesStack,
        CatalogStack,
        SettingsStack
    },
    {
        lazy: GlobalData.getInstance()._lazyRendering,
        tabBarOptions: {
            labelStyle: {
                fontSize: GlobalData.getInstance()._tabFontSize,
                marginBottom: GlobalData.getInstance()._tabFontMarginBottom,
                fontStyle: GlobalData.getInstance()._tabFontStyle,
                fontFamily: GlobalData.getInstance()._tabFontFamily,
            },
            style: {
                backgroundColor: GlobalData.getInstance()._fgAccentColor,
                borderTopColor: GlobalData.getInstance()._tabBarBorderTopColor,
                borderTopWidth: GlobalData.getInstance()._tabBarBorderTopWidth,
                height: GlobalData.getInstance()._tabBarHeight,
            },
            activeTintColor: GlobalData.getInstance()._tabIconColorActive,
            inactiveTintColor: GlobalData.getInstance()._tabIconColorInactive,
        }
    }
);
coreComponent.path = '';

export default coreComponent;
