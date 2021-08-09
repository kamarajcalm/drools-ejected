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



import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTabBar2 from '../components/MyTabBar2';
import ProfileStack from '../CooksStack/ProfileStack';
import OrdersStack from '../CooksStack/OrdersStack';
import HistoryStack from '../CooksStack/HistoryStack';
import PlanStacks from '../CooksStack/PlanStacks';
const Tab = createBottomTabNavigator();
class CooksTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <Tab.Navigator
                tabBar={props => <MyTabBar2 {...props} />}
            >
                <Tab.Screen name="Orders" component={OrdersStack} />
              
                <Tab.Screen name="History" component={HistoryStack} />
                    <Tab.Screen name="P-Orders" component={PlanStacks} />
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
export default connect(mapStateToProps, { selectTheme })(CooksTab);