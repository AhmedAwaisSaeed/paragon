

import React, {Component} from 'react';
import {Platform, StyleSheet, Text,TextInput, View,propTypes,TouchableOpacity,Image} from 'react-native';
import { Navigation } from "react-native-navigation";


export default class MyTopBar extends Component{

  backToScreen = () =>{
    Navigation.pop(this.props.idComponent);
  }

  render() {
return(
<View style={styles.maincontainer}>


    <View style={styles.iconOneContainer}>
{this.props.showLeftIcon &&
  <TouchableOpacity onPress={()=>this.backToScreen()}>
  <Image style={{width:20,height:20}} source={require('../assets/Backward_arrow.png')}></Image>
  </TouchableOpacity>
}

</View>

        <View style={styles.stringContainer}>
            <Text style={{color:"#ffff"}}>{this.props.screenText}</Text>
        </View>
        <View style={styles.iconTwoContainer}>
{this.props.showRightIcon &&
        
        <Text>TopBar</Text>
    
}
        </View>

        
</View>
    );
   
}
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // alignItems: 'center',
     backgroundColor: '#2D4273',
    // width:"100%"
    
    
    // height:20
    
    // marginLeft:20
    
  },
  topBarContainer:{

    flex: 1,
    // justifyContent: 'center',
    width:"100%",
    // 
    flexDirection:"row",
    
    alignItems: 'center',
    // height:50,
    // backgroundColor: '#2D4273',
    // backgroundColor: 'orange',

  },
  iconOneContainer:{
    // backgroundColor:"red",
    flex: 1,
    alignItems:'flex-start',
    justifyContent:'center',
    paddingLeft:10

    
  },
  stringContainer:{
    // marginLeft:120,
    flex: 1,

    // backgroundColor:"pink",
    alignItems:'center',
    justifyContent:'center'

  },
  iconTwoContainer:{
// backgroundColor:"blue",
alignItems:'center',
    justifyContent:'center',
flex: 1
  }

});
