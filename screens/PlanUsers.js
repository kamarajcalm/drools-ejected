import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Alert, StyleSheet, FlatList, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView ,Switch} from 'react-native';
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
    deleteUsers= async(item,index)=>{
        let api = `${url}/api/drools/planmembers/${item.id}/`
        let del = await HttpsClient.delete(api)
        if(del.type=="success"){
            let duplicate = this.state.users
            duplicate.splice(index,1)
            this.setState({users:duplicate})
            return  this.showSimpleMessage("Deleted SuccessFully","green","success")
        }else{
                return  this.showSimpleMessage("Try Again","red","danger")   
        }
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
 componentDidMount(){
     this.getUsers()
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
                this.getUsers()
        });
 }
 componentWillUnmount =() =>{
      this._unsubscribe()
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
                    <Text style={[styles.text, { color: "#000", fontSize: 20, textDecorationLine: "underline"}]}>Actions</Text>
                  </View>
            </View>
        )
    }
    toggleActivate = async(item,index) =>{
        let api = `${url}/api/drools/planmembers/${item.id}/`
        let sendData = {
            active:!item.active
        }
        let post = await HttpsClient.patch(api,sendData)
        if(post.type=="success"){
            let duplicate = this.state.users
            duplicate[index].active = !duplicate[index].active
            this.setState({ users:duplicate})
          return  this.showSimpleMessage("Edited SuccessFully","green","success")

        }else{
            this.showSimpleMessage("Try Again", "red", "danger")
        }
    }
    createAlert = (item, index) => {
        Alert.alert(
            `Do you want to ${item.active?"De-Activate":"Activate"}?`,
            ``,
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => { this.toggleActivate(item, index) } }
            ]
        );
    }
        createAlert2 = (item, index) => {
        Alert.alert(
            `Do you want to remove?`,
            ``,
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => { this.deleteUsers(item, index) } }
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
                                        <View style={{ flex: 0.3, alignItems: "center", justifyContent: "space-around",flexDirection:"row" }}>
                                            <Switch
                                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                                thumbColor={item.active ? "#f5dd4b" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={() => { this.createAlert(item,index)}}
                                                value={item.active}
                                            />
                                            <TouchableOpacity onPress={()=>{this.createAlert2(item,index)}}>
                                                  <AntDesign name="delete" size={24} color="red" />
                                            </TouchableOpacity>
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