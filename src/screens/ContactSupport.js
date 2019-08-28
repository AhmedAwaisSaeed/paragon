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
import { Linking } from 'react-native'
import CardView from "react-native-cardview";
import MyList from "../components/MyList";
import ActiveEmployeeList from "../components/ActiveEmployeeList";
import PayrollList from "../components/PayrollList";
import MyTopBarTwo from "../components/MyTopBarTwo";
import { Navigation } from "react-native-navigation";
import AccountsList from "../components/AccountsList";
import { TouchablePreview } from "react-native-navigation/lib/dist/adapters/TouchablePreview";
import {base_url} from "../components/AllVariables";


export default class ContactSupport extends Component {
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
        <MyTopBarTwo  screenText="Contact Support" showLeftIcon= {true} showRightIcon={false} idComponent={this.props.componentId} />
        </View>
        <View style={styles.topBarLine} />

        <View style={{ marginTop:20, justifyContent: 'center', paddingHorizontal: 40 }}>

{/* <Button onPress={() => Linking.openURL('mailto:support@example.com?subject=SendMail&body=Description') }
title="Paragon@info.com" /> */}
<TouchableOpacity 

onPress={() => Linking.openURL('mailto:Paragin@info.com?subject=SendFeedback&body=Description') }
title="Support" 
>


<View style={styles.submitButton}>
<Text style={styles.submitButtonText}>Contact Us</Text>
</View>

</TouchableOpacity>


</View>


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
  submitButton:{
    height:48,
    width:302,
  //flex:1,
  justifyContent:"center",
   backgroundColor: '#69C9DE',
   borderRadius: 10,
   borderWidth: 1,
   borderColor:"#69C9DE"   
   
  
  },
  submitButtonText:{
  textAlign:"center",
  color:"white"
  },
  topBarLine:{

    borderWidth:0.5,
    borderColor:"#979CAC",
    marginTop:5

  },

  

});
