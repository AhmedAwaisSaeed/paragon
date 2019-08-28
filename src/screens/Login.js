
import React, {Component} from 'react';
import {Platform,AsyncStorage,ActivityIndicator ,Keyboard,SafeAreaView ,Alert, StyleSheet,StatusBar, Text,TextInput, ScrollView, View, ImageBackground,Button,Image,TouchableHighlight,TouchableOpacity} from 'react-native';

import { Navigation } from "react-native-navigation";

import MyTopBar from '../components/MyTopBar';
import RadioButton from "../components/RadioButtons";
import Toast, {DURATION} from 'react-native-easy-toast';
import CardView from "react-native-cardview";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {base_url} from "../components/AllVariables";
import EmployeeReports from "../screens/EmployeeSceens/EmployeeReports";
import { goHome,goToAuth,goToEmployeeApp,goToManagerAppinitialProject,goToManagerAppinitialStaff,goToManagerAppinitialReports } from '../../Navigation'

const options = [
  {
    key: "Remember",
    text: "Remember Me"
  }
];


export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text:'',
      password:'',
      usernameValid:true,
      passwordValid:true,
      showWarning:true,
      time_zone:"",
      token:"",
      showIndicator:false,
      UserType:"",
      EmployeeId:"",
      ManagerId:"",
      access:{
        staff:false,
        reports:false,
        projects:false,
      }

    };
  }
    
onchangeinputUserName= (value) => {

  if(value=="")
  {
    this.setState({usernameValid:false,text:null});
    this.refs.toast.show('Please Enter Username');
  }
  else
  {
    this.setState({text:value,usernameValid:true,showWarning:false});
    
    
  }
  

}

time_zone_settings = () => {


  // console.log("fucntion call");
  // Alert.alert("Fucntion call");


  var days=["mon","tue","wed","thu","fri","sat","sun"];
  
  var TimeType="";
  var date=new Date();
  var day=date.getDay();//Current Day
  var hours = date.getHours(); //Current Hours
  var min = date.getMinutes(); //Current Minutes
  var sec = date.getSeconds(); //Current Seconds

  if(hours <= 11)
  {

    TimeType = 'am';

  }
  else{

    // If the Hour is Not less than equals to 11 then Set the Time format as PM.
    TimeType = 'pm';

  }
  var time = days[day]+','+ ' '+ hours + ':' + min + ':' + sec + " "+ TimeType;
  this.setState({time_zone:time});

  return time;

}


onchangePass = (value) => {

  if(value=="")
  {
    this.setState({passwordValid: false,password:null});
    this.refs.toast.show('Please Enter Password');
    
  }
  else
  {
    this.setState({password: value,passwordValid: true,showWarning:false});
  }
  

}

goToNexctScreen = (screenName,data) =>{

  Navigation.push(this.props.componentId, {
  component: {
    name: screenName,
    passProps: {
      response:data 
    },
    options: {
     
      bottomTabs: {visible: true} 
    }
  }
});

}


Check_type_user = (id)=>{

console.log("id in checkuser=",id);

if(this.state.UserType=="employee")
{
  AsyncStorage.setItem('user_type',this.state.UserType);
   console.log("employee App");
   
   this.setState({EmployeeId:id});

  //  
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      drawBehind: true,
      animate: false,
    },
      bottomTabs: { visible: true, drawBehind:true, animate: false,
        titleDisplayMode: 'alwaysShow',
       
      //  backgroundColor:"pink"
      
      },
      statusBar: {

        style: "dark",
        backgroundColor: "#FFFFFF"
    } 
  })

  console.log("employee App Id is =",id);

  AsyncStorage.setItem('emp_id_is',id);
  
  goToEmployeeApp(id);
  
   
     
    
  

    


console.log("At End");


 


  // ///////////////////////////



}

else if(this.state.UserType=="manager")
{
  console.log("in manager app");

  console.log("manager access to",this.state.access);

  AsyncStorage.setItem('user_access',JSON.stringify(this.state.access));
  AsyncStorage.setItem('user_type',this.state.UserType);



  if(this.state.access.projects==true){
    Navigation.setDefaultOptions({
      topBar: {
        visible: false,
        drawBehind: true,
        animate: false,
      },
        bottomTabs: { visible: true, drawBehind: false, animate: false,
          // titleDisplayMode: 'alwaysHide',
        
        } ,
        statusBar: {
  
          style: "dark",
          backgroundColor: "#FFFFFF"
      }
    })
    goToManagerAppinitialProject(id);
  }
  else if(this.state.access.staff==true)
  {
    Navigation.setDefaultOptions({
      topBar: {
        visible: false,
        drawBehind: true,
        animate: false,
      },
        bottomTabs: { visible: true, drawBehind: false, animate: false,
          // titleDisplayMode: 'alwaysHide',
        
        } ,
        statusBar: {
  
          style: "dark",
          backgroundColor: "#FFFFFF"
      }
    })
    goToManagerAppinitialProject(id);
    // goToManagerAppinitialStaff();

  }
  else if(this.state.access.reports==true)
  {
    Navigation.setDefaultOptions({
      topBar: {
        visible: false,
        drawBehind: true,
        animate: false,
      },
        bottomTabs: { visible: true, drawBehind: false, animate: false,
          // titleDisplayMode: 'alwaysHide',
        
        } ,
        statusBar: {
  
          style: "dark",
          backgroundColor: "#FFFFFF"
      }
    })
    goToManagerAppinitialProject(id);
    // goToManagerAppinitialReports();

  }
  else
  {

    Alert.alert("Sorry you dont have access to any page");

  }


}

else
{
 
    console.log("Admin App");
  
    AsyncStorage.setItem('user_type',this.state.UserType);


  // this.goToNexctScreen("Dashboard","");
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      drawBehind: true,
      animate: false,
    },
      bottomTabs: { visible: true, drawBehind: false, animate: false,
        // titleDisplayMode: 'alwaysHide',
      
      } ,
      statusBar: {

        style: "dark",
        backgroundColor: "#FFFFFF"
    }
  })
  goToAuth();

}




}






















// clearAsyncStorage = async() => {
//   AsyncStorage.clear();
// }



login_request= async (screenName)=>{

  // for testing 
  // this.goToNexctScreen(screenName,"");

  Keyboard.dismiss();
  
   var time=this.time_zone_settings();
   const platform= Platform.OS;


  //  Alert.alert(time);
  const {text,password}=this.state;

  console.log("password is........",password);

  if(this.state.text==""  || this.state.password=="")
  {
    return (Alert.alert("Any field Can't be empty"));
  }


  if(this.state.usernameValid==false  || this.state.passwordValid==false  || this.state.showWarning==true)
  {
    return (Alert.alert("Please First Enter Username And Password"));
  }
   // user_name: "03123631214",
    // password: "kanm234",
    // time_zone:"Tue, 1:24:19 am",
    // platform:platform,
    // device_token:"dsdfsdf",
    this.setState({showIndicator:true});

  const allParams = {
    "user_name": this.state.text,
    "password": this.state.password,
    "time_zone": time,
    // "time_zone": "Tue, 1:24:19 am",
    "platform": platform,
    "device_token": "d"

  };

  console.log("allParams is.   ..",allParams);

  // Alert.alert("text value is",this.state.text);
  await fetch(base_url+'admin/login', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({...allParams}),
}).then((response) => response.json())
    .then((responseJson) => {
     
       console.log("response is",responseJson);
      if(responseJson.code==200)
       {
        // this.clearAsyncStorage();
        this.setState({showIndicator:false});
        AsyncStorage.setItem('token', responseJson.token);
        // AsyncStorage.setItem('root', this.props.componentId);
        // console.log("root is=",this.props.componentId);
        this.setState({UserType:responseJson.user_type});
        if(responseJson.user_type=="manager")
        {


          this.setState({
          access:{
            staff:responseJson.access[0].staff,
            reports:responseJson.access[0].reports,
            projects:responseJson.access[0].projects,
           
          }
        })
        }
         this.Check_type_user(responseJson.user_id);
        //  Alert.alert("Successfully Logged In");
          //  this.goToNexctScreen(screenName,responseJson);
        //  return;
       }
       else
       {
        this.setState({showIndicator:false});
         Alert.alert("Error",responseJson.message);
         
         return;

       }
      
    })
    .catch((error) => {
      console.log("error is",error);

      //  Alert.alert("error");
      //  console.error(error);
    });



      
}

goToForgotScreen = (screenName) =>{

    Navigation.push(this.props.componentId, {
    component: {
      name: screenName,
      passProps: {
        text: 'Pushed screen'
      },
      options: {
      
       
        bottomTabs: { visible: false, drawBehind: true, animate: true} 
      }
    }
  });

}

  render() {
    const {text,usernameValid,passwordValid,time_zone}=this.state;
    return (
<View style={styles.container}>
<SafeAreaView style={{flex:1}}>
 
<View style={{height:50}}>
<MyTopBar  screenText="Login" showLeftIcon= {true} showRightIcon={false} idComponent={this.props.componentId} />

</View>

{
  /* <ScrollView  
    
    style={{flex:1,}} keyboardShouldPersistTaps={"handled"}> */
}
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" enableOnAndroid={true}>


    {
      this.state.showIndicator ? <ActivityIndicator size="large" color="white" /> :null
    }

      <View>



    <View style={styles.logoConatiner}>
      
     <View>
    <Image source={require('../assets/logo.png')}></Image>
    </View>
        
    </View>



<View style={styles.emailpassConatiner}>



<CardView style={styles.cardviewStyle}
          cardElevation={4}
          cardMaxElevation={4}
          cornerRadius={5}
          >
      {/* <View style={[this.state.usernameValid ? styles.emailContainer:styles.error]}> */}
      <View style={styles.emailContainer}>

      <TextInput
    
      style={{color:"black",marginLeft:10}}
      onChangeText={(text)=>this.onchangeinputUserName(text)}
      value={text}
      placeholder="Email"
      autoCapitalize = 'none'
      placeholderTextColor="#C9C9C9"
      
      />


      


</View>

    
</CardView>

         {/* <View style={styles.emailContainer}>

        <TextInput
        style={[usernameValid ? styles.emailText : styles.error]}
        onChangeText={(text)=>this.onchangeinput(text,'username')}
        value={text}
        placeholder="Email"
        placeholderTextColor="#C9C9C9"
      />


        </View> */}

      {/* <View style={styles.passConatiner}>

        <TextInput style={[passwordValid ? styles.emailText : styles.error]}
           placeholder="Password"
           placeholderTextColor="#C9C9C9" 
           autoCapitalize = 'none'
           onChangeText={(text)=>this.onchangePass(text,'password')}
           secureTextEntry={true}  />

       
      </View> */}



<CardView style={{marginTop:30,width:300,backgroundColor:'white',flex:1,justifyContent:"center"}}
          cardElevation={4}
          cardMaxElevation={4}
          cornerRadius={5}
          >
      <View style={styles.emailContainer}>
      {/* <View style={[this.state.passwordValid ? styles.emailContainer:styles.error]}> */}

      <TextInput style={{color:"black",marginLeft:10}}
      
           placeholder="Password"
           placeholderTextColor="#C9C9C9" 
           autoCapitalize = 'none'
           onChangeText={(text)=>this.onchangePass(text)}
           secureTextEntry={true}  />



      


      


</View>

    
</CardView>


    


    

      </View>

      <View style={styles.optionsConatiner}>
        <View></View>
        <View style={{paddingLeft:50}}>
        <TouchableOpacity onPress={()=>this.goToForgotScreen('ForgotPassword')}><Text style={styles.forgotPassConatiner}>
        Forgot password?</Text></TouchableOpacity></View>
      </View>

      
     

    <View style={styles.butonContainer}>

      <TouchableOpacity onPress={()=>
        this.login_request('Dashboard')}>
      
      {/* <View style={styles.buttons}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </View> */}
          <View style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Login</Text>
          </View>
          
      {/* </View> */}
        </TouchableOpacity>

    </View>

    

    </View>

    </KeyboardAwareScrollView>

    <Toast  position='top' ref="toast"/>
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
     backgroundColor: '#2D4273',
     marginTop:10
    // backgroundColor: 'pink'
  },
  logoConatiner:{

     flex:1,
    height:80,
    marginTop:50,
     alignItems:"center",
     justifyContent:"flex-end",
    // backgroundColor:"red",
    

  },
  emailpassConatiner:{
     flex:1,
    height:150,
    marginTop:30,
      alignItems:"center",
    // justifyContent:"center",
    // backgroundColor:"pink",
    
  },

  emailContainer:{

    //  justifyContent:"center"
    // borderColor:"red",borderWidth:1
    

  },
  emailText:{
    color:"black",
    marginLeft:10
  },
  error:{

    
    borderColor:"red",
    borderWidth:1
   

  },
  passConatiner:{

    padding:18

  },
 optionsConatiner:{

    flex:1,
  height:80,
  flexDirection:"row",
  justifyContent:"space-around",
  marginTop:15,
  
  // marginRight:34,
  //  alignItems:"center",
  // justifyContent:"space-evenly",
    // backgroundColor:"blue",
 fontSize:15

 },
 rememberContainer:{

  color: 'white'

 },
 forgotPassConatiner:{

  color: 'white'

 },
 butonContainer:{


   flex:1,
  alignItems:"center",
  marginBottom:10
  // justifyContent:"center",

  
  // backgroundColor:"red",
  
  



 },

 buttons:{

    // flex:1,
  // height:80,
  padding:15,
  
  // marginLeft:20,
  backgroundColor: '#2D4273',
  

},

button: {
  // marginBottom: 30,
   width: 302,
   height:48,
  alignItems: 'center',
  backgroundColor: '#69C9DE',
  borderRadius: 10,
  borderWidth: 1,
  borderColor:"#69C9DE"   
  
},
buttonText: {
  padding: 10,
  color: 'white',
  fontSize:15
  
},
cardviewStyle:{

  marginTop:20,width:300,height:50,backgroundColor:'white',flex:1,justifyContent:"center"

},
submitButton:{
  height:48,
  width:302,
//flex:1,
justifyContent:"center",
alignItems:"center",
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
