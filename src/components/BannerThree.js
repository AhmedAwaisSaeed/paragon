

import React, {Component} from 'react';
import { StyleSheet, Text, View,Image} from 'react-native';
import banner1 from '../assets/banner.png'

export default class BannerThree extends Component{


  render() {
return(
    <View style={styles.container}>
        <View>
        <Image style={{height:200}}  source={banner1} />
        </View>
        <View><Text style={styles.bigFont}>Banner 3</Text></View>
    </View>
    );
   
}
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     flexDirection:'column',
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

  bgimagecontainer:{

    flex: 1,
    width:null,
    height:null,
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
