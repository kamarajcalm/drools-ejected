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
const screenHeight = Dimensions.get("screen").height
 class ViewPlan extends Component {
  constructor(props) {
      let item = props.route.params.item
    super(props);
    this.state = {
        item
    };
  }

  render() {
    return (
      <View style={{flex:1}}>
            {/* Headers */}
            <LinearGradient
                style={{ height: height * 0.12, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                colors={gradients}
            >
                <View style={{ marginTop: Constants.statusBarHeight, flex: 1, flexDirection: "row" }}>
                    <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                        <Ionicons name="caret-back" size={24} color={secondaryColor} />
                    </TouchableOpacity>
                    <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
                        <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>{this.state.item.title}</Text>

                    </View>
                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                    </View>
                </View>
            </LinearGradient>
            <View style={{flex:1,alignItems:"center",justifyContent:"space-around"}}>
                  <TouchableOpacity 
                    onPress={() => { this.props.navigation.navigate("planTimeTable",{item:this.state.item})}}
                  >
                      <View style={{alignItems:"center",justifyContent:"center"}}>
                        <MaterialIcons name="schedule" size={24} color={primaryColor}/>
                      </View>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Text style={[styles.text,{color:"#000",fontSize:22}]}>Time Table</Text>
                      </View>
                       
                  </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => { this.props.navigation.navigate("PlanUsers",{item:this.state.item})}}
                >
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <FontAwesome name="users" size={24} color={primaryColor} />
                    </View>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Text style={[styles.text, { color: "#000", fontSize: 22 }]}>Users</Text>
                    </View>
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
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
    }
}
export default connect(mapStateToProps, { selectTheme })(ViewPlan);