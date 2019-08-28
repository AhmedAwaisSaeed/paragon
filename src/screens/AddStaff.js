import React, { Component } from "react";
import {
  Platform,
  Alert,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  ScrollView,
  View,
  ImageBackground,
  Button,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  AsyncStorage,
  SafeAreaView
} from "react-native";

import { Navigation } from "react-native-navigation";

import MyTopBarTwo from "../components/MyTopBarTwo";
import RadioButton from "../components/RadioButtons";
import Toast, { DURATION } from "react-native-easy-toast";
import CardView from "react-native-cardview";
import CheckInList from "../components/checkInList";
import AddNewStaffDropDown from "../components/AddNewStaffDropDown";
import {base_url} from "../components/AllVariables";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class AddStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameStaff: "",
      rollType:"",
      dailyRate:"",
      phoneNumber:"",
      password:"",
      usernameValid: true,
      showWarning: false
    };
  }

  onchange_staff_name = (value, type) => {
    if (type == "nameStaff" && value == "") {
      this.setState({ usernameValid: false, nameStaff: null });
      this.refs.toast.show("Please Enter Name");
    } else {
      this.setState({
        nameStaff: value,
        usernameValid: true,
        showWarning: false
      });
    }
  };


  onchange_roll_type = (value, type) => {
    if (type == "rollType" && value == "") {
      this.setState({ usernameValid: false, rollType: null });
      this.refs.toast.show("Please Enter Roll type");
    } else {
      this.setState({
        rollType: value,
        usernameValid: true,
        showWarning: false
      });
    }
  };

  onchange_daily_rate = (value, type) => {
    if (type == "dailyRate" && value == "") {
      this.setState({ usernameValid: false, dailyRate: null });
      this.refs.toast.show("Please Enter daily date");
    } else {
      this.setState({
        dailyRate: value,
        usernameValid: true,
        showWarning: false
      });
    }
  };

  onchange_phone_number = (value, type) => {
    if (type == "phoneNumber" && value == "") {
      this.setState({ usernameValid: false, phoneNumber: null });
      this.refs.toast.show("Please Enter Phone");
    } else {
      this.setState({
        phoneNumber: value,
        usernameValid: true,
        showWarning: false
      });
    }
  };

  onchange_password = (value, type) => {
    if (type == "password" && value == "") {
      this.setState({ usernameValid: false, password: null });
      this.refs.toast.show("Please Enter Password");
    } else {
      this.setState({
        password: value,
        usernameValid: true,
        showWarning: false
      });
    }
  };


  goToNexctScreen = (screenName,data) =>{

    Navigation.push(this.props.componentId, {
    component: {
      name: screenName,
      passProps: {
        response:data 
      },
      options: {
        statusBar: {
          visible: true,
          style: 'light'
        },
        layout: {
          // direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
          backgroundColor: 'white',
          // orientation: ['portrait', 'landscape'] // An array of supported orientations
        },
        bottomTabs: { visible: false, drawBehind: true, animate: true} 
      }
    }
  });
  
  }

  async _getToken(key) {
    return await AsyncStorage.getItem(key, (err, result) => {
        return result;
    });
}

  add_employee_call= async ()=>{
    console.log("Add Employee call");

  
    const all_params={

      full_name:this.state.nameStaff,
      roll_type:this.state.rollType,
      daily_rate:this.state.dailyRate,
      phone_number:this.state.phoneNumber,
      password:this.state.password,
      email:""


    }

    fetch(base_url+'employee/add_employee', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
          'x-sh-auth': await this._getToken("token")
      },
      body: JSON.stringify({...all_params}),
    }).then((response) => response.json())
        .then((responseJson) => {
         
          //  console.log("response in Projects responseJson");
          if(responseJson.code==200)
           {
            // console.log("Successfully Project Added");
            Alert.alert("Successfully Staff Added");
            Navigation.popToRoot(this.props.componentId);
              //  this.goToNexctScreen("Staff","");
              // this.setState({ActiveProjects:responseJson.active_projects});
            
                  // console.log("response is=",responseJson);
                  
             return;
           }
           else
           {
            Alert.alert("Error",responseJson.message);
             console.log("Error from Bakcend= ",responseJson);
             return;
    
           }
          
        })
        .catch((error) => {
          // console.log("error is",error);
    
          //  Alert.alert("error");
           console.error(error);
        });

     console.log("All Params in add Staff=",all_params);

  }

  roll_type_callback =(val)=>{

    this.setState({rollType:val});
     console.log("Selectd Roll is= ",this.state.rollType);

  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{flex: 1}}>
        <View style={{ height: 50 }}>
          <MyTopBarTwo
            screenText="Add New Staff"
            showLeftIcon={true}
            showRightIcon={false}
            idComponent={this.props.componentId}
          />
        </View>
        <View style={styles.topBarLine} />
        <KeyboardAwareScrollView enableOnAndroid={true} keyboardShouldPersistTaps="handled">
          
            <View style={styles.secondMainContainer}>
          <View style={styles.sectionOne}>
            <View style={styles.nameContainer}>
              <CardView
                style={{
                  
                flex: 1,
                  backgroundColor: "white",
                  height:60,
                  
                  justifyContent: "center"
                }}
                cardElevation={4}
                cardMaxElevation={4}
                cornerRadius={5}
              >
                <View style={styles.fieldContainer}>
                  <TextInput
                    style={{ color: "black", marginLeft: 6,fontSize:16 }}
                    onChangeText={text =>
                      this.onchange_staff_name(text, "nameStaff")
                    }
                    value={this.state.nameStaff}
                    placeholder="Name"
                    placeholderTextColor="#C9C9C9"
                  />
                </View>
              </CardView>
            </View>

            <View style={styles.nameContainer}>
              <CardView
                style={{
                  
                flex: 1,
                  backgroundColor: "white",
                  height:60,
                  justifyContent: "center"
                }}
                cardElevation={4}
                cardMaxElevation={4}
                cornerRadius={5}
              >
                <View style={styles.fieldContainer}>

                  <AddNewStaffDropDown staff_roll_call={this.roll_type_callback}/>
                  {/* <TextInput
                    style={{ color: "black", marginLeft: 10 }}
                    onChangeText={text =>
                      this.onchange_roll_type(text, "rollType")
                    }
                    value={this.state.rollType}
                    placeholder="roll type"
                    placeholderTextColor="#C9C9C9"
                  /> */}
                </View>
              </CardView>
            </View>

            <View style={styles.nameContainer}>
              <CardView
                style={{
                  
                flex: 1,
                  backgroundColor: "white",
                  height:60,
                  justifyContent: "center"
                }}
                cardElevation={4}
                cardMaxElevation={4}
                cornerRadius={5}
              >
                <View style={styles.fieldContainer}>
                  <TextInput
                    style={{ color: "black", marginLeft: 6,fontSize:16 }}
                    onChangeText={text =>
                      this.onchange_daily_rate(text, "dailyRate")
                    }
                    value={this.state.dailyRate}
                    placeholder="Daily Rate"
                    placeholderTextColor="#C9C9C9"
                  />
                </View>
              </CardView>
            </View>

            <View style={styles.nameContainer}>
              <CardView
                style={{
                  
                flex: 1,
                  backgroundColor: "white",
                  height:60,
                  justifyContent: "center"
                }}
                cardElevation={4}
                cardMaxElevation={4}
                cornerRadius={5}
              >
                <View style={styles.fieldContainer}>
                  <TextInput
                    style={{ color: "black", marginLeft: 6,fontSize:16 }}
                    onChangeText={text =>
                      this.onchange_phone_number(text, "phoneNumber")
                    }
                    value={this.state.phoneNumber}
                    placeholder="Phone Number"
                    placeholderTextColor="#C9C9C9"
                  />
                </View>
              </CardView>
            </View>


            <View style={styles.nameContainer}>
              <CardView
                style={{
                  
                flex: 1,
                  backgroundColor: "white",
                  height:60,
                  justifyContent: "center"
                }}
                cardElevation={4}
                cardMaxElevation={4}
                cornerRadius={5}
              >
                <View style={styles.fieldContainer}>
                  <TextInput
                    style={{ color: "black", marginLeft: 6,fontSize:16 }}
                    secureTextEntry={true} 
                    autoCapitalize = 'none'
                    onChangeText={text =>
                      this.onchange_password(text, "password")
                    }
                    value={this.state.password}
                    placeholder="Password"
                    placeholderTextColor="#C9C9C9"
                  />
                </View>
              </CardView>
            </View>
          </View>


          <View style={styles.sectionthreeContainer}>


<TouchableOpacity onPress={()=> this.add_employee_call()}>
      
      
          <View style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </View>
          
</TouchableOpacity>


</View>


</View>

</KeyboardAwareScrollView>
        <Toast position="top" ref="toast" />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    //  alignItems: 'center',
    backgroundColor: "white",
    
  },
  secondMainContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  },
  topBarLine: {
    // flex:1,
    borderWidth: 0.5,
    borderColor: "#AAB0BC"
    // marginTop:10
  },
  sectionOne: {
    marginTop: 20
  },

  fieldContainer: {
    //  justifyContent:"center"
  },
  nameContainer:{
        flex:1,
        marginTop:20
  },

  sectionthreeContainer:{
    flex:1,
    alignItems:"center",
     marginTop:20,
    //  marginBottom:400
     
    
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
 
});
