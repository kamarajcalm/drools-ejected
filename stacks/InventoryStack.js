import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Orders from '../screens/Orders';
import ViewOrders from '../screens/ViewOrders';
import Inventory from '../screens/Inventory';
import ViewItems from '../screens/ViewItems';
import ViewStock from '../screens/ViewStock';
import ViewCategories from '../screens/ViewCategories';
import ViewIngredients from '../screens/ViewIngredients';
import AddItems from '../screens/AddItems';
import CreateOrders from '../screens/CreateOrders';
import ViewInventoryOrders from '../screens/ViewInventoryOrders';
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
                <Stack.Screen name="Inventory" component={Inventory} options={{ headerShown:false }} />
                <Stack.Screen name="ViewItems" component={ViewItems} options={{ headerShown:false }} />
                <Stack.Screen name="ViewStock" component={ViewStock} options={{ headerShown:false }} />
                <Stack.Screen name="ViewCategories" component={ViewCategories} options={{ headerShown:false }}/>
                <Stack.Screen name="ViewIngredients" component={ViewIngredients} options={{ headerShown:false }}/>
                <Stack.Screen name="AddItems" component={AddItems} options={{ headerShown:false}}/>
                <Stack.Screen name="CreateOrders" component={CreateOrders} options={{ headerShown:false}}/>
                <Stack.Screen name="ViewInventoryOrders" component={ViewInventoryOrders} options={{ headerShown:false}}/>
            </Stack.Navigator>
        );
    }
}