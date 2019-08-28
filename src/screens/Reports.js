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
  SafeAreaView,
  AsyncStorage
} from "react-native";

import CardView from "react-native-cardview";
import MyList from "../components/MyList";
import ActiveEmployeeList from "../components/ActiveEmployeeList";
import PayrollList from "../components/PayrollList";
import MyTopBarTwo from "../components/MyTopBarTwo";
import { Navigation } from "react-native-navigation";
import ReportsSections from "../components/ReportsSections";


var payrollIcon=require('../assets/Reports_Icons/user.png');
var staffIcon=require('../assets/Reports_Icons/searchForStaff.png');

var moreIcon=require('../assets/Reports_Icons/increase.png');
var projectsIcon=require('../assets/Reports_Icons/projects.png');


export default class Reports extends Component {
  constructor(props) {
    super(props);

    // this.bottomTabListenerReports = Navigation.events().registerBottomTabSelectedListener(async ({ selectedTabIndex, unselectedTabIndex }) => {


    //   console.log("bottom tab listener reports....",unselectedTabIndex,selectedTabIndex);
      
  
    // });

    this.state={

      unselectedbottomtabindex:undefined,
      screenAccess:undefined,
      selectebottomtabindex:undefined

    }
  }

  goToNexctScreen = (screenName, data) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
        passProps: {
          response: data
        },
        options: {
         
          bottomTabs: { visible: false, drawBehind: true, animate: true }
        }
      }
    });
  };


  goToBottomScreen = (screenName,index) => {


    Navigation.mergeOptions(screenName, {
      bottomTabs: {
        currentTabIndex: index
      }
    });
    // Navigation.push(this.props.componentId, {
    //   component: {
    //     name: screenName,
    //     passProps: {
    //       response: data
    //     },
    //     options: {
    //       statusBar: {
    //         visible: true,
    //         style: "light"
    //       },

    //       bottomTabs: { visible: false, drawBehind: true, animate: true }
    //     }
    //   }
    // });
  };

  onPressPayRoll =() => {

    console.log("on press payroll");

    this.goToNexctScreen("PayRoll","");

  }

  onPressStaff =async () => {

    const user_type=await AsyncStorage.getItem("user_type");
    const user_access=await AsyncStorage.getItem("user_access"); 
    const item = JSON.parse(user_access);

    if(user_type=="manager" && item.staff==false)
    {

      return;

    } 
    else
    {
      this.goToBottomScreen("StaffScreenId",2);
    }

  }

  onPressProjects =async () => {

    const user_type=await AsyncStorage.getItem("user_type");
    const user_access=await AsyncStorage.getItem("user_access"); 
    const item = JSON.parse(user_access);
    if(user_type=="manager" &&  item.projects==false)
    {
      return;
    }
    else
    {
      this.goToBottomScreen("ProjectsScreenId",1);
    }

  }


  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{flex: 1}}>
        {/* <View>
          <StatusBar />
        </View> */}


        <View style={styles.TopBarContainer}>
            
            <View><Text style={styles.topBarText}>Reports</Text></View>
          </View>
          <View style={styles.topBarLine}></View>
        
        {/* End Top Bar */}

        <View style={{flex:1}}> 
         <ScrollView contentContainerStyle={{flexGrow : 1, justifyContent : 'center',alignItems:"center"}} keyboardShouldPersistTaps={"handled"}> 

        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>

        <View style={{flexDirection:"row",paddingLeft:10,paddingRight:20}}>
        <View style={{marginTop:20}}>
          <TouchableOpacity onPress={()=> this.onPressPayRoll()}>
            <ReportsSections path={payrollIcon} string="Payroll"></ReportsSections>
            </TouchableOpacity>
        </View>

        <View style={{marginTop:20}}>
        <TouchableOpacity onPress={()=> this.onPressStaff()}>
            <ReportsSections path={staffIcon} string="Staff"></ReportsSections>
            </TouchableOpacity>
        </View>

        </View>


        <View style={{flexDirection:"row",paddingLeft:10,paddingRight:20}}>
        <View style={{marginTop:20}}>
        <TouchableOpacity onPress={()=> this.onPressProjects()}>
            <ReportsSections path={projectsIcon} string="Projects"></ReportsSections>
            </TouchableOpacity>
        </View>

        <View style={{marginTop:20}}>
            <ReportsSections path={moreIcon} string="More Features"></ReportsSections>
        </View>

        </View>

        </View>

        </ScrollView>
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
  TopBarContainer:{

    backgroundColor:"white",
    // marginTop:20

  },
  topBarText:{

    fontSize:18,
    textAlign:"center",
    fontWeight:"bold",
    paddingTop:10,
    color:"#000000"


  },
  topBarLine:{

    borderWidth:0.5,
    borderColor:"#979CAC",
    marginTop:10

  },
  

});
