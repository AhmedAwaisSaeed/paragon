
import React, {Component} from 'react';
import {Platform, Alert,SafeAreaView,ActivityIndicator, StyleSheet,StatusBar, Text,TextInput, ScrollView, View, ImageBackground,Button,Image,TouchableHighlight,TouchableOpacity,AsyncStorage} from 'react-native';

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
import RadioButtons from "../components/RadioButtons"
import { thisExpression } from '@babel/types';
import DropdwonPicker from "../components/DropdownPicker";




export default class EditProject extends Component {

  constructor(props) {
    super(props);
    this.state = {
        Project:"",
      name:'',
      phone_number:'',
      start_date:'',
      client_email:'',
      finish_date:'',
      Address:'',
      ShortName:'',
      Description:'',
      usernameValid:true,
      passwordValid:true,
      showWarning:false,
      time_zone:"",
      latitude: null,
      longitude: null,
      error:null,
      Project_id:"",
      project_status:"",
      showIndicator:true,
      
      
     

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

  

  async componentWillMount() {

     // const token  = this.props.response.token;
     console.log("In Edit Project");

   
    const id=this.props.response;
    this.setState({Project_id:id});

  
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
     
   
      if(responseJson.code==200)
       {
        // console.log("Successfully In Project Details");
          // this.goToNexctScreen(screenName,responseJson);
        //    this.setState({Project:responseJson.project});
           this.setState({name:responseJson.project.client_fullname,
            phone_number:responseJson.project.phone_number,
            start_date:responseJson.project.start_date,
            client_email:responseJson.project.email,
            finish_date:responseJson.project.finish_date,
            Address:responseJson.project.address,
            ShortName:responseJson.project.short_name,
            Description:responseJson.project.description,
            project_status:responseJson.project.project_status
        });
        this.setState({showIndicator:false});
              console.log("project status will mount on=",this.state.project_status);
              
        //  return;
       }
       else
       {
        this.setState({showIndicator:false});
        Alert.alert("Error",responseJson.message);
         console.log("Error From backend",responseJson);
         return;

       }
      
    })
    .catch((error) => {
      // console.log("error is",error);

      //  Alert.alert("error");
       console.error(error);
    });

    
    


 
   }


   

 

  onchangeinput_name = (value,type) => {

    if(type=="Name" && value=="")
    {
      this.setState({usernameValid:false,name:null});
      this.refs.toast.show('Please Enter Name');
    }
    else
    {
      this.setState({name:value,usernameValid:true,showWarning:false});
      
    }
    
  
  }

  onchangeinput_phone_number = (value,type) => {

    if(type=="Phone" && value=="")
    {
      this.setState({usernameValid:false,phone_number:null});
      this.refs.toast.show('Please Enter Phone Number');
    }
    else
    {
      this.setState({phone_number:value,usernameValid:true,showWarning:false});
      
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



  onchangeinput_client_email = (value,type) => {

    if(type=="ClientEmail" && value=="")
    {
      this.setState({usernameValid:false,client_email:null});
      this.refs.toast.show('Please Enter Client Email');
    }
    else
    {
      this.setState({client_email:value,usernameValid:true,showWarning:false});
      
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

    Geocoder.init("AIzaSyBE9cJE_39zXzPICkyfePu1WURE4LhpvbA"); // use a valid API key
    Geocoder.from(this.state.Address)
		.then(json => {
			var location = json.results[0].geometry.location;
      console.log("Lat Long is=",location);
       this.setState({latitude:location.lat,longitude:location.lng});
		})
		.catch(error => console.warn(error));
  }


  onchangeinput = (value,type) => {

    if(type=="Address" && value=="")
    {
      this.setState({usernameValid:false,Address:null});
      this.refs.toast.show('Please Enter Address');
    }
    else
    {
      this.setState({Address:value,usernameValid:true,showWarning:false});
      
    }
    
  
  }

  onchangeshort_name = (value,type) => {

    if(type=="ShortName" && value=="")
    {
      this.setState({usernameValid:false,ShortName:null});
      this.refs.toast.show('Please Enter Short Name');
    }
    else
    {
      this.setState({ShortName:value,usernameValid:true,showWarning:false});
      
    }
    
  
  }

  onchangedescription = (value,type) => {

    if(type=="Description" && value=="")
    {
      this.setState({usernameValid:false,Description:null});
      this.refs.toast.show('Please Enter Description');
    }
    else
    {
      this.setState({Description:value,usernameValid:true,showWarning:false});
      
    }
    
  
  }

  dropDownValue =(val) =>{

    console.log("in edit dropdown");

    this.setState({project_status:val});


  }

  async _getToken(key) {
    return await AsyncStorage.getItem(key, (err, result) => {
        return result;
    });
}
  
  updateProjectcall = async() =>{

    

    const allParams = {
        _id:this.state.Project_id,
      client_fullname:this.state.name,
      phone_number:this.state.phone_number,
      email:this.state.client_email,
      finish_date:this.state.finish_date,
      start_date:this.state.start_date,
      address:this.state.Address,
      short_name:this.state.ShortName,
      description:this.state.Description,
      project_status: this.state.project_status,
      latitude:30.672080,
      longitude:73.110884


    }



    
  

  fetch(base_url+'project/update_project', {
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
        
        console.log("Successfully Project updated");
        // console.log("in radio value=",statusOfProject);
         Alert.alert("Project Updated Successfully");
        console.log("response is updated=",responseJson);

        // this.goToNexctScreen("Projects","");
          // this.setState({ActiveProjects:responseJson.active_projects});
        
               
              
        //  return;
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

        
      //  console.error(error);
    });

   console.log("All Params",allParams);

}

  render() {
    
    return (
<View style={styles.container}>
<SafeAreaView style={{flex: 1}}>
<View style={{height:50}}>
<MyTopBarTwo  screenText="Edit Project" showLeftIcon= {true} showRightIcon={false} idComponent={this.props.componentId} />
</View>
<View style={styles.topBarLine}></View>

        <KeyboardAwareScrollView
        
         keyboardShouldPersistTaps="handled" enableOnAndroid={true}>
<View style={{padding:10}}>

{
      this.state.showIndicator ? <ActivityIndicator size="large" color="blue" /> :null
  }
<CardView style={{marginTop:20,paddingTop:20,paddingBottom:20, paddingLeft:10,paddingRight:10,backgroundColor:"white"}}
          cardElevation={4}
          cardMaxElevation={4}
          cornerRadius={5}
          >

<View style={styles.SectionOneContainer}>



    <View style={styles.butonContainer}>

        < View>

        
        <View style={styles.ClientNameContainer}>
        <TextInput
      style={styles.textInuputCorrectStyle}
        onChangeText={(text)=>this.onchangeinput_name(text,'Name')}
        value={this.state.name}
        placeholder="Client Name"
        placeholderTextColor="white"
        
      />
        </View>
    
    
        </View>

    </View>


    <View style={styles.sectiononeRowTwoContainer}>

    <TouchableOpacity style={{flex:1}}>
        <View style={styles.RowTwoButtonOneContainer}>

        <TextInput
      style={styles.textInuputCorrectStyle}
        onChangeText={(text)=>this.onchangeinput_phone_number(text,'ClientPhone')}
        value={this.state.phone_number}
        placeholder="Client Phone #"
        placeholderTextColor="white"
        
      />
        </View>
        </TouchableOpacity>


        <TouchableOpacity style={{flex:1,marginTop:20}}>
    <View style={styles.RowTwoButtonOneContainer}>

    <TextInput
      style={styles.textInuputCorrectStyle}
        onChangeText={(text)=>this.onchangeinput_client_email(text,'ClientEmail')}
        value={this.state.client_email}
        placeholder="Client Email"
        placeholderTextColor="white"
        
      />
    </View>
    </TouchableOpacity>

       

    </View>



  <View style={styles.sectiononeLastRowContainer}>

<TouchableOpacity style={{flex:1}} >

<View style={styles.rowTwoButtonTwoContainer}>

  {/* <View>Right</View> */}

<DatePicker
        style={{color:"white",width: 160}}
        date={this.state.finish_date}
        value={this.state.finish_date}
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
           marginLeft:-5
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

  <TouchableOpacity style={{flex:1,marginLeft:20}}>

<View style={styles.rowTwoButtonTwoContainer}>


<DatePicker
        style={{color:"white",width: 160}}
        date={this.state.start_date}
        value={this.state.start_date}
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
             height:0
          },
          dateInput: {
           borderWidth:0,
           
          },
          placeholderText: {
            color:"white"

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

    

</View>


</View>
</CardView> 

<View style={styles.sectionTwoContainer}>

<CardView style={{marginTop:20,padding:10,paddingLeft:10,height:60,backgroundColor:'white'}}
          cardElevation={4}
          cardMaxElevation={4}
          cornerRadius={5}
          >
      <View style={styles.emailContainer}>


      <TextInput

      style={{fontSize:15}}
      onChangeText={(text)=>this.onchangeinput(text,'Address')}
      value={this.state.Address}
      placeholder="Address"
      placeholderTextColor="#C9C9C9"
      />


      


</View>

    
</CardView>



<CardView style={{marginTop:20,padding:10,paddingLeft:10,height:60,backgroundColor:'white'}}
          cardElevation={4}
          cardMaxElevation={4}
          cornerRadius={5}
          >
      <View style={styles.emailContainer}>

      <TextInput
      
      style={{fontSize:15}}
      onChangeText={(text)=>this.onchangeshort_name(text,'ShortName')}
      value={this.state.ShortName}
      placeholder="Short Name"
      placeholderTextColor="#C9C9C9"
      />


      


</View>

    
</CardView>


<CardView style={{marginTop:20,justifyContent:"center",paddingLeft:8,height:60,backgroundColor:'white',height:60}}
          cardElevation={4}
          cardMaxElevation={4}
          cornerRadius={5}
          >

 <View style={styles.sectionDropDownStatus}>

 <DropdwonPicker functioncall={this.dropDownValue} defaultValue={this.props.status} />

    
    
</View> 
</CardView>


<CardView style={{marginTop:20,padding:10,paddingLeft:11,height:60,backgroundColor:'white',height:100}}
          cardElevation={4}
          cardMaxElevation={4}
          cornerRadius={5}
          >
      <View style={styles.emailContainer}>

      <TextInput
  style={{fontSize:16}}
       multiline = {true}
       
      onChangeText={(text)=>this.onchangedescription(text,'Description')}
      value={this.state.Description}
      placeholder="Description"
      placeholderTextColor="#C9C9C9"
      />


      


</View>

    
</CardView>



</View>





<View style={styles.sectionthreeContainer}>


 <TouchableOpacity onPress={()=> this.updateProjectcall()}> 
{/* <TouchableOpacity onPress={()=> this.gettheLatLong ()}> */}
      
      
          <View style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Update</Text>
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
  alignItems:"flex-start",
  //  borderColor:"red",
  //  borderWidth:1,
  flex:1

  // alignItems:"center"
  

},

textInuputCorrectStyle:{
  color:"white",
  marginLeft:10,
  fontSize:15
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
  marginBottom:50
  
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
sectionDropDownStatus:{
    // marginTop:10,
    
}

});
