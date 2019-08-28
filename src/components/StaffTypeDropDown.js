import React from 'react';
import {
  Button,
  Text,
  TextInput,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Chevron } from 'react-native-shapes';
// import { Ionicons } from 'react-native-vector-icon';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

// import RNPickerSelect, { defaultStyles } from './debug';

const sports = [
  {
    label: 'Employees',
    value: 'employees',
  },
  {
    label: 'Managers',
    value: 'managers',
  },
  
 
];


export default class StaffTypeDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
      
      favSport3:"Employees",
     
      
      
    };

      // this.InputAccessoryView = this.InputAccessoryView.bind(this);
  }

  

  

  changeValue = async (val)=>{

     console.log("dropdwon value is=",val);

    
    await this.setState({favSport3: val});

    this.props.selectedValue(this.state.favSport3);

    // var answer=this.state.favSport3;
    // // console.log("dropdwon value is=",answer);
    //  this.props.staff_roll_call(this.state.favSport3);

  }

  render() {
    const placeholder = {
      // label: 'Roll Type',
      // value: null,
      // color: '#9EA0A4',
      //  fontSize:14,
      //  fontWeight:"bold"
    };

    console.log("In dropdwon favsport=",this.state.favSport3)

    return (

     
      //  <ScrollView style={styles.container}>
        <View style={styles.container}>

        {/* <Text>custom icon using react-native-shapes</Text> */}
        {/* and useNativeAndroidPickerStyle={false} with underlineColorAndroid */}
        <RNPickerSelect 
       
          value={this.state.favSport3}
          placeholder={placeholder}
          items={sports}
          onValueChange={(value) => {this.changeValue(value) }}
          InputAccessoryView={() => null}
         
          
          style={{
              ...pickerSelectStyles,
            
              
              
           
           
            iconContainer: {
              top: 20,
              right: 15,
              
            },
            placeholder: {
              color: 'purple',
              fontSize: 12,
              fontWeight: 'bold',
              
            },
            
          }}
          
          useNativeAndroidPickerStyle={true}
          //  textInputProps={{ underlineColorAndroid: 'cyan' }}
          Icon={() => {
            return <Chevron size={1.5} color="#2D4273" />;
          }}
        />

       
</View>
       
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //  paddingVertical: 40,
    //  paddingHorizontal: 10,
    flex: 1,
     backgroundColor:"#f5f5f5",
    // width:150,
    
   
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    fontWeight:"bold",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {

    
    fontSize: 12,
    fontWeight:"bold",
    
    // paddingHorizontal: 10,
    // paddingVertical: 8,
    borderWidth: 0.5,
     borderColor: 'white',
    borderRadius: 8,
     color: 'black',
    // paddingRight: 30, // to ensure the text is never behind the icon
    paddingLeft:12,
    fontFamily:"fontFamily-bold"
  },
});
