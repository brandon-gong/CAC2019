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
 * @date 10-16-19
 */

import * as FileSystem from 'expo-file-system';

export default class ConfigStorage {

    // There's honestly not much data I need to store here.
    // So there's no point in using some highly formal schema or anything
    // File format will be as follows (where $ represents a really hard-to-type sequence of unicode noncharacters)
    // name$numScans$notifOn
    // we can always add more segments if needed.

    // I'm making $ incredibly hard to type on purpose so the user can't break anything.
    $ = "\uEF0C\uF74A";

     static _instance = null;
     _current = "";

     static getInstance() {
         if (ConfigStorage._instance == null) {
            ConfigStorage._instance = new ConfigStorage();
        }
        return this._instance;
     }

     init() {
         FileSystem.getInfoAsync(FileSystem.documentDirectory + "config", {})
                   .then(({ exists }) => {
                       if(!exists) {

                           // TODO maybe create a tutorial or welcome slides for first-timers
                           FileSystem.writeAsStringAsync(
                               FileSystem.documentDirectory + "config",
                               (this.$ + "0" + this.$ + "t"), {}
                           );
                       }
                   });
         FileSystem.readAsStringAsync(FileSystem.documentDirectory + "config", {})
                   .then((contents) => {
                       this._current = contents;
                   });
     }

     getName() {
         return this._current.split(this.$)[0];
     }
     setName(name) {
         segments = this._current.split(this.$);
         segments[0] = name;
         this._current = segments.join(this.$);
         FileSystem.writeAsStringAsync(FileSystem.documentDirectory + "config", this._current, {});
     }
     getNumScans() {
         return parseInt(this._current.split(this.$)[1]);
     }
     setNumScans(n) {
         segments = this._current.split(this.$);
         segments[1] = n.toString();
         this._current = segments.join(this.$);
         FileSystem.writeAsStringAsync(FileSystem.documentDirectory + "config", this._current, {});
     }
     getNotificationsOn() {
         return (this._current.split(this.$)[2] === "t");
     }
     setNotificationsOn(isOn) {
         segments = this._current.split(this.$);
         segments[2] = (isOn) ? "t" : "f";
         this._current = segments.join(this.$);
         FileSystem.writeAsStringAsync(FileSystem.documentDirectory + "config", this._current, {});
     }
}
