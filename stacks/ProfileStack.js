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
import { TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';
import Discounts from '../screens/Discounts';
import OtherExpenses from '../screens/OtherExpenses';
import PasswordScreen from '../customerScreens/PasswordScreen';
import ProfileInfo from '../screens/ProfileInfo';
import PrintBills from '../screens/PrintBills';
import MonthlyIncome from '../screens/MonthlyIncome';
import DailyIncomeSheet from '../screens/DailyIncomeSheet';
import DailyExpenses from '../screens/DailyExpenses';
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
                <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false }} />
                <Stack.Screen name="Statistics" component={Statistics} options={{ headerShown: false }} />
                <Stack.Screen name="StatisticsView" component={StatisticsView} options={{ headerShown: false }} />
                <Stack.Screen name="Tables" component={Tables} options={{ headerShown: false }} />
                <Stack.Screen name="ExpenseScreen" component={ExpenseScreen} options={{ headerShown: false }} />
                <Stack.Screen name="OtherExpenses" component={OtherExpenses} options={{ headerShown: false }} />
                <Stack.Screen name="BlueToothDevices" component={BlueToothDevices} options={{ headerShown: false }} />
                <Stack.Screen name="Discounts" component={Discounts} options={{ headerShown: false }} />
                <Stack.Screen name="PasswordScreen" component={PasswordScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ProfileInfo" component={ProfileInfo} options={{ headerShown: false }} />
                <Stack.Screen name="PrintBills" component={PrintBills} options={{ headerShown: false }} />
                <Stack.Screen name="MonthlyIncome" component={MonthlyIncome} options={{ headerShown: false }} />
                <Stack.Screen name="DailyIncomeSheet" component={DailyIncomeSheet} options={{ headerShown: false }} />
                <Stack.Screen name="DailyExpenses" component={DailyExpenses} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }
}
