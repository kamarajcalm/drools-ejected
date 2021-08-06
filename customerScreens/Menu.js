import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Alert, StyleSheet, FlatList, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily = settings.fontFamily
const themeColor = settings.themeColor
const url = settings.url
import { StatusBar, } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import orders from '../data/orders'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import HttpsClient from '../HttpsClient';
const screenHeight = Dimensions.get("screen").height;
const data = [
  {
    day: "Mon",
    Morning: "combo1",
    afterNoon: "combo2",
    Night: "Combo3"
  },
  {
    day: "Tue",
    Morning: "combo1",
    afterNoon: "combo2",
    Night: "Combo3"
  },
  {
    day: "Wed",
    Morning: "combo1",
    afterNoon: "combo2",
    Night: "Combo3"
  },
  {
    day: "Thu",
    Morning: "combo1",
    afterNoon: "combo2",
    Night: "Combo3"
  },
  {
    day: "Fri",
    Morning: "combo1",
    afterNoon: "combo2",
    Night: "Combo3"
  },
  {
    day: "Sat",
    Morning: "combo1",
    afterNoon: "combo2",
    Night: "Combo3"
  },
  {
    day: "Sun",
    Morning: "combo1",
    afterNoon: "combo2",
    Night: "Combo3"
  },
]
class Menu extends Component {
  constructor(props) {

    super(props);
    this.state = {
      menus: [],
   
    };
  }
  getMenu = async () => {
   
  }
  componentDidMount() {
    this.getMenu()
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getMenu()
    });
  }
  componentWillUnmount() {
    this._unsubscribe()
  }
  showSimpleMessage(content, color, type = "info", props = {}) {
    const message = {
      message: content,
      backgroundColor: color,
      icon: { icon: "auto", position: "left" },
      type,
      ...props,
    };

    showMessage(message);
  }


  header =()=>{
    return(
      <View style={{ flexDirection: "row", backgroundColor:"#DFDFE1",height:height*0.08}}>
            <View style={{flex:0.2,alignItems:"center",justifyContent:"center"}}>
                <Text style={[styles.text,{color:primaryColor,fontSize:22}]}>Day</Text>
            </View>
            <View style={{flex:0.266,alignItems:"center",justifyContent:"center"}}>
               <Text style={[styles.text, { color: primaryColor,fontSize:20 }]}>Morning</Text>
            </View>
            <View style={{flex:0.266,alignItems:"center",justifyContent:"center"}}>
              <Text style={[styles.text, { color: primaryColor ,fontSize:20}]}>AfterNoon</Text>
            </View>
            <View style={{flex:0.266,alignItems:"center",justifyContent:"center"}}>
              <Text style={[styles.text, { color:primaryColor ,fontSize:20}]}>Night</Text>
            </View>
      </View>
    )
  }
  seperator =()=>{
    return(
      <View style={{height:1,backgroundColor:"gray"}}>
         
      </View>
    )

  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar style={"light"} />
        {/* Headers */}
        <LinearGradient
          style={{ height: height * 0.12, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
          colors={gradients}
        >
          <View style={{ marginTop: Constants.statusBarHeight, flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
           
            >
       
            </View>
            <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
              <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Standard Plan</Text>

            </View>
            <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

            </View>
          </View>
        </LinearGradient>
        <View style={{ flex: 1 }}>
            <FlatList 
               ItemSeparatorComponent={this.seperator}
               ListHeaderComponent={this.header}
               data={data}
               keyExtractor={(item,index)=>index.toString()}
               renderItem ={({item,index})=>{
                  return(
                    <View style={{ flexDirection: "row", backgroundColor: "#fff",minHeight:height*0.08}}>
                      <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                        <Text style={[styles.text, { color: "#000", fontSize: 16}]}>{item.day}</Text>
                      </View>
                      <View style={{ flex: 0.266, alignItems: "center", justifyContent: "center" }}>
                        <Text style={[styles.text, {  fontSize: 16}]}>{item.Morning}</Text>
                      </View>
                      <View style={{ flex: 0.266, alignItems: "center", justifyContent: "center" }}>
                        <Text style={[styles.text, {  fontSize: 16}]}>{item.afterNoon}</Text>
                      </View>
                      <View style={{ flex: 0.266, alignItems: "center", justifyContent: "center" }}>
                        <Text style={[styles.text, {  fontSize: 16 }]}>{item.Night}</Text>
                      </View>
                    </View>
                  )
               }}
            />
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
const mapStateToProps = (state) => {

  return {
    theme: state.selectedTheme,
    user:state.selectedUser
  }
}
export default connect(mapStateToProps, { selectTheme })(Menu);

