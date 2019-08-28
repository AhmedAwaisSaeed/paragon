/**
 * RadioButtons
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";





export default class RadioButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      checked:this.props.Status,
      
    };
  }
  
sendcheckedValue =() => {

  // console.log("sending value is=",this.state.checked);
  this.props.radioButtonStatus(this.state.checked);

}
  render() {
    const { options } = this.props;
    // const { value,checked } = this.state;
    console.log("cheked value is=",this.props.Status);

    return (
      <View>
        {options.map(item => {
          
            <View>
            <View key={item.key} style={styles.buttonContainer}>
              <TouchableOpacity style={{width:100}}
                style={styles.circle}
                onPress={() => {
                  
                  this.setState({
                    value: item.key,
                    checked:!this.state.checked
                  });
                  this.sendcheckedValue();
                  
                }}
              >
                 {this.state.checked == true && <View style={styles.checkedCircle} />  } 
                 {this.state.checked == false && <View style={styles.Circle} />} 
                
              </TouchableOpacity>
              <Text style={{marginLeft:5,color:"black"}}>{item.text}</Text>
            </View>
            </View>
          
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    color:"red"
    // marginBottom: 30
  },
  circle: {
    
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ACACAC",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"white"
  },
  checkedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4E80F7"
  },
  
});
