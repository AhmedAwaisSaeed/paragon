import React, {Component} from 'react';
import {Platform, StyleSheet,StatusBar, Text,TextInput, View, ImageBackground,Button,ScrollView,TouchableOpacity} from 'react-native';
import MyTopBar from '../components/MyTopBar';
import Toast, {DURATION} from 'react-native-easy-toast';

export default class ForgotPassword extends Component{

  constructor(props) {
    super(props);
    this.state = {
      forgotEmail:'',
      usernameValid:true,
      

    };
  }

  onchangeinput = (value,type) => {

    if(type=="forgotEmail" && value=="")
    {
      this.setState({usernameValid:false,forgotEmail:null});
      this.refs.toast.show('Please Enter Email');
    }
    else
    {
      this.setState({forgotEmail:value,usernameValid:true});
      
    }
    
  
  }

  render() {
  const {usernameValid,forgotEmail}=this.state;
    return (
// Container main 

<View style={styles.container}>

<View style={{marginTop:20,height:50}}><MyTopBar  screenText="ForgotPassword" showLeftIcon= {true} showRightIcon={false} idComponent={this.props.componentId} /></View>
<ScrollView>

      <View style={styles.paragraphContainer}>

        <Text style={{color:"white",fontSize:20, textAlign:"center"}}>Kindly Enter your Email We Will Send you a Code on your given Email Address</Text>
  
      </View>

      <View style={styles.EmailContainer}>

      <TextInput
        style={[usernameValid ? styles.emailText : styles.error]}
        onChangeText={(text)=>this.onchangeinput(text,'forgotEmail')}
        value={forgotEmail}
        placeholder="  Email"
        placeholderTextColor="#C9C9C9"
      />

      </View>


      <View style={styles.butonContainer}>

      <TouchableOpacity onPress={()=>this.goToScreen('Login')}>
      
      <View style={styles.buttons}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Send</Text>
          </View>
          
      </View>
        </TouchableOpacity>

    </View>

     



</ScrollView>
<Toast  position='top' ref="toast"/>
 </View>
 


    
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
        justifyContent: 'center',
        // alignContent:"center",
    backgroundColor: '#2D4273'
  },
  paragraphContainer:{

   flex:1,
   flexDirection:"column",
    width:300,
    height:100,
    // backgroundColor:'pink',
    justifyContent:"center",
    alignSelf:"center",
     marginTop:100
    
    
  },
  EmailContainer:{

    padding:18,
    alignItems:"center",
    marginTop:20

  },
  emailText:{
    borderWidth: 2, borderRadius: 10 ,height:53, width:306, borderColor: 'grey',backgroundColor:'#ffffff', borderWidth: 1
  },
  error:{
    borderWidth: 2, borderRadius: 10 ,height:53, width:306, borderColor: 'red',backgroundColor:'#ffffff', borderWidth: 1

  },

  butonContainer:{


    // flex:1,
    alignItems:"center",
    // justifyContent:"center",
  
    
    // backgroundColor:"red",
    
    
  
  
  
   },
  
   buttons:{
  
      
    // height:80,
     padding:15,
    // marginLeft:20,
    backgroundColor: '#2D4273',
    
  
  },
  
  button: {
    // marginBottom: 30,
     width: 302,
     height:48,
    alignItems: 'center',
    backgroundColor: '#69C9DE',
    borderRadius: 10,
    borderWidth: 1,
    borderColor:"#69C9DE"   
    
  },
  buttonText: {
    padding: 10,
    color: 'white',
    fontSize:15
    
  }
  



});
