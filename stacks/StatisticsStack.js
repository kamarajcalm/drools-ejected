import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Orders from '../screens/Orders';
import History from '../screens/History';
import Statistics from '../screens/Statistics';
import StatisticsView from '../screens/StatisticsView';
import ProfilePage from '../screens/ProfilePage';
import Tables from '../screens/Tables';
import ExpenseScreen from '../screens/ExpenseScreen';
import BlueToothDevices from '../screens/BlueToothDevices';
import Discounts from '../screens/Discounts';
const Stack = createStackNavigator();
export default class StatisticsStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Statistics" component={Statistics} options={{ headerShown: false }} />
                <Stack.Screen name="StatisticsView" component={StatisticsView} options={{ headerShown: false }} />
                <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false }} />
                <Stack.Screen name="Tables" component={Tables} options={{ headerShown: false }} />
                <Stack.Screen name="ExpenseScreen" component={ExpenseScreen} options={{ headerShown: false }} />
                <Stack.Screen name="BlueToothDevices" component={BlueToothDevices} options={{ headerShown: false }} />
                <Stack.Screen name="Discounts" component={Discounts} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }
}
