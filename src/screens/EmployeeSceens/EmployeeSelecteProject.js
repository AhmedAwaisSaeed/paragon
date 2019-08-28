import React, {Component} from 'react';
import {Platform,Dimensions,Alert, FlatList,AsyncStorage, StyleSheet,SafeAreaView, StatusBar, Text,TextInput, View,Image, ImageBackground,Button,ScrollView,TouchableOpacity} from 'react-native';



import SelectProjectList from "../../components/EmployeeSide/SelectProjectList";
import MyTopBarWithButtons from "../../components/EmployeeSide/MyTopBarWithButtons";
import { Navigation } from "react-native-navigation";
import {base_url} from "../../components/AllVariables";
import moment from 'moment';
import { Marker } from 'react-native-maps';
import MapView, { AnimatedRegion, Animated } from 'react-native-maps';
import CardView from "react-native-cardview";

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height


const colorsmap= [

  '#2D4273','#FFCD00'
]

export default class EmployeeSelecteProject extends Component{

  constructor(props) {
    super(props);
    this.state={
      MapSelected:true,
      ListSelected:false,
      ActiveProjects:[],
      time:'',
      CurrentLatitude:"",
      CurrentLongitude:"",

      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      locationAccess:false,
      active_project_list:[],
      EmployeeBackEndCheckInId:"",
      CheckintimeSendingToBackEnd:"",
      alreadyclockedIn:false,
      indexofcolors:0

    }

  }
  async _getToken(key) {
    return await AsyncStorage.getItem(key, (err, result) => {
        return result;
    });
}


onRegionChange= (region) => {
  this.setState({ region });
  
}

getPermission=async()=> {


  console.log("get permission");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("wokeeey");
      console.log(position);
       this.setState({locationAccess:true});
      this.setState({
        region:{
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

  async componentWillMount (){


     this.getPermission();
  fetch(base_url+'project/get_project_list', {
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
        console.log("Successfully In Employee Projects List");
          // this.goToNexctScreen(screenName,responseJson);
          this.setState({ActiveProjects:responseJson.active_projects_detail});
        
               console.log("response in Employee projects List=",responseJson);
              
         return;
       }
       else
       {
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


  goToNextScreen = (screenName,data) =>{

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


goToNextScreenAndDisplayBottomBar = (screenName,data,id,time,emp_checkin_id) =>{

  Navigation.push(this.props.componentId, {
  component: {
    name: screenName,
    passProps: {
      response:data, 
      project_id:id,
      currentTime:time,
      EmployeeCheckInId:emp_checkin_id 
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

  move_to_add_staff_screen=()=>{

    this.goToNextScreen("AddStaff","");

  }
  call_selected_button_screen = async (value) =>{

    console.log("Selected Screen is=",value);
    if(value=="list")
    {

      await this.setState({
        MapSelected:false,
        ListSelected:true
      });

      console.log("in list if");


    }
    else
    {
      await this.setState({
        MapSelected:true,
        ListSelected:false
      });

    }

    console.log("Result of map button =",this.state.MapSelected);
    console.log("Result of List button =",this.state.ListSelected);

  }


  call_the_bottom_screen = (screenName,index) =>{

    Navigation.mergeOptions(screenName, {
      bottomTabs: {
        // currentTabIndex: this.props.componentId,
      }
    });

    console.log("after bottom screen");
  }
  

  hit_checkin_api = async (item,id) =>
  {

    console.log("hit checkin api function console");

    const allParams = {
      "project_id": id,
      "check_in_lat":this.state.region.latitude.toString(),
      "check_in_long":this.state.region.longitude.toString(),
      "check_in_time":this.state.CheckintimeSendingToBackEnd
      
      
    };

    console.log("allParams in Select Project...",allParams);



    await fetch(base_url+'employee/clocked_in', {
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
           
            console.log("response in hitting clocked in api",responseJson);
            await this.setState({EmployeeBackEndCheckInId:responseJson.employee_check_in_id});
            // this.call_the_bottom_screen("EmployeeDashboardId",0);

            // setTimeout(function(){
 
              //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
            
              this.goToNextScreenAndDisplayBottomBar("EmployeeDashboard",item,id,this.state.time,this.state.EmployeeBackEndCheckInId);
         
            // }, 5000);
            
            //  this.goToNextScreenAndDisplayBottomBar("EmployeeDashboard",item,id,this.state.time,this.state.EmployeeBackEndCheckInId);
           
           }
           else if(responseJson.code==400)
           {
            console.log("response in hitting clocked in api with 400",responseJson);
             Alert.alert("Error",responseJson.message);
             console.log("400");
             await this.setState({alreadyclockedIn:true});

             console.log("already clocked in 400=",this.state.alreadyclockedIn);

            //  if(this.state.alreadyclockedIn==false){

              // this.call_the_bottom_screen("EmployeeDashboardId",0);

              //  this.goToNextScreenAndDisplayBottomBar("EmployeeDashboard",item,id,this.state.time,this.state.EmployeeBackEndCheckInId);
            // }
      
          


             
            
    
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



  projectsListPressed=async (item,id)=>{

    var date=new Date();
    console.log("Employee Projects List Pressed");
    
    var time = moment().format(' hh:mm:ss a');
    var date2 = moment(date).format('YYYY-MM-DD,h:mm:ss a');

    console.log("Formatted Date is=",date2);
    await this.setState({ time: time,CheckintimeSendingToBackEnd:date2});

    

      await this.hit_checkin_api(item,id);

      console.log("already logged in=",this.state.alreadyclockedIn);

     


      console.log("back end id of employee",this.state.employee_check_in_id);

    


  }

  marker_pressed = async (item,id) =>{

    var date=new Date();
    console.log("Employee Marker List Pressed");
    
    var time = moment().format(' hh:mm:ss a');
    var date2 = moment(date).format('YYYY-MM-DD,h:mm:ss a');

    console.log("Formatted Date is=",date2);
    await this.setState({ time: time,CheckintimeSendingToBackEnd:date2});

      await this.hit_checkin_api(item,id);

 



  }

  render() {
  
    return (

<View style={styles.container}>

<SafeAreaView style={{flex: 1}}>



<View style={{height:50,marginTop:5}}>

<MyTopBarWithButtons  screenText="Select Project" 
showLeftIcon= {true} 
showRightIcon={true}
selectedButton={this.call_selected_button_screen} 
idComponent={this.props.componentId}
mapButton={this.state.MapSelected}
listButton={this.state.ListSelected}
 />

</View>
<View style={styles.topBarLine}></View>
{/* End Top Bar */}
<ScrollView style={{flex:1}} keyboardShouldPersistTaps={"handled"}>

{
  this.state.ListSelected &&
<View style={{paddingBottom:20,marginTop:10}}>
  <FlatList data={this.state.ActiveProjects}
             renderItem={({item}) => 

              <TouchableOpacity onPress={()=>{  this.projectsListPressed(item.short_name,item._id)

                

             }}>
           
           
                 <View>
                   <SelectProjectList name={item.short_name} roll={item.address} ></SelectProjectList>
                 </View>
           
                  </TouchableOpacity>
            }
     
      keyExtractor= {item=>item._id}
      >
</FlatList>
</View>

 
}

{
  this.state.MapSelected &&
  this.state.locationAccess==true &&
  
<MapView


            //   30.672080, 73.110884 sahiwal
            // 30.812728, 73.454265 okara
              style={styles.map}
               region={this.state.region}
              // ref={(ref) => { this.mapRef = ref }}
              // onRegionChange={this.onRegionChange}
             onLayout={this.onLayout}
            
            >

        
          <Marker
            
            pinColor="red"
            coordinate={{latitude:this.state.region.latitude,
              longitude: this.state.region.longitude }}
            title={"your location"}
            // onCalloutPress={()=>this.marker_pressed("123")}
            // description={} 
            >

            {/* <MapView.Callout tooltip style={styles.customView}>
            <TouchableOpacity onPress= {()=>this.marker_pressed()} underlayColor='#dddddd'>
                <View style={styles.calloutText}>
                    <Text>{"your Location"}{"\n"}{"Description"}</Text>
                </View>
            </TouchableOpacity>
          </MapView.Callout> */}
          </Marker>
          
                
        
            
              
          {this.state.ActiveProjects.map((marker, index) => (

            

            <Marker
            key={index}
            pinColor={colorsmap[this.state.indexofcolors]}
            coordinate={{latitude: parseFloat(marker.latitude),
              longitude: parseFloat(marker.longitude) }}
            title={marker.short_name}
            description={marker.address}
            onCalloutPress={()=>this.marker_pressed(marker.short_name,marker._id)}
            
                />



          

              )

              
              
              
              
              )}

                
            </MapView>
            
}
           {
             this.state.MapSelected &&
            this.state.locationAccess==false &&



            <MapView


            //   30.672080, 73.110884 sahiwal
            // 30.812728, 73.454265 okara
              style={styles.map}
              //  region={ region  
              //  }
              // ref={(ref) => { this.mapRef = ref }}
               onRegionChange={this.onRegionChange}
            //  onLayout={this.onLayout}
            
            >


       
               
              
          {this.state.ActiveProjects.map((marker, index) => (
            <Marker
            key={index}
            pinColor="#2D4273"
            coordinate={{latitude: parseFloat(marker.latitude),
              longitude: parseFloat(marker.longitude) }}
            title={marker.short_name}
            description={marker.address}
                />
              ))}

        
                
            </MapView>


}






 














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

  ActiveHeadingConainer:{

    marginTop:20,
    // marginLeft:20,
    marginBottom:10,
    flex:1,
    marginLeft:20,
    marginRight:20,
    
    // marginLeft:20,
    flexDirection:"row",
    justifyContent:"space-between"
    

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
    borderColor:"#979CAC",
    marginTop:10

  },

  mapContainer:{

    flex:1,

    ...StyleSheet.absoluteFillObject,
    //  height: 200,
    // width: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
  
  
    

},
map: {
  flex:1,
  width,
  height,
  // ...StyleSheet.absoluteFillObject,
 
},



});
