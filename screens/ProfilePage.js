import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
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
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
       
        };
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

                    
                    <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                        <Ionicons name="caret-back" size={24} color={secondaryColor} />
                    </TouchableOpacity>
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
                    <TouchableOpacity style={{ flexDirection: "row", height: height * 0.05, paddingHorizontal: 20, width, marginTop: 20 }}
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