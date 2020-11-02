import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableOpacity, Alert, Animated } from 'react-native';
import { Label, Input, Item, Button } from 'native-base';
import * as firebase from 'firebase';

export default class signupScreen extends React.Component {
  
  state={
    email:"",
    password:"",
  }
  
  static navigationOptions ={
        title:'Sign Up'
    }

    
   userSignup(email,pass){
     console.log(this.state);
     firebase.auth().createUserWithEmailAndPassword(email,pass).then(()=>{
       this.props.navigation.navigate('login')
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
            <Image source={require("../assets/chat3.gif")}
                   style={{ width:350, height:250, }}
            />
        
        </View>
       <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={(val)=>this.setState({email:val})} />
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
                    onPress={()=>this.userSignup(this.state.email,this.state.password)}
        >
            <Text style={sty.textdeco}>Sign Up</Text>
        </Button>
        <Text></Text>
        <TouchableOpacity style={{
          alignItems:'center', 
          marginBottom:5,
          }}>
          <Text style={{fontSize:20, color:'grey'}} >Already have an account!</Text>
        </TouchableOpacity>
        <Button full bordered rounded info 
                     style={sty.mybtn}
                     onPress={()=>this.props.navigation.navigate("login")}
                     >
            <Text style={{ color:'grey', fontSize:26, }}>Login</Text>
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
  },
});