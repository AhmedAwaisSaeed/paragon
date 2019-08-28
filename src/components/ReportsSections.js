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
import AccountsList from "../components/AccountsList";

// var help=require('../assets/Icons_Accouts/Help.png');
// var chat=require('../assets/Icons_Accouts/Chat.png');
// var phone =require('../assets/Icons_Accouts/Phone.png');
// var feedBack=require('../assets/Icons_Accouts/feedBack.png');
// var legal=require('../assets/Icons_Accouts/legal.png');
// var logout=require('../assets/Icons_Accouts/Export.png');

export default class ReportsSections extends Component {
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

          bottomTabs: { visible: false, drawBehind: true }
        }
      }
    });
  };

  render() {
    return (
      <View>

          <View style={styles.mainSection}>

              <View style={styles.circularview}>
                  <Image source={this.props.path}></Image>
              </View>
              <View style={{marginTop:20}}>
                  <Text>{this.props.string}</Text>
              </View>

          </View>
        


        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignContent:"center",
    backgroundColor: "#FFFFFF"
  },
  mainSection:{
    //   flex:1,
      backgroundColor:"#DEE0E4",

      width:163,
      height:165,
      alignItems:"center",
      justifyContent:"center",
      
       marginLeft:10
      
  },
  circularview:{

    backgroundColor:"white",
    borderColor:"black",
    borderRadius:20,
    width:40,
    height:40,
    alignItems:"center",
    justifyContent:"center"



  }
 

});
