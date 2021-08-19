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
import GetLocation from 'react-native-get-location';
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
           Location.installWebGeolocationPolyfill();
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            console.warn('Permission to access location was denied');
            return;
        }
    //     let location = await Location.getCurrentPositionAsync({});
      
    //    let  address = await   Location.reverseGeocodeAsync({
    //        latitude: location.coords.latitude,
    //        longitude: location.coords.longitude,
    //    })
    //     this.setState({ address: address[0].name})
     
    //     this.setState({
    //         location: {
    //             latitude: location.coords.latitude,
    //             longitude: location.coords.longitude,
    //             latitudeDelta: 0.0001,
    //             longitudeDelta: 0.0001
    //         },
    //         latitude: location.coords.latitude,
    //         longitude: location.coords.longitude,
    //     })
                 GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
})
.then(async(location) => {
    console.log(location,"kkkkkk");
        let  address = await   Location.reverseGeocodeAsync({
           latitude: location.latitude,
           longitude: location.longitude,
           latitudeDelta:0
       })
     this.setState({ address: address[0].name})
      this.setState({ location: {
        latitude: location.latitude,
        longitude: location.longitude, 
        latitudeDelta: 0.001, 
        longitudeDelta: 0.001
    },
        latitude: location.latitude,
        longitude: location.longitude, 
    })
})
 
    }
    handleChange = async(region)=>{

        
            this.setState({fetching:true})
          
            let address = await Location.reverseGeocodeAsync({
                latitude: region.latitude,
                longitude:region.longitude,
            })
            console.log(address)
            this.setState({ 
                address: address[0]?.name, 
                fetching: false, 
                location:{
                    latitude: region.latitude,
                    longitude: region.longitude,
              } ,
               latitude: region.latitude,
                longitude: region.longitude,
        })

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
      if(this.state.location==null){
          return (
              <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"#fff"}}>
                    <ActivityIndicator color={primaryColor} size={"large"}/>
              </View>
          )
      }
    return (
      <View style={{flex:1}}>
          <MapView 
                customMapStyle={mapstyle}
                provider={PROVIDER_GOOGLE}
                style={{flex:0.7}}
                initialRegion={this.state?.location}
                showsMyLocationButton={true}
                showsPointsOfInterest={true}
                showsUserLocation={true}
                followsUserLocation={true}
                onRegionChangeComplete={this.handleChange}
          >
            
          </MapView>
            
          <View style={{flex:0.3}}>
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
                    <TouchableOpacity style={{backgroundColor:primaryColor,height:height*0.05,width:width*0.5,alignItems:'center',justifyContent:"center"}}
                        onPress={() => {
                            const address = {
                                address: this.state.address,
                                latitude: this.state.latitude,
                                longitude: this.state.longitude
                            }
                            this.props.route.params.backFunction(address)
                            this.props.navigation.goBack()
                        }}
                    >
                         <Text style={[styles.text,{color:"#fff"}]}>CONFIRM LOCATION</Text>
                    </TouchableOpacity>
                </View>
          </View>

                                              {/* ABSOLUTE POSITIONSS */}
            <View style={{
                left: '50%',

                position: 'absolute',
                top: '30%'
            }}
            >
                <FontAwesome5 name="map-marker" size={40} color={primaryColor} />
            </View>
            <View style={{ position: "absolute", right: 20, bottom: height * 0.3 }}>
                <TouchableOpacity
                    style={[styles.roundWithShadow]}
                    onPress={() => { this.getLocation() }}
                >
                    <MaterialIcons name="my-location" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={{ position: "absolute", left: 20, top: 30 }}>
                <TouchableOpacity
                    style={[styles.roundWithShadow]}
                    onPress={() => { 
                        const address = {
                            address:this.state.address,
                            latitude:this.state.latitude,
                            longitude:this.state.longitude
                        }
                        this.props.route.params.backFunction(address)
                        this.props.navigation.goBack() 
                    }}
                >
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>

            </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    text: {
        fontFamily
    },
    roundWithShadow:{
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.1,
        shadowRadius:2,
        height: 30, width: 30, borderRadius: 15, backgroundColor: "#fff", elevation: 5, alignItems: "center", justifyContent: "center"
    }
})