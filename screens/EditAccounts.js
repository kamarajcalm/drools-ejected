import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, KeyboardAvoidingView, PlatformColor, Platform } from 'react-native';
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
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import orders from '../data/orders';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import momemt from 'moment';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import HttpsClient from '../HttpsClient';
import { ScrollView } from 'react-native-gesture-handler';
class EditAccounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Phonepe:"",
            Cash:"",
            Online:"",
            Personal1:"",
            Personal2:"",
            edit:false
        };
    }
    getAccounts = async () => {
         let api =`${url}/api/drools/getBalance/`
       let data  = await HttpsClient.get(api)
       if(data.type=="success"){
           this.setState({
               Cash:data.data.Cash.toString(),
               Online:data.data.Online.toString(),
               Personal1:data.data.Personal1.toString(),
               Personal2:data.data.Personal2.toString(),
               Phonepe:data.data.Phonepe.toString()
           })
       }
    }
    componentDidMount() {
        this.getAccounts()
    }
    save = async () => {
          let api =`${url}/api/drools/accountEdit/`
          let sendData ={
             Cash:this.state.Cash,
             Online:this.state.Online,
             Personal1:this.state.Personal1,
             Personal2:this.state.Personal2,
             Phonepe:this.state.Phonepe
          }
          let post = await HttpsClient.post(api,sendData)
          if(post.type=="success"){
                 this.showSimpleMessage("Edited SuccessFully","green","success")
          }else{
             this.showSimpleMessage("Try Again","red","danger")
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
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Ionicons name="caret-back" size={24} color={secondaryColor} />
                        </TouchableOpacity>
                        <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Edit Accounts</Text>

                        </View>
                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                        </View>
                    </View>
                </LinearGradient>

                <View style={{ flex: 1 }}>
                  <KeyboardAvoidingView  behavior={Platform.OS=="ios"?"padding":"height"}>

                
                  <ScrollView>

               
                    <View style={{ marginTop: 10, marginLeft: 20 }}>
                        <Text style={[styles.text, { fontSize: 22, color: "#fff" }]}>PhonePe : </Text>
                        <TextInput
                            ref={ref => this.textRef = ref}
                            value={this.state.Phonepe}
                            editable={this.state.edit}
                            keyboardType={"numeric"}
                            style={{ height:38, width: width * 0.8, backgroundColor: "#fff", marginTop: 10, paddingLeft: 10 }}
                            selectionColor={primaryColor}
                            onChangeText={(Phonepe) => { this.setState({ Phonepe }) }}
                        />
                    </View>
                    <View style={{ marginTop: 10, marginLeft: 20 }}>
                        <Text style={[styles.text, { fontSize: 22, color: "#fff" }]}>Cash : </Text>
                        <TextInput
                            value={this.state.Cash}
                            editable={this.state.edit}
                            keyboardType={"numeric"}
                            style={{ height: 38, width: width * 0.8, backgroundColor: "#fff", marginTop: 10, paddingLeft: 10 }}
                            selectionColor={primaryColor}
                            onChangeText={(Cash) => { this.setState({ Cash }) }}
                        />
                    </View>
               
                    <View style={{ marginTop: 10, marginLeft: 20 }}>
                        <Text style={[styles.text, { fontSize: 22, color: "#fff" }]}>Online : </Text>
                        <TextInput
                            value={this.state.Online}
                            editable={this.state.edit}
                            keyboardType={"numeric"}
                            style={{ height:38, width: width * 0.8, backgroundColor: "#fff", marginTop: 10, paddingLeft: 10 }}
                            selectionColor={primaryColor}
                            onChangeText={(Online) => { this.setState({ Online }) }}
                        />
                    </View>
                          <View style={{ marginTop: 10, marginLeft: 20 }}>
                        <Text style={[styles.text, { fontSize: 22, color: "#fff" }]}>Personal1 : </Text>
                        <TextInput
                            value={this.state.Personal1}
                            editable={this.state.edit}
                            keyboardType={"numeric"}
                            style={{ height:38, width: width * 0.8, backgroundColor: "#fff", marginTop: 10, paddingLeft: 10 }}
                            selectionColor={primaryColor}
                            onChangeText={(Personal1) => { this.setState({ Personal1 }) }}
                        />
                    </View>
                                    <View style={{ marginTop: 10, marginLeft: 20 }}>
                        <Text style={[styles.text, { fontSize: 22, color: "#fff" }]}>Personal2 : </Text>
                        <TextInput
                            value={this.state.Personal2}
                            editable={this.state.edit}
                            keyboardType={"numeric"}
                            style={{ height:38, width: width * 0.8, backgroundColor: "#fff", marginTop: 10, paddingLeft: 10 }}
                            selectionColor={primaryColor}
                            onChangeText={(Personal2) => { this.setState({ Personal2 }) }}
                        />
                    </View>
                 { !this.state.edit&&  <View style={{  flexDirection: "row", paddingVertical: 40,alignItems:"center",justifyContent:"space-around"}}>
                       
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ edit: true }, () => {
                                        this.textRef.focus()
                                    })
                                }}
                                style={{ backgroundColor: primaryColor, height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center" }}
                            >
                                <Text style={[styles.text, { color: '#fff', }]}>Edit</Text>
                            </TouchableOpacity>
                    
                      
                         
                        
                    </View>}
                  { this.state.edit&& <View style={{  flexDirection: "row", paddingVertical: 40,alignItems:"center",justifyContent:"space-around"}}>
                     <TouchableOpacity
                                onPress={() => {
                                    this.setState({ edit: false }, () => {
                                        
                                    })
                                }}
                                style={{ backgroundColor: primaryColor, height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center" }}
                            >
                                <Text style={[styles.text, { color: '#fff', }]}>Cancel</Text>
                            </TouchableOpacity>
                         <TouchableOpacity
                                onPress={() => { this.save() }}
                                style={{ backgroundColor: "green", height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center" }}
                            >
                                <Text style={[styles.text, { color: '#fff', }]}>save</Text>
                            </TouchableOpacity>
                    </View>}
                       </ScrollView>
                         </KeyboardAvoidingView>
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
export default connect(mapStateToProps, { selectTheme })(EditAccounts);