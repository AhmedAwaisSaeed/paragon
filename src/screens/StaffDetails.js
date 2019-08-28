import React, {Component} from 'react';
import {Platform,SafeAreaView,FlatList,Alert,ActivityIndicator, StyleSheet,StatusBar, Text,TextInput, View,Image, ImageBackground,Button,ScrollView, AsyncStorage ,TouchableOpacity} from 'react-native';

import CardView from "react-native-cardview";
import MyList from "../components/MyList"
import ActiveEmployeeList from "../components/ActiveEmployeeList";
import PayrollList from "../components/PayrollList";
import MyTopBarTwo from "../components/MyTopBarTwo";
import { Navigation } from "react-native-navigation";
import { MenuProvider } from 'react-native-popup-menu';
import StaffCheckInList from "../components/StaffCheckInList";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {base_url} from "../components/AllVariables";
import MyTopBarThreeApi from '../components/MyTopBarThreeApi';



export default class StaffDetails extends Component{

  constructor(props) {
    super(props);

    this.state={

      staff:"",
      Staff_id:"",
      StaffAuth_id:"",
      showIndicator:true,
      deleteIndicator:false,
      DataFetched: false,
      StatusStaff:"",
      Date_list:[],
      Payment:"",
      length:0,
      index:0,
      Staff_status:""

    }

  }

 async componentWillMount() {

    // const token  = this.props.response.token;
    // console.log('params', token);

    
    const id=this.props.response;

    console.log("id in staff details is=",id);

  

  fetch(base_url+'employee/get_employee_detail', {
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
     
      //  console.log("response in Projects responseJson");
      if(responseJson.code==200)
       {
        // console.log("Successfully In Staff List");
        // Alert.alert("");
          // this.goToNexctScreen(screenName,responseJson);
          this.setState({staff:responseJson.get_employee_detail_by_id,
            Staff_id:responseJson.get_employee_detail_by_id._id,
            StatusStaff:responseJson.get_employee_detail_by_id.auth_id.status,
            StaffAuth_id:responseJson.get_employee_detail_by_id.auth_id._id,
            Date_list:responseJson.Date_list,
            Payment:responseJson.payment_this_week_ending_in_day,
            length:responseJson.Date_list.length,
            Staff_status:responseJson.get_employee_detail_by_id.auth_id.status,
            DataFetched: true
          });
          this.setState({showIndicator:false});


          console.log("Response In Staff Details",responseJson);
               
              
              
              
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

gotoEditScreen = (screenName,data1,data2) =>{

  Navigation.push(this.props.componentId, {
  component: {
    name: screenName,
    passProps: {
      response:data1,
      status:data2 
    },
    options: {
     
      layout: {
        // direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
        backgroundColor: 'white',
        // orientation: ['portrait', 'landscape'] // An array of supported orientations
      },
      bottomTabs: { visible: false, drawBehind: true, animate: true} 
    }
  }
});

}


onEditCall= () =>{
    
  console.log("on edit call");
  console.log("Staff id is=",this.state.Staff_id);
   this.gotoEditScreen("EditStaff",this.state.Staff_id,this.state.Staff_status);

}


async _getToken(key) {
  return await AsyncStorage.getItem(key, (err, result) => {
      return result;
  });
}
onDeleteCall= async () =>{

  this.setState({deleteIndicator:true});

   console.log("Delete Call");

  //  const token  = this.props.response.token;
  //  console.log("In Details");


// var url = base_url+'/project/get_project_list?_id=${id}';
fetch(base_url+'employee/delete_employee', {
method: 'POST',
headers: {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-sh-auth': await this._getToken("token")
},
body:JSON.stringify({
  _id:this.state.StaffAuth_id
})
}).then((response) => response.json())
  .then((responseJson) => {
   
     console.log("response After delete",responseJson);
    if(responseJson.code==200)
     {
      Alert.alert("Successfully Deleted");
      this.setState({deleteIndicator:false});
      Navigation.popToRoot(this.props.componentId);
        // this.goToBottomScreen("Staff","");
        // Navigation.pop(this.props.idComponent);
        // Navigation.popToRoot(this.props.componentId);
          this.setState({Project:responseJson.project});
      
             console.log("response is=",responseJson);
            
       return;
     }
     else
     {this.setState({deleteIndicator:false});
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


show_prev_record = ()  =>{

  console.log("previous Clicked");

}


show_next_record=() =>{

  console.log("Next Clicked");

}

make_inactive_api = async() =>{

  console.log("make inactive Staff Call");

  
  // const id=this.props.response;
  // console.log("In Staff Details call....", id);



console.log("Auth id is=",this.state.StaffAuth_id);

    fetch(base_url+'employee/make_inactive_employee', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-sh-auth': await this._getToken("token")
  },
  body:JSON.stringify({
    auth_id:this.state.StaffAuth_id
  })
}).then((response) => response.json())
    .then((responseJson) => {
     
       console.log("response when make inactive Staff ",responseJson);
      if(responseJson.code==200)
       {
        console.log("Successfully In Making inactive......");
        Alert.alert("Successfully Updated");
          this.goToBottomScreen("Staff","");
         

         
        
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

show_prev_record = ()  =>{


  this.setState({index:this.state.index-1});



}


show_next_record=() =>{


  console.log("Next Clicked");
  if(this.state.index <= this.state.length)
  {
    this.setState({index:this.state.index+1});
  
    // console.log("No Record found");

  }
  else
  {
    Alert.alert("Record Not Found");
  }

  

}
 

  render() {
  
    return (
      <MenuProvider>
    <View style={styles.container}>
    <SafeAreaView style={{flex: 1}}>
    

    <View style={{height:50}}>



     {
      this.state.StatusStaff == "active" ? 

      <MyTopBarThreeApi
      screenText="Staff Details"
      showLeftIcon={true}
      showRightIcon={true}
      idComponent={this.props.componentId}
      editfunctioncall={this.onEditCall}
      deletefunctioncall={this.onDeleteCall}
      makeInactiveCall={this.make_inactive_api}
      />


    :
      <MyTopBarTwo
      screenText="Staff Details"
      showLeftIcon={true}
      showRightIcon={true}
      idComponent={this.props.componentId}
      editfunctioncall={this.onEditCall}
      deletefunctioncall={this.onDeleteCall}

      />


} 


{/* <MyTopBarThreeApi
      screenText="Staff Details"
      showLeftIcon={true}
      showRightIcon={true}
      idComponent={this.props.componentId}
      editfunctioncall={this.onEditCall}
      deletefunctioncall={this.onDeleteCall}
      makeInactiveCall={this.make_inactive_api}
      /> */}



       
    </View>

    <View style={styles.topBarLine} />
    {/* End Top Bar */}
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" enableOnAndroid={true}>

    {
      this.state.deleteIndicator ? <View style={styles.loading}><ActivityIndicator size="large" color="red" /></View> :null
    }

      <View style={styles.secondmainContainer}>

      {
      this.state.showIndicator ? <View style={styles.loading}><ActivityIndicator size="large" color="blue" /></View> :null
    }

 <View style={styles.sectionOneContainer}>

        <View style={{flex:1}}>
        <Text style={styles.largeText}>{this.state.staff.full_name}</Text>
        </View>

        <View style={{flex:1}}>
        <Text style={styles.smallText}>Role: {this.state.staff.roll_type}</Text>
        </View>

        <View style={{marginTop:20}}><Text style={styles.statement}>Payment this week ending in day: ${this.state.staff.daily_rate} </Text></View>

        <View style={styles.phoneCardContainer}>

        <CardView style={{ marginTop:30,marginBottom:10}}
          cardElevation={8}
          cardMaxElevation={8}
          cornerRadius={5}>
        <View style={styles.LastSectionContainer}>

        <View style={styles.firstBoxContainer}>
            <View><Text style={styles.LastLargeTextStyle}>{this.state.staff.phone_number}</Text></View>
            <View><Text style={styles.LastSmallTextStyle}>Phone</Text></View>
        </View>
        <View style={styles.lineContainer}></View>
        <View style={styles.firstBoxContainer}>
            <View><Text style={styles.LastLargeTextStyle}>{this.state.staff.daily_rate}</Text></View>
            <View><Text style={styles.LastSmallTextStyle}>Daily Rate</Text></View>
        </View>
        


        </View>

        </CardView>


        </View>

</View>


<View style={styles.staff_sectionTwoContainer}>

<View style={styles.pd_sectionFour}>

{ this.state.Date_list.length!=0 &&             

<View><Text style={styles.pd_checkText}>Check in & check Out </Text></View>
}

  { 
          this.state.DataFetched && this.state.Date_list.length!=0 &&

          <View style={styles.leftRightDateContainer}>
              <TouchableOpacity  onPress={()=>this.show_prev_record()}>
                <View style={{padding:1}}>
                { 
                  this.state.index > 0 ?
                  <Image style={{width:25,height:25}} source={require('../assets/left.png')}></Image>
                :null}
                  </View>
                  </TouchableOpacity>
                <View>
                {
                    this.state.Date_list.length!=0 &&
                  <Text>{this.state.Date_list[this.state.index].clockedIn_date}</Text>
                }
                </View>
                <TouchableOpacity  onPress={()=>this.show_next_record()}>

                  <View style={{padding:1}}>
                  {
                  this.state.index < this.state.length-1 ?
                  <Image style={{width:25,height:25}} source={require('../assets/right.png')}></Image>
                  :null}
                  </View>
                  </TouchableOpacity>




  </View>
}
  </View>

  { 
          this.state.DataFetched && this.state.Date_list.length!=0 &&

<View style={styles.pd_lastSection}>

<FlatList data={this.state.Date_list[this.state.index].clockedIn_projects_by_date}
             renderItem={({item}) => 

             


              <View style={{paddingTop:20}}><StaffCheckInList largeString={item.project_id.short_name} smallString={item.check_in_time} 
              secondString={item.check_out_time}

            difference={item.hour_difference}
            daily_rate={this.state.Date_list[this.state.index].daily_rate}
              ></StaffCheckInList></View>

            
          
             }
     
              keyExtractor= {item=>item._id}
            >
        </FlatList>






</View>
  }


</View>



</View>

       







</KeyboardAwareScrollView>
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
    // alignContent:"center",
    backgroundColor: '#FFFFFF',
  
    backgroundColor:"white"
  },
  secondmainContainer:{
    paddingLeft:20,
    paddingRight:20
  },
  sectionOneContainer:{

    marginTop:20

  },
  smallText:{

    fontSize:14,
    color:"#A4A9B2"

  },
  largeText:{
      
      fontWeight:"200",
      // color:"#7C828F",
      fontSize:16,
      color:"#474E61"
  },
  statement:{
      fontSize:16,
      fontWeight:"bold",
  },
  phoneCardContainer:{


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
staff_sectionTwoContainer:{



},
pd_checkText:{
    fontSize:17,
    fontWeight:"bold",
    color:"#334877"
},
pd_lastSection:{
    marginTop:20
},
pd_sectionFour:{
  marginTop:20,
  flexDirection:"row",
  justifyContent:"space-between",

},
leftRightDateContainer:{

  flex:1,
  flexDirection:"row",
  justifyContent:"space-between",
  marginLeft:10,
  marginRight:10,
  // marginTop:2,

},
loading: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center'
},
topBarLine: {
  // flex:1,
  borderWidth: 0.5,
  borderColor: "#979CAC"
  // marginTop:10
},

  
  



});
