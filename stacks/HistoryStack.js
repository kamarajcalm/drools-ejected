import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Orders from '../screens/Orders';
import History from '../screens/History';
import ViewOrders2 from '../screens/ViewOrders2';
import { TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';
const Stack = createStackNavigator();
export default class HistoryStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Stack.Navigator 
                screenOptions={{
                    transitionSpec: {
                        open: TransitionSpecs.TransitionIOSSpec,
                        close: TransitionSpecs.TransitionIOSSpec,
                    },
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS

                }}
            >
                <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
                <Stack.Screen name="ViewOrders2" component={ViewOrders2} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }
}
