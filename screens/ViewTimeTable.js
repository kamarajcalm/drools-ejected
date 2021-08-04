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
class ViewTimeTable extends Component {
    constructor(props) {
        let frequencyPk = props.route.params.frequencyPk
        let frequency = props.route.params.frequency
        super(props);
        this.state = {
            frequencyPk,
            frequency,
            data:null
        };
    }
    getTimeTable = async()=>{
        let api = `${url}/api/drools/plantimetable/${this.state.frequencyPk}/`
        let data = await HttpsClient.get(api)
        if(data.type =="success"){
            this.setState({ data:data.data})
        }
    }
   componentDidMount(){
       this.getTimeTable()
   }
    render() {
        return (
            <View style={{ flex: 1 }}>
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
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>{this.state.frequency}</Text>

                        </View>
                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                        </View>
                    </View>
                </LinearGradient>
                <View style={{ flex: 1,}}>
                    <View style={{marginTop:10,alignItems:"center",justifyContent:"center"}}>
                        <Text style={[styles.text,{color:"#000",fontSize:22,textDecorationLine:"underline"}]}>Default Item :</Text>
                    </View>
                    <View>
                        <View style={{marginTop:10,alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                            <Text style={[styles.text, { color: "#000", fontSize: 20 }]}>Combo Name : </Text>
                            <Text style={[styles.text,{color:"#000",fontSize:20}]}>{this.state?.data?.default?.title}</Text>
                        </View>
                        {
                            this.state?.data?.default?.items.map((item,index)=>{
                                return(
                                    <View key={index} style={{alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                                        <View>
                                            <Text>{index+1} .</Text>
                                        </View>
                                        <View>
                                            <Text> {item.title}</Text>
                                        </View>
                                  
                                    </View>
                                )
                            })
                        }
                    </View>

                    <View style={{ marginTop: 10, alignItems: "center", justifyContent: "center" }}>
                        <Text style={[styles.text, { color: "#000", fontSize: 22, textDecorationLine: "underline" }]}>Choice Items :</Text>
                    </View>
                    {this.state?.data?.choices?.map((item,index)=>{
                        return(
                            <View>
                                <View style={{ marginTop: 10, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                                    <Text style={[styles.text, { color: "#000", fontSize: 20 }]}>Combo Name : </Text>
                                    <Text style={[styles.text, { color: "#000", fontSize: 20 }]}>{item.title}</Text>
                                </View>
                                {
                                    item.items.map((item, index) => {
                                        return (
                                            <View key={index} style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                                                <View>
                                                    <Text style={[styles.text,{color:"#000"}]}>{index + 1} .</Text>
                                                </View>
                                                <View>
                                                    <Text style={[styles.text, { color: "#000" }]}> {item.title}</Text>
                                                </View>

                                            </View>
                                        )
                                    })
                                }
                            </View>
                        )
                    })}
                </View>
                  <View style={{alignItems:"center",justifyContent:"center",marginVertical:15}}>
                <TouchableOpacity
                        onPress={() => { this.props.navigation.navigate("AddCombo", { planPk: this.state.item.id, frequencyPk: item.MORNING }) }}
                       style={{alignItems:"center",justifyContent:"center",height:height*0.05,width:width*0.3,backgroundColor:primaryColor}}
                 >
                    <Text style={[styles.text,{color:"#fff"}]}>Edit</Text>
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
export default connect(mapStateToProps, { selectTheme })(ViewTimeTable);