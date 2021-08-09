import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ViewOrders from '../cookScreens/ViewOrders';
import Orders from '../cookScreens/Orders';
import ViewOrder from '../cookScreens/ViewOrder';
import SubscriptionOrders from '../cookScreens/SubscriptionOrders';

const Stack = createStackNavigator();
export default class PlanStacks extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="SubscriptionOrders" component={SubscriptionOrders} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }
}