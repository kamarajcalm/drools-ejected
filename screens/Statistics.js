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
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Statistics</Text>

                        </View>
                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                        </View>
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
                       
                         
                            <Image 
                                source={{ uri:"https://us.123rf.com/450wm/subbotina/subbotina1905/subbotina190500024/123093476-hamburger-and-double-cheeseburger-with-fries-wooden-table.jpg?ver=6"}}
                                style={{height:100,width:100}}
                            
                            />
                             
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Text style={[styles.text, { color: primaryColor, fontSize: 22 }]}>Fast Moving Items</Text>
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

                          
                            <Image
                                source={{ uri: "https://media.wired.co.uk/photos/606d9ab87aff197af7c7296f/master/pass/wired-timezones-hero.jpg" }}
                                style={{ height: 100, width: 100 }}

                            />
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Text style={[styles.text, { color: primaryColor, fontSize: 22 }]}>Peak Hours</Text>
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
                       
                         
                            <Image
                                source={{ uri: "https://biznakenya.com/wp-content/uploads/2016/08/Profitable-Business-in-Kenya.jpg" }}
                                style={{ height: 100, width: 100 }}

                            />
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Text style={[styles.text, { color: primaryColor, fontSize: 22 }]}>Net Profit </Text>
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