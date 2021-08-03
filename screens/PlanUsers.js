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
class PlanUsers extends Component {
    constructor(props) {
        let item = props.route.params.item
        super(props);
        this.state = {
            item,
            users:[]
        };
    }
    getUsers = async()=>{
        let api = `${url}/api/drools/planmembers/?plan=${this.state.item.id}`
        let data = await HttpsClient.get(api)
        console.log(api)
        if(data.type="success"){
            this.setState({ users:data.data})
        }
    }
 componentDidMount(){
     this.getUsers()
 }
    header =()=>{
        return(
            <View style={{flexDirection:"row",marginTop:10}}>
                  <View style={{flex:0.1,alignItems:"center",justifyContent:"center"}}>
                            <Text style={[styles.text,{color:"#000",fontSize:20,textDecorationLine:"underline"}]}>#</Text>
                  </View>
                  <View style={{flex:0.6,alignItems:"center",justifyContent:"center"}}>
                    <Text style={[styles.text, { color: "#000", fontSize: 20, textDecorationLine: "underline"}]}>Name</Text>
                  </View>
                  <View style={{flex:0.3,alignItems:"center",justifyContent:"center"}}>
                    <Text style={[styles.text, { color: "#000", fontSize: 20, textDecorationLine: "underline"}]}>Active</Text>
                  </View>
            </View>
        )
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
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Users</Text>

                        </View>
                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                        </View>
                    </View>
                </LinearGradient>
                <View style={{ flex: 1 }}>
                     <FlatList 
                       ListHeaderComponent={this.header()}
                       data={this.state.users}
                       keyExtractor={(item,index)=>index.toString()}
                       renderItem ={({item,index})=>{
                                return(
                                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                                        <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                                            <Text style={[styles.text, { color: "#000", fontSize: 18, textDecorationLine: "underline" }]}>{index+1}</Text>
                                        </View>
                                        <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
                                            <Text style={[styles.text, { color: "#000", fontSize: 18, }]}>{item.fullName}</Text>
                                        </View>
                                        <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                                            <Text style={[styles.text, { color: "#000", fontSize: 18, textDecorationLine: "underline" }]}>Active</Text>
                                        </View>
                                    </View>
                                )

                       }}
                     />
                </View>

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
                        onPress={() => { this.props.navigation.navigate("AddUsers", { item: this.state.item }) }}
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
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
    }
}
export default connect(mapStateToProps, { selectTheme })(PlanUsers);