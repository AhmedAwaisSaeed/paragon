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



import MyTopBarTwo from "../../components/MyTopBarTwo";
import { Navigation } from "react-native-navigation";
import AccountsList from "../../components/AccountsList";
import { TouchablePreview } from "react-native-navigation/lib/dist/adapters/TouchablePreview";
import {base_url} from "../../components/AllVariables";
import Geolocation from 'react-native-geolocation-service';
import Imagep from 'react-native-image-progress';
import Progress from 'react-native-progress/Bar';
import {base_url_image} from "../../components/AllVariables";
import { goHome } from '../../../Navigation'

var help=require('../../assets/Icons_Accouts/works.png');
var chat=require('../../assets/Icons_Accouts/chat.png');
var phone =require('../../assets/Icons_Accouts/contact.png');
var feedBack=require('../../assets/Icons_Accouts/feedback.png');
var legal=require('../../assets/Icons_Accouts/legal.png');
var logout=require('../../assets/Icons_Accouts/logout.png');
var passw=require('../../assets/Icons_Accouts/passw.png');

export default class EmployeeAccounts extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.state={

      AdminProfile:"",
      AdminLogoPath:"",
      imageShow:"",
      dataFound:false,
      fullName:"",
      AdminEmail:""
      
      
      

  
    }
  }


  async _getToken(key) {
    return await AsyncStorage.getItem(key, (err, result) => {
        return result;
    });
}


  async componentDidAppear(){


    console.log("Employee Accounts will");

    console.log("In employee Accounts Screen");
  fetch(base_url+'admin/get_profile', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-sh-auth': await this._getToken("token")
  },
  // body:JSON.stringify({
  //   _id:id
  // })
}).then((response) => response.json())
    .then((responseJson) => {
     
     
      if(responseJson.code==200)
       {
        
          // this.goToNexctScreen(screenName,responseJson);
           this.setState({AdminProfile:responseJson.Admin_profile,AdminLogoPath:responseJson.Profile_image_path,dataFound:true,
            AdminEmail:responseJson.email
           
          });

          this.setState({showIndicator:false});
        
              console.log("response in employee Accounts",responseJson);


              if(responseJson.Profile_image_path=="")
              {
                
                this.setState({imageShow:false})
              }
              else
              {
                var base_path=base_url_image+this.state.AdminLogoPath;
              
                this.setState({imageShow:true,AdminLogoPath:base_path})
              }
              console.log("response in Employee accounts=",responseJson);
              var token=this._getToken("token");
              console.log("token is= ",token);
              console.log("response in Employee accounts=",token);
        //  return;
       }
       else
       {
        this.setState({showIndicator:false});
         console.log("Error in accounts",responseJson);
        //  return;

       }
      
    })
    .catch((error) => {
      console.log("error is",error);

      //  Alert.alert("error");
       console.error(error);
      
    });

  

  }



  goToNexctScreen = (screenName, data) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
        passProps: {
          response: data
        },
        options: {
        

          bottomTabs: { visible: false, drawBehind: true, animate: true}
        }
      }
    });
  };

  goToEditProfile = (screenName, data1,data2,data3) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
        passProps: {
          response: data1,
          pic_path: data2,
          email:data3
        },
        options: {
       

          bottomTabs: { visible: false, drawBehind: true, animate: true}
        }
      }
    });
  };


  hit_logoutCall =async()=>{
  

  
  fetch(base_url+'admin/logout', {
    
    method: 'GET',

    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
       'x-sh-auth': await this._getToken("token")
    },
  
   
  }).then((response) => response.json())
      .then((responseJson) => {
       
         console.log("response is logout",responseJson);
        if(responseJson.code==200)
         {

          // AsyncStorage.clear(); 
          
           console.log("Logoout Successfully");
           Alert.alert("Logout Successfully");


           Navigation.setDefaultOptions({
  
            topBar: {
              visible: false,
              drawBehind: true,
              animate: false,
            },
              bottomTabs: { visible: false, drawBehind: false, animate: false,titleDisplayMode: 'alwaysHide'
              
             },
             statusBar: {
        
              style: "light",
              backgroundColor: "#2D4273"
          },
          layout: {
            // direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
            backgroundColor: '#2D4273',
            // orientation: ['portrait', 'landscape'] // An array of supported orientations
          },
        
          })
          goHome();




            // this.goToNexctScreen("Login","");
           
          
         }
         else
         {
          
           Alert.alert("Error",responseJson.code);
           
           return;
  
         }
        
      })
      .catch((error) => {
       
        console.log("error is",error);
  
        
         console.error(error);
      });
  

  }

  EditProfileCall=() =>{

    console.log("log path is=",this.state.AdminLogoPath);
    console.log("Admin profile on edit=",this.state.AdminProfile);
    this.goToEditProfile("EmployeeEditProfile",this.state.AdminProfile,this.state.AdminLogoPath,this.state.AdminEmail);
  }

  render() {
    return (
      <View style={styles.container}>



<SafeAreaView>

        <View style={styles.TopBarContainer}>

          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <View><Text></Text></View>
            <View><Text style={styles.topBarText}>Accounts</Text></View>
            
            <View style={{paddingTop:18,paddingRight:15}}>
              <TouchableOpacity onPress={()=>this.EditProfileCall()}>
                
              <Image source={require('../../assets/Icons_Accouts/Edit.png')}></Image>
                







              </TouchableOpacity>
            </View>
           
          </View>

            <View style={styles.topBarLine}></View>
        </View>
        {/* End Top Bar */}

        <View> 

<ScrollView> 

         <View style={styles.sectionOneContainer}>

          <View>

          {this.state.imageShow==false &&
          <Image
          source={require('../../assets/plus.png')}
          //borderRadius style will help us make the Round Shape Image
          style={{ width: 50, height: 50, borderRadius: 25,borderColor:"#F3F9FE",borderWidth:1 }} />
          }



                    
       {    
           this.state.imageShow==true  &&
       
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
      {
          this.state.dataFound==true  &&
          <View style={{justifyContent:"center",marginLeft:10}}>
            
          <View><Text style={styles.largeText}>{this.state.AdminProfile.full_name}</Text></View>
          <View><Text style={styles.smallText}>{this.state.AdminProfile.address}</Text></View>
            
          </View>
      }
     

        </View> 

      <View style={styles.sectionTwoContainer}>
        
      <TouchableOpacity onPress={()=>this.goToNexctScreen("HowParagonWorks","")}>
        <View>
          <AccountsList path={help} string="How PARAGON works?" ></AccountsList>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>this.goToNexctScreen("ChatWithUs","")}>
        <View>
          <AccountsList path={chat} string="Chat with us" ></AccountsList>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>this.goToNexctScreen("ContactSupport","")}>
        <View>
          <AccountsList path={phone} string="Contact Support" ></AccountsList>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>this.goToNexctScreen("SendFeedback","")}>
        <View>
          <AccountsList path={feedBack} string="Send Feedback" ></AccountsList>
        </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={()=>this.goToNexctScreen("Legal","")}>
        <View>
          <AccountsList path={legal} string="Legal" ></AccountsList>
        </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={()=>this.goToNexctScreen("ChangePassword","")}>
        <View>
          <AccountsList path={passw} string="Change Password" ></AccountsList>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>this.hit_logoutCall()}>
        <View>
          <AccountsList path={logout} string="Logout" ></AccountsList>
        </View>
        </TouchableOpacity>


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
    marginTop:20

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
  sectionOneContainer:{
// flex:1,
    marginTop:20,
    flexDirection:"row",
    marginLeft:30

  },
  largeText:{
    fontSize:14,
    fontWeight:"bold",
    color:"#010101"
  },
  smallText:{
    fontSize:10
  },
  sectionTwoContainer:{

    marginTop:20,
    backgroundColor:"#F8F9FB",
    paddingBottom:30,
    paddingLeft:20
    

  }

});
