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
    getTimeTable = async()=>{
        let api = `${url}/api/drools/plantimetable/${this.state.frequencyPk}/`
        let data = await HttpsClient.get(api)
        console.log(api)
        if(data.type =="success"){
            this.setState({ data:data.data})
        }
    }
   componentDidMount(){
       this.getTimeTable()
       this._unsubscribe = this.props.navigation.addListener('focus', () => {
           this.getTimeTable()
       });
   }
    deleteItem = async(item,index)=>{
        let api = `${url}/api/drools/addTimetable/`
        let sendData = {
            edit: true,
            timetable: this.state.frequencyPk,
            removeitem:item.id
        }
        let post = await HttpsClient.post(api,sendData) 
        if(post.type=="success"){
            this.getTimeTable()
            return this.showSimpleMessage("Deleted SuccessFully","green","success")
        }else{
            return this.showSimpleMessage("Try Again", "red", "danger")
        }
    }
    createAlert = (item, index) => {
        Alert.alert(
            "Do you want to delete?",
            ``,
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => { this.deleteItem(item, index) } }
            ]
        );
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
                                            <Text style={[styles.text,{color:"#000"}]}>{index+1} .</Text>
                                        </View>
                                        <View>
                                            <Text style={[styles.text,{color:primaryColor}]}> {item.title}</Text>
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
                            <View key={index}>
                                <View style={{ marginTop: 10, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                                    <Text style={[styles.text, { color: "#000", fontSize: 20 }]}>Combo Name : </Text>
                                    <Text style={[styles.text, { color: "#000", fontSize: 20 }]}>{item.title}</Text>
                                </View>
                                {
                                    item.items.map((item, index) => {
                                        return (
                                            <View key={index} style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                                                <View>
                                                    <Text style={[styles.text,{color:'#000'}]}>{index + 1} .</Text>
                                                </View>
                                                <View>
                                                    <Text style={[styles.text, { color: primaryColor }]}> {item.title}</Text>
                                                </View>

                                            </View>
                                        )
                                    })
                                }
                                <TouchableOpacity style={{position:"absolute",top:10,right:20}}
                                  onPress={()=>{this.createAlert(item,index)}}
                                >
                                    <Entypo name="circle-with-cross" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </View>
                  <View style={{alignItems:"center",justifyContent:"center",marginVertical:15}}>
                <TouchableOpacity
                        onPress={() => { this.props.navigation.navigate("AddCombo", {  frequencyPk: this.state.frequencyPk,data:this.state.data}) }}
                       style={{alignItems:"center",justifyContent:"center",height:height*0.05,width:width*0.3,backgroundColor:primaryColor}}
                 >
                    <Text style={[styles.text,{color:"#fff"}]}>Add</Text>
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