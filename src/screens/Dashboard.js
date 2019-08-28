import React, {Component} from 'react';
import {
  Platform,
  Image,
  Alert, 
  StyleSheet, 
  Text,
  StatusBar,
  TextInput,
  View,
  ImageBackground,
  Button,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  SafeAreaView,
  ActivityIndicator
  
  
} from 'react-native';
import MyTopBar from '../components/MyTopBar';
import Toast, {DURATION} from 'react-native-easy-toast';
// import MapView from 'react-native-maps';
import CardView from "react-native-cardview";
import {base_url} from "../components/AllVariables";
import {base_url_image} from "../components/AllVariables";
import { Marker } from 'react-native-maps';
import ImagePicker from 'react-native-image-picker';
import { Navigation } from "react-native-navigation";
import Imagep from 'react-native-image-progress';
import Progress from 'react-native-progress/Bar';
import Moment from 'moment';
import Geolocation from 'react-native-geolocation-service';
import MapView, { AnimatedRegion, Animated } from 'react-native-maps';
// import Geolocation from 'react-native-geolocation-service';

const options = {
  title: 'Select Avatar',
  noData: true,
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};


region= {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

// var markers = 
//     [{
//       latitude: 30.672080,
//       longitude: 73.110884 ,
//       title: 'Sahiwal',
//       subtitle: 'Amazing City'
//     }]
export default class Dashboard extends Component{

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.mapRef = null;
    this.state = {
      showIndicator:true,
      active_projects:"",
      non_active_projects:"",
      staff_clocked_in:"",
      staff_inactive:"",
      logo_path:"",
      avatarSource:"",
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      active_project_list:[],
      imageshow:"",
      logo_id:"",
      Secondtime:"",
      ImageLoading:true,
      dayToDisplay:"",
      dateToDisplay:"",
      monthToDisplay:"",
      locationAccess:false
      
       
    


    };
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

     

//     const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );

//     if (granted) {
//     // console.log( "You can use the ACCESS_FINE_LOCATION" )
//     Geolocation.getCurrentPosition(
//     (position) => {
//       // var initialPosition = JSON.stringify(position);
//       // this.setState({initialPosition});

//        this.setState({
//         region:{
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude ,
//           latitudeDelta:  0.003,
//           longitudeDelta: 0.003,
//         }
//       })
//       console.log("device location in did mount=",position);
//     },
//      (error) => alert(error.message)
//     //  ,{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
//   );
//   // this.watchID = Geolocation.watchPosition((position) => {
//   //   var lastPosition = JSON.stringify(position);
//   //   this.setState({lastPosition});
//   // });
// } 
// else {
//   console.log( "ACCESS_FINE_LOCATION permission denied" )
// }
    
    
   
  

  //  onLayout = () => { setTimeout( () => { this.mapRef.fitToCoordinates([{ latitude: this.state.region.latitude, longitude: this.state.region.longitude },{ animated: false}]); }, 2000 ); }
  // onLayout = () => { setTimeout( () => { this.mapRef.fitToCoordinates([{ latitude: this.state.region.latitude, longitude: this.state.region.longitude },], { edgePadding: DEFAULT_PADDING, animated: true, }); }, 2000 ); }


time_zone_settings = () => {


  // console.log("fucntion call");
  // Alert.alert("Fucntion call");


  var days=["Monday","Tuesday","Wednesday","Thursday","Friday","Satuarday","Sunday"];
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  
  var TimeType="";
  var date=new Date();
  var day=date.getDay();//Current Day
 
  var  year= date.getFullYear(); //Current Hours
  var month=monthNames[date.getMonth()];

  var today=Moment(date).format('D');

  console.log("day=",day);
  console.log("month=",month);

   var newDate=today+" "+month+" "+year; 
  // var newDate=Moment(date).format('MM DD YYYY');
 

   this.setState({dayToDisplay:days[day-1],dateToDisplay:newDate});

  // if(hours <= 11)
  // {

  //   TimeType = 'am';

  // }
  // else{

  //   // If the Hour is Not less than equals to 11 then Set the Time format as PM.
  //   TimeType = 'pm';

  // }
  // var time = days[day]+','+ ' '+ hours + ':' + min + ':' + sec + " "+ TimeType;
  // this.setState({time_zone:time});

  // return time;

}


   updateProfileImage=async (source)=>{


   

    var form_data = new FormData();

  console.log("data source=",this.state.avatarSource.uri);

    // const url=domain+'user/update_customer_profile_image';

    // form_data.append('logo_pic', {
    //   uri: source,
    //   type: 'image/jpeg', // or photo.type
    //   name: 'testPhotoName'
    // });
         form_data.append('logo_pic',this.state.avatarSource);

          console.log("hitting api");


        fetch(base_url+'change_logo/logo_upload', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
             'x-sh-auth':await this._getToken("token")
        },
        body: form_data
      }).then((response) => response.json())
      .then((responseJson) => {
       
         console.log("response in Dashboard image upload",responseJson);
        if(responseJson.code==200)
         {
           
          console.log("Successfully image uploaded");
            // this.goToNexctScreen(screenName,responseJson);
            this.setState({logo_id:responseJson.lodo_id});
          
              
          
            
           
        }
         else
         {
           console.log("Error",responseJson);
           
  
         }
        
      })
      .catch((error) => {
         console.log("error is",error);
  
        //  Alert.alert("error");
         console.error(error);
      });


  }

  openAlert=()=>{



    console.log("In Open Alert");

    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          let photoName=response.fileName===undefined?"abc.jpg":response.fileName;
          let source = {
            uri: response.uri,
            name: photoName,
            type: 'image/jpg'
         };
          //const source = { uri: response.uri };
      
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      
          this.setState({
            avatarSource: source,
            imageshow:true
          });
          // console.log("Image source =",this.state.avatarSource);
          this.setState({Secondtime:true});
          this.updateProfileImage(this.state.avatarSource);

        }
      });

      
      // updateProfileImage(this.state.avatarSource);



  } 
  async _getToken(key) {
    return await AsyncStorage.getItem(key, (err, result) => {
        return result;
    });
}
  

  onRegionChange= (region) => {
    this.setState({ region });
    
  }

  goToBottomScreen = (screenName,index) => {


    Navigation.mergeOptions(screenName, {
      bottomTabs: {
        currentTabIndex: index
      }
    });
  }

  // async componentDidAppear() {
   async componentDidMount() {


    console.log("Dashboard will");

    this.getPermission();


    this.time_zone_settings();

  

  fetch(base_url+'admin/dashboard', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-sh-auth': await this._getToken("token")
  },
}).then((response) => response.json())
    .then((responseJson) => {
     
       console.log("response in Dashboard",responseJson);
      if(responseJson.code==200)
       {
         
        console.log("Successfully In Dashboard");
          // this.goToNexctScreen(screenName,responseJson);
          
          this.setState({
            active_projects:responseJson.active_projects,

             non_active_projects:responseJson.non_active_projects,
             staff_clocked_in:responseJson.staff_clocked_in,

              staff_inactive:responseJson.staff_not_clocked_in,
              logo_path:responseJson.logo_image,
              active_project_list:responseJson.active_project_list});
              console.log("response in dashboard=",responseJson);

              if(this.state.logo_path=="")
              {

                this.setState({imageshow:false});


              }
              else
              {
                var base_path=base_url_image+this.state.logo_path;

                this.setState({imageshow:true,logo_path:base_path});
                this.setState({imageshow:true});
                this.setState({Secondtime:false});

              }

              this.setState({showIndicator:false});
              
              console.log("logo path is =",this.state.logo_path);
              
         return;
       }
       else
       {
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


  gettheAddressfromlatlong = () =>{

    var key="AvBSOKIvvztAL2E6Kwbj-ED3NIOFABD_qDKK1Pr9Xll7vth_n8-a1R93vWZABgSP";
    
    fetch('http://dev.virtualearth.net/REST/v1/Locations/'+this.state.region.latitude+','+this.state.region.longitude+'?&key='+key
    
      , {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'x-sh-auth': await this._getToken("token")
      },
    }).then((response) => response.json())
        .then((responseJson) => {
         
           console.log("response in get lat long address",responseJson);
         
          
        })
        .catch((error) => {
          // console.log("error is",error);
    
          //  Alert.alert("error");
           console.error(error);
        });


    
  }

  componentDidDisappear(){
    console.log("did disappear");

    // this.gettheAddressfromlatlong();
  }
 
  render() {
   
   
    if(this.state.showIndicator)
    {
      return(

      <View style={styles.loading}><ActivityIndicator size="large" color="#0000ff" /></View>);

    
    }
    else
    {
    return (
// Container main 
 <View style={styles.container}>
   <View>
  <StatusBar backgroundColor="white"  barStyle="dark-content"/>
  </View>
   <SafeAreaView style={{flex: 1}}>
 <View> 
<ScrollView keyboardShouldPersistTaps={"handled"}>

<View style={{flex:1,marginTop:40,marginLeft:20,marginRight:20,marginBottom:20}}>

<View style={styles.SectionOneContainer}>


<TouchableOpacity onPress={()=>this.openAlert()}>
     <View>


     {/* { 
          this.state.imageshow==false &&
          <Image
          // source={{uri:base_url+'/'+this.state.logo_path}}
          source={require('../assets/plus.png')}
          //borderRadius style will help us make the Round Shape Image
          style={{ width: 50, height: 50, borderRadius: 25,borderColor:"#F3F9FE",borderWidth:1 }} />
       }
    {

      this.state.imageshow==true && this.state.logo_path=="" &&

       <Image
        source={{uri:"http://192.168.1.39:4100"+this.state.logo_path}}
      //  source={this.state.avatarSource} 
       //borderRadius style will help us make the Round Shape Image
       style={{ width: 50, height: 50, borderRadius: 25,borderColor:"#F3F9FE",borderWidth:1 }} />
    } */}


{ 
  this.state.imageshow==false &&
     <Image
          // source={{uri:base_url+'/'+this.state.logo_path}}
          source={require('../assets/plus.png')}
          //borderRadius style will help us make the Round Shape Image
          style={{ width: 50, height: 50, borderRadius: 25,borderColor:"#F3F9FE",borderWidth:1 }} />
          
       }
{

       this.state.imageshow==true && this.state.Secondtime==true &&

       <Image
       // source={{uri:base_url+'/'+this.state.logo_path}}
       source={this.state.avatarSource} 
       //borderRadius style will help us make the Round Shape Image
       style={{ width: 50, height: 50, borderRadius: 25,borderColor:"#F3F9FE",borderWidth:1 }} />


}

   { 
      
      this.state.imageshow==true && this.state.Secondtime==false &&

      <Imagep 
       imageStyle={{width: 50, 
        height: 50,
        borderRadius: 25,
        borderColor:"#F3F9FE",borderWidth:1}}
      source={{uri:this.state.logo_path}} 
      indicator={Progress.Circle} 
        style={{
        width: 50, 
        height: 50,
        borderRadius: 25,
        borderColor:"#F3F9FE",borderWidth:1, 
          }}/>

      //  <Image
      //  // source={{uri:base_url+'/'+this.state.logo_path}}
      //  source={{uri:"http://192.168.1.39:4100"+this.state.logo_path}} 
      //  //borderRadius style will help us make the Round Shape Image
      //  style={{ width: 50, height: 50, borderRadius: 25,borderColor:"#F3F9FE",borderWidth:1 }} />






        }



     </View>
     </TouchableOpacity> 

     <View style={styles.BothTextContainer}>

         <View><Text style={{fontSize:20,color:"#2D4273"}}>Today is {this.state.dayToDisplay}</Text></View>
         <View><Text style={{fontSize:12,color:"#818FAB"}}>{this.state.dateToDisplay}</Text></View>

     </View>
</View>


<CardView style={{marginTop:30}}
          cardElevation={4}
          cardMaxElevation={4}
          cornerRadius={5}
          >
          
<View style={styles.SectionTwoContainer}>


    <View style={styles.rowOneContainer}>
        <View style={styles.firstBoxContainer}>
            <View><Text style={styles.sectionTwoLargeTextStyle}>{this.state.active_projects}</Text></View>
            <View><Text style={styles.sectionTwoSmallTextStyle}>Running Projects</Text></View>
        </View>
        <View style={styles.lineContainer}></View>
        <View style={styles.ThirdBoxContainer}>
            <View><Text style={styles.sectionTwoLargeTextStyle}>{this.state.non_active_projects}</Text></View>
            <View><Text style={styles.sectionTwoSmallTextStyle}>Off Projects</Text></View>
        </View>
    </View>

<View style={styles.bottomLine}></View>

    <View style={styles.rowTwoConatiner}>
        <View style={styles.firstBoxContainer}>
            <View><Text style={styles.sectionTwoLargeTextStyle}>{this.state.staff_clocked_in}</Text></View>
            <View><Text style={styles.sectionTwoSmallTextStyle}>Clocked In</Text></View>
        </View>
        <View style={styles.lineContainer}></View>
        <View style={styles.ThirdBoxContainer}>
            <View><Text style={styles.sectionTwoLargeTextStyle}>{this.state.staff_inactive}</Text></View>
            <View><Text style={styles.sectionTwoSmallTextStyle}>Not Colcked In</Text></View>
        </View>
    </View>



</View>
</CardView>



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


<CardView style={{ marginTop:30,marginBottom:10}}
          cardElevation={3}
          cardMaxElevation={3}
          cornerRadius={5}>
<View style={styles.LastSectionContainer}>

<View style={styles.firstBoxContainer}>
            <View><Text style={styles.LastLargeTextStyle}>125</Text></View>
            <View><Text style={styles.LastSmallTextStyle}>Alert Notifications</Text></View>
</View>
<View style={styles.lineContainer}></View>
<View style={styles.firstBoxContainer}>
            <View><Text style={styles.LastLargeTextStyle}>150</Text></View>
            <View><Text style={styles.LastSmallTextStyle}>Employee Requests</Text></View>
</View>
<View style={styles.lineContainer}></View>
<View style={styles.firstBoxContainer}>
            <View><Text style={styles.LastLargeTextStyle}>321</Text></View>
            <View><Text style={styles.LastSmallTextStyle}>Approval requests</Text></View>
</View>





</View>

</CardView>

 
 
</View>
 
 
</ScrollView>
</View>
</SafeAreaView>
 </View>
 
    );
  }
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //  alignItems:"center",
    backgroundColor: '#FFFFFF'
    // backgroundColor: 'orange'

  },
  SectionOneContainer:{
         flex:1,
    //    backgroundColor:"red",
      flexDirection:"row",
      height:50,
        
    
      

  },
  imageContainer:{


  },
  BothTextContainer:{
    marginLeft:10,
    // backgroundColor:"pink"

  },
  LargeTextContainer:{

  },
  smallTextContainer:{

  },
SectionTwoContainer:{

     flex:1,
    backgroundColor:"#FFFFFF",
     height:180,
    // paddingLeft:40,
    
    // borderWidth:2,
    // borderColor:"#9BA0AF",
    // borderRadius:6,
   


},
rowOneContainer:{
    flex:1,
    flexDirection:"row",
    // backgroundColor:"blue",
   
    // borderBottomWidth:5,
    // borderBottomColor:"#2D4273",
    
    
},
bottomLine:{
    // flex:1,
    borderBottomWidth:2,
    borderBottomColor:"#9BA0AF",
    marginLeft:30,
    marginRight:30,
   
    

},
firstBoxContainer:{
    flex:1,
    // backgroundColor:"grey",
    justifyContent:"center",
    // alignSelf:"center",
    alignItems:"center"
    

},
lineContainer:{
    // flex:1,
    borderLeftWidth:2,
    borderLeftColor:"#9BA0AF",
     height:50,
    alignSelf:"center"



},
rowTwoConatiner:{
    flex:1,
    flexDirection:"row",
    //  backgroundColor:"red",
  
    
  

},
ThirdBoxContainer:{
    flex:1,
    // backgroundColor:"green",
    justifyContent:"center",
    //alignSelf:"center",
    alignItems:"center"

},
LastSectionContainer:{
    flex:1,
    flexDirection:"row",
    height:100,
    backgroundColor:"#FFFFFF",
    // backgroundColor:"red",
    // borderWidth:1,
   

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
  sectionTwoLargeTextStyle:{

    fontSize:18,
    color:"#818794",
    textAlign:"center"

  },

  sectionTwoSmallTextStyle:{

    fontSize:12,
    color:"#818794",
    textAlign:"center"

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
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  indicator:{

    position: 'absolute',
    alignItems:"center",
    justifyContent:"center"

  }


  
});
