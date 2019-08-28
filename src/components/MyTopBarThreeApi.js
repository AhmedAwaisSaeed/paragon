

import React, {Component} from 'react';
import {Platform, StyleSheet, Text,TextInput, View,propTypes,TouchableOpacity,Image} from 'react-native';
import { Navigation } from "react-native-navigation";
import { MenuProvider } from 'react-native-popup-menu';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';


export default class MyTopBarThreeApi extends Component{

  backToScreen = () =>{
    Navigation.pop(this.props.idComponent);
  }

  onselectEdit=()=>{

    this.props.editfunctioncall();

  }

  onselectDelete=()=>{

    this.props.deletefunctioncall();

  }

  onselectInactive=()=>{

    console.log("make inactive");

    this.props.makeInactiveCall();

  }

  render() {
return(
<View style={styles.maincontainer}>


<View style={styles.iconOneContainer}>
{this.props.showLeftIcon &&
  <TouchableOpacity style={{width:50}} onPress={()=>this.backToScreen()}>
  <Image style={{width:20,height:20}} source={require('../assets/arrowtwo.png')}></Image>
  </TouchableOpacity>
}

</View>

        <View style={styles.stringContainer}>
            <Text style={{color:"black",fontWeight:"bold",fontSize:18}}>{this.props.screenText}</Text>
        </View>
        <View style={styles.iconTwoContainer}>
          {this.props.showRightIcon &&
        //  <MenuProvider style={{flex: 1,width:100}}>
        <Menu style={{ height: 50,alignItems:"flex-end" ,paddingRight:0,paddingTop:10}}>
        <MenuTrigger customStyles={triggerStyles}>
        <Image 
          style={{width: 45, height: 30}}  
        source={require('../assets/threedots.png')} />
        </MenuTrigger>
        <MenuOptions customStyles={optionsStyles}>
          {/* <MenuOption onSelect={() => alert(`Save`)} text='Save' /> */}
          <MenuOption onSelect={() => this.onselectEdit()} >
            <Text style={{color: 'blue',fontSize:16}}>Edit</Text>
          </MenuOption>
          <MenuOption onSelect={() => this.onselectInactive()} >
            <Text style={{color: 'red',fontSize:16}}>Make Inactive</Text>
          </MenuOption>
          <MenuOption onSelect={() => this.onselectDelete()} >
            <Text style={{color: 'red',fontSize:16}}>Delete</Text>
          </MenuOption>


          {/* <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' /> */}
        </MenuOptions>
      </Menu>
      // </MenuProvider>
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
     backgroundColor: 'white',
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
    flex: 2,

    // backgroundColor:"pink",
    alignItems:'center',
    justifyContent:'center'

  },
  iconTwoContainer:{
// backgroundColor:"blue",
 alignItems:"flex-end",
    // justifyContent:"flex-end",
 marginLeft:20,
flex: 1
  }

});

const optionsStyles = {
  optionsContainer: {
    // backgroundColor: 'green',
    
   
  },
  optionsWrapper: {
    // backgroundColor: 'purple',
  },
  optionWrapper: {
    // backgroundColor: 'yellow',
    // margin: 5,
  },
  optionTouchable: {
    // underlayColor: 'gold',
    activeOpacity: 70,
  },
  optionText: {
    color: 'brown',
    
    
  },
};
const triggerStyles = {
  triggerText: {
    // color: 'white',
  },
  triggerOuterWrapper: {
    // backgroundColor: 'orange',
    // padding: 5,
    // flex: 1,
  },
  triggerWrapper: {
    // backgroundColor: 'blue',
    // alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
  },
  triggerTouchable: {
    underlayColor: 'darkblue',
    activeOpacity: 70,
    style : {
      flex: 1,
    },
  },
};