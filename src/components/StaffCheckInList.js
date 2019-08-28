

import React, {Component} from 'react';
import {StyleSheet, Text,View,Image} from 'react-native';

import CardView from "react-native-cardview";
import Moment from 'moment';
export default class StaffCheckInList extends Component{

  componentWillMount() {
    Moment.locale('en');
    
  console.log("date is=",Moment(this.props.smallString).format('LT'));

  }

  


  render() {
return(
<View style={{paddingBottom:20}}>
    <CardView style={{padding:10,paddingLeft:10, marginLeft:10,marginRight:10,backgroundColor:"white"}}
           cardElevation={8}
           cardMaxElevation={8}
          cornerRadius={5}
          >
            <View style={{flex:1,flexDirection:"row"}}>
<View style={styles.secionOneContainer}>
    <View style={{}}>
    <Text style={styles.largeText}>{this.props.largeString}</Text>
    </View>
    <View style={{}}>
    <Text style={styles.smallText}>{Moment(this.props.smallString).format('h:mm:ss ')} to {Moment(this.props.secondString).format('h:mm:ss ')}</Text>
    </View>
    
  </View>

<View style={styles.sectionTwoContainer}>
<View style={{flexDirection:"row-reverse"}}>
    <Text style={styles.largeText}>{this.props.difference}</Text>
    </View>
    
    <View style={{flexDirection:"row-reverse"}}>
    <Text style={styles.smallText}>{this.props.daily_rate}</Text>
    </View>
</View>

</View>


</CardView>
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
  smallText:{

    fontSize:12,

  },
  largeText:{
      fontSize:16,
      fontWeight:"200"
  },
  secionOneContainer:{
    flex:1,
    // flexDirection:"row",
    // justifyContent:"space-between",
    // backgroundColor:"red"
  },
  sectionTwoContainer:{

    flex:1,
    
    // marginLeft:100

  }


});
