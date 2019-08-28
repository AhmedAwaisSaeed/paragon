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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';




export default class ProjectDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Project:"",
      Date_list:[],
      length:0,
      checkingDate:"2019-07-23",
      index:0,
      DataFetched: false,
      showIndicator:true,
      deleteIndicator:false,
      DaysFromStart:"",
      activeDays:"",
      activeWeeks:""
      
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

  onEditCall= () =>{
    
    console.log("on edit call");
    console.log("Project id is=",this.state.Project._id);
    this.gotoEditScreen("EditProject",this.state.Project._id,this.state.Project.project_status);

  }
  async _getToken(key) {
    return await AsyncStorage.getItem(key, (err, result) => {
        return result;
    });
}


  onDeleteCall= async () =>{

     console.log("Delete Call");
     this.setState({deleteIndicator:true});
     // const token  = this.props.response.token;
    //  console.log("In Details");

  // var url = base_url+'/project/get_project_list?_id=${id}';
  fetch(base_url+'project/delete_project', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-sh-auth': await this._getToken("token")
  },
  body:JSON.stringify({
    _id:this.state.Project._id
  })
}).then((response) => response.json())
    .then((responseJson) => {
     
       console.log("response After delete",responseJson);
      if(responseJson.code==200)
       {
        this.setState({deleteIndicator:false});
        console.log("Successfully Deleted");
        Navigation.popToRoot(this.props.componentId);
            // this.goToBottomScreen("Projects","");
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

  async componentDidMount() {

    // const token  = this.props.response.token;

    var token="";
    const id=this.props.response;
    console.log("In Details call....", id);

    AsyncStorage.getItem('token').then( value=>
      {
        token=value;
        console.log("token value in project details async is=",token);
      }
      
  );
  // var url = base_url+'/project/get_project_list?_id=${id}';
  fetch(base_url+'project/get_project_detail', {
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
     
       console.log("response in Project Details",responseJson);
      if(responseJson.code==200)
       {
        console.log("Successfully In Project Details........");
          // this.goToNexctScreen(screenName,responseJson);
           this.setState({Project:responseJson.project,Date_list:responseJson.Date_list,DataFetched: true,
            DaysFromStart:responseJson.Days_from_start,
            activeDays:responseJson.project.active_days,
            activeWeeks:responseJson.project.active_weeks,
            length:responseJson.Date_list.length
          });

          this.setState({showIndicator:false});
        
              console.log("response in ......",responseJson);
              
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

  goToBottomScreen = (screenName,data) =>{

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

  make_inactive_api = async() =>{

    console.log("make inactive Call");

    
    const id=this.props.response;
    console.log("In Details call....", id);

  
  // var url = base_url+'/project/get_project_list?_id=${id}';
  fetch(base_url+'project/make_inactive', {
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
     
       console.log("response when making inactive",responseJson);
      if(responseJson.code==200)
       {
        console.log("Successfully In Making inactive......");
        Alert.alert("Successfully Updated");
          this.goToBottomScreen("Projects","");
         

         
        
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

          {this.state.Project.project_status == "active" ? 

          <MyTopBarThreeApi
            screenText="Project Details"
            showLeftIcon={true}
            showRightIcon={true}
            idComponent={this.props.componentId}
            editfunctioncall={this.onEditCall}
            deletefunctioncall={this.onDeleteCall}
            makeInactiveCall={this.make_inactive_api}
            />

         

          

          :
          <MyTopBarTwo
          screenText="Project Details"
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
      this.state.showIndicator ? 
      <View style={[styles.Activitycontainer, styles.horizontal]} >  
                <ActivityIndicator size="large" color="blue" />
            </View>   :null
    }

        { 
          this.state.DataFetched &&   <View style={styles.secondMainContainer}>
          <View style={styles.SectionOneContainer}>
            <View>
              {/* <Image
                source={require("../assets/plus.png")}
                //borderRadius style will help us make the Round Shape Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  // borderColor: "black",
                  borderWidth: 1
                }} */}
            
            </View>

            <View style={styles.BothTextContainer}>
            <View>
                <Text style={{ fontSize: 12, color: "#9A9EA9" }}>
                {this.state.Project.short_name}
                </Text>
              </View>
              <View>
                <Text style={{ fontSize:16,
      fontWeight:"bold", color: "#2D4273",paddingRight:30}}>
                {this.state.Project.address}
                </Text>
              </View>
            
            </View>
          </View>

          <View style={{flex:1, marginTop: 25, marginBottom: 10 }} >
    
            <CardView
              // style={{ marginTop: 30, marginBottom: 10 }}
              cardElevation={3}
              cardMaxElevation={3}
              cornerRadius={5}
            >
              <View style={styles.LastSectionContainer}>
                <View style={styles.firstBoxContainer}>
                  <View>
                    <Text style={styles.LastLargeTextStyle}>{this.state.activeDays}</Text>
                  </View>
                  <View>
                    <Text style={styles.LastSmallTextStyle}>
                      Active days{"\n"} on project
                    </Text>
                  </View>
                </View>
                <View style={styles.lineContainer} />
                <View style={styles.firstBoxContainer}>
                  <View>
                    <Text style={styles.LastLargeTextStyle}>{this.state.activeWeeks}</Text>
                  </View>
                  <View>
                    <Text style={styles.LastSmallTextStyle}>
                      Active weeks{"\n"} on project
                    </Text>
                  </View>
                </View>
                <View style={styles.lineContainer} />
                <View style={styles.firstBoxContainer}>
                  <View>
                    <Text style={styles.LastLargeTextStyle}>{this.state.DaysFromStart}</Text>
                  </View>
                  <View>
                    <Text style={styles.LastSmallTextStyle}>
                      Days from{"\n"} start
                    </Text>
                  </View>
                </View>
              </View>
            </CardView>
          </View>


          {/* PD Section three */}

          <View style={styles.pd_sectionthree}>

              <View style={styles.allDetails}>

              <View ><Text style={styles.pd_heading}>Address</Text></View>
              <View ><Text style={styles.pd_text}>{this.state.Project.address}</Text></View>
              </View>

              <View style={styles.allDetails}>
              <View><Text style={styles.pd_heading}>Short Name</Text></View>
              <View><Text style={styles.pd_text}>{this.state.Project.short_name}</Text></View>
              </View>

              <View style={styles.allDetails}>
              <View><Text style={styles.pd_heading}>Description</Text></View>
              <View><Text style={styles.pd_text}>{this.state.Project.description}</Text></View>
            </View>
              <View style={styles.allDetails}>
              <View><Text style={styles.pd_heading}>Client</Text></View>
              <View><Text style={styles.pd_text}>{this.state.Project.client_fullname}</Text></View>
              </View>
              <View style={styles.allDetails}>
              <View><Text style={styles.pd_heading}>Client Phone Number</Text></View>
              <View><Text style={styles.pd_text}>{this.state.Project.phone_number}</Text></View>
              </View>
              <View style={styles.allDetails}>
              <View ><Text style={styles.pd_heading}>Client Email</Text></View>
              <View><Text style={styles.pd_text}>{this.state.Project.email}</Text></View>
              </View>
              <View style={styles.allDetails}>
              <View><Text style={styles.pd_heading}>Start Date</Text></View>
              <View><Text style={styles.pd_text}>{this.state.Project.start_date}</Text></View>
              </View>
              <View>
              <View><Text style={styles.pd_heading}>Finish Date</Text></View>
              <View><Text style={styles.pd_text}>{this.state.Project.finish_date}</Text></View>
              </View>
          </View>

         <View style={styles.pd_sectionFour}>
         {
                    this.state.Date_list.length!=0 && 

              <View><Text style={styles.pd_checkText}>Check in & check Out </Text></View>
         }
              
                

              <View style={styles.leftRightDateContainer}>
              
                  <TouchableOpacity  onPress={()=>this.show_prev_record()}>
                  <View>
                { 
                  this.state.index > 0 ?
                  
                  <Image style={{width:25,height:25}} source={require('../assets/left.png')}></Image>
                  :null
                }
                  
                  
                  </View>
                  </TouchableOpacity>
                  
              
                
                  {/* <Text>DateDate</Text> */}
                  
                  <View>
                    
                  {
                    this.state.Date_list.length!=0 &&
                  <Text>{this.state.Date_list[this.state.index].clockedIn_date}</Text>
                   }
                  </View>
                  
                
                <TouchableOpacity  onPress={()=>this.show_next_record()}>

                  <View>
                  {
                  this.state.index < this.state.length-1 ?
                  <Image style={{width:25,height:25}}  source={require('../assets/right.png')}></Image>
                  :null
                  }
                  </View>
                  </TouchableOpacity>




                    </View>



                  


          </View>
        

          {
                    this.state.Date_list.length!=0 && <View style={styles.pd_lastSection}>


          <FlatList data={this.state.Date_list[this.state.index].clockedIn_user_by_date}
             renderItem={({item}) => 

           
             <View>
               {item.employee_id != null ?
             <CheckInList largeString={item.employee_id.full_name} smallString={item.check_in_time}
              secondString={item.check_out_time}></CheckInList>
              :
              null
               }
               
               </View>
             
             }
     
              keyExtractor= {item=>item._id}
            >
        </FlatList>

          {/* <View><CheckInList largeString="Ahmed Awais" smallString="8 AM to 7 PM"></CheckInList></View>
          <View><CheckInList largeString="Ahmed Awais" smallString="8 AM to 7 PM"></CheckInList></View>
          <View><CheckInList largeString="Ahmed Awais" smallString="8 AM to 7 PM"></CheckInList></View> */}



          </View>
          }








          </View>
        }

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
    flex:1,marginLeft:10,marginRight:10,marginTop:10
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
    flex:1,
    marginLeft: 10,
    marginRight:10,
    // paddingRight:20,
    // backgroundColor:"red"
   
    // backgroundColor:"pink"
  },
  LastSectionContainer:{
    // flex:1,
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
    //  alignSelf:"center",
    alignItems:"center",
    // backgroundColor:"red"
    

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
    fontSize:13,
    fontWeight:"bold",
    color:"#334877",
   

},
pd_text:{
    fontSize:13,
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
allDetails:{

  paddingBottom:5

},
Activitycontainer: {  
  flex: 1,  
  justifyContent: 'center'  
},  
horizontal: {  
  flexDirection: 'row',  
  justifyContent: 'space-around',  
  padding: 10  
}  


});
