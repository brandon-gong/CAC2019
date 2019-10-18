import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import dataW2 from "./data/dataW2.json";
import Fuse from "fuse.js";
/*
var items = 0;

for(var i = 0; i < data.length; i++)
{
  items = items + 1
}

console.log(items)
*/

var options = {
  shouldSort: true,
  threshold: 0.6,
  keys: [{
    name: 'name',
    weight: 0.7
  }, {
    name: 'keywords',
    weight: 0.3
  }]  //end keys weight
}; //end options
var list = dataW2
var fuse = new Fuse(list, options)
var result = fuse.search("publication");
var firstRes = result[0].name;
//var secRes = result[1].name;
console.log(result);
console.log(firstRes);
//console.log(secRes);
