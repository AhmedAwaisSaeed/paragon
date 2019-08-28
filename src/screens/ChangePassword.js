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
  SafeAreaView,
  ActivityIndicator
} from "react-native";

import CardView from "react-native-cardview";
import Toast, { DURATION } from "react-native-easy-toast";
import MyList from "../components/MyList";
import ActiveEmployeeList from "../components/ActiveEmployeeList";
import PayrollList from "../components/PayrollList";
import MyTopBarTwo from "../components/MyTopBarTwo";
import { Navigation } from "react-native-navigation";
import AccountsList from "../components/AccountsList";
import { TouchablePreview } from "react-native-navigation/lib/dist/adapters/TouchablePreview";
import {base_url} from "../components/AllVariables";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ImagePicker from 'react-native-image-picker';

import Imagep from 'react-native-image-progress';
import Progress from 'react-native-progress/Bar';

const options = {
    title: 'Select Avatar',
    noData: true,
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };



export default class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state={


        // AdminName:"",
        AdminOldPassword:"",
        AdminNewPassword:"",
        AdminConfirmPassword:"",
        // AdminAddress:"",
        // AdminEmail:"",
        // AdminLogoPath:"",
        // AdminNumber:"",
        usernameValid: true,
        showWarning: false,
        showIndicator:true,
        // avatarSource:"",
        // imageshow:"",
        // Secondtime:"",
        AdminAuthId:""
      
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
          statusBar: {
            visible: true,
            style: "light"
          },

          bottomTabs: { visible: false, drawBehind: true, animate: true}
        }
      }
    });
  };


  




        onchange_old_password = (value, type) => {
            if (type == "AdminOldPassword" && value == "") {
              this.setState({ usernameValid: false, AdminOldPassword: null });
              this.refs.toast.show("Please Enter Old Password");
            } else {
              this.setState({
                AdminOldPassword: value,
                usernameValid: true,
                showWarning: false
              });
            }
          };
        onchange_new_password = (value, type) => {
            if (type == "AdminNewPassword" && value == "") {
              this.setState({ usernameValid: false, AdminNewPassword: null });
              this.refs.toast.show("Please Enter New Password");
            } else {
              this.setState({
                AdminNewPassword: value,
                usernameValid: true,
                showWarning: false
              });
            }
          };
        onchange_confirm_password = (value, type) => {
            if (type == "AdminConfirmPassword" && value == "") {
              this.setState({ usernameValid: false, AdminConfirmPassword: null });
              this.refs.toast.show("Please Enter Confirm Password");
            } else {
              this.setState({
                AdminConfirmPassword: value,
                usernameValid: true,
                showWarning: false
              });
            }
          };



     


  async _getToken(key) {
    return await AsyncStorage.getItem(key, (err, result) => {
        return result;
    });
}


  

  change_password_request=async ()=>{


    console.log("length is=",this.state.AdminNewPassword.length);
    if(this.state.AdminOldPassword =="" || this.state.AdminNewPassword=="" || this.state.AdminConfirmPassword=="")
    {
        return alert("Any Field can't be empty");
    }

    if(this.state.AdminNewPassword.length<6 || this.state.AdminConfirmPassword.length<6)
    {
        return alert("Password should be greater than or Equal to 6 ");
    }
    
    // perform all neccassary validations
    if (this.state.AdminNewPassword !== this.state.AdminConfirmPassword) {
        alert("Passwords don't match");
    } else {
        // make API call
    


    const allParams = {
        old_password:this.state.AdminOldPassword,
        new_password:this.state.AdminNewPassword
    

    }



    console.log("All Params in change password Request",allParams);
  

  fetch(base_url+'admin/update_password', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-sh-auth': await this._getToken("token")
  },
  body: JSON.stringify({...allParams}),
}).then((response) => response.json())
    .then((responseJson) => {
     
      //  console.log("response in Projects responseJson");
      if(responseJson.code==200)
       {
        
        console.log("Successfully Password Chanegd");
        // console.log("in radio value=",statusOfProject);
         Alert.alert("Password changed");
        console.log("response is updated=",responseJson);

        // this.goToNexctScreen("Projects","");
          // this.setState({ActiveProjects:responseJson.active_projects});
        
               
              
        //  return;
       }
       else
        { 
          
          Alert.alert("Error",responseJson.message);
         console.log("Error from Backend= ",responseJson);
         return;

       }
      
    })
    .catch((error) => {
       console.log("error is",error);

        
        console.error(error);
    });

   


}

  



  }


  
  render() {
    return (
      <View style={styles.container}>
        <View>
          <StatusBar />
        </View>
{/*  */}

<SafeAreaView style={{flex: 1}}>
        <View style={{ height: 50 }}>
          <MyTopBarTwo
            screenText="Change Password"
            showLeftIcon={true}
            showRightIcon={false}
            idComponent={this.props.componentId}
          />
        </View>
        <View style={styles.topBarLine} />
        <KeyboardAwareScrollView enableOnAndroid={true} keyboardShouldPersistTaps="handled">


          
            <View style={styles.secondMainContainer}>
            {/* {
      this.state.showIndicator ? <ActivityIndicator size="large" color="blue" /> :null
    } */}
    
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
                    secureTextEntry={true} 
                    autoCapitalize = 'none'
                    onChangeText={text =>
                      this.onchange_old_password(text, "AdminOldPassword")
                    }
                    value={this.state.AdminOldPassword}
                    placeholder="Old Password"
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
                      this.onchange_new_password(text, "AdminNewPassword")
                    }
                    value={this.state.AdminNewPassword}
                    placeholder="New Password"
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
                      this.onchange_confirm_password(text, "AdminConfirmPassword")
                    }
                    value={this.state.AdminConfirmPassword}
                    placeholder="Confirm Password"
                    placeholderTextColor="#C9C9C9"
                  />
                </View>
              </CardView>
            </View>
        
        
        

          </View>


         


          <View style={styles.sectionthreeContainer}>


<TouchableOpacity onPress={()=> this.change_password_request()}>
      
      
          <View style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Change</Text>
          </View>
          
</TouchableOpacity>


</View>




</View>

</KeyboardAwareScrollView>
        <Toast position="top" ref="toast" />

        
        </SafeAreaView>

        

        
       {/*  */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignContent:"center",
    backgroundColor: "#FFFFFF",

  },
  secondMainContainer:{

    marginLeft:10,
    marginRight:10


  },
  sectionOne: {
    marginTop: 20,

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
  SectionOneContainer:{
    flex:1,
//    backgroundColor:"red",
//  flexDirection:"row",
 height:50,
alignItems:"center",
marginTop:20
   
},
topBarLine:{

  borderWidth:0.5,
  borderColor:"#979CAC",
  marginTop:5

},
  

});
