import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, Alert, AsyncStorage, TextInput, ScrollView, ActivityIndicator } from 'react-native';
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
        address:"",
        latitude:null,
        longitude:null
    };
  }
    getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            console.warn('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
      
       let  address = await   Location.reverseGeocodeAsync({
           latitude: location.coords.latitude,
           longitude: location.coords.longitude,
       })
        this.setState({ address: address[0].name})
     
        this.setState({
            location: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0001,
                longitudeDelta: 0.0001
            },
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        })
 
    }
    handleCheck =(region)=>{
        clearTimeout(this.timer);
        this.timer = setTimeout( async() => {
            this.setState({fetching:true})
          
            let address = await Location.reverseGeocodeAsync({
                latitude: region.latitude,
                longitude:region.longitude,
            })
            console.log(address)
            this.setState({ address: address[0]?.name, fetching: false, location:{
                latitude: region.latitude,
                longitude: region.longitude,
            } })
        }, 500);
    }
 componentDidMount(){
     this.getLocation();
 }

  render() {
      let marker = <View style={{ position: "absolute", bottom: height * 0.7, alignItems: "center", justifyContent: "center", right: width * 0.48 }}>
          <Marker 
          style={{height:48,width:48,position:"absolute"}}
           coordinate={this.state?.location}
        
          >
              <FontAwesome5 name="map-marker" size={40} color={primaryColor} />
          </Marker>
       
      </View>
    return (
      <View style={{flex:1}}>
          <MapView 
                customMapStyle={mapstyle}
                provider={PROVIDER_GOOGLE}
                style={{flex:0.75}}
                initialRegion={this.state?.location}
                showsMyLocationButton={true}
                showsPointsOfInterest={true}
                showsUserLocation={true}
                followsUserLocation={true}
          >
            
          </MapView>
            <View style={{
                left: '50%',
              
                position: 'absolute',
                top: '30%'
                }}
            >
                <FontAwesome5 name="map-marker" size={40} color={primaryColor} />
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
                         {
                            this.state.fetching ? <ActivityIndicator color={primaryColor} size={"large"}/> : <Text style={[styles.text, { color: "#000", fontSize: 22 }]}>{this.state.address}</Text>
                         }
                          
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