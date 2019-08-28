import React, {Component} from 'react';
import {Platform, FlatList, StyleSheet,SafeAreaView,AsyncStorage, StatusBar, Text,TextInput, View,Image, ImageBackground,Button,ScrollView,TouchableOpacity} from 'react-native';



import SelectProjectList from "../../components/EmployeeSide/SelectProjectList";
import MyTopBarWithButtons from "../../components/EmployeeSide/MyTopBarWithButtons";
import { Navigation } from "react-native-navigation";
import MapView, { AnimatedRegion, Animated } from 'react-native-maps';
import CardView from "react-native-cardview";
import {base_url} from "../../components/AllVariables";
import { Marker } from 'react-native-maps';
region= {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

export default class EmployeeMapScreen extends Component{

  constructor(props) {
    super(props);

    this.state={
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      locationAccess:false,
      active_project_list:[],
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
        // this.setState({locationAccess:true});
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

async componentDidMount() {


  console.log("employee map screen");

  this.getPermission();

fetch(base_url+'admin/dashboard', {
method: 'GET',
headers: {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-sh-auth': await this._getToken("token")
},
}).then((response) => response.json())
  .then((responseJson) => {
   
     console.log("response in employee map screen",responseJson);
    if(responseJson.code==200)
     {
       
      console.log("successfully in map screen api");
        // this.goToNexctScreen(screenName,responseJson);
        
        this.setState({
         
            active_project_list:responseJson.active_project_list});
            // console.log("response in dashboard=",responseJson);

          

            this.setState({showIndicator:false});
            
           
            
       return;
     }
     else
     {
       console.log(responseJson);
       return;

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

<MyTopBarWithButtons  screenText="Select Project" showLeftIcon= {true} showRightIcon={true} idComponent={this.props.componentId} />

</View>
{/* End Top Bar */}
<ScrollView style={{flex:1}} keyboardShouldPersistTaps={"handled"}>


<View><Text>Map Screen</Text></View>



<CardView style={{ marginTop:30}}
          cardElevation={4}
          cardMaxElevation={4}
          cornerRadius={5}
          >
<View style={styles.mapContainer}>


{console.log("Device Current Location is=",this.state.region)}

{ 
  this.state.locationAccess==true ?
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
            // description={}
                />
            
                
                
                
                
                
            
            
              
          {this.state.active_project_list.map((marker, index) => (
            <Marker
            key={index}
            pinColor="#2D4273"
            coordinate={{latitude: parseFloat(marker.latitude),
              longitude: parseFloat(marker.longitude) }}
            title={marker.short_name}
            description={marker.address}
                />
              ))}

            {/* <MapView.Marker
            pinColor="#2D4273"
            coordinate={{latitude:  markers[0].latitude,
            longitude: markers[0].longitude }}
            title={markers[0].title}
            description={markers[0].subtitle}
         /> */}
                
            </MapView>
            :



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


          {/* <Marker
            
            pinColor="red"
            coordinate={{latitude:this.state.region.latitude,
              longitude: this.state.region.longitude }}
            title={"your location"}
            // description={}
                /> */}
               
              
          {this.state.active_project_list.map((marker, index) => (
            <Marker
            key={index}
            pinColor="#2D4273"
            coordinate={{latitude: parseFloat(marker.latitude),
              longitude: parseFloat(marker.longitude) }}
            title={marker.short_name}
            description={marker.address}
                />
              ))}

            {/* <MapView.Marker
            pinColor="#2D4273"
            coordinate={{latitude:  markers[0].latitude,
            longitude: markers[0].longitude }}
            title={markers[0].title}
            description={markers[0].subtitle}
         /> */}
                
            </MapView>


}



</View>
</CardView>











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

  mapContainer:{

    flex:1,

      // ...StyleSheet.absoluteFillObject,
     height: 200,
    // width: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
  
  
    

},
map: {
  ...StyleSheet.absoluteFillObject,
},

  
  



});
