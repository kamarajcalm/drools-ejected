import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, Alert, AsyncStorage, TextInput, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme ,selectUser} from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily = settings.fontFamily
const themeColor = settings.themeColor
const url = settings.url
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import orders from '../data/orders';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import momemt from 'moment';
import { CommonNavigationAction, CommonActions } from '@react-navigation/native'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import * as Location from 'expo-location';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import HttpsClient from '../HttpsClient';
 class EditAccount extends Component {
  constructor(props) {
    super(props);
    let address ={
        address:this.props.user.address,
        latitude:this.props.user.lat,
        longitude:this.props.user.lang
    }
    this.state = {
        name:this.props.user.user.first_name,
        phone:this.props.user.mobile,
        address,
        street:this.props.user.street,
        lastname:this.props.user.user.last_name
    };
  }
    getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            console.warn('Permission to access location was denied');
            return;
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
    getProfile = async()=>{
        let api = `${url}/api/profile/users/?myself=true`
            let data = await HttpsClient.get(api)
          
             if(data.type=="success"){
                 this.props.selectUser(data.data[0]);
             }
    }
    createAccount = async()=>{
        this.setState({creating:true})
        if(this.state.name ==""){
            this.setState({ creating: false })
            return this.showSimpleMessage("please fill First Name","orange","info")
        }
        if (this.state.lastname == "") {
            this.setState({ creating: false })
            return this.showSimpleMessage("please fill Last Name", "orange", "info")
        }
        if (this.state.phone.length <10) {
            this.setState({ creating: false })
            return this.showSimpleMessage("please fill 10 digit mobile Number", "orange", "info")
        }
        if (this.state.address==null) {
            this.setState({ creating: false })
            return this.showSimpleMessage("please select an address", "orange", "info")
        }
     
        let api =`${url}/api/profile/editProfile/`
        let sendData ={
            first_name:this.state.name,
            last_name:this.state.lastname,
            mobile:this.state.phone,
            address:this.state.address.address,
            street:this.state.street,
            lat: this.state.address.latitude,
            lang:this.state.address.longitude,
            user:this.props.user.user.id
        }
        let post = await HttpsClient.post(api,sendData)
        console.log(post)
        if(post.type=="success"){
            this.setState({creating:false})
            this.showSimpleMessage("Account Edited SuccessFully","green","success")
            this.getProfile()
            return this.props.navigation.goBack()
        }else{
            this.setState({ creating: false })
            this.showSimpleMessage("Try Again", "red", "danger")
        }
    }
componentDidMount(){
    this.getLocation();
}
    backFunction =(address)=>{
        this.setState({address})
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
                        <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Edit Account</Text>

                    </View>
                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                    </View>
                </View>
            </LinearGradient>
            <KeyboardAvoidingView 
              behavior={Platform.OS=="ios"?"padding":"height"}
            >

        
            <ScrollView>
                        <View style={{paddingHorizontal:20,marginTop:20}}>
                            <View>
                                    <Text style={[styles.text, { color: "#fff", fontSize: 22 }]}>First Name : </Text>
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
                                <Text style={[styles.text, { color: "#fff", fontSize: 22 }]}>Last Name : </Text>
                            </View>
                            <TextInput
                                value={this.state.lastname}
                                style={{ height: 35, width: width * 0.8, backgroundColor: "#fafafa", marginTop: 10, paddingLeft: 5 }}
                                selectionColor={themeColor}
                                 onChangeText={(lastname) => { this.setState({ lastname }) }}
                            />

                        </View>
                         <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                                <View>
                                    <Text style={[styles.text, { color: "#fff", fontSize: 22 }]}>Phone No : </Text>
                                </View>
                                <TextInput
                                  maxLength={10}
                                    keyboardType={"numeric"}
                                    value={this.state.phone}
                                    style={{ height: 35, width: width * 0.8, backgroundColor: "#fafafa", marginTop: 10, paddingLeft: 5 }}
                                    selectionColor={themeColor}
                                    onChangeText={(phone) => { this.setState({ phone })}}
                                />
                        </View>
     
                        <View style={{alignItems:"center",justifyContent:"center",marginTop:10}}>
                                <View>
                                    <Text style={[styles.text,{color:"#fff",fontSize:22}]}>Select an Delivery Address</Text>
                                </View>
                                <TouchableOpacity style={{marginTop:10}}
                                   onPress={() => { this.props.navigation.navigate("SelectAddress", { backFunction: (address) => { this.backFunction(address)}})}}
                                >
                                     <Ionicons name="add-circle-sharp" size={32} color={primaryColor} />
                                </TouchableOpacity>
                        </View>
                <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                    <View>
                        <Text style={[styles.text, { color: "#fff", fontSize: 22 }]}>Address : </Text>
                    </View>
                    <View>
                        <Text style={[styles.text,{color:"#fff"}]}>{this.state.address?.address}</Text>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                    <View>
                        <Text style={[styles.text, { color: "#fff", fontSize: 20 }]}>Building Name /Room No/ Street: </Text>
                    </View>
                    <TextInput
                        secureTextEntry={true}
                        multiline={true}
                        value={this.state.street}
                        style={{ height: height*0.1, width: width * 0.8, backgroundColor: "#fafafa", marginTop: 10, paddingLeft: 5,textAlignVertical:"top"}}
                        selectionColor={themeColor}
                        onChangeText={(street) => { this.setState({street})}}
                    />
                </View>
                <View style={{margin: 20,alignItems:"center",justifyContent:"center" }}>
                        <TouchableOpacity style={{height:height*0.05,width:width*0.4,alignItems:"center",justifyContent:"center",backgroundColor:primaryColor}}
                          onPress={()=>{this.createAccount()}}
                        >
                             <Text style={[styles.text,{color:"#fff"}]}>Edit Account</Text>
                        </TouchableOpacity>
               </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
    user:state.selectedUser,
  }
}
export default connect(mapStateToProps, { selectTheme ,selectUser})(EditAccount);