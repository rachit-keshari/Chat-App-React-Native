import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableOpacity, ScrollView, Alert, Right, Left, Body, Thumbnail, Content, Dimensions } from 'react-native';
import { Label, Input, Item, Button, List, ListItem, Icon, Footer, FooterTab } from 'native-base';
import * as firebase from 'firebase';

export default class homeScreen extends React.Component {
  
  state={
    email:"",
    text:"",
    mylist:[],
  }
  static navigationOptions ={
        title:'Chat!'
  }

  userLogout(){
       firebase.auth().signOut()
       .catch((error)=>{
           Alert.alert(error.message)
       })
  }
 
  saveItem()
  {
      console.log(this.state.text)
      const mylist = firebase.database().ref('mylist');
      mylist.push().set({
        email: this.state.email,
        list_val: this.state.text,
        time:Date.now()
      })
      this.setState({text:""});
  }

  removeIt()
  {
    firebase.database().ref('mylist').remove();
    this.setState({mylist:[]});
  }

  componentDidMount(){
    this.unsubcribeAuth = firebase.auth().onAuthStateChanged((user)=>{
          if(user){
              this.setState({email:user.email})
          }else{
              this.props.navigation.navigate('login')
          }
      })

      const myitems = firebase.database().ref('mylist');
    
      myitems.on('value',datasnap=>{
        // console.log(Object.values(datasnap.val()));
        if(datasnap.val()){
        this.setState({mylist:Object.values(datasnap.val())})
        }
      });  
  }
  componentWillUnmount(){
    this.unsubcribeAuth()
  }
    render(){

      const myitems = this.state.mylist.map((val)=>{
        return(
          <View style={sty.msg} key={val.time}>
             <Text style={sty.msgid}>{'ID : '+val.email+' :'}</Text>
             <Text style={sty.msgbody}>{val.list_val+'       '}  
        <Text style={sty.msgtime}>{new Date(val.time).toDateString()}     {new Date(val.time).toLocaleTimeString()}</Text>
             </Text>
             
          </View> 
        );
    });

  return (
    <KeyboardAvoidingView behavior="position" style={sty.container} >
    <View header style={sty.headerview}>
    <Text style={{
         color:'white',
         fontSize:29,
    }}>Chat App 😄</Text>
    <Button full rounded info 
                     style={sty.mylogoutbtn}
                     onPress={()=>this.userLogout()}
                     >
            <Text style={{ color:'white', fontSize:26, }}>Logout</Text>
    </Button>

    </View>
    <View style={sty.chatpage}>

          <ScrollView
          ref={ref => {this.scrollView = ref}}
          onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
          style={{
        flexDirection:"column",
      }}>
         <View>{myitems}</View>
      </ScrollView>

      </View>
    <View style={sty.footerview}>

        <Input  
            placeholder="Type a message" 
            value={this.state.text}
           onChangeText={(text_input)=>this.setState({text:text_input})}
        />
    
    <Button rounded success 
    style={sty.mybtnsend}
    onPress={()=>this.saveItem()}                       
    ><Text style={sty.mytext}><Icon name='send'/></Text></Button>

    </View>
   </KeyboardAvoidingView>

  );}
}

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;
let chatHeight = ScreenHeight-230;

const sty = StyleSheet.create({
  container: {
    flexDirection:'column',
    backgroundColor: 'white',
    margin:2,
    marginTop:16,
    justifyContent: 'space-between',
  },
  chatpage:
  {
    flexDirection:'column',
    backgroundColor: 'white',
    height:chatHeight,
    padding:10,
    justifyContent:'flex-start',
  },
  textdeco:
  {
     fontSize:26,
     color:'white',
  },
  mybtn:
  {
      width:100,
      margin:2,
      padding:10,
      justifyContent:'center',
  },
  mybtnsend:
  {
      width:50,
      height:50,
      margin:2,
      padding:12,
      justifyContent:'center',
  },
  mytext:
  { 
     color:'white',
     fontSize:25,
  },
  msg:
  {
     borderRadius:45,
     backgroundColor:'grey',
     padding:7,
     paddingLeft:35,
     paddingRight:35,
     margin:6,
     flexDirection:'column',
     justifyContent:'flex-start',
  },
  msgid:
  {
     fontWeight:'bold',
     color:'black',
     fontStyle:'italic',
     fontSize:12,
     alignSelf:'flex-start',
  },
  msgbody:
  {
     color:'white',
     fontSize:15,
     fontWeight:'bold',
     alignSelf:'flex-start',

  },
  msgtime:
  {
    color:'white',
    fontSize:10,
    fontStyle:'italic',
    fontWeight:'bold',
    alignSelf:'flex-end',
  },
  mylogoutbtn:
  {
    width:120,
    margin:2,
    padding:10,
    justifyContent:'center',
    elevation:2,
  },
  headerview:
  {
    flexDirection:'row',
     padding:20,
     backgroundColor:'orange',
     borderRadius:20,
     margin:10,
     marginTop:30,
     justifyContent: 'space-around',
     elevation:4,
  },
  footerview:
  {
    borderWidth:1,
    borderColor:'#5cb85c',
    borderRadius:38,
    backgroundColor:'white',
    padding:10,
    paddingLeft:15,
    paddingRight:15,
    margin:5,
    flexDirection:"row",
    justifyContent:'space-evenly',
  },
});
