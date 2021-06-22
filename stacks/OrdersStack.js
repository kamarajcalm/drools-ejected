import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Orders from '../screens/Orders';
import ViewOrders from '../screens/ViewOrders';
import CreateNormalOrder from '../screens/CreateNormalOrder';
import CreateTakeAway from '../screens/CreateTakeAway';
import SeacrchDishes from '../screens/SeacrchDishes';
import SearchDishes2 from '../screens/SearchDishes2';
import CreateOnline from '../screens/CreateOnline';
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
            <Stack.Screen name="Orders" component={Orders} options={{ headerShown: false }}/>
            <Stack.Screen name="ViewOrder" component={ViewOrders} options={{ headerShown: false }}/>
            <Stack.Screen name="CreateNormalOrder" component={CreateNormalOrder} options={{ headerShown: false }}/>
            <Stack.Screen name="CreateTakeAway" component={CreateTakeAway} options={{ headerShown: false }}/>
            <Stack.Screen name="SearchDishes" component={SeacrchDishes} options={{ headerShown: false }}/>
            <Stack.Screen name="SearchDishes2" component={SearchDishes2} options={{ headerShown: false }}/>
            <Stack.Screen name="CreateOnline" component={CreateOnline} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
  }
}
