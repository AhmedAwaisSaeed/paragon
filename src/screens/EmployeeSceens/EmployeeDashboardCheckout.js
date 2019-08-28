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
  FlatList
} from "react-native";

import CardView from "react-native-cardview";
import EmployeeCheckInCardView from "../../components/EmployeeSide/EmployeeCheckInCardView"
import {base_url} from "../../components/AllVariables";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Navigation } from "react-native-navigation";
import {base_url_image} from "../../components/AllVariables";
import moment from 'moment';

export default class EmployeeDashboardCheckout extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.state={

        EmployeeWages:"",
        EmployeeHours:"",
        FromTime:"",
        FromAddress:"",
        ToTime:"",
        ToAddress:"",
        Employee:"",
        EmployeeId:"",
        EmployeeStatus:"",
        EmployeeAuthId:"",
        Date_list:[],
        showIndicator:true,
        EmployeeImagePath:"",
        EmployeeProjectName:"",
        ProjectName:"",
        DataFetched:false,
        imageshow:"",
        time:''

  
    }
  }


  async _getToken(key) {
    return await AsyncStorage.getItem(key, (err, result) => {
        return result;
    });
}


async componentWillMount() {


 

 
   console.log("In employee Check Out Dashboard");

fetch(base_url+'employee/employee_dashboard', {
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
   
    //  console.log("response in Projects responseJson");
    if(responseJson.code==200)
     {
      console.log("Successfully In Employee Dashboard check out List");
      
        
        this.setState({
          
          EmployeeProjectName:responseJson.employee_previous_check_out_record[0].project[0].short_name,
          FromTime:responseJson.employee_previous_check_out_record[0].check_in_time,
          ToTime:responseJson.employee_previous_check_out_record[0].check_out_time,
          EmployeeWages:responseJson.total_pay,
          EmployeeHours:responseJson.total_working_hours,
          EmployeeImagePath:responseJson.image_path,
          DataFetched: true
         
        });
        this.setState({showIndicator:false});

        if(this.state.EmployeeImagePath=="")
        {

          this.setState({imageshow:false});


        }
        else
        {
          var base_path=base_url_image+this.state.EmployeeImagePath;

          this.setState({
            EmployeeImagePath:base_path,
            imageshow:true
            
          });
          // this.setState({imageshow:true});
          // this.setState({Secondtime:false});

        }


        console.log("Response In Employee Check out Dashboard",responseJson);
        console.log("Response In Employee Check out Dashboard Image PAth",this.state.EmployeeImagePath);
        console.log("Response In Employee Check out Dashboard Check Out record",this.state.EmployeeProjectName);
             
            
            
            
       return;
     }
     else
     {
      this.setState({showIndicator:false});
      Alert.alert("Error",responseJson.message);
       console.log("Error",responseJson);
       return;

     }
    
  })
  .catch((error) => {
    // console.log("error is",error);

    //  Alert.alert("error");
     console.error(error);
  });

// console.log("In employee reports ");


 }

 


async componentDidAppear() {


    var project=this.props.response;
    var project_id=this.props.project_id;
    var ClockedInTime=this.props.currentTime;
    console.log("checkout Screen project id is=",project_id);

    await this.setState({ProjectName:project,time:ClockedInTime,DataFetched:true});

    console.log("checkout Screen",this.state.ProjectName);



  



   }


  
  render() {
    return (
      <View style={styles.container}>
        
        <View>
        
        </View>


<SafeAreaView>
<View>
  {/* <ScrollView style={{flex:1}}  keyboardShouldPersistTaps={"handled"}> */}
  <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" enableOnAndroid={true}>


            <View style={styles.TopBarContainer}>
            <View></View>
            <View style={{paddingLeft:10}}><Text style={styles.topBarText}>Dashboard</Text></View>
            <View style={{paddingTop:10}}>

            { 
          this.state.imageshow==false &&

          <Image
          // source={{uri:base_url+'/'+this.state.logo_path}}
          source={require('../../assets/plus.png')}
          //borderRadius style will help us make the Round Shape Image
          style={{ width: 35, height: 35, borderRadius: 35,borderColor:"#F3F9FE",borderWidth:1 }} />
 
          
  }

{

       this.state.imageshow==true  &&

       <Image
       // source={{uri:base_url+'/'+this.state.logo_path}}
       source={{uri:this.state.EmployeeImagePath}} 
       //borderRadius style will help us make the Round Shape Image
       style={{ width: 35, height: 35, borderRadius: 35,borderColor:"#F3F9FE",borderWidth:1 }} />


}
          
            </View>
          </View>
          <View style={styles.topBarLine}></View>

          <View style={{marginLeft:27,marginTop:12}}><Text style={styles.welcomeText}>Today Check In information</Text></View>
{console.log("Data fetched",this.state.DataFetched)}
          
            
            <View><Text style={{fontSize:19,color:"#7A839C",marginLeft:27,marginTop:7}}>{this.state.ProjectName}</Text></View>
            
          <View style={{marginLeft:3}}><Text style={{fontSize:19,color:"#000000",marginLeft:23,marginTop:10}}>{this.state.time}</Text></View>
          <View><Text style={{fontSize:12,color:"#000000",marginLeft:27,marginTop:3}}>8144 Damico Dr, El Dorado Hills, CA, 95762</Text></View>

          <TouchableOpacity onPress={()=> ""}>
     
          <View style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Checkout</Text>
          </View>
          </TouchableOpacity>

          <View style={styles.checkinAndViewContainer}>

          <View><Text style={{color:"#000000"}}>Last Check In & Checkout Details</Text></View>
          <TouchableOpacity><View><Text>View All</Text></View></TouchableOpacity>

          </View>


          <View style={{flex:1,marginTop:20,marginLeft:17,marginRight:11,marginBottom:60}}><EmployeeCheckInCardView short_name={this.state.EmployeeProjectName} check_in_time={this.state.FromTime} 
           check_out_time={this.state.ToTime}
           address1={"8144 Damico Dr, El Dorado Hills, CA, 95762"}
           address2={"8144 Damico Dr, El Dorado Hills, CA, 95762"}

                hours={this.state.EmployeeHours}
                    wages={this.state.EmployeeWages}
           ></EmployeeCheckInCardView>
           </View>
          




          
           </KeyboardAwareScrollView>
            {/* </ScrollView> */}
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
    backgroundColor: "#F9F9F9"
  },
  TopBarContainer:{

    flex:1,
    flexDirection:"row",
    backgroundColor:"#F9F9F9",
    // backgroundColor:"red",
    justifyContent:"space-between",
    alignItems:"center",
    marginRight:10,
    marginLeft:10,
    marginTop:20

  },
  topBarText:{

    fontSize:18,
    textAlign:"center",
    fontWeight:"bold",
    paddingTop:10,
    color:"#73757A"


  },
  topBarLine:{

    borderWidth:0.5,
    borderColor:"#979CAC",
    marginTop:10

  },
  welcomeText:{
      fontSize:21,
      color:"#000000"
  },
  submitButton:{
    height:52,
    // width:302,
  flex:1,
  justifyContent:"center",
  alignItems:"center",
   backgroundColor: '#2D4273',
   borderRadius: 10,
   borderWidth: 1,
   borderColor:"#2D4273",
   marginLeft:25,
   marginRight:25,   
   marginTop:36
   
  
  },
  submitButtonText:{
  textAlign:"center",
  color:"white",
  fontSize:16
  },
  checkinAndViewContainer:{
      flex:1,
      flexDirection:"row",
      justifyContent:"space-between",
      marginLeft:17,
      marginRight:11,
      marginTop:42
  }

});
