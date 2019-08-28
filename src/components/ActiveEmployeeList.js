

import React, {Component} from 'react';
import {StyleSheet, Text,View,Image} from 'react-native';

import CardView from "react-native-cardview";
export default class ActiveEmployeeList extends Component{


  render() {
return(

<View style={styles.ActiveEmpContainer}>
<View><Text style={styles.ActiveEmpString}>{this.props.name}</Text></View>
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

    
    marginTop:10,
    marginLeft:30,marginRight:30,
    paddingBottom:5

  },
 ActiveEmpString:{

    fontSize:18,

 },
 ActiveEmpline:{
    borderWidth:0.5,
    borderColor:"#979CAC",
    marginTop:10,
   
 }
  


});
