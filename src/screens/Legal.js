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
  TouchableOpacity,
  AsyncStorage,
  Alert,
  SafeAreaView
} from "react-native";

import CardView from "react-native-cardview";
import MyList from "../components/MyList";
import ActiveEmployeeList from "../components/ActiveEmployeeList";
import PayrollList from "../components/PayrollList";
import MyTopBarTwo from "../components/MyTopBarTwo";
import { Navigation } from "react-native-navigation";
import AccountsList from "../components/AccountsList";
import { TouchablePreview } from "react-native-navigation/lib/dist/adapters/TouchablePreview";
import {base_url} from "../components/AllVariables";


export default class Legal extends Component {
  constructor(props) {
    super(props);

    this.state={
  
    }
  }

  

  render() {
    return (
      <View style={styles.container}>
        <View>
          <StatusBar />
        </View>
    
        <SafeAreaView>
        <View style={{height:50}}>
        <MyTopBarTwo  screenText="Legal" showLeftIcon= {true} showRightIcon={false} idComponent={this.props.componentId} />
        </View>
        <View style={styles.topBarLine} />
        </SafeAreaView>
        
       
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
  topBarLine:{

    borderWidth:0.5,
    borderColor:"#979CAC",
    marginTop:5
  
  },
  

});
