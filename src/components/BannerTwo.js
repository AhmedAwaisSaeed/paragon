

import React, {Component} from 'react';
import {StyleSheet, Text,View,Image} from 'react-native';
import banner1 from '../assets/banner.png'

export default class BannerTwo extends Component{


  render() {
return(
    <View style={styles.container}>
        <View style={styles.imagecontainer}>
        <Image style={{height:200}}  source={banner1} />
        </View>
        <View style={styles.welcome}><Text style={styles.bigFont}>Banner 2</Text></View>
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

  imagecontainer:{

    flex: 1,
    height:200,
    justifyContent: 'center',
    alignItems: 'center',

  },
  bigFont: {
    color: '#841584',
    fontWeight: 'bold',
    fontSize: 30,
  },
  textInputView:{

    marginTop:10

  },
  loginButton:{

    marginTop:50

  }


});
