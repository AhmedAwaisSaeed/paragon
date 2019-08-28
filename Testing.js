import React, {Component} from 'react';
import {Platform, StyleSheet, Text,TextInput, View, ImageBackground,Button,Image,SafeAreaView,TouchableHighlight} from 'react-native';
import bgimage from './images/images.jpeg';
import logo from './images/logo.png';
import { Navigation } from "react-native-navigation";
import Swiper from "react-native-web-swiper";
import BannerOne from "./src/components/BannerOne"

export default class Testing extends React.Component {
    render() {
        return (
          <View style={{flex:1}}>
             
              <View style={{flex:0,height:200,width:200}}>
                  <Swiper
                    direction={"row"}
                    loop
                    autoplayTimeout={-2.5}
                    overRangeButtonsOpacity={0.3}
                  >
                      <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"rgba(20,20,200,0.3)"}}>
                          
                          <BannerOne/>
                          
                      </View>
                      <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"rgba(20,200,20,0.3)"}}>
                            <BannerOne/>
                            
                      </View>
                      <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"rgba(200,20,20,0.3)"}}>
                      <BannerOne/>
                      <Text>Third Pic</Text>
                      </View>
                  </Swiper>
              </View>
          </View>
        )
    }
}