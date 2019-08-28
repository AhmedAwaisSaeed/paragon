

import React, {Component} from 'react';
import {Platform, StyleSheet, Text,TextInput, View, ImageBackground,Button,Image} from 'react-native';
import banner1 from '../assets/banner.png'

export default class BannerOne extends Component{


  render() {
return(
    <View style={styles.container}>
        <View style={styles.bgimagecontainer}>
        <ImageBackground style={{flex:1}}  source={banner1}></ImageBackground>
        </View>
        <View style={styles.textContainer}>
        <View><Text style={styles.bigFont}>Discover</Text></View>
        <View><Text style={styles.smallFont}>If you are  offered a seat on a rocket ship{"\n"}dont ask what seat! just get on.</Text></View>
        </View>
    </View>
    );
   
}
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
    justifyContent: 'flex-start',
    // alignItems: 'center',
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20,
    // borderWidth: 1,
    marginTop:30,
    marginLeft:20,
    marginRight:20,
    marginBottom:40,
    
    backgroundColor:"#2D4273",

    // backgroundColor: '#F5FCFF',
    //  backgroundColor:'pink',

  },
 
  bgimagecontainer:{
    flex:2,
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
    overflow: 'hidden',
    

  },
  bigFont: {
    color: '#474E61',
    fontWeight:"100",
    fontSize: 30,
     marginTop:30
  },
  smallFont: {

    color:'#7A839C',
    width:300,
    height:100,
    paddingTop:10,
    textAlign: 'center',

    //  marginTop:20
    // backgroundColor:"red",
    
  },
  textContainer:{
 flex:1,
    backgroundColor:"white",
    alignItems:"center",
     justifyContent:"center",
     
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20,
    // height:140
      
  

  }


});





