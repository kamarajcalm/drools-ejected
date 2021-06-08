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
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { StatusBar, } from 'expo-status-bar';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:true,
            mobile:""
        };
    }
    login =async()=>{
        AsyncStorage.setItem('login', "true")
        if(this.state.mobile=="1"){
            this.props.navigation.navigate('AdminTab')
        }else{
            this.props.navigation.navigate('CookTab')
        }
    }
    render() {

        return (
            <View style={{ flex: 1 ,marginTop:Constants.statusBarHeight,backgroundColor:themeColor}}>
                <StatusBar backgroundColor={themeColor} style={"light"}/>
                <View style={{flex:0.3,alignItems:"center",justifyContent:"center"}}>
                   <Image 
                        source={{ uri:"https://design.jboss.org/jbossrules/logo/final/drools_logo_600px.png"}}
                     style={{height:"100%",width:"100%",}}
                     resizeMode={"contain"}
                   />
                </View>
                <View style={{flex:0.7,alignItems:"center",}}>
                    <View style={{marginTop:20}}>
                        <TextInput
                            value={this.state.mobile}
                            keyboardType={"numeric"}
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
