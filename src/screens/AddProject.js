
import React, {Component} from 'react';
import {Platform, Alert,SafeAreaView, StyleSheet,StatusBar, Text,TextInput, ScrollView, View, ImageBackground,Button,Image,TouchableHighlight,TouchableOpacity,AsyncStorage} from 'react-native';

import { Navigation } from "react-native-navigation";

import MyTopBarTwo from '../components/MyTopBarTwo';
import RadioButton from "../components/RadioButtons";
import Toast, {DURATION} from 'react-native-easy-toast';
import CardView from "react-native-cardview";
import DatePicker from 'react-native-datepicker';
import {base_url} from "../components/AllVariables";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Geocoder from 'react-native-geocoding';


const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

export default class AddProject extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name:'',
      phone_number:'',
      start_date:'',
      client_email:'',
      finish_date:'',
      Address:'',
      ShortName:'',
      Description:'',

      nameValid:true,
      phone_numberValid:true,
      client_emailValid:true,
      AddressValid:true,
      ShortNameValid:true,
      DescriptionValid:true,
      


      
      // usernameValid:true,
      // passwordValid:true,
      showWarning:true,
      time_zone:"",
      latitude: null,
      longitude: null,
      error:null,
      
      
     

    };
  }

  // componentDidMount() {

  //   // Alert.alert("Please First Enable ");
  //   navigator.geolocation.getCurrentPosition(
  //      (position) => {
  //        console.log("My Location is=");
  //        console.log(position);
  //        this.setState({
  //          latitude: position.coords.latitude,
  //          longitude: position.coords.longitude,
  //          error: null,
  //        });
  //      },
  //      (error) => this.setState({ error: error.message }),
  //      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
  //    );
  //  }

 

  onchangeinput_name = (value) => {

    if(value=="")
    {
      this.setState({nameValid:false,name:null});
      this.refs.toast.show('Please Enter Name');
    }
    else
    {
      this.setState({name:value,nameValid:true,showWarning:false});
      
    }
    
  
  }

  onchangeinput_phone_number = (value) => {

    if(value=="")
    {
      this.setState({phone_numberValid:false,phone_number:null});
      this.refs.toast.show('Please Enter Phone Number');
    }
    else
    {
      this.setState({phone_number:value,phone_numberValid:true,showWarning:false});
      
    }
    
  
  }


  onchangeinput_start_date = (value,type) => {

    if(type=="StartDate" && value=="")
    {
      this.setState({usernameValid:false,start_date:null});
      this.refs.toast.show('Please Enter Start Date');
    }
    else
    {
      this.setState({start_date:value,usernameValid:true,showWarning:false});
      
    }
    
  
  }



  onchangeinput_client_email = (value) => {

    if(value=="")
    {
      this.setState({ client_emailValid:false,client_email:null});
      this.refs.toast.show('Please Enter Client Email');
    }
    else
    {
      this.setState({client_email:value,client_emailValid:true,showWarning:false});
      
    }
    
  
  }

  onchangeinput_finish_date = (value,type) => {

    if(type=="FinishDate" && value=="")
    {
      this.setState({usernameValid:false,finish_date:null});
      this.refs.toast.show('Please Enter Finsh Date');
    }
    else
    {
      this.setState({finish_date:value});
      
    }
    
  
  }

  gettheLatLong = () =>{

    // Geocoder.init("AIzaSyBE9cJE_39zXzPICkyfePu1WURE4LhpvbA"); // use a valid API key
    // Geocoder.from(this.state.Address)
		// .then(json => {
		// 	var location = json.results[0].geometry.location;
    //   console.log("Lat Long is=",location);
    //    this.setState({latitude:location.lat,longitude:location.lng});
		// })
		// .catch(error => console.warn(error));
  }


  onchangeinput_address = (value) => {

    if(value=="")
    {
      this.setState({AddressValid:false,Address:null});
      this.refs.toast.show('Please Enter Address');
    }
    else
    {
      this.setState({Address:value,AddressValid:true,showWarning:false});
      
    }
    
  
  }

  onchangeshort_name = (value) => {

    if(value=="")
    {
      this.setState({ShortNameValid:false,ShortName:null});
      this.refs.toast.show('Please Enter Short Name');
    }
    else
    {
      this.setState({ShortName:value,ShortNameValid:true,showWarning:false});
      
    }
    
  
  }

  onchangedescription = (value) => {

    if(value=="")
    {
      this.setState({DescriptionValid:false,Description:null});
      this.refs.toast.show('Please Enter Description');
    }
    else
    {
      this.setState({Description:value,DescriptionValid:true,showWarning:false});
      
    }
    
  
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


  async _getToken(key) {
    return await AsyncStorage.getItem(key, (err, result) => {
        return result;
    });
}
  
  addProjectcall = async() =>{

  if(this.state.nameValid==false 
     || this.state.phone_numberValid==false 
      || this.state.showWarning==true ||

    this.state.client_emailValid==false ||
     this.state.AddressValid==false ||
      this.state.ShortNameValid==false ||
    this.state.DescriptionValid==false 
    )
  {
    return (Alert.alert("Please Fill the All Required Fields"));
  }

    const allParams = {

      client_fullname:this.state.name,
      phone_number:this.state.phone_number,
      email:this.state.client_email,
      finish_date:this.state.finish_date,
      start_date:this.state.start_date,
      address:this.state.Address,
      short_name:this.state.ShortName,
      description:this.state.Description,
      latitude:"30.672080",
      longitude:"73.110884"


    }

  console.log("In Add Project Call");

    // const token  = this.props.response.token;
    // console.log('params', token);

  

  fetch(base_url+'project/add_project', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
      'x-sh-auth': await this._getToken("token")
  },
  body: JSON.stringify({...allParams}),
}).then((response) => response.json())
    .then((responseJson) => {
     
      //  console.log("response in Projects responseJson");
      if(responseJson.code==200)
       {
        console.log("Successfully Project Added");
        Navigation.popToRoot(this.props.componentId);
        //  this.goToNexctScreen("Projects","");
          // this.setState({ActiveProjects:responseJson.active_projects});
        
               console.log("response is=",responseJson);
               Alert.alert("Project Successfully Added");
              
         return;
       }
       else
       {
          Alert.alert("Error",responseJson.message);
         console.log("Error from Bakcend= ",responseJson);
         return;

       }
      
    })
    .catch((error) => {
      // console.log("error is",error);

      //  Alert.alert("error");
       console.error(error);
    });

  console.log("All Params",allParams);

}

  render() {
    const {name,phone_number, start_date, client_email,finish_date,Address,ShortName,Description}=this.state;
    return (
<View style={styles.container}>
<SafeAreaView style={{flex: 1}}>
 
<View style={{height:50}}>
<MyTopBarTwo  screenText="Add New Project" showLeftIcon= {true} showRightIcon={false} idComponent={this.props.componentId} />
</View>
<View style={styles.topBarLine}></View>
{/* <ScrollView style={{flex:1,}} keyboardShouldPersistTaps={"handled"} > */}
{/* <Text> {this.state.latitude} </Text>
        <Text> {this.state.longitude} </Text>
        <Text> {this.state.error} </Text> */}
        {/* <KeyboardAwareScrollView keyboardShouldPersistTaps="always" enableOnAndroid={true}> */}
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" enableOnAndroid={true}>
<View style={{padding:10}}>
<CardView style={{marginTop:20,paddingTop:20,paddingBottom:20, paddingLeft:10,paddingRight:10,backgroundColor:"white"}}
          cardElevation={4}
          cardMaxElevation={4}
          cornerRadius={5}
          >

<View style={styles.SectionOneContainer}>



    <View style={styles.butonContainer}>

        < View>

        
        {/* <View style={[this.state.nameValid ? styles.ClientNameContainer:styles.error]}> */}
        <View style={styles.ClientNameContainer}>
        <TextInput
      style={styles.textInuputCorrectStyle}
        onChangeText={(text)=>this.onchangeinput_name(text)}
        value={name}
        placeholder="Client Name"
        placeholderTextColor="white"
        
      />
        </View>
    
    
        </View>

    </View>


    <View style={styles.sectiononeRowTwoContainer}>

    {/* <TouchableOpacity style={{flex:1}}> */}
        {/* <View style={[this.state.phone_numberValid ? styles.RowTwoButtonOneContainer:styles.error]}> */}
        <View style={styles.RowTwoButtonOneContainer}>

        <TextInput
      style={styles.textInuputCorrectStyle}
        onChangeText={(text)=>this.onchangeinput_phone_number(text)}
        value={phone_number}
        placeholder="Client Phone #"
        placeholderTextColor="white"
        
      />
        </View>
        {/* </TouchableOpacity> */}


        <TouchableOpacity style={{flex:1,marginTop:20}}>
    {/* <View style={[this.state.client_emailValid ? styles.RowTwoButtonOneContainer:styles.error]}> */}
    <View style={styles.RowTwoButtonOneContainer}>

    <TextInput
      style={styles.textInuputCorrectStyle}
        onChangeText={(text)=>this.onchangeinput_client_email(text)}
        value={client_email}
        placeholder="Client Email"
        placeholderTextColor="white"
        
      />
    </View>
    </TouchableOpacity>

       

    </View>



  <View style={styles.sectiononeLastRowContainer}>


  <TouchableOpacity style={{flex:1}}>

<View style={styles.rowTwoButtonTwoContainer}>


<DatePicker
        style={{color:"white",width: 160}}
        date={this.state.start_date}
        mode="date"
        placeholder="Start Date"
        format="YYYY-MM-DD"
        // minDate="2020-05-01"
        // maxDate="2020-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
           dateIcon: {
             width:0,
             height:0,
            
          },
          dateInput: {
           borderWidth:0,
           marginLeft:13,
           padding:0,
           justifyContent:"center",
           alignItems:"flex-start"
           
          },
          placeholderText: {
            color:"white",
           

          },
          dateText:{
            color: 'white',
            
          
            
          }
        }}
        onDateChange={(date) => {this.setState({start_date: date})}}
      />
      
{/* <TextInput
style={styles.textInuputCorrectStyle}
onChangeText={(text)=>this.onchangeinput_start_date(text,'StartDate')}
value={start_date}
placeholder="Start Date"
placeholderTextColor="white"

/> */}
</View>

</TouchableOpacity>


<TouchableOpacity style={{flex:1,marginLeft:20}} >

<View style={styles.rowTwoButtonTwoContainer}>

<DatePicker
        style={{color:"white",width: 160}}
        date={this.state.finish_date}
        mode="date"
        placeholder="Finish Date Goal"
        format="YYYY-MM-DD"
        // minDate="2020-05-01"
        // maxDate="2020-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
           dateIcon: {
             width:0,
             height:0
          },
          dateInput: {
           borderWidth:0,
           marginLeft:13,
           padding:0,
           justifyContent:"center",
           alignItems:"flex-start"
           
          },
          placeholderText: {
            color:"white"

          },
          dateText:{
            color: 'white',
          
            
          }
        }}
        onDateChange={(date) => {this.setState({finish_date: date})}}
      />
      
{/* <TextInput
  style={styles.textInuputCorrectStyle}
    onChangeText={(text)=>this.onchangeinput_finish_date(text,'FinishDate')}
    value={finish_date}
    placeholder="Finish Date Goal"
    placeholderTextColor="white"
    onFocus={this.showDateTimePicker} 
   
    
  /> */}
</View>

</TouchableOpacity>

  
    

</View>


</View>
</CardView> 

<View style={styles.sectionTwoContainer}>
  {/* <View style={[this.state.AddressValid ? styles.cardViewContainer :styles.cardViewError]}> */}
  <View style={styles.cardViewContainer}>

<CardView style={{padding:10,paddingLeft:10,height:60,backgroundColor:'white'}}
          cardElevation={4}
          cardMaxElevation={4}
          cornerRadius={5}
          >
      <View style={styles.emailContainer}>


    

      <TextInput
      
      onChangeText={(text)=>this.onchangeinput_address(text)}
      value={Address}
      placeholder="Address"
      placeholderTextColor="#C9C9C9"
      />


      


</View>

    
</CardView>
</View>


{/* <View style={[this.state.ShortNameValid? styles.cardViewContainer :styles.cardViewError]}> */}
<View style={styles.cardViewContainer}>
<CardView style={{padding:10,paddingLeft:10,height:60,backgroundColor:'white'}}
          cardElevation={4}
          cardMaxElevation={4}
          cornerRadius={5}
          >
      <View style={styles.emailContainer}>

      <TextInput
      
      onChangeText={(text)=>this.onchangeshort_name(text)}
      value={ShortName}
      placeholder="Short Name"
      placeholderTextColor="#C9C9C9"
      />


      


</View>

    
</CardView>
</View>

{/* <View style={[this.state.DescriptionValid ? styles.cardViewContainer :styles.cardViewError]}> */}
<View style={styles.cardViewContainer}>
<CardView style={{padding:10,paddingLeft:10,height:60,backgroundColor:'white',height:100}}
          cardElevation={4}
          cardMaxElevation={4}
          cornerRadius={5}
          >
      <View style={styles.emailContainer}>

      <TextInput
  style={{}}
       multiline = {true}
       
      onChangeText={(text)=>this.onchangedescription(text)}
      value={Description}
      placeholder="Description"
      placeholderTextColor="#C9C9C9"
      />


      


</View>

    
</CardView>
</View>



</View>


<View style={styles.sectionthreeContainer}>


 <TouchableOpacity onPress={()=> this.addProjectcall()}> 
{/* <TouchableOpacity onPress={()=> this.gettheLatLong ()}> */}
      
      
          <View style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </View>
          
</TouchableOpacity>


</View>



</View>
</KeyboardAwareScrollView>
<Toast  position='top' ref="toast"/> 
</SafeAreaView>

 </View>
 
    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      // justifyContent: 'center',
      //  alignItems: 'center',
    backgroundColor: 'white'
  },
  topBarLine:{
// flex:1,
    borderWidth:0.5,
    borderColor:"#AAB0BC",
    // marginTop:10

  },
  SectionOneContainer:{

    

  },
  ClientNameContainer:{

    //width: 302,
    flex:1,
    height:60,
   justifyContent:"center",
   backgroundColor:'#2D4273',
   borderRadius: 5,
   borderWidth: 1,
   borderColor:"#2D4273"  

  },
  ButtonText:{

    padding: 10,
  color: 'white',
  fontSize:15

  },

sectiononeRowTwoContainer:{
flex:1,
    // flexDirection:"row",
    marginTop:20
    

},
RowTwoButtonOneContainer:{

    // flex:1,
    height:60,
    justifyContent:"center",
    backgroundColor:'#2D4273',
    borderRadius: 5,
    borderWidth: 1,
    borderColor:"#2D4273"  

},
rowTwoButtonTwoContainer:{
    // flex:1,
    height:60,
    justifyContent:"center",
    backgroundColor: '#2D4273',
    borderRadius: 5,
    borderWidth: 1,
    borderColor:"#2D4273",
     

},
sectionTwoContainer:{
 marginTop:30
},

emailContainer:{

  justifyContent:"center",
  
  // alignItems:"center"
  

},

textInuputCorrectStyle:{
  color:"white",
  marginLeft:10
},

sectiononeLastRowContainer:{

  flex:1,
  flexDirection:"row",
  marginTop:20,
  justifyContent:"space-evenly",
  

},
sectionthreeContainer:{
  flex:1,
  alignItems:"center",
   marginTop:20,
  marginBottom:100
  
},
submitButton:{
  height:48,
  width:302,
//flex:1,
justifyContent:"center",
 backgroundColor: '#69C9DE',
 borderRadius: 10,
 borderWidth: 1,
 borderColor:"#69C9DE"   
 

},
submitButtonText:{
textAlign:"center",
color:"white"
},
error:{

    
  flex:1,
  height:60,
 justifyContent:"center",
 backgroundColor:'#2D4273',
 borderRadius: 5,
 borderWidth: 1,
 borderColor:"red"  
 

},

cardViewContainer:{

  marginTop:20

},
cardViewError:{

  borderWidth:1,
  borderColor:"red",marginTop:20

}

});
