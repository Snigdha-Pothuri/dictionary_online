import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default class HomeScreen extends React.Component { 

  constructor() { 
    super(); 
    this.state = { 
      text: '',
       isSearchPressed: false, 
       isLoading: false,
        word : "Loading...", 
        lexicalCategory :'', 
        definition : ""
       }
      }

   getWord = (word)=>{
       var searchKeyWord = word.toLowerCase();
       var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyWord+".json"
       return fetch(url) 
       .then((data)=>{
           if (data.status === 200) {
               return data.json();
           } 
           else {
               return null
           }
       })
       .then( (response)=>{
         var responseObject = response 
         if (responseObject) {
           var wordData = responseObject.definitions[0] 
           var definition = wordData.description
           var lexicalCategory = wordData.wordtype
           this.setState({
            "word": this.state.text,
            "definition" : definition,
            "lexicalCategory" : lexicalCategory
           })
         } 
         else {
           this.setState({
             "word" : this.state.text,
             "definition" : "Not Found"
           })
         }
       }

       )
   }
render () {
    return (
      <View> 
        <TextInput
        style={styles.inputBox}
          onChangeText = {text => {
            this.setState({
              text : text,
              isSearchPressed : false,
              word : "Loading...",
              lexicalCategory : "",
              examples : [],
              definition : ""
            });
          }} 
          value = {this.state.text}
          /> 

          <TouchableOpacity style={styles.searchButton}
          onPress={()=>{
           this.setState({isSearchPressed:true})
           this.getWord(this.state.text)
          }}
          >
            <Text> Search </Text>
          </TouchableOpacity> 

          <View style={styles.detailsContainer}> 
           <Text style={styles.detailTitle}> Word : {""} </Text> 
           <Text style = {{fontSize:18}}> {this.state.word} </Text>
          </View> 

          <View style={styles.detailsContainer}> 
           <Text style={styles.detailTitle}> Type : {""} </Text> 
           <Text style = {{fontSize:18}}> {this.state.lexicalCategory} </Text>
          </View> 

          <View style={{flexDirection : "row" , flexWrap : "wrap"}}>
        <Text style={styles.detailTitle}>  definition : {""} </Text> 
           <Text style = {{fontSize:18}}> {this.state.definition} </Text>
          </View>

      </View>
    )
  }
} 

const styles = StyleSheet.create({
  inputBox : {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  searchButton : {
    justifyContent : 'center',
    alignSelf : 'center',
    alignItems : "center",
    borderWidth : 2,
    borderRadius : 15,
    width : 200,
    height:50,
    backgroundColor:"yellow",
    marginTop : 20,
    marginLeft : -70
  }
})