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
const data = [
    {

            Morning:"Combo 1",
            AfterNoon:"Combo 2",
            Night:"Combo 3",
            day:"Monday"
    },
    {
        Morning: "Combo 1",
        AfterNoon: "Combo 2",
        Night: "Combo 3",
        day: "Tuesday"
    },
    {
        Morning: "Combo 1",
        AfterNoon: "Combo 2",
        Night: "Combo 3",
        day: "Wednesday"
    },
    {
        Morning: "Combo 1",
        AfterNoon: "Combo 2",
        Night: "Combo 3",
        day: "Thursday"
    },
    {
        Morning: "Combo 1",
        AfterNoon: "Combo 2",
        Night: "Combo 3",
        day: "Friday"
    },
    {
        Morning: "Combo 1",
        AfterNoon: "Combo 2",
        Night: "Combo 3",
        day: "Saturday"
    },
    {
        Morning: "Combo 1",
        AfterNoon: "Combo 2",
        Night: "Combo 3",
        day: "Sunday"
    },
]
class planTimeTable extends Component {
    constructor(props) {
   
        super(props);
        this.state = {
            timeTable:data
        };
    }
    seperator =()=>{
        return(
            <View style={{height:1,width,backgroundColor:"gray"}}>

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
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Time Table</Text>

                        </View>
                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                        </View>
                    </View>
                </LinearGradient>
                
                <View style={{ flex: 1, }}>
                      <FlatList 
                         ItemSeparatorComponent={this.seperator}
                         data={this.state.timeTable}
                         keyExtractor={(item,index)=>index.toString()}
                         renderItem={({item,index})=>{
                             return(
                                 <View style={{marginVertical:20}}>
                                      <View style={{alignItems:"center",justifyContent:"center"}}>
                                          <Text style={[styles.text,{color:"#000",fontSize:22,textDecorationLine:"underline"}]}>{item.day} :</Text>
                                      </View>
                                                     {/* MORNING */}
                                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-around",marginTop:20}}>
                                         <View style={{ }}>
                                             <View style={{flexDirection:"row"}}>
                                                 <View>
                                                     <Text style={[styles.text,{color:"#000",fontSize:18}]}>Morning : </Text>
                                                 </View>
                                                 <View>
                                                     <Text style={[styles.text, { fontSize: 18}]}>{item.Morning}</Text>
                                                 </View>
                                             </View>
                                           
                                             <TouchableOpacity
                                              style={{alignItems:"center",justifyContent:"center"}}
                                             >
                                                 <Entypo name="edit" size={24} color="orange" />
                                             </TouchableOpacity>
                                         </View>

                                    </View>                 
                                 
                                                    {/* AFTER NOON */}
                                     <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: 20 }}>
                                         <View style={{}}>
                                             <View style={{ flexDirection: "row" }}>
                                                 <View>
                                                     <Text style={[styles.text, { color: "#000", fontSize: 18 }]}>AfterNoon : </Text>
                                                 </View>
                                                 <View>
                                                     <Text style={[styles.text, { fontSize: 18 }]}>{item.AfterNoon}</Text>
                                                 </View>
                                             </View>

                                             <TouchableOpacity
                                                 style={{ alignItems: "center", justifyContent: "center" }}
                                             >
                                                 <Entypo name="edit" size={24} color="orange" />
                                             </TouchableOpacity>
                                         </View>

                                     </View>

                                     <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: 20 }}>
                                         <View style={{}}>
                                             <View style={{ flexDirection: "row" }}>
                                                 <View>
                                                     <Text style={[styles.text, { color: "#000", fontSize: 18 }]}>Night : </Text>
                                                 </View>
                                                 <View>
                                                     <Text style={[styles.text, { fontSize: 18 }]}>{item.AfterNoon}</Text>
                                                 </View>
                                             </View>

                                             <TouchableOpacity
                                                 style={{ alignItems: "center", justifyContent: "center" }}
                                             >
                                                 <Entypo name="edit" size={24} color="orange" />
                                             </TouchableOpacity>
                                         </View>

                                     </View>
                                 </View>
                             )
                         }}
                      />
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
export default connect(mapStateToProps, { selectTheme })(planTimeTable);