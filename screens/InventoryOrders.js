import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, TextInput } from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily = settings.fontFamily
const themeColor = settings.themeColor
const url =settings.url
import { StatusBar, } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import orders from '../data/orders'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import HttpsClient from '../HttpsClient';
import moment from 'moment';
const screenHeight = Dimensions.get("screen").height
export default class InventoryOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders:[]
    };
  }
  getOrders = async () => {
    let api = `${url}/api/drools/orders/`
    const data = await HttpsClient.get(api)
    console.log(api)
    if (data.type == "success") {
      this.setState({ orders: data.data })
    }
  }
  componentDidMount() {
    this.getOrders()
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getOrders()

    });
  }
  componentWillUnmount() {
    this._unsubscribe()
  }
  header =()=>{
    return(
      <View style={{flexDirection:"row",marginTop:10}}>
         <View style={{flex:0.1,alignItems:"center",justifyContent:"center"}}>
            <Text style={[styles.text]}>#</Text>
         </View>
        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
          <Text style={[styles.text]}>Created-Date</Text>
        </View>
        <View style={{flex: 0.2,alignItems: "center", justifyContent: "center"}}>
          <Text style={[styles.text]}> Arr-Date</Text>
         </View>
        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center"}}>
          <Text style={[styles.text]}>Amount</Text>
         </View>
        <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center"}}>
          <Text style={[styles.text]}>Status</Text>
        </View>
       
      </View>
    )
  }
  render() {
    return (
      <View style={{flex:1}}>
          <FlatList 
            ListHeaderComponent ={this.header()}
            data={this.state.orders}
            keyExtractor ={(item,index)=>index.toString()}
            renderItem ={({item,index})=>{
               return(
                 <TouchableOpacity style={{ flexDirection: "row", marginTop: 10,paddingVertical:10,backgroundColor:"#eee"}}
                   onPress={() => { this.props.navigation.navigate('ViewInventoryOrders',{item})}}
                 >
                   <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                     <Text style={[styles.text]}>{index+1}</Text>
                   </View>
                   <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                     <Text style={[styles.text]}>{moment(item.created).format("YYYY-MM-DD")}</Text>
                   </View>
                   <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                     <Text style={[styles.text]}>{item.arriving_date}</Text>
                   </View>
                   <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                     <Text style={[styles.text]}>{item.amount}</Text>
                   </View>
                   <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                     <Text style={[styles.text]}>{item.order_status}</Text>
                   </View>
                
                 </TouchableOpacity>
               )
            }}
          />

        <View style={{
          position: "absolute",
          bottom: 50,
          left: 20,
          right: 20,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20
        }}>
          <TouchableOpacity
            onPress={() => { this.props.navigation.navigate("CreateOrders",)}}
          >
            <AntDesign name="pluscircle" size={40} color={primaryColor} />
          </TouchableOpacity>
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