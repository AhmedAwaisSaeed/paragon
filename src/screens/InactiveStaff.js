import React, {Component} from 'react';
import {Platform, FlatList, StyleSheet,SafeAreaView, StatusBar, Text,TextInput, View,Image, ImageBackground,Button,ScrollView,TouchableOpacity} from 'react-native';

import CardView from "react-native-cardview";
import MyList from "../components/MyList"
import ActiveEmployeeList from "../components/ActiveEmployeeList";
import InactiveStaffList from "../components/InactiveStaffList";
import MyTopBarTwo from "../components/MyTopBarTwo";
import { Navigation } from "react-native-navigation";


export default class InactiveStaff extends Component{

  constructor(props) {
    super(props);

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

  move_to_add_staff_screen=()=>{

    this.goToNextScreen("AddStaff","");

  }
 

  render() {
  
    return (

<View style={styles.container}>
<SafeAreaView style={{flex: 1}}>


<View style={{height:50}}>

<MyTopBarTwo  screenText="Inactive Staff" showLeftIcon= {true} showRightIcon={false} idComponent={this.props.componentId} />

</View>
<View style={styles.topBarLine} />
{/* End Top Bar */}
<ScrollView style={{flex:1}} keyboardShouldPersistTaps={"handled"}>
{console.log("Response in Inactive Staff= ",this.props.response)}
<FlatList data={this.props.response}
             renderItem={({item}) => 

             <TouchableOpacity  onPress={()=>this.goToNextScreen("StaffDetails",item._id)}>
            <View>
          <InactiveStaffList name={item.full_name} roll={item.roll_type} ></InactiveStaffList>
          </View>
            </TouchableOpacity>
            }
     
      keyExtractor= {item=>item._id}
      >
</FlatList>




{/* 
<View>
<InactiveStaffList name="Haseeb Aslam" roll="Developer"></InactiveStaffList>
</View>
<View>
<InactiveStaffList name="Sumaiya Yaseen" roll="Developer"></InactiveStaffList>
</View>
<View>
<InactiveStaffList name="M Mohsin" roll="Developer"></InactiveStaffList>
</View>
<View>
<InactiveStaffList name="Ahmed Awais" roll="Developer"></InactiveStaffList>
</View> */}





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
    // marginTop:20

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
    marginTop:5

  },

  ActiveHeadingConainer:{

    marginTop:20,
    // marginLeft:20,
    marginBottom:10,
    flex:1,
    marginLeft:20,
    marginRight:20,
    
    // marginLeft:20,
    flexDirection:"row",
    justifyContent:"space-between"
    

  },
  ActiveHeadingText:{
    fontWeight:"bold",
    fontSize:18,
    color:"#2D4273"

  },
InActivelargeText:{
      fontSize:18,
      
  },
  addProjectContainer:{
    // flex:1,
    flexDirection:"row-reverse",
    marginBottom: 3,
    
  },
  InActiveHeadingConainer:{

    flex:1,
    marginTop:20,
    // marginLeft:20,
    flexDirection:"row",
    justifyContent:"space-between",
    marginLeft:20,
    marginRight:20,
    marginBottom:10,
    

  },
  InActiveEmpListContainer:{

    flex:1,
    marginBottom:20,
    height:100,
 
    
  },
  



});
