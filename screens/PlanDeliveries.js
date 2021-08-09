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
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import MoriningDeliveries from './MoriningDeliveries';
import AfterNoonDeliveries from './AfterNoonDeliveries';
import NightDeliveries from './NightDeliveries';
 class PlanDeliveries extends Component {
  constructor(props) {
    
    super(props);
        const routes = [
            { key: 'Morning', title: 'Morning' },
            { key: 'AfterNoon', title: 'AfterNoon' },
            { key: 'Night', title:'Night'},
        ]
    this.state = {
        routes,
        index: 0,
    };
  }

     renderScene = ({ route, }) => {
         switch (route.key) {
             case 'Morning':
                 return <MoriningDeliveries navigation={this.props.navigation} orders={this.state.orders?.MORNING} />
             case 'AfterNoon':
                 return <AfterNoonDeliveries navigation={this.props.navigation} orders={this.state.orders?.AFTERNOON} />
             case 'Night':
                 return <NightDeliveries navigation={this.props.navigation} orders={this.state.orders?.NIGHT} />
             default:
                 return null;
         }
     };
  render() {
        const { index, routes } = this.state
    return (
      <View style={{flex:1}}>
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
                    <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" ,flexDirection:"row" }}>
                      <View>
                                <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Deliveries</Text>
                      </View>
                      <View style={{marginLeft:10}}>
                        <MaterialIcons name="delivery-dining" size={24} color="#fff" />
                      </View>

                    </View>
                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                    </View>
                </View>
            </LinearGradient>
                  <TabView
                        style={{ backgroundColor: "#ffffff", }}
                        navigationState={{ index, routes }}
                        renderScene={this.renderScene}
                        onIndexChange={(index) => { this.setState({ index }) }}
                        initialLayout={{ width }}
                        renderTabBar={(props) =>
                            <TabBar
                                {...props}
                                renderLabel={({ route, focused, color }) => (
                                    <Text style={{ color: focused ? primaryColor : 'gray', margin: 8, fontWeight: "bold" }}>
                                        {route.title}
                                    </Text>
                                )}
                                style={{ backgroundColor: "#fff", height: 50, fontWeight: "bold", color: "red" }}
                                labelStyle={{ fontWeight: "bold", color: "red" }}
                                indicatorStyle={{ backgroundColor: primaryColor, height: 5 }}
                            />
                        }

                />
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
export default connect(mapStateToProps, { selectTheme })(PlanDeliveries);