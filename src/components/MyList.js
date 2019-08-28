

import React, {Component} from 'react';
import {StyleSheet, Text,View,Image} from 'react-native';

import CardView from "react-native-cardview";
export default class MyList extends Component{


  render() {
return(

    <CardView style={{flex:1,padding:10,paddingLeft:10, marginLeft:10,marginRight:10,backgroundColor:"white"}}
          cardElevation={5}
          cardMaxElevation={5}
          cornerRadius={5}
          >
    <View style={{flex:1}}>
    <Text style={styles.smallText}>{this.props.smallString}</Text>
    </View>

    <View style={{flex:1}}>
    <Text style={styles.largeText}>{this.props.largeString}</Text>
    </View>
</CardView>

  
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
  smallText:{

    fontSize:12,

  },
  largeText:{
    fontSize:16,
    color:"#474E61"
  }


});
