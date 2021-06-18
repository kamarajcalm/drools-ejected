import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ViewOrders from '../cookScreens/ViewOrders';
import Orders from '../cookScreens/Orders';
import ViewOrder from '../cookScreens/ViewOrder';

const Stack = createStackNavigator();
export default class OrdersStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Orders" component={Orders} options={{ headerShown: false }} />
                <Stack.Screen name="ViewOrder" component={ViewOrder} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }
}