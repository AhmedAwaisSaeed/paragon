import React, {Component} from 'react';
import {Platform, StyleSheet,StatusBar, Text,TextInput, View,Image, ImageBackground,Button,ScrollView,TouchableOpacity} from 'react-native';

import CardView from "react-native-cardview";
import MyList from "../components/MyList"
import ActiveEmployeeList from "../components/ActiveEmployeeList";
import PayrollList from "../components/PayrollList";
import MyTopBarTwo from "../components/MyTopBarTwo";
import { Navigation } from "react-native-navigation";
import DatePicker from 'react-native-date-ranges';
import Moment from 'moment';




export default class DateRangePicker extends Component{

  constructor(props) {
    super(props);

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

async onConfirm(date){

    var start=Moment(date.startDate).format('YYYY-MM-DD');
    var end=Moment(date.endDate).format('YYYY-MM-DD');


    console.log("onconfirm",start);
    console.log("onconfirm end",end);

    await this.props.startDate(start);
    await this.props.endDate(end);
      this.props.hitApiCall();

  //   console.log("onconfirm",start);

  //   console.log("onconfirm",end);

} 


customButton = (onConfirm) => (


    // <Button
    // title="submit"
    //         onPress={onConfirm}
            
	// 		style={{ container:{ width:'80%', marginHorizontal:'3%' }, text:{ fontSize: 20 } }}
	// 		primary
	// 		text={'送出'}
	// 	/>
    <TouchableOpacity onPress={onConfirm}> 
    {/* <TouchableOpacity onPress={()=> this.gettheLatLong ()}> */}
          
          
              <View style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </View>
              
    </TouchableOpacity>
 
)
 

  render() {
  
    return (

<View style={styles.container}>

{/* <View style={{height:50,marginTop:5}}>

<MyTopBarTwo  screenText="Pick Range" showLeftIcon= {true} showRightIcon={false} idComponent={this.props.componentId} />

</View> */}

    <DatePicker
	  style={ { width: 205,margin:0,borderColor:"#2D4273"} }
	  customStyles = { {
		placeholderText:{ fontSize:14,color:"#2D4273" } ,// placeHolder style
		headerStyle : { padding:0,margin:0},			// title container style
		headerMarkTitle : {
            borderColor:"red"
           
         }, // title mark style 
		headerDateTitle: {}, // title Date style
		contentInput: {}, //content text container style
		contentText: { fontSize:14,color:"#2D4273"}, //after selected text Style
	    } } // optional 
	  centerAlign // optional text will align center or not
	  allowFontScaling = {false} // optional
    placeholder={'Apr 27, 2019 → Jul 30, 2019'}
     customButton = {this.customButton}
    markText={"Select Range"}
    // buttonText={"submit"}
      mode={'range'}
    onConfirm={(value)=>{this.onConfirm(value)}}
    outFormat={"YYYY-MM-DD"}

        />
        
 

       

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
  color:"white",
  
  },

  



});
