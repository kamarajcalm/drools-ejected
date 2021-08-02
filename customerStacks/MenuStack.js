import React, { Component } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';
import History from '../customerScreens/History';
import Menu from '../customerScreens/Menu';
const Stack = createStackNavigator();
export default class MenuStack extends Component {
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
                <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />

            </Stack.Navigator>
        );
    }
}