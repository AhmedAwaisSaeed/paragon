

import React, {Component} from 'react';
import {StyleSheet, Text,View,Image} from 'react-native';

import CardView from "react-native-cardview";
export default class PayrollList extends Component{


  render() {
return(

<View style={styles.ActiveEmpContainer}>
      <View style={styles.contentContainer}>
      <View style={{flex:2}}><Text style={styles.ActiveEmpString}>{this.props.name}</Text></View>
      <View style={{flex:1,alignItems:"flex-end",justifyContent:"center"}}><Text>${this.props.money}</Text></View>
      </View>
      <View style={styles.ActiveEmpline}></View>
</View>
);
   
}
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  
  ActiveEmpContainer:{

    flex:1,
    marginTop:10,
    marginLeft:30,
    paddingBottom:5,
    marginRight:20,
    padding:10

  },
 ActiveEmpString:{

    fontSize:16,

 },
 ActiveEmpline:{
    borderWidth:0.5,
    borderColor:"#979CAC",
    marginTop:10,
   
 },
 contentContainer:{

    flexDirection:"row",
    flex:1,
    justifyContent:"space-evenly",
    // backgroundColor:"red"

  }
  


});
