import React, {Component} from 'react';
import {Platform,Alert,AsyncStorage,FlatList,ActivityIndicator, StyleSheet,StatusBar,SafeAreaView, Text,TextInput, View,Image, ImageBackground,Button,ScrollView,TouchableOpacity} from 'react-native';

import CardView from "react-native-cardview";
import MyList from "../components/MyList"
import ActiveEmployeeList from "../components/ActiveEmployeeList";
import { Navigation } from "react-native-navigation";
import {base_url} from "../components/AllVariables";
import InactiveStaff from './InactiveStaff';
import StaffTypeDropDown from'../components/StaffTypeDropDown';
import InactiveStaffList from "../components/InactiveStaffList";


// Subscribe


// Unsubscribe
// bottomTabEventListener.remove();

export default class Staff extends Component{

  constructor(props) {
    super(props);


    
    
    Navigation.events().bindComponent(this);

    this.state={

      ActiveStaff:[],
      InActiveStaff:[],
      StaffType:"employees",
      dropdownIndicator:false,
      unselectedbottomtabindex:undefined,
      selectebottomtabindex:undefined,
      screenAccess:undefined

      

    }

  }
  componentDidDisappear() {

    
    console.log("in component did disappear");

    // this.bottomTabEventListener.remove();

  }

  
  



  async _getToken(key) {
    return await AsyncStorage.getItem(key, (err, result) => {
        return result;
    });
}


hitEmployeeApi =async ()=>{


  fetch(base_url+'employee/get_employee', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
        'x-sh-auth': await this._getToken("token")
    },
  }).then((response) => response.json())
      .then((responseJson) => {
       
        //  console.log("response in Projects responseJson");
        if(responseJson.code==200)
         {
          // console.log("Successfully In Staff List");
          // Alert.alert("");
            // this.goToNexctScreen(screenName,responseJson);
            this.setState({ActiveStaff:responseJson.active_employee,InActiveStaff:responseJson.in_active_employee});
            this.setState({dropdownIndicator:false});
                 console.log("response in Staff=",this.state.InActiveStaff);
                
          //  return;
         }
         else
         {
          this.setState({dropdownIndicator:false});
          Alert.alert("Error:",responseJson.message);
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




  async componentDidAppear(){

  // if(this.state.screenAccess==true)
  // {
    
  //   this.hidethisScreen();
  // }
 
    // const token  = this.props.response.token;
    // console.log('params', token);
    this.checkselectedValue(this.state.StaffType);
    console.log("did Appear Called");

  

  }

//   async componentWillUnmount() {


//     console.log("componenet will unmount call");
//     var token="";

//     AsyncStorage.getItem('token').then( value=>
//       {
//         token=value;
//         console.log("token value async is=",token);
//       }
      
//   );

//   fetch(base_url+'/employee/get_employee', {
//   method: 'GET',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//       'x-sh-auth': token
//   },
// }).then((response) => response.json())
//     .then((responseJson) => {
     
//       //  console.log("response in Projects responseJson");
//       if(responseJson.code==200)
//        {
//         // console.log("Successfully In Staff List");
//         // Alert.alert("");
//           // this.goToNexctScreen(screenName,responseJson);
//           await this.setState({ActiveStaff:responseJson.active_employee,InActiveStaff:responseJson.in_active_employee});
        
//                console.log("response in Staff=",this.state.InActiveStaff);
              
//         //  return;
//        }
//        else
//        {
//         Alert.alert("Error:",responseJson.message);
//          console.log("Error",responseJson);
//          return;

//        }
      
//     })
//     .catch((error) => {
//       // console.log("error is",error);

//       //  Alert.alert("error");
//        console.error(error);
//     });


//     var token="";

//     AsyncStorage.getItem('token').then( value=>
//       {
//         token=value;
//         console.log("token value async is=",token);
//       }
      
//   );

//   fetch(base_url+'/employee/get_employee', {
//   method: 'GET',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//       'x-sh-auth': token
//   },
// }).then((response) => response.json())
//     .then((responseJson) => {
     
//       //  console.log("response in Projects responseJson");
//       if(responseJson.code==200)
//        {
//         // console.log("Successfully In Staff List");
//         // Alert.alert("");
//           // this.goToNexctScreen(screenName,responseJson);
//           this.setState({ActiveStaff:responseJson.active_employee,InActiveStaff:responseJson.in_active_employee});
        
//                console.log("response in Staff=",this.state.InActiveStaff);
              
//         //  return;
//        }
//        else
//        {
//         Alert.alert("Error:",responseJson.message);
//          console.log("Error",responseJson);
//          return;

//        }
      
//     })
//     .catch((error) => {
//       // console.log("error is",error);

//       //  Alert.alert("error");
//        console.error(error);
//     });

  // }

  // goToNexctScreen2 = (screenName,data) => {
  //   console.log("data is=......",data);

  // }

  goToNextScreen = (screenName,data) => {
    //  console.log("screen is=......",data);
    Navigation.push(this.props.componentId, {
    component: {
      name: screenName,
      passProps: {
        response:data 
      },
      options: {
      
     
        bottomTabs: {visible: false, drawBehind: true, animate: true}
      }
    }
  });
}



  // show_staff_details=()=>{

  //   this.goToNexctScreen("AddStaff","");

  // }

  checkselectedValue = (val)=>{

    this.setState({dropdownIndicator:true});
   console.log("in selected value",val);

      this.setState({StaffType:val});

      console.log("in selected value Staff type",this.state.StaffType);

      if(this.state.StaffType=="employees"){

        this.hitEmployeeApi();

      }
      else{

        this.hitManagerApi();

      }


  

  }

  addButtonPressed=()=>{

    console.log("Add button Pressed",this.state.StaffType);

    if(this.state.StaffType=="employees")
    {

      this.goToNextScreen("AddStaff","");

    }
    else
    {

      this.goToNextScreen("AddNewManager","");

    }

  }


  hitManagerApi = async()=>{


    console.log("hit manager api");
    var token="";

  //   AsyncStorage.getItem('token').then( value=>
  //     {
  //       token=value;
  //       console.log("token value async is=",token);
  //     }
      
  // );

  fetch(base_url+'manager/get_manager', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
      'x-sh-auth': await this._getToken("token")
  },
}).then((response) => response.json())
    .then((responseJson) => {
     
      //  console.log("response in Projects responseJson");
      if(responseJson.code==200)
       {
         console.log("Successfully In Managers List");
        // Alert.alert("");
          // this.goToNexctScreen(screenName,responseJson);
          this.setState({ActiveStaff:responseJson.active_manager,InActiveStaff:responseJson.in_active_manager});
          this.setState({dropdownIndicator:false});
               console.log("response in Manager List=",responseJson);
              
        //  return;
       }
       else
       {
        this.setState({dropdownIndicator:false});
        Alert.alert("Error:",responseJson.message);
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


 

  render() {
  
    return (

<View style={styles.container}>
{
      this.state.dropdownIndicator ? <View style={styles.loading}><ActivityIndicator size="large" color="blue" /></View>:null
    }
<SafeAreaView style={{flex: 1}}>
<View><StatusBar /></View>

<View style={styles.TopBarContainer}>
<View><Text style={styles.topBarText}>Staff</Text></View>
<View style={styles.topBarLine}></View>
</View>
{/* End Top Bar */}
<ScrollView style={{flex:1}} keyboardShouldPersistTaps={"handled"}>

  <View style={{}}>
    <StaffTypeDropDown selectedValue={this.checkselectedValue}>


    </StaffTypeDropDown></View>
    <View style={styles.ActiveEmpline}></View>

    




    {
  this.state.StaffType=="employees" ?
<View>
  <View style={styles.ActiveHeadingConainer}>

  <Text style={styles.ActiveHeadingText}>Active Employees</Text>
</View>

 <FlatList data={this.state.ActiveStaff}
             renderItem={({item}) => 

             <TouchableOpacity  onPress={()=>this.goToNextScreen("StaffDetails",item._id)}>
               <View>
            
            <InactiveStaffList name={item.full_name} roll={item.roll_type} ></InactiveStaffList>
          
          </View>
            </TouchableOpacity>
            
            }
     
      keyExtractor= {item=>item._id}
      >
</FlatList>




<View style={styles.InActiveHeadingConainer}>

    <Text style={styles.ActiveHeadingText}>Inactive Employees</Text>
</View>


<View style={styles.InActiveEmpListContainer}>
  {console.log("response in Staff render=",this.state.InActiveStaff)}
  <TouchableOpacity onPress={()=>{this.goToNextScreen("InActiveStaff",this.state.InActiveStaff)}}>
<CardView style={{marginTop:20,padding:10,paddingLeft:20, marginLeft:10,marginRight:10,height:75,backgroundColor:'white'}}
          cardElevation={4}
          cardMaxElevation={4}
          cornerRadius={5}
          >
    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
    <View style={{marginTop:10}}>
    <Text style={styles.InActivelargeText}>View Inactive Staff</Text>
    </View>

    <View style={{alignSelf:"center",marginTop:10}}>
    <Image source={require('../assets/Icons_Accouts/rightArrow.png')}></Image>
    </View>
    </View>

    
</CardView>
</TouchableOpacity>
</View>
</View>
      :

// Managers......................................
<View>
  <View style={styles.ActiveHeadingConainer}>

  <Text style={styles.ActiveHeadingText}>Active Managers</Text>
</View>

 <FlatList data={this.state.ActiveStaff}
             renderItem={({item}) => 

             <TouchableOpacity  onPress={()=>this.goToNextScreen("ManagerDetails",item._id)}>
               <View>
            
            <InactiveStaffList name={item.full_name} roll="Manager" ></InactiveStaffList>
          
          </View>
            </TouchableOpacity>
            
            }
     
      keyExtractor= {item=>item._id}
      >
</FlatList>










<View style={styles.InActiveHeadingConainer}>

    <Text style={styles.ActiveHeadingText}>Inactive Managers</Text>
</View>


<View style={styles.InActiveEmpListContainer}>
  {console.log("response in Manager render=",this.state.InActiveStaff)}
  <TouchableOpacity onPress={()=>{this.goToNextScreen("InActiveManagers",this.state.InActiveStaff)}}>
<CardView style={{marginTop:20,padding:10,paddingLeft:20, marginLeft:10,marginRight:10,height:75,backgroundColor:'white'}}
          cardElevation={4}
          cardMaxElevation={4}
          cornerRadius={5}
          >
    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
    <View style={{marginTop:10}}>
    <Text style={styles.InActivelargeText}>View Inactive Managers</Text>
    </View>

    <View style={{alignSelf:"center",marginTop:10}}>
    <Image source={require('../assets/Icons_Accouts/rightArrow.png')}></Image>
    </View>
    </View>

    
</CardView>
</TouchableOpacity>
</View>
</View>


}


</ScrollView>
<View style={styles.addProjectContainer}>
<TouchableOpacity onPress={()=>this.addButtonPressed()}>


<Image
          source={require('../assets/add_project.png')}
        />
</TouchableOpacity>
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
    borderColor:"#AAB0BC",
    marginTop:10

  },

  ActiveHeadingConainer:{

    marginTop:10,
    marginLeft:20,
    marginBottom:10
    

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
    // // flex:1,
    // flexDirection:"row-reverse",
    // marginBottom: 3,
    width: 60,  
    height: 60,   
    borderRadius: 30,            
    // backgroundColor: '#ee6e73',                                    
    position: 'absolute',                                          
    bottom: 20,                                                    
      right: 10,
      marginRight:20
    
  },
  InActiveHeadingConainer:{

    marginTop:20,
    marginLeft:20
    

  },
  InActiveEmpListContainer:{

    flex:1,
    marginBottom:40,
    height:100,
 
    
  },
  ActiveEmpline:{
    borderWidth:0.3,
    borderColor:"#AAB0BC",
    // marginTop:10,
    // marginLeft:10,
    // marginRight:10
    
   
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
