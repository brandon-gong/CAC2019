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

import HomeScreen from '../layouts/HomeScreen';
import ArticlesScreen from '../layouts/ArticlesScreen';
import CatalogScreen from '../layouts/CatalogScreen';
import SettingsScreen from '../layouts/SettingsScreen';
import ThemePickerScreen from '../layouts/settings/ThemePickerScreen'

import AppConstants from '../AppConstants';


// Home, Articles, Catalog, and Settings are all StackNavigators; we then group
// all of them into the one TabNavigator.


/////////////////////////////////////////
//               HOME                  //
/////////////////////////////////////////
const HomeStack = createStackNavigator({
    Home: HomeScreen,
});
HomeStack.path = '';
HomeStack.navigationOptions = {
    tabBarLabel: AppConstants.tabHomeLabel,
    tabBarIcon: ({ focused }) => (
        <Icon
            name={ AppConstants.tabHomeIconName }
            size={ AppConstants.tabIconSize }
            style={{ marginBottom: AppConstants.tabIconMarginBottom }}
            color={ focused
                ? AppConstants.tabIconColorActive
                : AppConstants.tabIconColorInactive
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
    tabBarLabel: AppConstants.tabArticlesLabel,
    tabBarIcon: ({focused}) => (
        <Icon
            name={ AppConstants.tabArticlesIconName }
            size={ AppConstants.tabIconSize }
            style={{ marginBottom: AppConstants.tabIconMarginBottom }}
            color={ focused
                ? AppConstants.tabIconColorActive
                : AppConstants.tabIconColorInactive
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
    tabBarLabel: AppConstants.tabCatalogLabel,
    tabBarIcon: ({focused}) => (
        <Icon
            name={ AppConstants.tabCatalogIconName }
            size={ AppConstants.tabIconSize }
            style={{ marginBottom: AppConstants.tabIconMarginBottom }}
            color={ focused
                ? AppConstants.tabIconColorActive
                : AppConstants.tabIconColorInactive
            }
        />
    )
};


/////////////////////////////////////////
//             SETTINGS                //
/////////////////////////////////////////
const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
    ThemePicker: ThemePickerScreen
});
SettingsStack.path = '';
SettingsStack.navigationOptions = {
    tabBarLabel: AppConstants.tabSettingsLabel,
    tabBarIcon: ({focused}) => (
        <Icon
            name={ AppConstants.tabSettingsIconName }
            size={ AppConstants.tabIconSize }
            style={{ marginBottom: AppConstants.tabIconMarginBottom }}
            color={ focused
                ? AppConstants.tabIconColorActive
                : AppConstants.tabIconColorInactive
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
        lazy: AppConstants.lazyRendering,
        tabBarOptions: {
            labelStyle: {
                fontSize: AppConstants.tabFontSize,
                marginBottom: AppConstants.tabFontMarginBottom,
                fontStyle: AppConstants.tabFontStyle,
                fontFamily: AppConstants.tabFontFamily,
            },
            style: {
                backgroundColor: AppConstants.tabBarColor,
                borderTopColor: AppConstants.tabBarBorderTopColor,
                borderTopWidth: AppConstants.tabBarBorderTopWidth,
                height: AppConstants.tabBarHeight,
            }
        }
    }
);
coreComponent.path = '';


export default export default createAppContainer(coreComponent);
