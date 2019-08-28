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
  FlatList,
  SafeAreaView,
  ActivityIndicator
} from "react-native";

import { Navigation } from "react-native-navigation";
import {base_url} from "../components/AllVariables";

import MyTopBarTwo from "../components/MyTopBarTwo";
import RadioButton from "../components/RadioButtons";
import Toast, { DURATION } from "react-native-easy-toast";
import CardView from "react-native-cardview";
import CheckInList from "../components/checkInList";
import { MenuProvider } from 'react-native-popup-menu';
import DatePicker from 'react-native-datepicker';
import MyTopBarThreeApi from '../components/MyTopBarThreeApi'
import Moment from 'moment';
import { CheckBox } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';





export default class ManagerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nameManager: "",
        rollType:"",
        ManagerEmail:"",
        phoneNumber:"",
        password:"",
        ManagerStatus:"",
        Manager_id:"",
        Manager_status:"",
      DataFetched: false,
      showIndicator:true,
      deleteIndicator:false,
      checkBoxData:[],
      Staffchecked:false,
      Reportchecked:false,
      Projectschecked:false,
      auth_id:""
      
    };
  }

  goToNexctScreen = (screenName,data) =>{

    Navigation.push(this.props.componentId, {
    component: {
      name: screenName,
      passProps: {
        response:data 
      },
      options: {
      
        bottomTabs: { visible: false, drawBehind: true, animate: true} 
      }
    }
  });
  
  }



  gotoEditScreen = (screenName,data1,data2) =>{

    Navigation.push(this.props.componentId, {
    component: {
      name: screenName,
      passProps: {
        response:data1,
        status:data2 
      },
      options: {
       
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

  onEditCall=  () =>{
    
    console.log("on edit call");
    console.log("Manager id is=",this.state.Manager_id);
    console.log("Manager sTatus is=",this.state.Manager_status);
    this.gotoEditScreen("EditManager",this.state.Manager_id,this.state.Manager_status);

  }
  onDeleteCall= async() =>{

     console.log("Delete Call");
     this.setState({deleteIndicator:true});
     // const token  = this.props.response.token;
    //  console.log("In Details");

   
  // var url = base_url+'/project/get_project_list?_id=${id}';
  fetch(base_url+'manager/delete_manager', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-sh-auth': await this._getToken("token")
  },
  body:JSON.stringify({
    _id:this.state.auth_id
  })
}).then((response) => response.json())
    .then((responseJson) => {
     
       console.log("response After delete Manager",responseJson);
      if(responseJson.code==200)
       {
        this.setState({deleteIndicator:false});
        Alert.alert("DeletedSuccessflly");
        this.goToNexctScreen("Staff","");
        
        console.log("Successfully Deleted");
        Navigation.popToRoot(this.props.componentId);
        //    this.goToBottomScreen("Staff","");
          //  this.setState({Project:responseJson.project});
        
              // console.log("response is=",responseJson);
              
         return;
       }
       else
       {
        this.setState({deleteIndicator:false});
        Alert.alert("Error",responseJson.message);
         console.log(responseJson);
         return;

       }
      
    })
    .catch((error) => {
      // console.log("error is",error);

      //  Alert.alert("error");
       console.error(error);
    });

  }

 async  componentDidMount() {

    // const token  = this.props.response.token;

    var token="";
    const id=this.props.response;
    console.log("In Manager Details call....", id);

 
  // var url = base_url+'/project/get_project_list?_id=${id}';
  fetch(base_url+'manager/get_manager_detail', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-sh-auth': await this._getToken("token")
  },
  body:JSON.stringify({
    _id:id
  })
}).then((response) => response.json())
    .then((responseJson) => {
     
       console.log("response in Manager Details",responseJson);
      if(responseJson.code==200)
       {
        console.log("Successfully In Manager Details........");
          
          this.setState({nameManager:responseJson.get_manager_by_id.full_name,
            phoneNumber:responseJson.get_manager_by_id.phone_number,
            emailManager:responseJson.get_manager_by_id.email,
             auth_id:responseJson.get_manager_by_id.auth_id._id,
              checkBoxData:responseJson.get_manager_by_id.manager_access,
              ManagerStatus:responseJson.get_manager_by_id.auth_id.status,
              Manager_id:responseJson.get_manager_by_id._id,
              Manager_status:responseJson.get_manager_by_id.auth_id.status,
            
             
            DataFetched: true
           
        });
        this.setState({showIndicator:false});
        this.setState({Staffchecked:this.state.checkBoxData[0].staff,Projectschecked:this.state.checkBoxData[0].projects,
          Reportchecked:this.state.checkBoxData[0].reports
        });

        
       }
       else
       {
        this.setState({showIndicator:false});
         console.log(responseJson);
        //  return;

       }
      
    })
    .catch((error) => {
      console.log("error is",error);

      //  Alert.alert("error");
       console.error(error);
    });

  }




  

  goToBottomScreen = (screenName,data) =>{

    Navigation.push(this.props.componentId, {
    component: {
      name: screenName,
      passProps: {
        response:data 
      },
      options: {
        
     
        bottomTabs: { visible: false, drawBehind: true, animate: true} 
      }
    }
  });
  }

  make_inactive_api = async() =>{

    console.log("make inactive Manager Call");

    var token="";
    
   

    AsyncStorage.getItem('token').then( value=>
      {
        token=value;
        console.log("token value in project details async is=",token);
      }
      
  );
  // var url = base_url+'/project/get_project_list?_id=${id}';
  fetch(base_url+'manager/make_inactive_manager', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-sh-auth': await this._getToken("token")
  },
  body:JSON.stringify({
    auth_id:this.state.auth_id
  })
}).then((response) => response.json())
    .then((responseJson) => {
     
       console.log("response when making inactive",responseJson);
      if(responseJson.code==200)
       {
        console.log("Successfully In Making inactive......");
        Alert.alert("Successfully Updated");
        Navigation.popToRoot(this.props.componentId);
          // this.goToNexctScreen("Staff","");
         

         
        
              // console.log("response in ......",this.state.Date_list);
              
        //  return;
       }
       else
       {
        
         console.log(responseJson);
        //  return;

       }
      
    })
    .catch((error) => {
      console.log("error is",error);

      //  Alert.alert("error");
       console.error(error);
    });



  }




  render() {
    // console.log("Project All Detail",this.state.Project);
    return (
      <MenuProvider>
      <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>

   
         
        <View style={{ height: 50,marginBottom:0,paddingBottom:0 }}>

          {this.state.ManagerStatus == "active" ? 

          <MyTopBarThreeApi
            screenText="Manager Details"
            showLeftIcon={true}
            showRightIcon={true}
            idComponent={this.props.componentId}
            editfunctioncall={this.onEditCall}
            deletefunctioncall={this.onDeleteCall}
            makeInactiveCall={this.make_inactive_api}
            />


          :
          <MyTopBarTwo
          screenText="Manager Details"
          showLeftIcon={true}
          showRightIcon={true}
          idComponent={this.props.componentId}
          editfunctioncall={this.onEditCall}
          deletefunctioncall={this.onDeleteCall}
          
        />


        }
       
         
         
        </View>
        
        <View style={styles.topBarLine} />
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" enableOnAndroid={true}>
        {
      this.state.deleteIndicator ? <ActivityIndicator size="large" color="red" /> :null
    }

        {
      this.state.showIndicator ? <View style={styles.loading}><ActivityIndicator size="large" color="blue" /></View> :null
    }

        
        <View style={styles.secondMainContainer}>
          


          {/* PD Section three */}

          <View style={styles.pd_sectionthree}>

          <View><Text style={styles.pd_heading}>Name</Text></View>
              <View><Text style={styles.pd_text}>{this.state.nameManager}</Text></View>

              <View><Text style={styles.pd_heading}>Email</Text></View>
              <View><Text style={styles.pd_text}>{this.state.emailManager}</Text></View>


              <View><Text style={styles.pd_heading}>Phone Number</Text></View>
              <View><Text style={styles.pd_text}>{this.state.phoneNumber}</Text></View>


             


          </View>



          <View style={styles.checkboxHeading}><Text style={{fontSize:12,fontWeight:"bold"}}> Manager Access To</Text></View>
          <View style={{marginTop:10}}>
          <View style={styles.checkboxesContainer}>
          <CheckBox
          containerStyle={{borderWidth:0,paddingLeft:0}}
          checkedColor="#2D4273"
          textStyle={{color:"#7D7D7D"}}
          title='Staff'
          checked={this.state.Staffchecked}
          // onPress={()=>this.setState({Staffchecked:!this.state.Staffchecked})}
            />
            </View>
            

            <View style={styles.checkboxesContainer}>
          <CheckBox
          containerStyle={{borderWidth:0,paddingLeft:0}}
          checkedColor="#2D4273"
          textStyle={{color:"#7D7D7D"}}
          title='Reports'
          checked={this.state.Reportchecked}
          // onPress={()=>this.setState({Reportchecked:!this.state.Reportchecked})}
            />
            </View>

            <View style={styles.checkboxesContainer} >
          <CheckBox
         containerStyle={{borderWidth:0,paddingLeft:0}}
         checkedColor="#2D4273"
         textStyle={{color:"#7D7D7D"}}
          title='Projects'
          checked={this.state.Projectschecked}
          // onPress={()=>this.setState({Projectschecked :!this.state.Projectschecked})}

            />
            </View>
            </View>

       
        

          








          </View>
        

          </KeyboardAwareScrollView>
        <Toast position="top" ref="toast" />
        </SafeAreaView>
      </View>
      </MenuProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    //  alignItems: 'center',
    backgroundColor: "white"
  },
  secondMainContainer:{
    flex:1,marginLeft:10,marginRight:10,marginTop:2
  },
  topBarLine: {
    // flex:1,
    borderWidth: 0.5,
    borderColor: "#979CAC"
    // marginTop:10
  },
  SectionOneContainer: {
    flex: 1,
    //    backgroundColor:"red",
    flexDirection: "row",
    height: 50
  },
  imageContainer: {},
  BothTextContainer: {
    marginLeft: 10
    // backgroundColor:"pink"
  },
  LastSectionContainer:{
    flex:1,
    flexDirection:"row",
    height:100,
    backgroundColor:"#FFFFFF",
    // backgroundColor:"red",
    // borderWidth:1,
   

},
firstBoxContainer:{
    flex:1,
    // backgroundColor:"grey",
    justifyContent:"center",
    // alignSelf:"center",
    alignItems:"center"
    

},

LastLargeTextStyle:{

    fontSize:15,
    color:"#818794",
    textAlign:"center"

  },
  LastSmallTextStyle:{

    fontSize:10,
    color:"#818794",
    textAlign:"center"

  },
  lineContainer:{
    // flex:1,
    borderLeftWidth:2,
    borderLeftColor:"#9BA0AF",
     height:50,
    alignSelf:"center"



},
pd_sectionthree:{
    marginTop:20,

},
pd_heading:{
    flex:1,
    fontSize:16,
    fontWeight:"bold",
    color:"#334877",
   

},
pd_text:{
    fontSize:14,
color:"#646464"
},
pd_sectionFour:{
    flex:1,
    marginTop:20,
    flexDirection:"row",
    justifyContent:"space-between",
    // backgroundColor:"red"
},
pd_checkText:{
    fontSize:17,
    fontWeight:"bold",
    color:"#334877"
},
pd_lastSection:{
    marginTop:20
},
leftRightDateContainer:{

  flex:1,
  flexDirection:"row",
  justifyContent:"space-between",
  marginLeft:10,
  marginRight:10,
  // marginTop:2,

},
checkboxHeading:{
  marginTop:20,
  // marginBottom:20

},
checkboxesContainer:
{

  marginLeft:-10

},
loading: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center'
}



});
