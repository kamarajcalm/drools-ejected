import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, Image, TextInput, AsyncStorage, } from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily = settings.fontFamily
const themeColor = settings.themeColor
const url =settings.url
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { StatusBar, } from 'expo-status-bar';
import {CommonNavigationAction,CommonActions} from '@react-navigation/native';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import * as Notifications from 'expo-notifications';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:true,
            mobile:"",
            password:"",
            token: null,
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
    login =async()=>{
        if (this.state.mobile == "") {
            return this.showSimpleMessage(`please enter username`, "#dd7030")
        }
        if (this.state.password == "") {
            return this.showSimpleMessage(`please enter password`, "#dd7030")
        }
        this.setState({ loading: true })
        var data = new FormData()
        data.append("username", this.state.mobile)
        data.append("password", this.state.password)
        fetch(`${url}/api/profile/login/?mode=api`, {
            method: 'POST',
            body: data,
            headers: {

            }
        }).then((response) => {
            if (response.status == 200) {
                var sessionid = response.headers.get('set-cookie').split('sessionid=')[1].split(';')[0]
                AsyncStorage.setItem('sessionid', sessionid)
                console.log(sessionid, "ppp")
                var d = response.json()
                return d
            }
            else {
                return undefined
            }
        })
            .then((responseJson) => {
                if (responseJson == undefined) {
                    this.setState({ loading: false })
                    return this.showSimpleMessage(`incorrect username or password`, "#dd7030")
                }
                console.log(responseJson, "ress")
                AsyncStorage.setItem('csrf',responseJson.csrf_token)
                AsyncStorage.setItem('user',responseJson.title)
                AsyncStorage.setItem('login', "true")
                return this.props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'DefaultScreen',

                            },

                        ],
                    })
                )
            })
            .catch((err) => {
                this.setState({ loading: false })
                return this.showSimpleMessage(`${err?.toString()} ${url}`, "#dd7030")
            })
    }
    componentDidMount(){
        this.registerForPushNotificationsAsync().then(token => this.setState({ token }));
    }
    registerForPushNotificationsAsync = async function () {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            alert(token)
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }
    render() {

        return (
            <View style={{ flex: 1 ,marginTop:Constants.statusBarHeight,backgroundColor:themeColor}}>
                <StatusBar style={"dark"} />
                <View style={{flex:0.3,alignItems:"center",justifyContent:"center",backgroundColor:"#fff"}}>
                   <Image 
                        source={require('../assets/512x512_jpg.jpg')}
                     style={{height:"100%",width:"100%",}}
                     resizeMode={"contain"}
                   />
                </View>
                <View style={{flex:0.7,alignItems:"center",}}>
                    <View style={{marginTop:20}}>
                        <TextInput
                            value={this.state.mobile}
                          
                            style={{ height: height * 0.06, width: width * 0.9, backgroundColor: "#eee",borderRadius:5 ,paddingLeft:10}}
                            placeholder={"Mobile"}
                            selectionColor={themeColor}
                            onChangeText={(mobile) => { this.setState({ mobile})}}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <TextInput
                            style={{ height: height * 0.06, width: width * 0.9, backgroundColor: "#eee", borderRadius: 5, paddingLeft: 10 }}
                            placeholder={"Password"}
                            secureTextEntry={true}
                            selectionColor={themeColor}
                            value={this.state.password}
                            onChangeText={(password) => { this.setState({ password }) }}
                        />
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <TouchableOpacity 
                         onPress ={()=>{this.login()}}
                         style={{width:width*0.4,height:height*0.06,backgroundColor:primaryColor,alignItems:"center",justifyContent:"center",borderRadius:5}}
                        >
                            <Text style={[styles.text,{color:"#fff"}]}>Login</Text>
                        </TouchableOpacity>
                    </View>
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
export default connect(mapStateToProps, { selectTheme })(LoginScreen);
