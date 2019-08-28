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
import Moment from 'moment';
// import { Ionicons } from 'react-native-vector-icon';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

// import RNPickerSelect, { defaultStyles } from './debug';

const sports = [
  {
    label: 'Last 7 days',
    value: 'last week',
  },
  {
    label: 'Today',
    value: 'today',
  },
  {
    label: 'Yesterday',
    value: 'yesterday',
  },
  {
    label: 'Current month',
    value: 'current month',
  },
  {
    label: 'Last 30 Days',
    value: 'last 30 days',
  },
  {
    label: 'Select custom Range',
    value: 'from calender',
  },
];

export default class RangeDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
      
      favSport3: undefined,
      
    };

      // this.InputAccessoryView = this.InputAccessoryView.bind(this);
  }

 

  changeValue =  async (val,index)=>{


    if(val=="last week")
    {

        console.log("dropdwon value is=",val);
        var date=new Date();
        var day=date.getDay();//Current Day
        var hours = date.getHours(); //Current Hours
        var min = date.getMinutes(); //Current Minutes
        var sec = date.getSeconds(); //Current Seconds

        // console.log("current day is=",date);
        
        var end=Moment(date).format('YYYY-MM-DD');

        console.log("last day is=",end);


        var days=7; // Days you want to subtract
        var date = new Date();
        var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
        var day =last.getDate();
        var month=last.getMonth()+1;
        var year=last.getFullYear();
       
        var start=Moment(last).format('YYYY-MM-DD');
        console.log("Starting day is=",start);

        await this.props.startDate(start);
        await this.props.endDate(end);
        this.props.hitApiCall();

    

    }
    else if(val=="today"){


        // console.log("dropdwon Today value is=",val);
        var date=new Date();
        var day=date.getDay();//Current Day
        var hours = date.getHours(); //Current Hours
        var min = date.getMinutes(); //Current Minutes
        var sec = date.getSeconds(); //Current Seconds

        // console.log("current day is=",date);
        
        var end=Moment(date).format('YYYY-MM-DD');

        console.log("dropdown Today value is=",end); 


        await this.props.startDate(end);
        await this.props.endDate(end);
        this.props.hitApiCall();
       
        // var start=Moment(last).format('YYYY-MM-DD');
        // console.log("last day today value is=",start);



    }
    else if(val=="yesterday")
    {


          // console.log("dropdwon Today value is=",val);
          var date=new Date();
        
          date.setDate(date.getDate() - 1);
          // console.log("current day is=",date);
          
          var end=Moment(date).format('YYYY-MM-DD');
  
          console.log("dropdown yesterday value is=",end); 

          await this.props.startDate(end);
          await this.props.endDate(end);
          this.props.hitApiCall();
         
          // var start=Moment(last).format('YYYY-MM-DD');
          // console.log("last day today value is=",start);



    }
    else if(val=="current month")
    {

        var date=new Date();
        
    
        // console.log("current day is=",date);
        
        var end=Moment(date).format('YYYY-MM-DD');
        var month=date.getMonth()+1;
        var year=date.getFullYear();
       
        console.log("dropdown current month end value is=",end); 
        // console.log("dropdown current month is=",month); 
        // console.log("dropdown current year is=",year); 

        var start=year+"-"+"0"+month+"-"+"01";
        console.log("Start Date in current month is=",start);


        await this.props.startDate(start);
        await this.props.endDate(end);
        this.props.hitApiCall();


    }
    else if(val=="last 30 days"){


        var date=new Date();
        
    
        // console.log("current day is=",date);
        
        var end=Moment(date).format('YYYY-MM-DD');


        var days=30; // Days you want to subtract
        var date = new Date();
        var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));

       
        var start=Moment(last).format('YYYY-MM-DD');


        console.log("last30 Start date is=",start);
        console.log("last30 End date is=",end);
    
        await this.props.startDate(start);
        await this.props.endDate(end);
        this.props.hitApiCall();





    }
    else if(val="from calender"){

      

      this.props.showCalenderCall();

    }

    // console.log("dropdwon value is=",val);

    
    // await this.setState({favSport3: val});

    // var answer=this.state.favSport3;
    
    // this.props.functioncall(this.state.favSport3);

  }

  render() {
    const placeholder = {
      // label: 'Select Range',
      // value: null,
      // color: '#9EA0A4',
      // fontSize:10
    };

    return (
      //  <ScrollView style={styles.container}>
        <View style={{backgroundColor:"#f5f5f5"}}>

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
