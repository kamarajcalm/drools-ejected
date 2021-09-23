import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, AsyncStorage, ScrollView, Image} from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily =settings.fontFamily
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { CommonNavigationAction, CommonActions } from '@react-navigation/native'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    logout =()=>{
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
    render() {
    
        return (
            <View style={{ flex: 1,backgroundColor:"#000" }}>
        
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
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Statistics</Text>

                        </View>
                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                        </View>
                    </View>
                </LinearGradient>
                <ScrollView 
                
                 contentContainerStyle ={{alignItems:"center",}}
                >
                     <TouchableOpacity style={{ flexDirection: "row", height: height * 0.05, paddingHorizontal: 20, width, marginTop: 20 }}
                        onPress={() => { this.props.navigation.navigate('DailyExpenses')}}
                    >
                        <View style={{ flex: 0.8, flexDirection: "row" }}>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <FontAwesome5 name="money-bill-wave" size={24} color="#fff"/>
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 20 }}>
                                <Text style={[styles.text, { color: "#fff" }]}>Daily Expenses</Text>
                            </View>
                        </View>

                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}>
                            <Entypo name="triangle-right" size={24} color="#fff" />
                        </View>
                    </TouchableOpacity>
                          <TouchableOpacity style={{ flexDirection: "row", height: height * 0.05, paddingHorizontal: 20, width, marginTop: 20 }}
                        onPress={() => { this.props.navigation.navigate('AccountsScreen')}}
                    >
                        <View style={{ flex: 0.8, flexDirection: "row" }}>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <FontAwesome5 name="money-bill-wave" size={24} color="#fff"/>
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 20 }}>
                                <Text style={[styles.text, { color: "#fff" }]}>Accounts</Text>
                            </View>
                        </View>

                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}>
                            <Entypo name="triangle-right" size={24} color="#fff" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "row", height: height * 0.05, paddingHorizontal: 20, width, marginTop: 20 }}
                        onPress={() => { this.props.navigation.navigate('OtherExpenses') }}
                    >
                        <View style={{ flex: 0.8, flexDirection: "row" }}>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <FontAwesome5 name="money-bill-wave" size={24} color="#fff" />
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 20 }}>
                                <Text style={[styles.text, { color: "#fff" }]}>Monthly Expenses</Text>
                            </View>
                        </View>

                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}>
                            <Entypo name="triangle-right" size={24} color="#fff" />
                        </View>
                    </TouchableOpacity>
                           <TouchableOpacity style={{flexDirection:"row",height:height*0.05,paddingHorizontal:20,width,marginTop:20}}
                      onPress={() => { this.props.navigation.navigate("StatisticsView", { item: "Fast Moving Items" }) }}
                    >
                        <View style={{flex:0.8,flexDirection:"row"}}>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                     <Ionicons name="fast-food" size={24} color="#fff" />
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 20 }}>
                                <Text style={[styles.text, { color: "#fff" }]}>Fast Moving Items</Text>
                            </View>
                        </View>
                      
                         <View style={{flex:0.2,alignItems:"center",justifyContent:'center'}}>
                            <Entypo name="triangle-right" size={24} color="#fff" />
                         </View>
                    </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection:"row",height:height*0.05,paddingHorizontal:20,width,marginTop:20}}
                      onPress={() => { this.props.navigation.navigate("StatisticsView", { item: "Time Wise" }) }}
                    >
                        <View style={{flex:0.8,flexDirection:"row"}}>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                     <Ionicons name="time" size={24} color="#fff" />
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 20 }}>
                                <Text style={[styles.text, { color: "#fff" }]}>Peak Hours</Text>
                            </View>
                        </View>
                      
                         <View style={{flex:0.2,alignItems:"center",justifyContent:'center'}}>
                            <Entypo name="triangle-right" size={24} color="#fff" />
                         </View>
                    </TouchableOpacity>
                               <TouchableOpacity style={{flexDirection:"row",height:height*0.05,paddingHorizontal:20,width,marginTop:20}}
                onPress={() => { this.props.navigation.navigate("StatisticsView", { item: "Net Profit" }) }}
                    >
                        <View style={{flex:0.8,flexDirection:"row"}}>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                         <FontAwesome5 name="money-bill" size={24} color="#fff" />
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 20 }}>
                                <Text style={[styles.text, { color: "#fff" }]}>Net Profit</Text>
                            </View>
                        </View>
                      
                         <View style={{flex:0.2,alignItems:"center",justifyContent:'center'}}>
                            <Entypo name="triangle-right" size={24} color="#fff" />
                         </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:"row",height:height*0.05,paddingHorizontal:20,width,marginTop:20}}
                       onPress={() => { this.props.navigation.navigate('MonthlyIncome') }}
                    >
                        <View style={{flex:0.8,flexDirection:"row"}}>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                         <FontAwesome5 name="money-bill" size={24} color="#fff" />
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 20 }}>
                                <Text style={[styles.text, { color: "#fff" }]}>Monthly Income</Text>
                            </View>
                        </View>
                      
                         <View style={{flex:0.2,alignItems:"center",justifyContent:'center'}}>
                            <Entypo name="triangle-right" size={24} color="#fff" />
                         </View>
                    </TouchableOpacity>
                   
              
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    text: {
        fontFamily
    },
    cardStyle:{
     
        height: height * 0.25, 
        backgroundColor: "red",
        width: width * 0.9,
        borderRadius: 5, 
        alignItems: "center", 
        justifyContent: "space-around",
        marginTop: 20,
    }
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
    }
}
export default connect(mapStateToProps, { selectTheme })(Statistics);