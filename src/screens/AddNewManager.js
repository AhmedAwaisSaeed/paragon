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
import DropdwonTwo from "../components/DropDownTwo";
import {base_url} from "../components/AllVariables";
import { CheckBox } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';




export default class AddNewManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameManager: "",
      rollType:"",
      ManagerEmail:"",
      phoneNumber:"",
      password:"",
      usernameValid: true,
      showWarning: false,
      Staffchecked:false,
      Reportchecked:false,
      Projectschecked:false,
      checkBoxData:[ ]
    };
  }

  onchange_manager_name = (value, type) => {
    if (type == "nameManager" && value == "") {
      this.setState({ usernameValid: false, nameManager: null });
      this.refs.toast.show("Please Enter Name");
    } else {
      this.setState({
        nameManager: value,
        usernameValid: true,
        showWarning: false
      });
    }
  };


 

  onchange_manager_email = (value, type) => {
    if (type == "ManagerEmail" && value == "") {
      this.setState({ usernameValid: false, ManagerEmail: null });
      this.refs.toast.show("Please Enter Email");
    } else {
      this.setState({
        ManagerEmail: value,
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


  goToNextScreen = (screenName,data) => {
    //  console.log("screen is=......",data);
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
     
        bottomTabs: {visible: false, drawBehind: true, animate: true}
      }
    }
  });
}

async _getToken(key) {
  return await AsyncStorage.getItem(key, (err, result) => {
      return result;
  });
}


   add_manager_call = async()=>{


    console.log("Add New Manager call");



var checkObject={

  staff:this.state.Staffchecked,
  reports:this.state.Reportchecked,
  projects:this.state.Projectschecked

}

var arr=[];
  arr.push(checkObject);

  await this.setState({checkBoxData:arr});


  // console.log("checkbox object is= ",this.state.checkBoxData);

  

    const all_params={

      

      full_name:this.state.nameManager,
      email:this.state.ManagerEmail,
      phone_number:this.state.phoneNumber,
      password:this.state.password,
      manager_access:this.state.checkBoxData
      
    


    }

    fetch(base_url+'manager/add_manager', {
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
            Alert.alert("Successfully Manager Added");
              //  this.goToNextScreen("Staff","");
              // this.setState({ActiveProjects:responseJson.active_projects});
            
                  // console.log("response is=",responseJson);
                  
            //  return;
           }
           else
           {
            Alert.alert("Error",responseJson.message);
             console.log("Error from Bakcend= ",responseJson);
            //  return;
    
           }
          
        })
        .catch((error) => {
          // console.log("error is",error);
    
          //  Alert.alert("error");
           console.error(error);
        });

     console.log("All Params in add New Manager=",all_params);



  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{flex: 1}}>
        <View style={{ height: 50,  }}>

        <MyTopBarTwo
            screenText="Add New Manager"
            showLeftIcon={true}
            showRightIcon={false}
            idComponent={this.props.componentId}
          />
        {/* <View style={styles.TopBarContainer}>
        <View style={styles.iconOneContainer}>
            
            <TouchableHighlight style={{width:50}} onPress={()=>this.backToScreen()}>
            <Image style={{width:20,height:20}} source={require('../assets/arrowtwo.png')}></Image>
            </TouchableHighlight>


        </View>
        <View style={{flex:2,backgroundColor:"pink"}}><Text style={styles.topBarText}>Add New Project</Text></View>
        <View style={{flex:1}}><Text></Text></View>
        <View style={styles.topBarLine}></View>
        </View> */}
        </View>
       
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
                      this.onchange_manager_name(text, "nameManager")
                    }
                    value={this.state.nameManager}
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
                  <TextInput
                    style={{ color: "black", marginLeft: 6,fontSize:16 }}
                    onChangeText={text =>
                      this.onchange_manager_email(text, "ManagerEmail")
                    }
                    value={this.state.ManagerEmail}
                    placeholder="Email"
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

          <View style={styles.checkboxHeading}><Text style={{fontSize:12,fontWeight:"bold"}}>Give Your Manager Access To</Text></View>
          <View style={{marginTop:10}}>
          <View style={styles.checkboxesContainer}>
          <CheckBox
          containerStyle={{borderWidth:0,paddingLeft:0}}
          checkedColor="#2D4273"
          textStyle={{color:"#7D7D7D"}}
          title='Staff'
          checked={this.state.Staffchecked}
          onPress={()=>this.setState({Staffchecked:!this.state.Staffchecked})}
            />
            </View>
            

            <View style={styles.checkboxesContainer}>
          <CheckBox
          containerStyle={{borderWidth:0,paddingLeft:0}}
          checkedColor="#2D4273"
          textStyle={{color:"#7D7D7D"}}
          title='Reports'
          checked={this.state.Reportchecked}
          onPress={()=>this.setState({Reportchecked:!this.state.Reportchecked})}
            />
            </View>

            <View style={styles.checkboxesContainer} >
          <CheckBox
         containerStyle={{borderWidth:0,paddingLeft:0}}
         checkedColor="#2D4273"
         textStyle={{color:"#7D7D7D"}}
          title='Projects'
          checked={this.state.Projectschecked}
          onPress={()=>this.setState({Projectschecked :!this.state.Projectschecked})}

            />
            </View>
            </View>

          <View style={styles.sectionthreeContainer}>


<TouchableOpacity onPress={()=> this.add_manager_call()}>
      
      
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
    borderColor: "#979CAC"
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
  TopBarContainer:{

    backgroundColor:"white",
    flexDirection:"row",
    backgroundColor:"red",
    justifyContent:"space-between"

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
  iconOneContainer:{
    // backgroundColor:"red",
    flex: 1,
    // alignItems:'',
    // justifyContent:'center',
    paddingLeft:10,
    justifyContent:"center"

    
  },
  checkboxHeading:{
      marginTop:20,
      // marginBottom:20

  },
  checkboxesContainer:
  {

    marginLeft:-10

  }

});


