import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Label, Input, Item, Button } from 'native-base';
import * as firebase from 'firebase';

export default class introPreScreen extends React.Component {
  static navigationOptions ={
        header:null
    }
  
    compfun(){
      setTimeout(()=>{
            this.props.navigation.navigate('intro');
     },3000);
    }

   componentDidMount(){
       this.compfun();
   } 

    render(){
  return (
      <View style={sty.container}>
          <Image source={require("../assets/chat4.gif")}
                   style={{ width:400, height:350, }}
            />
          
          <ActivityIndicator size="large" color='orange'/>
            
      </View> 
  );}
}

const sty = StyleSheet.create({
  container: {
    flexDirection:'column',
    backgroundColor: 'white',
    marginTop:120,
    justifyContent: 'center',
    alignItems:'center',
  },
  textdeco:
  {
     fontSize:26,
     color:'white',

  },
  mybtn:
  {
      width:320,
      margin:2,
      padding:10,
      justifyContent:'center',
  },
});