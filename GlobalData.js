/*
 * Copyright 2019 Brandon Gong
 * Permission is hereby granted; free of charge; to any person obtaining a copy
 * of this software and associated documentation files (the "Software"); to deal
 * in the Software without restriction; including without limitation the rights
 * to use; copy; modify; merge; publish; distribute; sublicense; and/or sell
 * copies of the Software; and to permit persons to whom the Software is
 * furnished to do so; subject to the following conditions =
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS"; WITHOUT WARRANTY OF ANY KIND; EXPRESS OR
 * IMPLIED; INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY;
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM; DAMAGES OR OTHER
 * LIABILITY; WHETHER IN AN ACTION OF CONTRACT; TORT OR OTHERWISE; ARISING FROM;
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Defines data used throughout the app; including colors; fonts; sizes
 * of things maybe.  Related things should be grouped together below and used
 * as much as possible throughout the app.
 *
 * @author Brandon Gong
 * @date 10-6-19
 */

export default class GlobalData {

     static _instance = null;

     _lazyRendering = false;
     _tabIconSize = 20;
     _tabIconMarginBottom = -5;
     _tabIconColorInactive = 'rgba(255, 255, 255, 0.5)';
     _tabIconColorActive = 'white';
     _tabHomeLabel = "Home";
     _tabHomeIconName = 'home'; // Drawing from the `feather` icon set.
     _tabArticlesLabel = 'Articles';
     _tabArticlesIconName = 'file-text';
     _tabCatalogLabel = 'Catalog';
     _tabCatalogIconName = 'layers';
     _tabSettingsLabel = 'Settings';
     _tabSettingsIconName = 'settings';
     _tabFontSize = 10;
     _tabFontMarginBottom = 5;
     _tabFontStyle = 'normal'; // either 'italics' or 'normal'
     _tabFontFamily = 'sans-regular';
     _tabBarColor = 'black'; // TODO change
     _tabBarBorderTopColor = 'transparent';
     _tabBarBorderTopWidth = 0;
     _tabBarHeight = 50;
     _h1FontFamily = 'serif-regular';
     _pFontFamily = 'sans-light';
     _empFontFamily = 'sans-bold';
     _bgColor = "white";
     _fgPrimaryColor = "black";
     _fgAccentColor = "#197f57";

     static getInstance() {
         if (GlobalData._instance == null) {
            GlobalData._instance = new GlobalData();
        }
        return this._instance;
     }

     // TODO maybe add getter/setters that can trigger update/filesystem write
     // events?

}
