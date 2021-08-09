import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, Alert} from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily =settings.fontFamily
const themeColor = settings.themeColor
const url = settings.url
import { StatusBar ,} from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import cookOrders from '../data/cookOrders';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5, Foundation } from '@expo/vector-icons';
import { set } from 'react-native-reanimated';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import Modal from 'react-native-modal';
import HttpsClient from '../HttpsClient';
import * as Notifications from 'expo-notifications';

export default class AfterNoon extends Component {
        constructor(props) {
        super(props);
        this.state = {
             cookOrders:[],
             Modal:false,
             selectedItem:null,
             refreshing:false
        };
    }
  render() {
    return (
         <View style={{flex:1,backgroundColor:"#000"}}>
                 <FlatList 
                  data ={this.props.orders}
                  keyExtractor={(item,index)=>index.toString()}
                  renderItem ={({item,index})=>{
                    return(
                        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",paddingVertical:20,paddingVertical:20,borderColor:"gray",borderBottomWidth:0.5}}>
                              <View style={{flex:0.2,alignItems:"center",justifyContent:"center"}}>
                                    <View>
                                        <Text style={[styles.text,{color:"#fff",fontSize:22}]}>{index+1} .</Text>
                                    </View>
                              </View>
                            <View style={{flex:0.8,flexDirection:"row"}}>
                                        <View>
                                  <Text style={[styles.text,{color:"#fff",fontSize:22}]}>{item.title}</Text>
                            </View>   
                            <View style={{marginLeft:10}}>
                                  <Text style={[styles.text,{color:"#fff",fontSize:22}]}>X</Text>
                            </View>
                            <View style={{marginLeft:10}}>
                              <Text style={[styles.text,{color:"#fff",fontSize:22}]}>{item.quantity}</Text>
                            </View>
                              </View>
                      
                        </View>
                    )  
                    
                  }}
       />
      </View>
    )
  }
}

const styles = StyleSheet.create({
     text:{
       fontFamily
   }
})



