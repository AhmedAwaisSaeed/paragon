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
  SafeAreaView,
  ActivityIndicator
} from "react-native";

import { Navigation } from "react-native-navigation";

import MyTopBarTwo from "../components/MyTopBarTwo";
import RadioButton from "../components/RadioButtons";
import Toast, { DURATION } from "react-native-easy-toast";
import CardView from "react-native-cardview";
import CheckInList from "../components/checkInList";
import DropDownTwo from "../components/DropDownTwo";
import {base_url} from "../components/AllVariables";
import { CheckBox } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ManagerStatusDrop from '../components/ManagerStatusDrop';


export default class EditManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameManager: "",
      emailManager:"",
      phoneNumber:"",
    //   password:"",
      usernameValid: true,
      showWarning: false,
      staff_id:"",
      DataFetched: false,
      showIndicator:true,
      Staffchecked:false,
      Reportchecked:false,
      Projectschecked:false,
      Manager_status:"",
      checkBoxData:[],
      auth_id:""
    };
  }


  async _getToken(key) {
    return await AsyncStorage.getItem(key, (err, result) => {
        return result;
    });
}

  async componentDidMount() {

    // const token  = this.props.response.token;
    console.log("In Edit Manager");

   var token="";
     const id=this.props.response;
    //  const id="5d41494aa470db2b5028ed1c";



   console.log("Edit Manager ID is=",id);
//    this.setState({staff_id:id});

   AsyncStorage.getItem('token').then( value=>
     {
       token=value;
       console.log("token value in Edit Manager async is=",token);
     }
     
 );
 // var url = base_url+'/project/get_project_list?_id=${id}';
 fetch(base_url+'manager/get_manager_detail', {
 method: 'POST',
 headers: {
   Accept: 'application/json',
   'Content-Type': 'application/json',
   'x-sh-auth':  await this._getToken("token")
 },
 body:JSON.stringify({
   _id:id
 })
}).then((response) => response.json())
   .then((responseJson) => {
    
  
     if(responseJson.code==200)
      {


          this.setState({nameManager:responseJson.get_manager_by_id.full_name,
           phoneNumber:responseJson.get_manager_by_id.phone_number,
           emailManager:responseJson.get_manager_by_id.email,
        //    password:responseJson.get_employee_detail_by_id.pasword,
            auth_id:responseJson.get_manager_by_id.auth_id._id,
             checkBoxData:responseJson.get_manager_by_id.manager_access,
             Manager_status:responseJson.get_manager_by_id.auth_id.status,
            // Projectschecked:responseJson.get_manager_by_id.manager_access[0].projects,
            // Reportchecked:responseJson.get_manager_by_id.manager_access[0].reports,
            
           DataFetched: true
          
       });
       this.setState({showIndicator:false});
           console.log("Response in Edit manager Against specific ID=",this.state.checkBoxData);
           this.setState({Staffchecked:this.state.checkBoxData[0].staff,Projectschecked:this.state.checkBoxData[0].projects,
            Reportchecked:this.state.checkBoxData[0].reports
          });
             
        
      }
      else
      {
        this.setState({showIndicator:false});
       Alert.alert("Error",responseJson.message);
        console.log("Error From backend",responseJson);
        return;

      }
     
   })
   .catch((error) => {
     // console.log("error is",error);

     //  Alert.alert("error");
      console.error(error);
   });

   
   



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
    if (type == "emailManager" && value == "") {
      this.setState({ usernameValid: false, emailManager: null });
      this.refs.toast.show("Please Enter Email");
    } else {
      this.setState({
        emailManager: value,
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

//   onchange_password = (value, type) => {
//     if (type == "password" && value == "") {
//       this.setState({ usernameValid: false, password: null });
//       this.refs.toast.show("Please Enter Password");
//     } else {
//       this.setState({
//         password: value,
//         usernameValid: true,
//         showWarning: false
//       });
//     }
//   };

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
     
        bottomTabs: { visible: false, drawBehind: true, animate: true} 
      }
    }
  });
}

  update_manager_call= async()=>{
    console.log("Update Manager call");


    var checkObject={

      staff:this.state.Staffchecked,
      projects:this.state.Projectschecked,
      reports:this.state.Reportchecked,
      
    
    }
    
    var arr=[];
      arr.push(checkObject);
    
      await this.setState({checkBoxData:arr});






    var token="";

    AsyncStorage.getItem('token').then( value=>
      {
        token=value;
        // console.log("token value async is=",token);
      }
      
  );

    const all_params={

      _id:this.state.auth_id,
      full_name:this.state.nameManager,
      email:this.state.emailManager,
       phone_number:this.state.phoneNumber,
       manager_access:this.state.checkBoxData,
       status:this.state.Manager_status
    //    password:this.state.password,
    //   status:"active"


    }
    console.log("All Params in update Manager=",all_params);
    fetch(base_url+'manager/update_manager', {
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
            console.log("Successfully Manager Updated");
            Alert.alert("Successfully Manager Updated");
              // this.goToNexctScreen("Staff","");
              Navigation.popToRoot(this.props.componentId);
              // this.setState({ActiveProjects:responseJson.active_projects});
            
                  //  console.log("response is=",responseJson);
                  
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
          // console.log("error is",error);
    
          //  Alert.alert("error");
           console.error(error);
        });



  }


  dropDownValue =(val) =>{

    console.log("in edit dropdown");

    this.setState({Manager_status:val});


  }

 

  render() {
    return (
      <View style={styles.container}>
        {this.state.DataFetched && 
        <SafeAreaView style={{flex: 1}}>
        <View style={{ height: 50 }}>
          <MyTopBarTwo
            screenText="Edit Manager"
            showLeftIcon={true}
            showRightIcon={false}
            idComponent={this.props.componentId}
          />
        </View>
        <View style={styles.topBarLine} />
        <KeyboardAwareScrollView enableOnAndroid={true} keyboardShouldPersistTaps="handled">
          
            <View style={styles.secondMainContainer}>
            {
      this.state.showIndicator ? <ActivityIndicator size="large" color="blue" /> :null
    }
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
                      this.onchange_manager_email(text, "emailManager")
                    }
                    value={this.state.emailManager}
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
                <ManagerStatusDrop functioncall={this.dropDownValue} defaultValue={this.props.status} />
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


<TouchableOpacity onPress={()=> this.update_manager_call()}>
      
      
          <View style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Update</Text>
          </View>
          
</TouchableOpacity>


</View>


</View>

</KeyboardAwareScrollView>
        <Toast position="top" ref="toast" />

        
        </SafeAreaView>

        }

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
  checkboxHeading:{
    marginTop:20,
    // marginBottom:20

},
checkboxesContainer:
  {

    marginLeft:-10

  }

 
});
