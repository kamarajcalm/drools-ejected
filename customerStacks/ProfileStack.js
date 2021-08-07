import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';
import History from '../customerScreens/History';
import Menu from '../customerScreens/Menu';
import Profile from '../customerScreens/Profile';
import ProfileInfo from '../customerScreens/ProfileInfo';
import EditAccount from '../customerScreens/EditAccount';
import SelectAddress from '../customerScreens/SelectAddress';
import PasswordScreen from '../customerScreens/PasswordScreen';
const Stack = createStackNavigator();
export default class ProfileStack extends Component {
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
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                <Stack.Screen name="ProfileInfo" component={ProfileInfo} options={{ headerShown: false }} />
                <Stack.Screen name="EditAccount" component={EditAccount} options={{ headerShown: false }} />
                <Stack.Screen name="SelectAddress" component={SelectAddress} options={{ headerShown: false }} />
                <Stack.Screen name="PasswordScreen" component={PasswordScreen} options={{ headerShown: false }} />

            </Stack.Navigator>
        );
    }
}