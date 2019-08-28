/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet,ScrollView,TouchableWithoutFeedback, Text,SafeAreaView,Keyboard, TextInput,StatusBar, View, ImageBackground,Button,Image,TouchableHighlight,TouchableOpacity} from 'react-native';
// import bgimage from './images/images.jpeg';
// import logo from './images/logo.png';
import { Navigation } from "react-native-navigation";
import Swiper from "react-native-web-swiper";
import BannerOne from "./src/components/BannerOne";
import BannerTwo from "./src/components/BannerTwo";
import BannerThree from "./src/components/BannerThree";
import btnbackground from"./src/assets/btnbackground.png";
import { MenuProvider } from 'react-native-popup-menu';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';




export default class App extends Component {




  goToScreen= (screenName)=>{

    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
        passProps: {
          text: 'Pushed screen'
        },
        options: {
        // bottomTabs: { visible: false} 
        statusBar: {
              visible: true,
              style: 'light-content'
            },
            layout: {
              // direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
              backgroundColor: '#2D4374',
              // orientation: ['portrait', 'landscape'] // An array of supported orientations
            },
      }
      }
    });
  
  }

  componentWillMount(){
    // console.log("keyBoard Dissmiss");
    // Keyboard.dismiss();

    // var date=new Date();
    // console.log("Employee Projects List Pressed");
    
    
    // var date2 = moment(date).format('YYYY-MM-DD,h:mm:ss a');
    // console.log("date two is=",date2);

  }
componentDidMount(){
  Keyboard.dismiss();
}


  render() {
    return (
 
<View style={styles.container}> 

<SafeAreaView style={{flex: 1}}>
  <View style={{flex:1}}>
<ScrollView contentContainerStyle={{flexGrow : 1}}>
  
<View style={styles.wc}><Text style={{color:"#ffffff", 
fontSize: 28}}>Welcome to</Text></View>
       <View style={styles.logoimage} >
         <Image 
        //  style={{width: 200, height: 200}}  
        source={require('./src/assets/logo.png')} />
      </View>


      <View style={{flex:1,height:450}}>
                  <Swiper
                  
                  activeDotElement ={<View style={{backgroundColor: 'white', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />} 
                  prevButtonText=""
                  nextButtonText=""
                    direction={"row"}
                    loop={true}
                    autoplayTimeout={2.5}
                    // overRangeButtonsOpacity={0.3}
                    from={0}
                  >
                      <View style={{flex:1,
                      // backgroundColor:"rgba(20,20,200,0.3)"
                    }}>
                      <BannerOne/>
                      </View>
                      <View style={{flex:1,
                      // backgroundColor:"rgba(20,200,20,0.3)"
                    }}>
                      <BannerOne/>
                      </View>
                      <View style={{flex:1,
                      //  backgroundColor:"rgba(200,20,20,0.3)"
                    }}>
                      <BannerOne/>
                      </View>
                  </Swiper>
        </View>

      
        

      <TouchableOpacity onPress={()=>this.goToScreen('Login')}>
      {/* <ImageBackground style={{height:50}} source={btnbackground} > */}
      <View style={styles.buttons}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Contine To Login</Text>
          </View>
          {/* </ImageBackground> */}
      </View>
        </TouchableOpacity>

        
        
        

        
  </ScrollView>    
</View>
        </SafeAreaView>
        

</View>


    
    );
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: 'space-between',
      // alignItems: 'center',
    backgroundColor: '#2D4273',
    paddingTop:20
    
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  bgimagecontainer:{

    flex: 1,
    width:null,
    height:null,
    justifyContent: 'center',
    alignItems: 'center',

  },
  logoimage: {
    
    // backgroundColor:'#841584',
    justifyContent: 'flex-start', //main axis top to B
    alignItems:"center",
    marginTop:15
    
    
    
  },
  textInputView:{

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  
    

  },
  buttons:{

    
    // height:80,
     padding:15,
    // marginLeft:20,
    backgroundColor: '#2D4273',
    

  },
  wc: {
    
    alignItems:"center",  //left to right cross axis 
    justifyContent:"flex-start", //top to bottom mainaxis 
    marginTop:10
    // backgroundColor:"blue",
    // height:50
  },
  button: {
    marginBottom: 30,
    // width: 260,
    alignItems: 'center',
    backgroundColor: '#69C9DE',
    borderRadius: 10,
    borderWidth: 1,
    borderColor:"#69C9DE"   
    
  },
  buttonText: {
    padding: 20,
    color: 'white',
    fontSize:15
    
  }


});
