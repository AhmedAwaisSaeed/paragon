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
  FlatList,
  ActivityIndicator
} from "react-native";

import CardView from "react-native-cardview";
import EmployeeCheckInCardView from "../../components/EmployeeSide/EmployeeCheckInCardView"
import {base_url} from "../../components/AllVariables";
import { Navigation } from "react-native-navigation";
import {base_url_image} from "../../components/AllVariables";
import { goHome,goToAuth,goToEmployeeApp,goToEmployeeCheckOutSide } from '../../../Navigation'
import moment from 'moment';



export default class EmployeeDashboard extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.state={

      regionCheckOut:{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      locationAccess:false,
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
        EmployeeAvatarSource:"",
        EmployeeImagePath:"",
        EmployeeProjectName:"",
        Date_list:[],
        showIndicator:true,
        DataFetched:false,
        imageshow:"",
        ClockedInProjectName:"",
        ClockedInProjectTime:"",
        previous_record:"",
        previousCardRecord:"",
        ReceiveProps:false,
        EmployeeCheckInProjectId:"",
        EmployeeCheckInBackEndId:"",
        willmountExecuted:true,
        formattedTime:""
      

  
    }
  }


  async _getToken(key) {
    return await AsyncStorage.getItem(key, (err, result) => {
        return result;
    });
}

goToNextScreen = (screenName,data) =>{
  console.log("in bottom tabs push Employee");
      Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
       
        passProps: {
          response:data 
        },
        options: {
         
          bottomTabs: {
            visible: false, drawBehind: true, animate: true
            }
        }
      }
    });
  }


  goToNextScreenAndDisplayBottomBar = (screenName,data,id,time) =>{

    Navigation.push(this.props.componentId, {
    component: {
      name: screenName,
      passProps: {
        response:data, 
        project_id:id,
        currentTime:time 
      },
      options: {
        statusBar: {
          visible: true,
          style: 'light'
        },
     
        bottomTabs: { visible: true, drawBehind: true, animate: false} 
      }
    }
  });
  }


  async componentDidAppear() {

    console.log("in component did appear");

    this.getPermission();

    
    // var project=this.props.response;
    // var project_id=this.props.project_id;
    // var ClockedInTime=this.props.currentTime;
    // var checkInId=this.props.EmployeeCheckInId;
    // console.log("checkout Screen project id is=",project_id);
    // console.log("checkout Screen Employe check in id is=",this.props.EmployeeCheckInId);

    

    // console.log("checkout Screen",this.state.ProjectName);

    // if(!project_id){

    //   this.setState({ReceiveProps:false,previous_record:false});

    //   // console.log("empty field");


    // }
    // else
    // {
      
    //   await this.setState({ClockedInProjectName:project,
    //     ClockedInProjectTime:ClockedInTime,EmployeeCheckInProjectId:project_id,
    //     EmployeeCheckInBackEndId:checkInId,
    //     ReceiveProps:true});
    // }

    // console.log("receive Props= ",this.state.ReceiveProps);
    // console.log("previous record= ",this.state.previous_record);
    // console.log("receive Props= ",this.state.ReceiveProps);
    // console.log("Project Id...= ",project_id);



  



   }


 async componentWillMount() {

  

    // const token  = this.props.response.token;
     console.log("in Component Will mount");
     console.log("In employee Check In Dashboard");

     const employeeIdFromStack=await this._getToken("emp_id_is");
    console.log("From Stack Props did =",employeeIdFromStack);

    await this.setState({EmployeeId:employeeIdFromStack});
     
    // var token="";
    // const id=this.props.response;
    //  const id="5d4ab847f1162103f8d698db";

    // console.log("id in Employee Reports is=",id);

 

  await fetch(base_url+'employee/employee_dashboard', {
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
    .then(async (responseJson) => {
     
      //  console.log("response in Projects responseJson");
      if(responseJson.code==200)
       {
        console.log("Successfully In Employee Dashboard check In List");

        // var previous_record=false;

        console.log("Response in Emoloyee Dashboard",responseJson);


         if(responseJson.employee_not_check_out !="" && responseJson.employee_previous_check_out_record !="" ){

          console.log("in first case T T");
        // if(previous_record){


          this.setState({previous_record:true,previousCardRecord:true,willmountExecuted:false});

          


          console.log("name of project",responseJson.employee_not_check_out[0].project[0].short_name);
          console.log("id of project",responseJson.employee_not_check_out[0].project[0]._id);
          console.log("Check In time",responseJson.employee_not_check_out[0].check_in_time);


          this.setState({ClockedInProjectName:responseJson.employee_not_check_out[0].project[0].short_name,

            ClockedInProjectTime:responseJson.employee_not_check_out[0].check_in_time,

            EmployeeCheckInProjectId:responseJson.employee_not_check_out[0].project[0]._id,

            EmployeeCheckInBackEndId:responseJson.employee_not_check_out[0].employee_check_in_id,



          });
          var formattedTime=moment(this.state.ClockedInProjectTime).format('h:mm:ss a');
          console.log("formatted time",formattedTime);

         await this.setState({

            formattedTime:formattedTime

          });

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


          console.log("Response In Employee Check In Dashboard",responseJson);
          console.log("Response In Employee Check In Dashboard Image PAth",this.state.EmployeeImagePath);
          console.log("Response In Employee Check In Dashboard Check Out record",this.state.EmployeeProjectName);
               
              
              
              
         return;

          
          
          


          // this.goToNextScreenAndDisplayBottomBar("EmployeeDashboardCheckout",
          // responseJson.employee_not_check_out[0].project[0].short_name,
          // responseJson.employee_not_check_out[0].project[0]._id,
          // responseJson.employee_not_check_out[0].check_in_time
          // );


        }
        else if(responseJson.employee_not_check_out=="" && responseJson.employee_previous_check_out_record=="")
        { 

          console.log("in second case F F");
          
          this.setState({
            
            EmployeeImagePath:responseJson.image_path,
            DataFetched: true,
            previousCardRecord:false,
            previous_record:false
           
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


          // console.log("Response In Employee Check In Dashboard",responseJson);
          // console.log("Response In Employee Check In Dashboard Image PAth",this.state.EmployeeImagePath);
          // console.log("Response In Employee Check In Dashboard Check Out record",this.state.EmployeeProjectName);
               
              
              
              
         return;
        }


        else if(responseJson.employee_not_check_out=="" && responseJson.employee_previous_check_out_record!="")
        {



          console.log("in third case F T");
          // if(previous_record){
  
  
            this.setState({previous_record:false,previousCardRecord:true});
  
            
  
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
  
  
            console.log("Response In Employee Check In Dashboard",responseJson);
            console.log("Response In Employee Check In Dashboard Image PAth",this.state.EmployeeImagePath);
            console.log("Response In Employee Check In Dashboard Check Out record",this.state.EmployeeProjectName);
                 
                
                
                
           return;
  
            
            
            
  
  
          



        }



        else if(responseJson.employee_not_check_out!="" && responseJson.employee_previous_check_out_record =="")
        {



          console.log("in Fourth case T F");
         


            this.setState({previous_record:true,previousCardRecord:false});

          


          console.log("name of project",responseJson.employee_not_check_out[0].project[0].short_name);
          console.log("id of project",responseJson.employee_not_check_out[0].project[0]._id);
          console.log("Check In time",responseJson.employee_not_check_out[0].check_in_time);


          this.setState({ClockedInProjectName:responseJson.employee_not_check_out[0].project[0].short_name,

            ClockedInProjectTime:responseJson.employee_not_check_out[0].check_in_time,
            EmployeeCheckInProjectId:responseJson.employee_not_check_out[0].project[0]._id,
            EmployeeCheckInBackEndId:responseJson.employee_not_check_out[0].employee_check_in_id,



          });

          var formattedTime=moment(this.state.ClockedInProjectTime).format('h:mm:ss a');
          console.log("formatted time",formattedTime);
         await  this.setState({

            formattedTime:formattedTime

          });
            
  
            this.setState({
              
         
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
  
  
            console.log("Response In Employee Check In Dashboard",responseJson);
            console.log("Response In Employee Check In Dashboard Image PAth",this.state.EmployeeImagePath);
            console.log("Response In Employee Check In Dashboard Check Out record",this.state.EmployeeProjectName);
                 
                
                
                
           return;
  
            
            
            
  
  
          



        }









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


   getPermission = async() => {


    console.log("get permission after checkout");
  
      navigator.geolocation.getCurrentPosition (
      async (position) => {
        console.log("wokeeey");
        console.log("get permission after checkout",position);

    
        this.setState({locationAccess:true});


        // this.setState({
        //   regionCheckOut: Object.assign({}, this.state.regionCheckOut, { latitude: position.coords.latitude })
        // })

        // await this.setState(prevState => {
        //   let regionCheckOut = Object.assign({}, prevState.regionCheckOut);  
        //   regionCheckOut.latitude = 'someothername';                                    
        //   return { regionCheckOut };                                 
        // })

      //   setTimeout(() => {
      //     this.setState({
      //       regionCheckOut:{
      //         latitude: position.coords.latitude,
      //         longitude: position.coords.longitude ,
      //         latitudeDelta:  0.003,
      //         longitudeDelta: 0.003,
      //       }
      //     })
      // }, 2000);

        await this.setState({
          regionCheckOut:{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude ,
            latitudeDelta:  0.003,
            longitudeDelta: 0.003,
          }
        })
         
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, 
        // maximumAge: 1000 
      },
    );
  }

 


   hit_checkout_api = async () =>{



    //  await this.getPermission();

    var date=new Date();
    console.log("hit checkout api function console");

    

    var timeAndDateSendingBackToApi = moment(date).format('YYYY-MM-DD,h:mm:ss a');

    console.log("region is=",this.state.regionCheckOut);

    const allParams = {
      "employee_check_in_id":this.state.EmployeeCheckInBackEndId,
      "project_id": this.state.EmployeeCheckInProjectId,
      "check_out_lat": this.state.regionCheckOut.latitude.toString(),
      "check_out_long": this.state.regionCheckOut.longitude.toString(),
      "check_out_time": timeAndDateSendingBackToApi,
      
  
    };

    console.log("allParams on check out...",allParams);

    
    fetch(base_url+'employee/clock_out', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-sh-auth': await this._getToken("token")
      },
      body: JSON.stringify({...allParams}),
    }).then((response) => response.json())
        .then(async (responseJson) => {
         
           
          if(responseJson.code==200)
           {
           
            console.log("response in hitting clocked out api",responseJson);
            this.setState({previous_record:false,ReceiveProps:false,previousCardRecord:true});
            this.componentWillMount();

            
           }
           else
           {
            
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


  
  render() {
    return (
      <View style={styles.container}>
        
        <View>
  <StatusBar backgroundColor="white" barStyle="dark-content" />
  
</View>


<SafeAreaView>
<View>
  <ScrollView keyboardShouldPersistTaps={"handled"}>


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

          {
            this.state.previous_record==false && this.state.ReceiveProps==false &&

          <View><View style={{marginLeft:27,marginTop:12}}><Text style={styles.welcomeText}>Welcome Back!</Text></View>

          <TouchableOpacity onPress={()=> this.goToNextScreen("EmployeeSelectProject","")}>
     
          <View style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Check-in Now</Text>
          </View>
          </TouchableOpacity>
          </View>
          }


          {

            (this.state.previous_record==true || this.state.ReceiveProps == true) &&

            <View><View style={{marginLeft:27,marginTop:12}}><Text style={styles.welcomeText}>Today Check In information</Text></View>

          
            
            <View><Text style={{fontSize:19,color:"#7A839C",marginLeft:27,marginTop:7}}>{this.state.ClockedInProjectName}</Text></View>
            
          <View style={{marginLeft:3}}><Text style={{fontSize:19,color:"#000000",marginLeft:23,marginTop:10}}>{
            this.state.formattedTime
            
            
            }</Text></View>
          <View><Text style={{fontSize:12,color:"#000000",marginLeft:27,marginTop:3}}>8144 Damico Dr, El Dorado Hills, CA, 95762</Text></View>

          <TouchableOpacity onPress={()=> this.hit_checkout_api()}>
     
          <View style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Checkout</Text>
          </View>
          </TouchableOpacity>
          </View>


          }




{
      this.state.showIndicator ? <View style={styles.loading}><ActivityIndicator size="large" color="blue" /></View> :null
    }






          {this.state.previousCardRecord ==true && <View>

          <View style={styles.checkinAndViewContainer}>

          <View><Text style={{color:"#000000"}}>Last Check In & Checkout Details</Text></View>
          <TouchableOpacity onPress={()=>{

            this.goToNextScreen("EmployeeViewAll",this.state.EmployeeId);

          }}>
            <View><Text>View All</Text></View>
            </TouchableOpacity>

          </View>


          <View style={{flex:1,marginTop:20,marginLeft:17,marginRight:11,marginBottom:60}}><EmployeeCheckInCardView short_name={this.state.EmployeeProjectName} check_in_time={this.state.FromTime} 
           check_out_time={this.state.ToTime}
           address1={"8144 Damico Dr, El Dorado Hills, CA, 95762"}
           address2={"8144 Damico Dr, El Dorado Hills, CA, 95762"}

                hours={this.state.EmployeeHours}
                    wages={this.state.EmployeeWages}
           ></EmployeeCheckInCardView>
           </View>
           </View>
           
          }

          




          
          
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
