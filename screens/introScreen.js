import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Label, Input, Item, Button } from 'native-base';
import * as firebase from 'firebase';

export default class introScreen extends React.Component {
  static navigationOptions ={
        title:'intro',
        header:null
    }
  
    goTo(){
        this.props.navigation.navigate('login');
    }

    render(){
  return (
      <View style={sty.container}>
          <Image source={require("../assets/chat4.gif")}
                   style={{ width:400, height:350, }}
            />
          <View style={sty.introdeco}>
              <Text style={sty.textdeco}>
                  Chat App Built using
                  Expo cli, React-Native, Firebase,
                  Native-base. ©rachit_code
              </Text>
              <Text></Text>
              <Button rounded info style={sty.mybtn}
                     onPress={()=>this.goTo()}
         >
            <Text style={{color:'white', fontSize:26,}}> Start!</Text>
        </Button>

          </View>
            
      </View> 
  );}
}

const sty = StyleSheet.create({
  container: {
    flexDirection:'column',
    backgroundColor: 'white',
    marginTop:90,
    justifyContent: 'center',
  },
  introdeco:
  {
     borderWidth:1,
     borderColor:'#62B1F6',
     borderRadius:40,
     padding:30,
     margin:30,
     marginTop:0,
     justifyContent:'center',
  },
  textdeco:
  {
     fontSize:25,
     color:'grey',
     fontWeight:'bold',
     justifyContent:'center',
  },
  mybtn:
  {
      width:200,
      margin:2,
      padding:10,
      justifyContent:'center',
  },
});