import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Orders from '../screens/Orders';
import ViewOrders from '../screens/ViewOrders';
import Inventory from '../screens/Inventory';
import ViewItems from '../screens/ViewItems';
import ViewStock from '../screens/ViewStock';
const Stack = createStackNavigator();
export default class InventoryStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Inventory" component={Inventory} options={{ headerShown: false }} />
                <Stack.Screen name="ViewItems" component={ViewItems} options={{ headerShown: false }} />
                <Stack.Screen name="ViewStock" component={ViewStock} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }
}