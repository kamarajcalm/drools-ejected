import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Orders from '../screens/Orders';
import ViewOrders from '../screens/ViewOrders';
import Profile from '../cookScreens/Profile';
const Stack = createStackNavigator();
export default class ProfileStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }
}