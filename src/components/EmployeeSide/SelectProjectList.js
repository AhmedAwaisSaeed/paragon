

import React, {Component} from 'react';
import {StyleSheet, Text,View,Image} from 'react-native';

import CardView from "react-native-cardview";
export default class SelectProjectList extends Component{


render() {
return(

<View style={styles.ActiveEmpContainer}>
<View style={styles.contentContainer}>
<View><Text style={styles.ActiveEmpString}>{this.props.name}</Text></View>
    <View><Text>{this.props.roll}</Text></View>

{/* <View><Text>{this.props.money}</Text></View> */}
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

    
     marginTop:5,
    marginLeft:30,marginRight:30,
    paddingBottom:5,
    paddingTop:5
    // backgroundColor:"red",
    

  },
 ActiveEmpString:{

    fontSize:16,
    color:"#474E61"

 },
 ActiveEmpline:{
    borderWidth:0.5,
    borderColor:"#AAB0BC",
    marginTop:10,
    
   
 },
 contentContainer:{

    // flexDirection:"row",
    flex:1,
    justifyContent:"space-between",
    

  }
  


});
