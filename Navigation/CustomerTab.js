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
import MyTabbar3 from '../components/MyTabbar3';
import MenuStack from '../customerStacks/MenuStack';
import HistoryStack from '../customerStacks/HistoryStack';
import ProfileStack from '../customerStacks/ProfileStack';
const Tab = createBottomTabNavigator();
class CustomerTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        return (
            <Tab.Navigator
                tabBar={props => <MyTabbar3 {...props} />}
            >
                <Tab.Screen name="Menu" component={MenuStack} />
                <Tab.Screen name="History" component={HistoryStack} />
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
export default connect(mapStateToProps, { selectTheme })(CustomerTab);