import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image} from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily =settings.fontFamily
const themeColor = settings.themeColor
const url =settings.url
import { StatusBar ,} from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import orders from '../data/orders'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import NormalOrders from './NormalOrders';
import TakeAway from './TakeAway';
import CreateOnline from './CreateOnline';


 class Orders extends Component {
    constructor(props) {
        super(props);
        const routes = [
            { key: 'Dining', title: 'Dining' },
            { key: 'Take Away', title: 'Take Away' },
            { key: 'Online', title:'Online'},
        ];
        this.state = {
            routes,
            index: 0,
        };
    }
     renderScene = ({ route, }) => {
         switch (route.key) {

             case 'Dining':
                 return <NormalOrders navigation={this.props.navigation} />
             case 'Take Away':
                 return <TakeAway navigation={this.props.navigation} />
             case 'Online':
                 return <CreateOnline navigation={this.props.navigation} />
             default:
                 return null;
         }
     };
    render() {
        const { index, routes } = this.state
        return (
            <View style={{flex:1,backgroundColor:themeColor}}>
                <StatusBar style={"light"}/>
                   {/* Headers */}
                    <LinearGradient
                        style={{ height: height * 0.12, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                        colors={gradients}
                    >
                    <View style={{marginTop:Constants.statusBarHeight}}>
                            <Text style={[styles.text, { color: "#fff",fontSize: 18 }]}>Orders</Text>
                    </View>
                    </LinearGradient>
                <TabView
                    style={{ backgroundColor: "#ffffff" }}
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
const styles =StyleSheet.create({
   text:{
       fontFamily
   }
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
    }
}
export default connect(mapStateToProps, { selectTheme })(Orders);