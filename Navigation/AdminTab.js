import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily = settings.fontFamily
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import OrdersStack from '../stacks/OrdersStack';
import HistoryStack from '../stacks/HistoryStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTabBar from '../components/MyTabBar';
import InventoryStack from '../stacks/InventoryStack';
import ProfileStack from '../stacks/ProfileStack';
const Tab = createBottomTabNavigator();
class AdminTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        return (
            <Tab.Navigator
                tabBar={props => <MyTabBar {...props} />}
            >
                <Tab.Screen name="Orders" component={OrdersStack} />
                <Tab.Screen name="History" component={HistoryStack} />
                <Tab.Screen name="Inventory" component={InventoryStack} />
                <Tab.Screen name="Profile" component={ProfileStack} />
               
            </Tab.Navigator>
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
export default connect(mapStateToProps, { selectTheme })(AdminTab);
