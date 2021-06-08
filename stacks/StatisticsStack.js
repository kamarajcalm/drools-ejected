import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Orders from '../screens/Orders';
import History from '../screens/History';
import Statistics from '../screens/Statistics';
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
            </Stack.Navigator>
        );
    }
}
