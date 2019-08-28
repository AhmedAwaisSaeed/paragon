import React, {Component} from 'react';
import {Platform, FlatList,Alert,AsyncStorage,SafeAreaView, StyleSheet,StatusBar, Text,TextInput, View,Image, ImageBackground,Button,ScrollView,TouchableOpacity} from 'react-native';

import CardView from "react-native-cardview";
import MyList from "../components/MyList";
import {base_url} from "../components/AllVariables";
import { Navigation } from "react-native-navigation";

export default class Projects extends Component{

  constructor(props) {
    super(props);
    // this.bottomTabEventListener = Navigation.events().registerBottomTabSelectedListener(async ({ selectedTabIndex, unselectedTabIndex }) => {


    //   console.log("bottom tab listener projects....",unselectedTabIndex,selectedTabIndex);

    //   const user_type=await AsyncStorage.getItem("user_type"); 

    //   if(user_type=="manager")
    //   {
    //     this.tab_pressed(unselectedTabIndex,selectedTabIndex);

    //   }

      
      
    
    // });

    Navigation.events().bindComponent(this);
    this.state={
      ActiveProjects:[],
      InActiveProjects:[],
      unselectedbottomtabindex:undefined,
      selectebottomtabindex:undefined,
      
    }

  }

  async _getToken(key) {
    return await AsyncStorage.getItem(key, (err, result) => {
        return result;
    });
}

componentWillMount(){



    // Navigation.mergeOptions('ProjectsScreenId', {
    //   bottomTabs: {
    //     currentTabIndex: 1
    //   }
    // });

    // const token  = this.props.response.token;
    // console.log('params', token);

  

  fetch(base_url+'project/get_project_list', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
      'x-sh-auth': this._getToken("token")
  },
}).then((response) => response.json())
    .then((responseJson) => {
     
      //  console.log("response in Projects responseJson");
      if(responseJson.code==200)
       {
        console.log("Successfully In Projects List");
          // this.goToNexctScreen(screenName,responseJson);
          this.setState({ActiveProjects:responseJson.active_projects_detail,InActiveProjects:responseJson.inactive_projects_detail});
        
               console.log("response in projects=",responseJson);
              
         return;
       }
       else
       {
        Alert.alert("Error",responseJson.message);
         console.log("Error",responseJson);
         return;

       }
      
    })
    .catch((error) => {
      // console.log("error is",error);

      //  Alert.alert("error");
       console.error(error);
    });

  }

  // tab_pressed=async (unselectedTabIndex,selectedTabIndex)=>{

  //   this.setState({unselectedbottomtabindex:unselectedTabIndex,selectebottomtabindex:selectedTabIndex});
  //   console.log("tab Pressed",this.state.unselectedbottomtabindex,this.state.selectebottomtabindex);

  //   const user_access=await AsyncStorage.getItem("user_access"); 
  //   const item = JSON.parse(user_access);

  //   if(item.staff==false && selectedTabIndex==1)
  //   {
  //     Alert.alert("Sorry you dont have access to the staff screen");

  //   }
  //   else if(item.reports==false && selectedTabIndex==2)
  //   {
  //     Alert.alert("Sorry you dont have access to the reports screen.");
  //     this.hidethisScreen(unselectedTabIndex);

  //   }
  //   else if (item.projects==false && selectedTabIndex==0)
  //   {
  //     Alert.alert("Sorry you dont have access to the projects screen");

  //   }
    



  // }

  // hidethisScreen = () =>{

  //   console.log("hide this screen");
  //     Navigation.mergeOptions('BottomTabsId', {
  //       bottomTabs: {
  //         currentTabIndex: this.state.unselectedbottomtabindex
  //       }
  //     });
      
  
  // }

  goToNexctScreen = (screenName,data) =>{
console.log("in bottom tabs push");
    Navigation.push(this.props.componentId, {
    component: {
      name: screenName,
      passProps: {
        response:data 
      },
      options: {
       
        bottomTabs: {
          visible: false, drawBehind: true, animate: true
          }
      }
    }
  });
}
  

  show_project_details = (screenName,id) =>{

    
    this.goToNexctScreen(screenName,id);


  }

  move_to_add_project_screen=()=>{
    
  console.log("move to next");
    this.goToNexctScreen("AddProject","");

  }

 

  render() {

    console.log("Active Projects List",this.state.ActiveProjects);
  
    return (

<View style={styles.container}>
{/* <View>
  <StatusBar backgroundColor="white"  barStyle="dark-content"/>
  </View> */}
<SafeAreaView style={{flex: 1}}>


<View style={styles.TopBarContainer}>
<View><Text style={styles.topBarText}>Projects</Text></View>
<View style={styles.topBarLine}></View>
</View>
{/* End Top Bar */}
<ScrollView style={{flex:1}} keyboardShouldPersistTaps={"handled"} automaticallyAdjustContentInsets={false}>

<View style={styles.ActiveHeadingConainer}>

    <Text style={styles.ActiveHeadingText}>Active Projects</Text>
</View>
{/* End Heading */}



<View style={{paddingBottom:20,marginTop:10}}>
<FlatList data={this.state.ActiveProjects}
             renderItem={({item}) => 

             <TouchableOpacity style={{paddingBottom:10,paddingTop:10}}  onPress={()=>this.show_project_details("ProjectDetails",item._id)}>
             {/* <View> */}
               
               <MyList 
               smallString={item.short_name}
                largeString={item.address}

                ></MyList>
               {/* </View> */}
               </TouchableOpacity>
            }
     
      keyExtractor= {item=>item._id}
      >
</FlatList>
</View>

 
    
<View style={styles.InActiveHeadingConainer}>

    <Text style={styles.ActiveHeadingText}>Inactive Projects</Text>
</View>

<View style={{marginTop:10}}>
<FlatList data={this.state.InActiveProjects}
             renderItem={({item}) => 

             <TouchableOpacity style={{paddingBottom:10,paddingTop:10}}  onPress={()=>this.show_project_details("ProjectDetails",item._id)}>
             {/* <View> */}
               
               <MyList smallString={item.short_name} largeString={item.address} ></MyList>
               {/* </View> */}
               </TouchableOpacity>
            }
     
      keyExtractor= {item=>item._id}
      >
</FlatList>
</View>
{/* End Heading */}



{ 
  // this.state.InActiveProjects.map((project) => {
  //     return(
  //   <View>
  //     <MyList smallString={project.short_name} largeString={project.address} ></MyList>
  //   </View>
  //     )
  
  //   })
}
<View style={{marginBottom:5}}></View>

</ScrollView>
<View style={styles.addProjectContainer}>
<TouchableOpacity onPress={()=>{
  this.move_to_add_project_screen()
}}>
<Image
          source={require('../assets/add_project.png')}
        />

</TouchableOpacity>
</View>
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
    borderColor:"#AAB0BC",
    marginTop:10

  },

  ActiveHeadingConainer:{

    marginTop:10,
    marginLeft:20
    

  },
  ActiveHeadingText:{
    fontWeight:"bold",
    fontSize:18,
    color:"#2D4273"

  },
  smallText:{

    fontSize:12,

  },
  largeText:{
      fontSize:16,
      fontWeight:"bold"
  },
  addProjectContainer:{
    //  flex:1,
    // flexDirection:"row-reverse",
    // marginBottom: 3,
    width: 60,  
    height: 60,   
    borderRadius: 30,            
    // backgroundColor: '#ee6e73',                                    
    position: 'absolute',                                          
    bottom: 20,                                                    
      right: 10,
      marginRight:20
      

  },
  InActiveHeadingConainer:{

    // marginTop:15,
    marginLeft:20,
    // backgroundColor:"grey"
    

  },

 
  



});
