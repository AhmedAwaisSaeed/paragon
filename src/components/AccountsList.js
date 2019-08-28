import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  View,
  Image,
  ImageBackground,
  Button,
  ScrollView,
  TouchableOpacity
} from "react-native";

import CardView from "react-native-cardview";
import MyList from "../components/MyList";
import ActiveEmployeeList from "../components/ActiveEmployeeList";
import PayrollList from "../components/PayrollList";
import MyTopBarTwo from "../components/MyTopBarTwo";
import { Navigation } from "react-native-navigation";

export default class AccountsList extends Component {
  constructor(props) {
    super(props);
  }

  goToNexctScreen = (screenName, data) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
        passProps: {
          response: data
        },
        options: {
          statusBar: {
            visible: true,
            style: "light"
          },

          bottomTabs: { visible: false, drawBehind: true, animate: true }
        }
      }
    });
  };

  render() {
    return (
      <View style={{marginTop:30}}>

          <View style={styles.secondMain}>

          <View>
          <Image
          source={this.props.path}
          //borderRadius style will help us make the Round Shape Image
          style={{ width: 24, height: 24, borderRadius: 12,borderColor:"#F3F9FE",borderWidth:1 }} />
          </View>
          <View><Text style={{marginLeft:30,color:"#2D4273",fontSize:12}}>{this.props.string}</Text></View>
          </View>
     
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 secondMain:{
     flexDirection:"row",
    //  backgroundColor:"red"
 }
});
