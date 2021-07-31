import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, Alert, AsyncStorage, TextInput, ScrollView} from 'react-native';
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
import * as Location from 'expo-location';
export default class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name:"",
        phone:""
    };
  }
    getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            console.warn('Permission to access location was denied');
            return;
        }
    
    }
componentDidMount(){
    this.getLocation();
}
  render() {
    return (
        <View style={{ flex: 1, backgroundColor: themeColor }}>
            <LinearGradient
                style={{ height: height * 0.12, alignItems: "center", justifyContent: "center" }}
                colors={gradients}
            >
                <View
                    style={{ marginTop: Constants.statusBarHeight, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                >


                    <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
                      onPress={()=>{this.props.navigation.goBack()}}
                    >
                        <Ionicons name="caret-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
                        <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Create Account</Text>

                    </View>
                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                    </View>
                </View>
            </LinearGradient>

            <ScrollView>
                        <View style={{paddingHorizontal:20,marginTop:20}}>
                            <View>
                                    <Text style={[styles.text, { color: "#fff", fontSize: 22 }]}>Name : </Text>
                            </View>
                            <TextInput 
                               value={this.state.name}
                               style={{height:35,width:width*0.8,backgroundColor:"#fafafa",marginTop:10,paddingLeft:5}}
                               selectionColor={themeColor}
                               onChangeText ={(name)=>{this.setState({name})}}
                            />

                        </View>
                         <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                                <View>
                                    <Text style={[styles.text, { color: "#fff", fontSize: 22 }]}>Phone No : </Text>
                                </View>
                                <TextInput
                                    keyboardType={"numeric"}
                                    value={this.state.phone}
                                    style={{ height: 35, width: width * 0.8, backgroundColor: "#fafafa", marginTop: 10, paddingLeft: 5 }}
                                    selectionColor={themeColor}
                                    onChangeText={(phone) => { this.setState({ phone })}}
                                />
                        </View>
                        <View style={{alignItems:"center",justifyContent:"center",marginTop:10}}>
                                <View>
                                    <Text style={[styles.text,{color:"#fff",fontSize:22}]}>Select an Address</Text>
                                </View>
                                <TouchableOpacity style={{marginTop:10}}
                                    onPress={() => { this.props.navigation.navigate("SelectAddress")}}
                                >
                                     <Ionicons name="add-circle-sharp" size={32} color={primaryColor} />
                                </TouchableOpacity>
                        </View>
            </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    text: {
        fontFamily
    }
})