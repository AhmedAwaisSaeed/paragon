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
    label: 'Carpenter',
    value: 'carpenter',
  },
  {
    label: 'Helper',
    value: 'helper',
  },
  {
    label: 'Painter',
    value: 'painter',
  },
  {
    label: 'Masonary',
    value: 'masonary',
  },
  {
    label: 'Finish',
    value: 'finish',
  },
];


export default class AddNewStaff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
      
      favSport3: undefined,
     
      
      
    };

      // this.InputAccessoryView = this.InputAccessoryView.bind(this);
  }

  componentWillMount(){

    console.log("dropdwon=",this.props.type);
    this.setState({favSport3:this.props.type});
    // console.log("in dropdwon favsport value is=",this.state.favSport3);
    

  }

  // InputAccessoryView() {
  //   return (
  //     <View style={defaultStyles.modalViewMiddle}>
  //       <TouchableWithoutFeedback
  //         onPress={() => {
  //           this.setState(
  //             {
  //               favSport5: this.state.previousFavSport5,
  //             },
  //             () => {
  //               this.inputRefs.favSport5.togglePicker(true);
  //             }
  //           );
  //         }}
  //         hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}>
  //         <View testID="needed_for_touchable">
  //           <Text
  //             style={[
  //               defaultStyles.done,
  //               { fontWeight: 'normal', color: 'red' },
  //             ]}>
  //             Cancel
  //           </Text>
  //         </View>
  //       </TouchableWithoutFeedback>
  //       <Text>Name | Prefer</Text>
  //       <TouchableWithoutFeedback
  //         onPress={() => {
  //           this.inputRefs.favSport5.togglePicker(true);
  //         }}
  //         hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}>
  //         <View testID="needed_for_touchable">
  //           <Text style={defaultStyles.done}>Done</Text>
  //         </View>
  //       </TouchableWithoutFeedback>
  //     </View>
  //   );
  // }

  changeValue = async (val)=>{

    // console.log("dropdwon value is=",val);

    
    await this.setState({favSport3: val});

    var answer=this.state.favSport3;
    // console.log("dropdwon value is=",answer);
     this.props.staff_roll_call(this.state.favSport3);

  }
  

  render() {
    const placeholder = {
      label: 'Roll Type',
      value: null,
      color: '#9EA0A4',
      fontSize:14
    };

    console.log("In dropdwon favsport=",this.state.favSport3)

    return (

     
      //  <ScrollView style={styles.container}>
        <View>

        {/* <Text>custom icon using react-native-shapes</Text> */}
        {/* and useNativeAndroidPickerStyle={false} with underlineColorAndroid */}
        <RNPickerSelect
          value={this.state.favSport3}
          placeholder={placeholder}
          items={sports}
          onValueChange={(value) => {this.changeValue(value) }}
          style={{
              ...pickerSelectStyles,
            iconContainer: {
              top: 20,
              right: 15,
              
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
     paddingVertical: 40,
     paddingHorizontal: 10,
    flex: 1,
    backgroundColor:"red",
   
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
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
