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
    label: 'Completed',
    value: 'completed',
  },
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Inactive',
    value: 'inactive',
  },
  
];

export default class StaffDropdownPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
      
      favSport3: this.props.defaultValue,
      
    };

      // this.InputAccessoryView = this.InputAccessoryView.bind(this);
  }

 

  changeValue = async (val,index)=>{

    // console.log("dropdwon value is=",val);

    
    await this.setState({favSport3: val});

    var answer=this.state.favSport3;
    console.log("dropdwon value is=",answer);
    this.props.functioncall(this.state.favSport3);

  }

  render() {
    const placeholder = {
      // label: 'Project Type',
      // value: null,
      // color: '#9EA0A4',
      // fontSize:15
    };

    return (
      //  <ScrollView style={styles.container}>
        <View>

        {/* <Text>custom icon using react-native-shapes</Text> */}
        {/* and useNativeAndroidPickerStyle={false} with underlineColorAndroid */}
        <RNPickerSelect
          placeholder={placeholder}
          items={sports}
          onValueChange={(value,index) => {this.changeValue(value,index) }}
          style={{
              ...pickerSelectStyles,
            iconContainer: {
              top: 20,
              right: 15,
              
            },
          }}
          value={this.state.favSport3}
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
     paddingVertical: 40,
     paddingHorizontal: 10,
    flex: 1,
    backgroundColor:"red",
   
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 15,
    // paddingHorizontal: 10,
    // paddingVertical: 8,
    borderWidth: 0.5,
     borderColor: 'white',
    borderRadius: 8,
     color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    paddingLeft:12
  },
});
