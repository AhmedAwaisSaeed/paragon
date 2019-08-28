import React, {Component} from 'react';
import {Platform, StyleSheet,StatusBar, Text,TextInput, View, ImageBackground,Button,ScrollView,TouchableOpacity} from 'react-native';
import MyTopBar from '../components/MyTopBar';
import Toast, {DURATION} from 'react-native-easy-toast';

export default class BottomTabFour extends Component{

  

  render() {

    return (
// Container main 

<View style={styles.container}>

    <Text style={{textAlign:"center"}}>Tab Four Pressed</Text>

 </View>
 


    
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
        justifyContent: 'center',
         alignContent:"center",
    backgroundColor: '#2D4273'
  }
  


});
