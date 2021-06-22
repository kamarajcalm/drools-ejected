import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, AsyncStorage, ScrollView} from 'react-native';
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
            <View style={{ flex: 1 }}>
        
                {/* Headers */}
                <LinearGradient
                    style={{ height: height * 0.12, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                    colors={gradients}
                >
                    <View style={{ marginTop: Constants.statusBarHeight }}>
                        <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Statistics</Text>
                    </View>
                </LinearGradient>
                <ScrollView 
                
                 contentContainerStyle ={{alignItems:"center",}}
                >
                    <TouchableOpacity

                        onPress={() => { this.props.navigation.navigate("StatisticsView", { item: "Fast Moving Items" }) }}
                    >
                    <LinearGradient
                        style={[styles.cardStyle]}
                            colors={gradients}
                    >
                       
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Text style={[styles.text,{color:primaryColor}]}>Fast Moving Items</Text>
                            </View>
                            <View style={{ marginLeft: 10, alignItems: "center", justifyContent: "center" }}>
                                <Ionicons name="fast-food" size={24} color={primaryColor} />
                            </View>

                      
                    </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity

                        onPress={() => { this.props.navigation.navigate("StatisticsView", { item: "Time Wise" }) }}
                    >
                        <LinearGradient
                            style={[styles.cardStyle]}
                            colors={gradients}
                        >

                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Text style={[styles.text, { color: primaryColor }]}>Fast Moving Items Time Wise</Text>
                            </View>
                            <View style={{ marginLeft: 10, alignItems: "center", justifyContent: "center" }}>
                                <Ionicons name="fast-food" size={24} color={primaryColor} />
                            </View>


                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.navigate("StatisticsView", { item: "Net Profit" }) }}
                    >
                    <LinearGradient 
                        style={[styles.cardStyle]}
                        colors={gradients}
                    
                    >
                       
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Text style={[styles.text,{color:primaryColor}]}>Net Profit </Text>
                            </View>
                            <View style={{ marginLeft: 10, alignItems: "center", justifyContent: "center" }}>
                                <MaterialIcons name="date-range" size={24} color={primaryColor} />
                            </View>

                    </LinearGradient>
                  

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.navigate("ProfilePage") }}
                    >
                        <LinearGradient
                            style={[styles.cardStyle]}
                            colors={gradients}

                        >

                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Text style={[styles.text,{color:primaryColor}]}>Profile</Text>
                            </View>
                            <View style={{ marginLeft: 10, alignItems: "center", justifyContent: "center" }}>
                                <FontAwesome5 name="hotel" size={24} color={primaryColor} />
                            </View>

                        </LinearGradient>


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
        flexDirection: "row", 
        height: height * 0.25, 
        backgroundColor: "red",
        width: width * 0.9,
        borderRadius: 5, 
        alignItems: "center", 
        justifyContent: "center",
        marginTop: 20,
    }
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
    }
}
export default connect(mapStateToProps, { selectTheme })(Statistics);