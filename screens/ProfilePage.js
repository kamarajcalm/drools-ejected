import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList,Image,Alert,AsyncStorage} from 'react-native';
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
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5,AntDesign } from '@expo/vector-icons';
class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
       
        };
    }
    logOut =()=>{
        AsyncStorage.clear();
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
    }
    createAlert = (item, index) => {
        Alert.alert(
            `Do You Want To Logout`,
            ``,
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => { this.logOut() } }
            ]
        );
    }
    render() {

        return (
            <View style={{ flex: 1, backgroundColor: themeColor }}>
              
                <LinearGradient
                    style={{ height: height * 0.12,alignItems:"center",justifyContent:"center"}}
                    colors={gradients}
                >
                     <View 
                        style={{ marginTop: Constants.statusBarHeight, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                     >

                    
                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
                    
                    >
                        
                    </View>
                    <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
                        <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Profile</Text>

                    </View>
                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                    </View>
                    </View>
                </LinearGradient>

                <View style={{flex:1}}>
                    <TouchableOpacity style={{flexDirection:"row",height:height*0.05,paddingHorizontal:20,width,marginTop:20}}
                     onPress={()=>{this.props.navigation.navigate('Tables')}}
                    >
                        <View style={{flex:0.8,flexDirection:"row"}}>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <FontAwesome5 name="chair" size={24} color="#fff" />
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 20 }}>
                                <Text style={[styles.text, { color: "#fff" }]}>Tables</Text>
                            </View>
                        </View>
                      
                         <View style={{flex:0.2,alignItems:"center",justifyContent:'center'}}>
                            <Entypo name="triangle-right" size={24} color="#fff" />
                         </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:"row",height:height*0.05,paddingHorizontal:20,width,marginTop:20}}
                     onPress={()=>{this.props.navigation.navigate('ProfileInfo')}}
                    >
                        <View style={{flex:0.8,flexDirection:"row"}}>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                          <FontAwesome name="address-card" size={24} color="#fff" />
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 20 }}>
                                <Text style={[styles.text, { color: "#fff" }]}>Profile Info</Text>
                            </View>
                        </View>
                      
                         <View style={{flex:0.2,alignItems:"center",justifyContent:'center'}}>
                            <Entypo name="triangle-right" size={24} color="#fff" />
                         </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={{ flexDirection: "row", height: height * 0.05, paddingHorizontal: 20, width, marginTop: 20 }}
                        onPress={() => { this.props.navigation.navigate('ExpenseScreen')}}
                    >
                        <View style={{ flex: 0.8, flexDirection: "row" }}>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <FontAwesome5 name="money-bill-wave" size={24} color="#fff" />
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 20 }}>
                                <Text style={[styles.text, { color: "#fff" }]}>Expenses</Text>
                            </View>
                        </View>

                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}>
                            <Entypo name="triangle-right" size={24} color="#fff" />
                        </View>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={{ flexDirection: "row", height: height * 0.05, paddingHorizontal: 20, width, marginTop: 20 }}
                        onPress={() => { this.props.navigation.navigate('OtherExpenses') }}
                    >
                        <View style={{ flex: 0.8, flexDirection: "row" }}>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <FontAwesome5 name="money-bill-wave" size={24} color="#fff" />
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 20 }}>
                                <Text style={[styles.text, { color: "#fff" }]}>Expenses</Text>
                            </View>
                        </View>

                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}>
                            <Entypo name="triangle-right" size={24} color="#fff" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "row", height: height * 0.05, paddingHorizontal: 20, width, marginTop: 20 }}
                        onPress={() => { this.props.navigation.navigate('Statistics') }}
                    >
                        <View style={{ flex: 0.8, flexDirection: "row" }}>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Ionicons name="stats-chart" size={24} color="#fff" />
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 20 }}>
                                <Text style={[styles.text, { color: "#fff" }]}>Statistics</Text>
                            </View>
                        </View>

                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}>
                            <Entypo name="triangle-right" size={24} color="#fff" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "row", height: height * 0.05, paddingHorizontal: 20, width, marginTop: 20 }}
                        onPress={() => { this.props.navigation.navigate('Discounts') }}
                    >
                        <View style={{ flex: 0.8, flexDirection: "row" }}>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <MaterialIcons name="money-off" size={24} color="#fff" />
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 20 }}>
                                <Text style={[styles.text, { color: "#fff" }]}>Discounts</Text>
                            </View>
                        </View>

                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}>
                            <Entypo name="triangle-right" size={24} color="#fff" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "row", height: height * 0.05, paddingHorizontal: 20, width, marginTop: 20 }}
                        onPress={() => { this.props.navigation.navigate('BlueToothDevices')}}
                    >
                        <View style={{ flex: 0.8, flexDirection: "row" }}>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Feather name="bluetooth" size={24} color="#fff" />
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 20 }}>
                                <Text style={[styles.text, { color: "#fff" }]}>BlueTooth Devices</Text>
                            </View>
                        </View>

                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}>
                            <Entypo name="triangle-right" size={24} color="#fff" />
                        </View>
                    </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: "row", height: height * 0.05, paddingHorizontal: 20, width, marginTop: 20 }}
                        onPress={() => { this.props.navigation.navigate('PasswordScreen') }}
                    >
                        <View style={{ flex: 0.8, flexDirection: "row" }}>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <MaterialCommunityIcons name="onepassword" size={24} color="#fff" />
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 20 }}>
                                <Text style={[styles.text, { color: "#fff" }]}>Change Password</Text>
                            </View>
                        </View>

                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}>
                            <Entypo name="triangle-right" size={24} color="#fff" />
                        </View>
                    </TouchableOpacity>
                          <TouchableOpacity style={{ flexDirection: "row", height: height * 0.05, paddingHorizontal: 20, width, marginTop: 20 }}
                        onPress={() => { this.props.navigation.navigate("PrintBills") }}
                    >
                        <View style={{ flex: 0.8, flexDirection: "row" }}>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                               <AntDesign name="printer" size={24} color="#fff" />
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 20 }}>
                                <Text style={[styles.text, { color: "#fff" }]}>Print Bills</Text>
                            </View>
                        </View>

                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}>
                            <Entypo name="triangle-right" size={24} color="#fff" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "row", height: height * 0.05, paddingHorizontal: 20, width, marginTop: 20 }}
                        onPress={() => { this.createAlert() }}
                    >
                        <View style={{ flex: 0.8, flexDirection: "row" }}>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Entypo name="log-out" size={24} color="#fff" />
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 20 }}>
                                <Text style={[styles.text, { color: "#fff" }]}>Logout</Text>
                            </View>
                        </View>

                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}>
                            <Entypo name="triangle-right" size={24} color="#fff" />
                        </View>
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
export default connect(mapStateToProps, { selectTheme })(ProfilePage);