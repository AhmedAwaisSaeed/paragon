

import React, {Component} from 'react';
import {StyleSheet, Text,View,Image,TouchableOpacity,SafeAreaView} from 'react-native';

import CardView from "react-native-cardview";
import Moment from 'moment';
import ImagePicker from 'react-native-image-picker';


const options = {
    title: 'Select Avatar',
    noData: true,
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };


  

export default class ImagePickerTesting extends Component{

    constructor(props) {
        super(props);

        this.state={
            avatarSource:""
        }

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
          const source = { uri: response.uri };
      
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      
          this.setState({
            avatarSource: source,
          });
        }
      });



  } 


  render() {
return(
    
        <View>
            <SafeAreaView>

           <TouchableOpacity onPress={()=>this.openAlert()}><Text>Upload a photo</Text></TouchableOpacity> 
           <Image source={this.state.avatarSource} style={{width:300,height:300}} />
           </SafeAreaView>
   
        </View>
  
    );
   
}
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  


});
