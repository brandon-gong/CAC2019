import React, {Component} from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, NativeMethodsMixin } from 'react-native';
import { Header, Title} from 'native-base';
import dataW2 from "./data/dataW2.json";
import Fuse from "fuse.js";

export default class CatalogScreen extends Component{
	render(){
		var habitat= [];
		var section= [];
		var names= [];
		var type= [];
		var tips= [];
		var i;
		
		for(let i=0; i < dataW2.length; i ++){
			//replaceAll is not recognized so this is a temp solution
			names.push(((JSON.stringify(dataW2[i].name)).replace('"','').replace('"','')))
			section.push(JSON.stringify(dataW2[i].grandParentName))
			habitat.push(JSON.stringify(dataW2[i].greatGrandParentName))
			//return as undef for some reason for these two
			//section.push(((JSON.stringify(dataW2[i].grandParentName)).replace('"','').replace('"','')))
			//habitat.push(((JSON.stringify(dataW2[i].greatGrandParentName)).replace('"','').replace('"','')))
			type.push(((JSON.stringify(dataW2[i].type)).replace('"','').replace('"','')))
			tips.push(((JSON.stringify(dataW2[i].tips)).replace('"','')).replace('"',''))	
		}
		console.log(names[0])
		console.log(section[0])
		console.log((JSON.stringify(dataW2[0].grandParentName).replace('"','')))
		console.log(habitat[0])
		console.log(type[0])
		console.log(tips[0])
		// names[0] = names[0].replace('"','')
		// names[0] = names[0].replace('"','')
		console.log(names[0])
		return(

			
			<ScrollView>
				<Title> Catalog </Title>
				<Text>
					 hello   
				</Text>
			</ScrollView>


		)
	}	
}
