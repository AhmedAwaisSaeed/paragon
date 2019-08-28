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
import EmployeeCardList from "../../components/EmployeeSide/ReportsCardList"
import {base_url} from "../../components/AllVariables";
import { Navigation } from "react-native-navigation";


class Spinner extends Component {
  render() {
    return (
      // <View style={spinnerStyles.spinnerStyle}>
      <View style={spinnerStyles.spinnerStyle}>
        <ActivityIndicator size="large" color="blue"  />
      </View>
    );
  }
}

export default class EmployeeViewAll extends Component {
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
        DataFetched:false

  
    }
  }


  async _getToken(key) {
    return await AsyncStorage.getItem(key, (err, result) => {
        return result;
    });
}


backToScreen = () =>{
  Navigation.pop(this.props.componentId);
}


 async componentDidAppear() {

    // const token  = this.props.response.token;
    // console.log('params', token);

    // var token="";
    const id=this.props.response;
    //  const id="5d4ab847f1162103f8d698db";

    console.log("id in view all",id);

    console.log("id in Employee Reports is=",id);

 

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
          this.setState({Employee:responseJson.get_employee_detail_by_id,
            EmployeeId:responseJson.get_employee_detail_by_id._id,
            EmployeeStatus:responseJson.get_employee_detail_by_id.auth_id.status,
            EmployeeAuthId:responseJson.get_employee_detail_by_id.auth_id._id,
            Date_list:responseJson.Date_list,
            // Payment:responseJson.payment_this_week_ending_in_day,
            length:responseJson.Date_list.length,
            // Staff_status:responseJson.get_employee_detail_by_id.auth_id.status,
            DataFetched: true
          });
          this.setState({showIndicator:false});


          console.log("Response In Employee Reports",responseJson);
               
              
              
              
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

  console.log("In employee reports ");


   }


  
  render() {
    return (
      <View style={styles.container}>
        


<SafeAreaView>
<View>
  <ScrollView  keyboardShouldPersistTaps={"handled"}>


                <View style={styles.TopBarContainer}>


                 <View style={styles.iconOneContainer}>
              
              <TouchableOpacity onPress={()=>this.backToScreen()}>
              <Image style={{width:20,height:20}} source={require('../../assets/arrowtwo.png')}></Image>
              </TouchableOpacity>
              </View> 
            
            <View><Text style={styles.topBarText}>Reports</Text></View>
            <View style={{flex:1}}></View>
          </View>
          <View style={styles.topBarLine}></View>

          {/* <View><EmployeeCardList></EmployeeCardList></View> */}
          {/* <View><EmployeeCardList></EmployeeCardList></View> */}
          <View style={{marginBottom:50}}>

          {this.state.showIndicator ? 
 <View style={{ flex: 1,
    marginTop:240,
    justifyContent: 'center',
    alignItems:'center',
    
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'}}><Spinner /></View>  :null
 }

    


{



this.state.Date_list.map((date)=>{

    console.log("date array is=",date);

return(

    <View style={{flex:1,marginTop:3}}>


      <FlatList data={date.clockedIn_projects_by_date}
          
          renderItem={({item}) => 


          // <View><EmployeeCardList></EmployeeCardList></View>

          
         <View style={{paddingTop:2}}><EmployeeCardList short_name={item.project_id.short_name} check_in_time={item.check_in_time} 
           check_out_time={item.check_out_time}
           address1={item.project_id.address}
           address2={item.project_id.address}
           hidewagesandhours={true}
         hours={item.hour_difference}
         wages={date.daily_rate}
           ></EmployeeCardList>
    
         </View>

       
          }
  
           keyExtractor= {item=>item._id}
         >
         </FlatList>

          {/* <EmployeeCardList></EmployeeCardList> */}
          
    </View>
);

    









})
}





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
    backgroundColor: "#F9F9F9"
  },
  TopBarContainer:{

     flexDirection:"row",
    backgroundColor:"#F9F9F9",
    marginTop:20,
    justifyContent:"space-between",
    alignItems:"center",
    //  backgroundColor:"red",
    // justifyContent:"space-between"

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
  iconOneContainer:{
    // backgroundColor:"red",
    flex: 1,
    alignItems:'flex-start',
    justifyContent:'center',
    paddingLeft:10,
    paddingTop:10
    
  },
  loading: {
    flex:1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }

});
const spinnerStyles = StyleSheet.create({
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center'
  },
});