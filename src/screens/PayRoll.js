import React, {Component} from 'react';
import {Platform, StyleSheet,StatusBar, Text,TextInput, View,Image,ActivityIndicator,FlatList, ImageBackground,Button,ScrollView,TouchableOpacity,SafeAreaView,AsyncStorage} from 'react-native';

import CardView from "react-native-cardview";
import MyList from "../components/MyList"
import ActiveEmployeeList from "../components/ActiveEmployeeList";
import PayrollList from "../components/PayrollList";
import MyTopBarTwo from "../components/MyTopBarTwo";
import { Navigation } from "react-native-navigation";
import DatePicker from 'react-native-date-ranges';
import DateRangePicker from '../components/DateRangePicker'
import RangeDropDown from "../components/RangeDropDown";
import {base_url} from "../components/AllVariables";
import Moment from 'moment';




export default class PayRoll extends Component{

  constructor(props) {
    super(props);

    this.state={
      StartingDate:"",
      EndingDate:"",
      employeeRecords:[],
      projectRecords:[],
      showIndicator:true,
      showCalender:false,
      showdropIndicator:false
    }

  }

  async _getToken(key) {
    return await AsyncStorage.getItem(key, (err, result) => {
        return result;
    });
}
  

  async componentDidMount(){



    var date=new Date();
   

    // console.log("current day is=",date);
    
    var end=Moment(date).format('YYYY-MM-DD');

    console.log("PayRoll last day is=",end);


    var days=7; // Days you want to subtract
    var date = new Date();
    var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
   
   
    var start=Moment(last).format('YYYY-MM-DD');
    console.log("payRoll Starting day is=",start);


  

  const allParams = {
    "Starting_date": start,
    "Ending_date": end,
    

  };



  // var url = base_url+'/project/get_project_list?_id=${id}';
  fetch(base_url+'employee/payroll_by_date', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-sh-auth': await this._getToken("token")
  },
  body: JSON.stringify({...allParams}),
}).then((response) => response.json())
    .then((responseJson) => {
     
       console.log("response in PayRoll....",responseJson);
      if(responseJson.code==200)
       {
        console.log("Successfully In PayRoll........");
          // this.goToNexctScreen(screenName,responseJson);
           this.setState({projectRecords:responseJson.project_record,employeeRecords:responseJson.employees_record
            
          });

          this.setState({showIndicator:false});
        
              console.log("response in payRoll ......",responseJson);
              
        //  return;
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

  get_start_date =async(val)=>{

    // console.log("Get start Date Calling",val);
    await this.setState({StartingDate:val});
    console.log("Get start Date Calling",this.state.StartingDate);
    
  } 

  get_end_date=async(val)=>{

  
    await this.setState({EndingDate:val});
    console.log("Get end Date Calling",this.state.EndingDate);

  }

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

  move_to_add_staff_screen=()=>{

    this.goToNexctScreen("AddStaff","");

  }

  showCalendarView = () =>{

    this.setState({showCalender:true});
    

  }

  hitApiAgain =async ()=>{


    this.setState({showdropIndicator:true});


    console.log(" Hit Api again Call");


    var token="";
    // const id=this.props.response;
    // console.log("In Details call....", id);

    AsyncStorage.getItem('token').then( value=>
      {
        token=value;
        console.log("token value in project details async is=",token);
      }
      
  );

  const allParams = {
    "Starting_date": this.state.StartingDate,
    "Ending_date": this.state.EndingDate,
    

  };

console.log("All Params",allParams);

  // var url = base_url+'/project/get_project_list?_id=${id}';
  fetch(base_url+'employee/payroll_by_date', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-sh-auth': await this._getToken("token")
  },
  body: JSON.stringify({...allParams}),
}).then((response) => response.json())
    .then((responseJson) => {
     
       console.log("response in PayRoll....",responseJson);
      if(responseJson.code==200)
       {
        console.log("Successfully In PayRoll........");
          // this.goToNexctScreen(screenName,responseJson);
           this.setState({projectRecords:responseJson.project_record,employeeRecords:responseJson.employees_record
            
          });
          this.setState({showdropIndicator:false});

          
        
              console.log("response in payRoll ......",responseJson);
              
        //  return;
       }
       else
       {
        this.setState({showdropIndicator:false});
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
  
    return (

<View style={styles.container}>
<SafeAreaView style={{flex: 1}}>
<View><StatusBar /></View>

<View style={{height:50}}>

<MyTopBarTwo  screenText="Payroll" showLeftIcon= {true} showRightIcon={false} idComponent={this.props.componentId} />

</View>
<View style={styles.topBarLine}></View>
{/* End Top Bar */}
<ScrollView style={{flex:1}} keyboardShouldPersistTaps={"handled"}>

{
      this.state.showIndicator ? <View style={styles.loading}><ActivityIndicator size="large" color="blue" /></View> :null
    }

{
  
  this.state.showCalender==true ?

  <View style={{flex:1,marginTop:20,marginBottom:20,alignItems:"center"}}>

<DateRangePicker 
    startDate={this.get_start_date}
    endDate={this.get_end_date}
    hitApiCall={this.hitApiAgain}
    idComponent={this.props.componentId}
></DateRangePicker>
</View>
:null


} 

{/* <View style={{flex:1,justifyContent:"center",marginLeft:20,marginRight:20}}> */}
<View style={{flex:1,justifyContent:"center"}}>
  <RangeDropDown startDate={this.get_start_date} 
  endDate={this.get_end_date} 
  showCalenderCall={this.showCalendarView}
  hitApiCall={this.hitApiAgain}
  ></RangeDropDown>
  </View>
  <View style={styles.ActiveEmpline}></View>

  {
      this.state.showdropIndicator ? <View style={{justifyContent:"center",alignItems:"center"}}><ActivityIndicator size="large" color="blue" /></View> :null
  }


<View style={styles.ActiveHeadingConainer}>


    <View style={{flex:1}}><Text style={styles.ActiveHeadingText}>Staff Payroll</Text></View>
    <View>


{/* <Image
            source={require("../assets/bottom1.png")}
            //borderRadius style will help us make the Round Shape Image
            style={{ width:25,height:25
              }}
             
             
             
            /> */}
</View>
   
  
    
</View>

{/* End Heading */}

<FlatList data={this.state.employeeRecords}
             renderItem={({item}) => 

        // <TouchableOpacity  onPress={()=> ""}>
          <View style={{flex:1,padding:6}}>
          <PayrollList name={item.Employee_name} money={item.Employee_payment} ></PayrollList>
          </View>
        // </TouchableOpacity>
             }
     
              keyExtractor= {item=>item._id}
            >
  </FlatList>




{/* End of Active Employees */}

<View style={styles.InActiveHeadingConainer}>

    <View><Text style={styles.ActiveHeadingText}>Project Payroll</Text></View>
    <View>


    {/* <Image
                source={require("../assets/bottom1.png")}
                //borderRadius style will help us make the Round Shape Image
                style={{ width:25,height:25
                  }}
                 
                 
                 
                /> */}
    </View>
</View>

<FlatList data={this.state.projectRecords}
             renderItem={({item}) => 

        // <TouchableOpacity  onPress={()=>""}>
          <View style={{flex:1,padding:4}}>
          <PayrollList name={item.project_name} money={item.project_payment} ></PayrollList>
          </View>
        // </TouchableOpacity>
             }
     
              keyExtractor= {item=>item._id}
            >
  </FlatList>
    
{/* End Heading */}




</ScrollView>
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
    backgroundColor: '#FFFFFF'
  },

  TopBarContainer:{

    backgroundColor:"white",
    // marginTop:20

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

  ActiveHeadingConainer:{

    // marginTop:20,
    // // marginLeft:20,
    // // marginBottom:10,
    // // flex:1,
    //  marginLeft:20,
    //  marginRight:20,
    
    // // marginLeft:20,
    // flexDirection:"row",
    //   justifyContent:"space-between",
    // alignItems:"center",
    // // backgroundColor:"red"
    flex:1,
    marginTop:20,
    // marginLeft:20,
    flexDirection:"row",
    justifyContent:"space-between",
    marginLeft:20,
    marginRight:20,
    marginBottom:10,
    

  },
  ActiveHeadingText:{
    fontWeight:"bold",
    fontSize:18,
    color:"#2D4273"

  },
InActivelargeText:{
      fontSize:18,
      
  },
  addProjectContainer:{
    // flex:1,
    flexDirection:"row-reverse",
    marginBottom: 3,
    
  },
  InActiveHeadingConainer:{

    flex:1,
    marginTop:20,
    // marginLeft:20,
    flexDirection:"row",
    justifyContent:"space-between",
    marginLeft:20,
    marginRight:20,
    marginBottom:10,
    

  },
  InActiveEmpListContainer:{

    flex:1,
    marginBottom:20,
    height:100,
 
    
  },
  topBarLine:{

    borderWidth:0.5,
    borderColor:"#AAB0BC",
    // marginTop:10

  },
  ActiveEmpline:{
    borderWidth:0.3,
    borderColor:"#AAB0BC",
    // marginTop:10,
    // marginLeft:28,
    // marginRight:28
    
   
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
