import React, {Component} from 'react';
import {Platform, StyleSheet, Text,TextInput, View,ImageBackground,Button,Image,SafeAreaView,TouchableHighlight} from 'react-native';
import MapView from 'react-native-maps';
import { Navigation } from "react-native-navigation";

var markers = 
    [{
      latitude: 30.672080,
      longitude: 73.110884 ,
      title: 'Sahiwal',
      subtitle: 'Amazing City'
    }]
  
export default class MapsTesting extends React.Component {
    render() {
        return (
            <View style={styles.container}>
            <MapView
            //   30.672080, 73.110884 sahiwal
            // 30.812728, 73.454265 okara
              style={styles.map}
              region={{
                latitude: 30.672080,
                longitude: 73.110884 ,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            >
            <MapView.Marker
            pinColor="#2D4273"
            coordinate={{latitude:  markers[0].latitude,
            longitude: markers[0].longitude }}
            title={markers[0].title}
            description={markers[0].subtitle}
         />
                
            </MapView>
          </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });