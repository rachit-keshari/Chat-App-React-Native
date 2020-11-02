import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import { Label, Input, Item, Button } from 'native-base';
import * as firebase from 'firebase';

export default class loginScreen extends React.Component {
  
  state={
    email:"",
    password:""
  }
  
  static navigationOptions ={
        title:'Login'
    }

    userSignin(email,pass){
         firebase.auth().signInWithEmailAndPassword(email,pass)
         .then(()=>{
             this.props.navigation.navigate('loading')
         })
         .catch((error)=>{
             Alert.alert(error.message)
         })
    }
    render(){
  return (
    <KeyboardAvoidingView behavior="position" 
                          style={sty.container}>
        <View style={{alignItems:'center'}}>
            <Image source={require("../assets/chat2.gif")}
                   style={{ width:390, height:250, }}
            />
        </View>
       <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={(val)=>this.setState({email:val})}/>
        </Item>
        <Text></Text>
        <Item floatingLabel>
              <Label>Password</Label>
              <Input secureTextEntry={true} 
                     onChangeText={(val)=>this.setState({password:val})}
              />
        </Item>
        <Text></Text>
        <Button full rounded info style={sty.mybtn}
                     onPress={()=>this.userSignin(this.state.email,this.state.password)}
         >
            <Text style={sty.textdeco}>Login</Text>
        </Button>
        <TouchableOpacity style={{
          alignItems:'center', 
          }}>
          <Text></Text>
          <Text style={{fontSize:20, color:'grey', marginBottom:5,}} >Don't have an account ?</Text>
        </TouchableOpacity>
        <Button full bordered rounded info 
                     style={sty.mybtn}
                     onPress={()=>this.props.navigation.navigate("signup")}
                     >
            <Text style={{ color:'grey', fontSize:26, }}>Sign Up</Text>
        </Button>
    </KeyboardAvoidingView>
  );}
}

const sty = StyleSheet.create({
  container: {
    flexDirection:'column',
    backgroundColor: 'white',
    padding:30,
    justifyContent: 'space-around',
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
      shadowOpacity:1,
      shadowOffset:{width: 30, height: 30},
  },
});