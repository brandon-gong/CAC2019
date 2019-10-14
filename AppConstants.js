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

/**
 * Defines constants used throughout the app, including colors, fonts, sizes
 * of things maybe.  Related things should be grouped together below and used
 * as much as possible throughout the app.
 *
 * @author Brandon Gong
 * @date 10-6-19
 */
import * as FileSystem from 'expo-file-system';

let backgroundColor = "";

export function init() {

}

export function getBackgroundColor() {
    return backgroundColor;
}

// export default {
//
//     // I find the app kind of lags if lazy rendering is turned on and I also
//     // doubt turning it off will drain too much battery life because its a
//     // pretty simple app.
    // lazyRendering: false,
    //
    // // Tab bar styles
    // tabIconSize: 20,
    // tabIconMarginBottom: -5,
    // tabIconColorInactive: '#ccc',
    // tabIconColorActive: '#2f95dc',
    // tabHomeLabel: thl,
    // tabHomeIconName: 'home', // Drawing from the `feather` icon set.
    // tabArticlesLabel: 'Articles',
    // tabArticlesIconName: 'file-text',
    // tabCatalogLabel: 'Catalog',
    // tabCatalogIconName: 'layers',
    // tabSettingsLabel: 'Settings',
    // tabSettingsIconName: 'settings',
    // tabFontSize: 10,
    // tabFontMarginBottom: 5,
    // tabFontStyle: 'normal', // either 'italics' or 'normal'
    // tabFontFamily: 'sans-regular',
    // tabBarColor: 'black', // TODO change
    // tabBarBorderTopColor: 'transparent',
    // tabBarBorderTopWidth: 0,
    // tabBarHeight: 50,
    //
    // h1FontFamily: 'serif-regular',
    // pFontFamily: 'sans-light',
    // empFontFamily: 'sans-bold'
// };

export function setTHL(x) {
    thl = x;
}
