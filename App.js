import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import signupScreen from './screens/signupScreen';
import loginScreen from './screens/loginScreen';
import loadingScreen from './screens/loadingScreen';
import homeScreen from './screens/homeScreen';
import * as firebase from 'firebase';
import { firebaseConfig } from './config';
import introScreen from './screens/introScreen';
import introPreScreen from './screens/introPreScreen';

firebase.initializeApp(firebaseConfig);

const myswitch = createSwitchNavigator({
    stack: createStackNavigator({
      inroPre: introPreScreen,
      intro: introScreen,
      login: loginScreen,  
      signup: signupScreen,
      
  },{
    defaultNavigationOptions: {
      headerTintColor: 'white',
      headerTitleContainerStyle:{
        justifyContent:'flex-start',
        elevation:9,
      },
      headerTitleStyle:{
        fontSize:35,
        fontWeight:'bold',
        padding:10,
        paddingTop:30,
        paddingBottom:30,
      },
      headerStyle: {
        backgroundColor: 'orange',
      },
    },
  }),
  home: homeScreen,
  loading: loadingScreen,
  
});

export default createAppContainer(myswitch);

