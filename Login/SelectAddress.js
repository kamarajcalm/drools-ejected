import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, Alert, AsyncStorage, TextInput, ScrollView } from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily = settings.fontFamily
const themeColor = settings.themeColor
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import orders from '../data/orders';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import momemt from 'moment';
import { CommonNavigationAction, CommonActions } from '@react-navigation/native'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import MapView,{ Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import mapstyle from '../map.json';
import Geocoder from 'react-native-geocoding';
Geocoder.init("AIzaSyCOSH383cU0Ywb6J1JZA_vlRq6Y6I6DgtE");
export default class SelectAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
        location:null,
        address:""
    };
  }
    getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            console.warn('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});

  
        this.setState({
            location: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }
        })
        Geocoder.from({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }).then(json => {
            
            var addressComponent = json.results[0].address_components[0];
            this.setState({ address: addressComponent.long_name})
        })
            .catch(error => console.warn(error));
    }
    handleCheck =(region)=>{
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            Geocoder.from({
                latitude: region.latitude,
                longitude: region.longitude
            }).then(json => {
               
                var addressComponent = json.results[0].address_components[0];
                console.log(addressComponent)
                this.setState({ address: addressComponent.long_name })
            })
        }, 500);
    }
 componentDidMount(){
     this.getLocation();
 }

  render() {
    return (
      <View style={{flex:1}}>
          <MapView 
                customMapStyle={mapstyle}
                provider={PROVIDER_GOOGLE}
                onRegionChange={(region) => {
              
                    this.handleCheck(region)
                
                   }}
            style={{flex:0.75}}
                initialRegion={this.state?.location}
        
          >
            {this.state.location&&    <MapView.Marker coordinate={this.state.location}>
                    <MaterialCommunityIcons name="map-marker-right" size={20} color="blue" />
                </MapView.Marker>}
          </MapView>
          <View style={{position:"absolute",bottom:height*0.7,alignItems:"center",justifyContent:"center",right:width*0.48}}>
                <FontAwesome5 name="map-marker" size={40} color={primaryColor}/>
          </View>
          <View style={{position:"absolute",right:20,bottom:height*0.3}}>
                <TouchableOpacity 
                  onPress={()=>{this.getLocation()}}
                >
                    <MaterialIcons name="my-location" size={24} color="black" />
                </TouchableOpacity>
          </View>
       
          <View style={{flex:0.25}}>
                <View style={{paddingVertical:10,paddingHorizontal:20,borderBottomWidth:0.5,borderColor:"gray"}}>
                    <Text style={[styles.text,{color:"#000",fontSize:20}]}>Select An Delivery Location</Text>
                </View>
                <View style={{ paddingVertical: 10, paddingHorizontal: 20, borderBottomWidth: 0.5, borderColor: "gray"}} >
                    <View>
                        <Text style={[styles.text]}>YOUR LOCATION</Text>
                    </View>
                     <View>
                          <Text style={[styles.text,{color:"#000",fontSize:22}]}>{this.state.address}</Text>
                     </View>
                </View>
                <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
                    <TouchableOpacity style={{backgroundColor:primaryColor,height:height*0.05,width:width*0.5,alignItems:'center',justifyContent:"center"}}>
                         <Text style={[styles.text,{color:"#fff"}]}>CONFIRM LOCATION</Text>
                    </TouchableOpacity>
                </View>
          </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    text: {
        fontFamily
    }
})