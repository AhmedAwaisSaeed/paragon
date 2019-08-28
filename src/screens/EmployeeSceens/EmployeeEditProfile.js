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



import MyTopBarTwo from "../../components/MyTopBarTwo";
import { Navigation } from "react-native-navigation";


import {base_url} from "../../components/AllVariables";
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



export default class EmployeeEditProfile extends Component {
  constructor(props) {
    super(props);

    this.state={


        AdminName:"",
        AdminPassword:"",
        AdminAddress:"",
        AdminEmail:"",
        AdminLogoPath:"",
        AdminNumber:"",
        usernameValid: true,
        showWarning: false,
        showIndicator:true,
        avatarSource:"",
        imageshow:"",
        Secondtime:"",
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


  onchange_admin_name = (value, type) => {
    if (type == "AdminName" && value == "") {
      this.setState({ usernameValid: false, AdminName: null });
      this.refs.toast.show("Please Enter Name");
    } else {
      this.setState({
        AdminName: value,
        usernameValid: true,
        showWarning: false
      });
    }
  };


  onchange_admin_address = (value, type) => {
        if (type == "AdminAddress" && value == "") {
          this.setState({ usernameValid: false, AdminAddress: null });
          this.refs.toast.show("Please Enter Address");
        } else {
          this.setState({
            AdminAddress: value,
            usernameValid: true,
            showWarning: false
          });
        }
      };



      onchange_admin_email = (value, type) => {
        if (type == "AdminEmail" && value == "") {
          this.setState({ usernameValid: false, AdminEmail: null });
          this.refs.toast.show("Please Enter Email");
        } else {
          this.setState({
            AdminEmail: value,
            usernameValid: true,
            showWarning: false
          });
        }
      };


        // onchange_password = (value, type) => {
        //     if (type == "AdminPassword" && value == "") {
        //       this.setState({ usernameValid: false, AdminPassword: null });
        //       this.refs.toast.show("Please Enter Password");
        //     } else {
        //       this.setState({
        //         AdminPassword: value,
        //         usernameValid: true,
        //         showWarning: false
        //       });
        //     }
        //   };



          onchange_admin_number = (value, type) => {
            if (type == "AdminNumber" && value == "") {
              this.setState({ usernameValid: false, AdminNumber: null });
              this.refs.toast.show("Please Enter Phone");
            } else {
              this.setState({
                AdminNumber: value,
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


async componentWillMount() {

console.log("Admin name",this.props.response);
await this.setState({AdminName:this.props.response.full_name,AdminAddress:this.props.response.address,
  AdminNumber:this.props.response.phone_number,
AdminAuthId:this.props.response.auth_id,
AdminLogoPath:this.props.pic_path,
AdminEmail:this.props.email
});

console.log("pic path is=",this.state.AdminLogoPath);
            if(this.state.AdminLogoPath=="")
              {

                this.setState({imageshow:false});


              }
              else
              {

                        
                    var base_path=this.state.AdminLogoPath;

                    this.setState({imageshow:true,AdminLogoPath:base_path});
                    this.setState({Secondtime:false});

              }


//   fetch(base_url+'', {
//   method: 'GET',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//     'x-sh-auth': await this._getToken("token")
//   },
// }).then((response) => response.json())
//     .then((responseJson) => {
     
    
//       if(responseJson.code==200)
//        {
         
//         console.log("Successfully In Admin EditProfile");
//           // this.goToNexctScreen(screenName,responseJson);
          
//           this.setState({
//                 AdminName:responseJson,
//                 AdminPassword:responseJson,
//                 AdminLogoPath:responseJson,
              
//             });
//               console.log("response in  Admin EditProfile=",responseJson);

//               if(this.state.AdminLogoPath=="")
//               {

//                 this.setState({imageshow:false});


//               }
//               else
//               {

                        
                    // var base_path="http://192.168.1.39:4100"+this.state.AdminLogoPath;

                    // this.setState({imageshow:true,AdminLogoPath:base_path});
                    // this.setState({Secondtime:false});

//               }

//               this.setState({showIndicator:false});
              
//               console.log("logo path is =",this.state.logo_path);
              
//          return;
//        }
//        else
//        {
//          console.log(responseJson);
//          return;

//        }
      
//     })
//     .catch((error) => {
//       // console.log("error is",error);

//       //  Alert.alert("error");
//        console.error(error);
//     });





  }








  

  update_profile_request=async ()=>{


    let allData = {
      _id:this.state.AdminAuthId,
        full_name:this.state.AdminName,
        address:this.state.AdminAddress,
        email:this.state.AdminEmail,
        profile_image_pic:this.state.avatarSource,
        phone_number:this.state.AdminNumber,
        // password:this.state.AdminPassword

  }



  console.log(allData,"alldata props......?")



  var form_data = new FormData();

    var form_data = new FormData();
    form_data.append('_id',this.state.AdminAuthId);
    form_data.append('full_name',this.state.AdminName);
    form_data.append('address',this.state.AdminAddress);
    form_data.append('email',this.state.AdminEmail);
    form_data.append('profile_image_pic',this.state.avatarSource);
    form_data.append('phone_number',this.state.AdminNumber);
 


    console.log("Admin update Profile Request");
  

  fetch(base_url+'admin/update_admin', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    'x-sh-auth': await this._getToken("token")
  },
  body: form_data
}).then((response) => response.json())
    .then((responseJson) => {
     
      //  console.log("response in Projects responseJson");
      if(responseJson.code==200)
       {
        
        console.log("Successfully update Admin Profile");
        // console.log("in radio value=",statusOfProject);
         Alert.alert("Profile Updated Successfully");
        console.log("response in update Admin Profile=",responseJson);
        // this.goToNexctScreen("Accounts","");

        // this.goToNexctScreen("Projects","");
          // this.setState({ActiveProjects:responseJson.active_projects});
        
               
              
        //  return;
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

        
      //  console.error(error);
    });

  



  }


  openAlert=()=>{



    console.log("In Open Alert");

    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          let photoName=response.fileName===undefined?"abc.jpg":response.fileName;
          let source = {
            uri: response.uri,
            name: photoName,
            type: 'image/jpg'
         };
          //const source = { uri: response.uri };
      
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      
          this.setState({
            avatarSource: source,
            imageshow:true
          });
          // console.log("Image source =",this.state.avatarSource);
          this.setState({Secondtime:true});
        //   this.updateProfileImage(this.state.avatarSource);

        }
      });

      
      // updateProfileImage(this.state.avatarSource);



  } 

  render() {
    return (
      <View style={styles.container}>
        <View>
          <StatusBar />
        </View>
{/*  */}

<SafeAreaView style={{flex: 1}}>
        <View style={{ height: 50, marginTop: 20 }}>
          <MyTopBarTwo
            screenText="Edit Profile"
            showLeftIcon={true}
            showRightIcon={false}
            idComponent={this.props.componentId}
          />
        </View>
        <View style={styles.topBarLine} />
        <KeyboardAwareScrollView enableOnAndroid={true} keyboardShouldPersistTaps="handled">




        <TouchableOpacity onPress={()=>this.openAlert()}>
            <View style={styles.SectionOneContainer}>


        { 
            this.state.imageshow==false &&
        <Image
          // source={{uri:base_url+'/'+this.state.logo_path}}
          source={require('../../assets/plus.png')}
          
          //borderRadius style will help us make the Round Shape Image
          style={{ width: 50, height: 50, borderRadius: 25,borderColor:"#F3F9FE",borderWidth:1 }} />
          
       }
{

       this.state.imageshow==true && this.state.Secondtime==true &&

       <Image
       // source={{uri:base_url+'/'+this.state.logo_path}}
       source={this.state.avatarSource} 
       //borderRadius style will help us make the Round Shape Image
       style={{ width: 50, height: 50, borderRadius: 25,borderColor:"#F3F9FE",borderWidth:1 }} />


}
       
       {console.log("Pic is =",this.state.AdminLogoPath)}
       
       {    
           this.state.imageshow==true && this.state.Secondtime==false &&
       
       <Imagep 
       imageStyle={{width: 50, 
        height: 50,
        borderRadius: 25,
        borderColor:"#F3F9FE",borderWidth:1}}
        source={{uri:this.state.AdminLogoPath}} 
        indicator={Progress.Circle} 
        style={{
        width: 50, 
        height: 50,
        borderRadius: 25,
        borderColor:"#F3F9FE",borderWidth:1, 
          }}/>
    }

   






        


          
       



         </View>
         </TouchableOpacity>




          
            <View style={styles.secondMainContainer}>
            {/* {
      this.state.showIndicator ? <ActivityIndicator size="large" color="blue" /> :null
    } */}
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
                      this.onchange_admin_name(text, "AdminName")
                    }
                    value={this.state.AdminName}
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
                    // secureTextEntry={true} 
                    // autoCapitalize = 'none'
                    onChangeText={text =>
                      this.onchange_admin_address(text, "AdminAddress")
                    }
                    value={this.state.AdminAddress}
                    placeholder="Address"
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
                    // secureTextEntry={true} 
                    // autoCapitalize = 'none'
                    onChangeText={text =>
                      this.onchange_admin_email(text, "AdminEmail")
                    }
                    value={this.state.AdminEmail}
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
                    // secureTextEntry={true} 
                    // autoCapitalize = 'none'
                    onChangeText={text =>
                      this.onchange_admin_number(text, "AdminNumber")
                    }
                    value={this.state.AdminNumber}
                    placeholder="Phone Number"
                    placeholderTextColor="#C9C9C9"
                  />
                </View>
              </CardView>
            </View>


            {/* <View style={styles.nameContainer}>
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
                      this.onchange_password(text, "AdminPassword")
                    }
                    value={this.state.AdminPassword}
                    placeholder="Password"
                    placeholderTextColor="#C9C9C9"
                  />
                </View>
              </CardView>
            </View>
         */}

          </View>


         


          <View style={styles.sectionthreeContainer}>


<TouchableOpacity onPress={()=> this.update_profile_request()}>
      
      
          <View style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Update</Text>
          </View>
          
</TouchableOpacity>


</View>

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
 
  

});
