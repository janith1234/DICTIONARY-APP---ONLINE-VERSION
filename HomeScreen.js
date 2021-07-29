import React from 'react';
import { StyleSheet, Text, View , TextInput , TouchableOpacity} from 'react-native';

export default class Homescreen extends React.Component {
  constructor(){
    super();
    this.state={
      text: '',
      isSearchPressed: false,
      isLoading: false,
      word  : "Loading...",
      lexicalCategory :'',
      definition : ""
    }
  }
  getWord=(word)=>{
    var searchKeyword=word.toLowerCase()
    var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
    //console.log(url)
    return fetch(url)
    .then((data)=>{
      if(data.status===200)
      {
        return data.json()
      }
      else
      {
        return null
      }
    })
    .then((response)=>{
        //console.log(response)

        var responseObject = response
        //var word = responseObject.word
        //var lexicalCategory = responseObject.results[0].lexicalEntries[0].lexicalCategory.text
        if(responseObject)
        {
          var wordData = responseObject.definitions[0]
          //console.log(responseObject.definitions[0])
          var definition=wordData.description
          var lexicalCategory=wordData.wordtype
          //console.log(lexicalCategory)
          this.setState({
            "word" : this.state.text, 
            "definition" :definition,
            "lexicalCategory": lexicalCategory     
            
          })
        }
        else
        {
          this.setState({
            "word" : this.state.text, 
            "definition" :"Not Found",
            
          })

        }
    
    })
  }
    render(){
        return (
            <View>
                 <TextInput
            style={styles.inputBox}
            onChangeText={text => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word  : "Loading...",
                lexicalCategory :'',
                examples : [],
                definition : ""
              });
            }}
            value={this.state.text}
          /><TouchableOpacity style={styles.button} onPress={()=>{
                  this.setState({ isSearchPressed: true });
                  this.getWord(this.state.text)}
                  }>
                <Text>Search</Text>
                </TouchableOpacity>
              <Text>{this.state.word}</Text>
              <View style={styles.outputContainer}>
          <Text style={{fontSize:20}}>
            {
              this.state.isSearchPressed && this.state.word === "Loading..."
              ? this.state.word
              : ""
            }
          </Text>
            {
              this.state.word !== "Loading..." ?
              (
                <View style={{justifyContent:'center', marginLeft:10 }}>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                      Word :{" "}
                    </Text>
                    <Text style={{fontSize:18 }}>
                      {this.state.word}
                    </Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                      Type :{" "}
                    </Text>
                    <Text style={{fontSize:18}}>
                      {this.state.lexicalCategory}
                    </Text>
                  </View>
                  <View style={{flexDirection:'row',flexWrap: 'wrap'}}>
                    <Text style={styles.detailsTitle}>
                      Definition :{" "}
                    </Text>
                    <Text style={{ fontSize:18}}>
                      {this.state.definition}
                    </Text>
                  </View>
                </View>
              )
              :null
            }
        </View> 
            </View>
          ); 
    }
  
}

const styles=StyleSheet.create({
  button:{
    width:90,
    height:30,
    backgroundColor:"#ECA446",
    color:"white",
    fontSize:18,
    marginTop:10,
    padding:10
  },
  textinput:{
    width:200,
    height:40,
    borderColor:'black',
    borderWidth:5
  },
  container: {
    flex: 1,
  },
  inputBoxContainer: {
    flex:0.3,
    alignItems:'center',
    justifyContent:'center'
  },
  inputBox: {
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
  },
  searchButton: {
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
  searchText:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  outputContainer:{
    flex:0.7,
    alignItems:'center'
  },
  detailsContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  detailsTitle:{
    color:'orange',
    fontSize:20,
    fontWeight:'bold'
  }
})