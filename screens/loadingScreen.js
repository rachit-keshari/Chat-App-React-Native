import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Label, Input, Item, Button } from 'native-base';
import * as firebase from 'firebase';

export default class loadingScreen extends React.Component {
  static navigationOptions ={
        header:null
    }
  
    compfun(){
      
      setTimeout(()=>{
      this.unsubcribeAuth = firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            this.props.navigation.navigate('home');
        }
        else
        {
            this.props.navigation.navigate('login');
        }
    })
     },5000);
    }

   componentDidMount(){
       this.compfun();
   } 
   componentWillUnmount(){
    this.unsubcribeAuth()
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
    marginTop:150,
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