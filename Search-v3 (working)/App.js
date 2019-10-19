import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import dataW2 from "./data/dataW2.json";
import Fuse from "fuse.js";
import { SearchBar } from 'react-native-elements';
import { StackNavigator } from 'react-navigation'
//import Search from "./Search"
var options = {
  shouldSort: true,
  threshold: 0.3,
	
  keys: [{
    name: 'name',
    weight: 0.7
  }, {
    name: 'keywords',
    weight: 0.3
  }]  //end keys weight
}; //end options



/*
if(typeof this.state.userinput === 'undefined'){
	input=''
}
else{
	input= this.state.userinput
}
var result = fuse.search(input)


if(typeof fuse.search(this.state.userinput) === 'undefined'){
  result = ' ';
}
else{
  result = fuse.search(this.state.userinput);
}
*/

/*
var secRec = result[1].name;
var thirdRec = result[2].name;
var fourthRec = result[3].name;
var fifthRec = result[4].name;
*/
//suggestions = [firstRec, secRec, thirdRec, fourthRec, fifthRec];
//console.log(suggestions)


export default class App extends Component {
	constructor(props){
		super(props);
		global.suggestions = []
		this.state = {
			text:	"",
			// list: dataW2,
			reccs:[]
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleFuzzySearch = this.handleFuzzySearch.bind(this);
	}

	handleChange(e) {
		console.log("handleChange e= " + e);
		const searchText = e
		this.handleFuzzySearch(searchText)
		// this.setState({
		// 	handleFuzzySearch(searchText)
		// })
	};

	handleFuzzySearch(value) {
		//console.log("handleFuzzySearch value= " + value);
		//console.log("handle options= " + options);
		// console.log("handle this.state.list= " + this.state.list);
		// const { options } = this.state;
//		const list = dataW2;
		var fuse = new Fuse(dataW2, options);
		var results = fuse.search(value);
		//console.log("results = " + results)
		var i
		//var suggestions = [];
		for (let i=0; i< Math.min(results.length, 5); i++){
			if (JSON.stringify(results[i].name) !== 'undefined'){
				suggestions.push(JSON.stringify(results[i].name));
			}
			else{
				//suggestions[i] = ' '
				suggestions[i].push(null)
			}
			//this.setState({reccs[i]: suggestions[i]})
		}
		//console.log("reccs are = " + this.state.reccs[1])
		console.log("suggestions are = " + suggestions)


		// console.log("first rec = " + finalresults[0])
		//slice
		// this.setState({
		// 	results: results
		// })
	}

	render() {

		const { results } = this.state;
		//const options = results.map((list) => <option value={list.text} />);
		return (
      <View style={{padding: 100}}>
				<TextInput
					// platform= "ios"
					style={{height: 40}}
					placeholder= "Search Catalog..."
					//onChangeText={(text) => this.handleChange( {text})}
					//value={this.state.text}
					onChangeText={this.handleChange}
					/>

					<Text style ={{fontSize: 42}}>
					{suggestions[0]}
					</Text>

			</View>
		);
	}

}
