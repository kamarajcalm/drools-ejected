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

class planTimeTable extends Component {
    constructor(props) {
       let item = props.route.params.item
        super(props);
        this.state = {
            item,
            timeTable:[]
        };
    }
    seperator =()=>{
        return(
            <View style={{height:1,width,backgroundColor:"gray"}}>

            </View>
        )
    }
    getTimeTable = async() =>{
       let api =`${url}/api/drools/addTimetable/?plan=${this.state.item.id}`
       let data = await HttpsClient.get(api)
       if(data.type ="success"){
           this.setState({ timeTable:data.data})
       }
       
    }
    componentDidMount(){
       this.getTimeTable()   
    }
    getDay = (index)=>{
        let days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
         return days[index]
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
                                 <View style={{paddingVertical:20,flexDirection:"row"}}>
                                      <View style={{alignItems:"center",justifyContent:"center",flex:0.33,borderRightWidth:0.5,borderColor:"#000"}}>
                                          <Text style={[styles.text,{color:"#000",fontSize:22,}]}>{this.getDay(index)} :</Text>
                                      </View>

                                      <View style={{alignItems:"center",justifyContent:"space-around",flexDirection:"row",flex:0.67}}>

                             
                                                     {/* MORNING */}
                                     {item.MORNING&&    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-around",}}>
                                         <View style={{ }}>
                                             <View style={{flexDirection:"row"}}>
                                                 <TouchableOpacity 
                                                     onPress={() => { this.props.navigation.navigate('ViewTimeTable', { frequencyPk: item.MORNING, frequency: "Morning" }) }}
                                                 >
                                                         <Text style={[styles.text, { fontSize: 18, textDecorationLine: "underline", color: "#3b9dd6" }]}>Morning</Text>
                                                 </TouchableOpacity>

                                          
                                             </View>
                                           
                                             {/* <TouchableOpacity
                                                 onPress={() => { this.props.navigation.navigate("AddCombo", { planPk: this.state.item.id, frequencyPk: item.MORNING }) }}
                                              style={{alignItems:"center",justifyContent:"center"}}
                                             >
                                                 <Entypo name="edit" size={24} color="orange" />
                                             </TouchableOpacity> */}
                                         </View>
                                
                                    </View>                 
                                 }
                                                    {/* AFTER NOON */}
                                     {item.AFTERNOON&& <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around",}}>
                                         <View style={{}}>
                                             <View style={{ flexDirection: "row" }}>
                                                 <TouchableOpacity 
                                                     onPress={() => { this.props.navigation.navigate('ViewTimeTable', { frequencyPk: item.AFTERNOON, frequency: "AfterNoon" }) }}
                                                 >
                                                         <Text style={[styles.text, { fontSize: 18, textDecorationLine: "underline", color:"#3b9dd6" }]}>AfterNoon</Text>
                                                 </TouchableOpacity>
                                                 {/* <TouchableOpacity 
                                                     onPress={() => { this.props.navigation.navigate('ViewTimeTable', { frequencyPk: item.AFTERNOON, frequency: "AfterNoon" })}}
                                                 >
                                                     <Text style={[styles.text, { fontSize: 18,textDecorationLine:"underline" }]}>View</Text>
                                                 </TouchableOpacity> */}
                                             </View>

                                             {/* <TouchableOpacity
                                                 onPress={() => { this.props.navigation.navigate("AddCombo", { planPk: this.state.item.id, frequencyPk: item.AFTERNOON  }) }}
                                                 style={{ alignItems: "center", justifyContent: "center" }}
                                             >
                                                 <Entypo name="edit" size={24} color="orange" />
                                             </TouchableOpacity> */}
                                         </View>

                                     </View>}

                                     {item.NIGHT &&  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around",  }}>
                                         <View style={{}}>
                                             <View style={{ flexDirection: "row" }}>
                                                 <TouchableOpacity
                                                     onPress={() => { this.props.navigation.navigate('ViewTimeTable', { frequencyPk: item.NIGHT, frequency: "Night" }) }}
                                                 >
                                                         <Text style={[styles.text, { fontSize: 18, textDecorationLine: "underline", color: "#3b9dd6"}]}>Night</Text>
                                                 </TouchableOpacity>
                                               
                                             </View>

                                             {/* <TouchableOpacity
                                                 onPress={() => { this.props.navigation.navigate("AddCombo", { planPk: this.state.item.id, frequencyPk: item.NIGHT })}}
                                                 style={{ alignItems: "center", justifyContent: "center" }}
                                             >
                                                 <Entypo name="edit" size={24} color="orange" />
                                             </TouchableOpacity> */}
                                         </View>

                                     </View>}
                                                        
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
    },
    button:{
        height:height*0.05,
        width:width*0.3,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:primaryColor
    }
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
    }
}
export default connect(mapStateToProps, { selectTheme })(planTimeTable);