import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  View,
  Image,
  ImageBackground,
  Button,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  SafeAreaView
} from "react-native";

import CardView from "react-native-cardview";


export default class ReportsCardList extends Component {
  constructor(props) {
    super(props);
    
    this.state={

  
    }
  }




  
  render() {
    return (
      <View style={styles.container}>
        
        <CardView style={styles.MainCardView}
          cardElevation={8}
          cardMaxElevation={8}
          cornerRadius={5}
          >

            <View style={styles.HeaderContainer}>
              <View style={{paddingBottom:10}}><Text style={styles.HeaderTitle}>{this.props.short_name}</Text></View>
              <View style={styles.topBarLine}></View>
              
              </View>
              

            
              <CardView style={styles.bodyCardContainer}
                    cardElevation={4}
                    cardMaxElevation={4}
                    cornerRadius={5}
                     >


                        <View style={{flexDirection:"row",flex:1}}>

                         <View style={{flex:1,alignItems:"center",paddingTop:20}}>
                             <Image style={{height:75}} source={require('../../assets/EmployeeSide/LeftDots.png')}></Image>
                         </View>


                         <View style={{flex:4,backgroundColor:"white",alignItems:"center"}}>

                         <View style={styles.bodyContentCotainerone}>
                         <View style={{flex:1}}><Text style={{color:"#979CAC"}}>From</Text></View>
                         <View style={styles.dateandlocationContainer}>
                         <View ><Text style={styles.dateandlocationText}>{this.props.check_in_time}</Text></View>
                         <View style={{marginTop:5}}><Text style={styles.dateandlocationText}>{this.props.address1}</Text></View>
                         
                         </View>
                        
                         </View>

                         <View style={styles.contentSeparator}></View>

                      


                         <View style={styles.bodyContentCotainerTwo}>
                         <View style={{flex:1}}><Text style={{color:"#979CAC"}}>To</Text></View>
                         <View style={styles.dateandlocationContainer}>
                         <View><Text style={styles.dateandlocationText}>{this.props.check_out_time}</Text></View>
                         <View style={{marginTop:5}}><Text style={styles.dateandlocationText}>{this.props.address2}</Text></View>
                         </View>
                         </View>
                         </View>

                         </View>


            </CardView>
            
{ 
  this.props.hidewagesandhours != true &&
            <CardView style={styles.footerCardContainer}
                    cardElevation={4}
                    cardMaxElevation={4}
                    cornerRadius={5}
                     >

                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <View>
                         <View><Text style={{fontSize:28,color:"#454C5F",textAlign:"center"}}>${this.props.wages}</Text></View>
                         <View><Text style={{fontSize:14,color:"#8F96AB",textAlign:"center"}}>Wages</Text></View>
                         </View>
                         <View>
                         <View><Text style={{fontSize:28,color:"#454C5F",textAlign:"center"}}>{this.props.hours}</Text></View>
                         <View><Text style={{fontSize:14,color:"#8F96AB"}}>Hours</Text></View>
                         </View>
                         </View>


            </CardView>
}


        </CardView>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
    // justifyContent: 'center',
    // alignContent:"center",
    backgroundColor: "#FEFEFE",
    padding:10
  },

  MainCardView:{
        //   flex:1,
        //  height:358,

    backgroundColor:"white"

  },
  HeaderContainer:{

      flex:1,
      paddingTop:20,
    //   paddingBottom:20,
    //  backgroundColor:"red",
     marginLeft:10,
     marginRight:10



  },
  HeaderTitle:{

    fontSize:17,
    color:"#646979",
    textAlign:"center"

  },
  topBarLine:{

    borderWidth:1,
    borderColor:"#2D4273",
    marginTop:10

  },

  dateandlocationText:{

    fontSize:12,
    color:"#474E61"

  },
  bodyCardContainer:{

    flex:4,
    backgroundColor:"white",
    justifyContent:"center",
    alignItems:"center",
    marginTop:20,
    marginLeft:10,
    marginRight:10,
    marginBottom:10

  },
  bodyContentCotainerone:{
flex:1,
    flexDirection:"row",
    // borderBottomWidth:0.4,
    // borderBottomColor:"black",
    padding:10,
    
    //  backgroundColor:"pink"

  },

  bodyContentCotainerTwo:{

    flexDirection:"row",
    padding:10,
  //  backgroundColor:"orange"

  },
  dateandlocationContainer:{
      flex:2
    //   flexDirection:"row"
    // marginLeft:18

  },
  contentSeparator:{
      flex:1,
    //  margin:10,
    // borderTopColor:"black",
    borderBottomColor: 'black',
    borderBottomWidth: 0.4,
    // marginTop:10,
     alignSelf:"stretch",
     backgroundColor:"red",
    // flexDirection:"column",
    // width:"85%",
    // marginRight:20
     marginLeft:10,
     marginRight:10,
    
    
  },

  footerCardContainer:{

    flex:1,
  paddingLeft:30,
  paddingRight:30,
  paddingTop:10,
  paddingBottom:20,
  justifyContent:"center",
  // alignItems:"center",
//   height:20,
  marginTop:20,
  marginLeft:10,
  marginRight:10,
  marginBottom:25,
  backgroundColor:"white"
    
    // padding:20

  },
});
