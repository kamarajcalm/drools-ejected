import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, Alert } from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily = settings.fontFamily
const themeColor = settings.themeColor
import { StatusBar, } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import orders from '../data/orders'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import HttpsClient from '../HttpsClient';
const screenHeight = Dimensions.get("screen").height
const url = settings.url
class ViewCategories extends Component {
    constructor(props) {
        super(props);
        let item = props.route.params.item
        this.state = {
            item,
            Items: [],
            ItemName:""
        };
    }
    addItem = async() => {
        if (this.state.ItemName == "") {
            return this.showSimpleMessage("Please add Name", "#dd7030",)
        }
        let api = `${url}/api/drools/category/`
        let post = await HttpsClient.post()
        let pushObj = {
            name: this.state.ItemName
        }
        let duplicate = this.state.Items
        duplicate.push(pushObj)
        this.setState({ Items: duplicate, ItemName: "" })
        this.showSimpleMessage("Added SuccessFully", "#00A300", "success")
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
    deleteItem = async(item, index) => {
        let duplicate = this.state.Items
        let api = `${url}/api/drools/items/${item.id}/`
        let del = await HttpsClient.delete(api)
        console.log(del)
        if(del.type =="success"){
            duplicate.splice(index, 1)
            this.setState({ Items: duplicate })
          return  this.showSimpleMessage("Deleted SuccessFully", "#00A300", "success")
        }else{
            return this.showSimpleMessage("Try again", "red", "danger")
        }
      
    }
    InvalidItem = async(item, index)=>{
        let duplicate = this.state.Items
        let api = `${url}/api/drools/items/${item.id}/`
        let sendData ={
            invalid:true
        }
        let patch =await HttpsClient.patch(api,sendData)
        if(patch.type=="success"){
            duplicate.splice(index, 1)
            this.setState({ Items: duplicate })
            return this.showSimpleMessage("Ivalid Successfully", "#00A300", "success")
        }
        else {
            return this.showSimpleMessage("Try again", "red", "danger")
        }
    }
    createAlert = (item, index) => {
        Alert.alert(
            "Are you Sure",
            `${item.title}`,
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => { this.InvalidItem(item, index) } }
            ]
        );
    }
    header = () => {
        return (
            <View style={{ flexDirection: "row", paddingVertical: 20 }}>
                <View style={{ flex: 0.4, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text, { color: primaryColor, textDecorationLine: "underline" }]}>Item</Text>
                </View>
                <View style={{ flex: 0.25, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text, { color: primaryColor, textDecorationLine: "underline" }]}>Action</Text>
                </View>
                <View style={{flex:0.1,alignItems:"center",justifyContent:"center"}}>
                   <Text>Edit</Text>
                </View>
                <View style={{ flex: 0.25, alignItems: "center", justifyContent: "center" }}>
                    
                </View>
            </View>
        )
    }
    
    getItems = async()=>{
        let api = `${url}/api/drools/items/?category=${this.state.item.id}`
        let data =await HttpsClient.get(api)
        console.log(api)
        if(data.type =="success"){
            this.setState({ Items:data.data})
        }
    }
    componentDidMount(){
        this.getItems()
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getItems()

        });
    }
    componentWillUnmount(){
        this._unsubscribe()
    }
    render() {

        return (
            <View style={{ flex: 1, backgroundColor: themeColor }}>
                <StatusBar style={"light"} />
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
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>{this.state.item.title} </Text>

                        </View>
                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                        </View>
                    </View>
                </LinearGradient>
             
                <FlatList
                    data={this.state.Items}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={this.header()}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ flexDirection: "row", paddingVertical: 10, }}>
                                <View style={{ flex: 0.4, alignItems: "center", justifyContent: "center" }}>
                                    <View>
                                        <Text style={[styles.text, { color: "#fff" }]}>{index + 1}. {item.title}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 0.25, alignItems: "center", justifyContent: "center" }}>
                                    <TouchableOpacity
                                        onPress={() => { this.props.navigation.navigate('ViewItems', { item }) }}

                                    >
                                        <Text style={[styles.text, { textDecorationLine: "underline", color: "#fff" }]}>View</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}
                                    onPress={() => { this.props.navigation.navigate('AddItems', { itemm: item, edit: true,})}}
                                >
                                    <Entypo name="edit" size={24} color="red" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 0.25, alignItems: "center", justifyContent: "center" }}
                                 onPress ={()=>{this.createAlert(item,index)}}
                                >
                                  <Text style={[styles.text,{color:"red",textDecorationLine:"underlinecd "}]}>Make Invalid</Text>
                                </TouchableOpacity>
                            </View>
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
                        onPress={() => { this.props.navigation.navigate("AddItems",{item:this.state.item}) }}
                    >
                        <AntDesign name="pluscircle" size={40} color={primaryColor}/>
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
export default connect(mapStateToProps, { selectTheme })(ViewCategories);