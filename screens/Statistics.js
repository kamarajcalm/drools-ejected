import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet} from 'react-native';
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
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
                <View style={{flex:1,alignItems:"center",justifyContent:"space-around"}}>
                   <TouchableOpacity style={{flexDirection:"row"}}
                        onPress={() => { this.props.navigation.navigate("StatisticsView", { item:"Fast Moving Items"})}}
                   >
                       <View style={{alignItems:"center",justifyContent:"center"}}>
                            <Text style={[styles.text]}>Fast Moving Items</Text>
                       </View>
                        <View style={{ marginLeft: 10, alignItems: "center", justifyContent: "center" }}>
                            <Ionicons name="fast-food" size={24} color="black" />
                       </View>
                      
                   </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "row" }}
                        onPress={() => { this.props.navigation.navigate("StatisticsView", { item: "Day Wise" }) }}
                    >
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.text]}>Day Wise</Text>
                        </View>
                        <View style={{ marginLeft: 10, alignItems: "center", justifyContent: "center" }}>
                            <MaterialIcons name="date-range" size={24} color="black" />
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "row" }}
                        onPress={() => { this.props.navigation.navigate("StatisticsView", { item: "Time Wise" }) }}
                    >
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.text]}>Time Wise</Text>
                        </View>
                        <View style={{ marginLeft: 10, alignItems: "center", justifyContent: "center" }}>
                            <Ionicons name="time-sharp" size={24} color="black" />
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "row" }}
                        onPress={() => { this.props.navigation.navigate("StatisticsView", { item: "Net Profit" }) }}
                    >
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.text]}>Net Profit</Text>
                        </View>
                        <View style={{marginLeft:10,alignItems:"center",justifyContent:"center"}}>
                            <MaterialCommunityIcons name="cash-100" size={24} color="black" />
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
export default connect(mapStateToProps, { selectTheme })(Statistics);