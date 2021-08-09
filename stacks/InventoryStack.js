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
import { TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';
import ViewPlan from '../screens/ViewPlan';
import planTimeTable from '../screens/planTimeTable';
import PlanMenu from '../screens/PlanMenu';
import AddMenuItems from '../screens/AddMenuItems';
import PlanUsers from '../screens/PlanUsers';
import AddUsers from '../screens/AddUsers';
import AddCombo from '../screens/AddCombo';
import ViewTimeTable from '../screens/ViewTimeTable';
import PlanDeliveries from '../screens/PlanDeliveries';
import ViewDeliveries from '../screens/ViewDeliveries';
const Stack = createStackNavigator();
export default class InventoryStack extends Component {
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
                <Stack.Screen name="Inventory" component={Inventory} options={{ headerShown:false }} />
                <Stack.Screen name="ViewItems" component={ViewItems} options={{ headerShown:false }} />
                <Stack.Screen name="ViewStock" component={ViewStock} options={{ headerShown:false }} />
                <Stack.Screen name="ViewCategories" component={ViewCategories} options={{ headerShown:false }}/>
                <Stack.Screen name="ViewIngredients" component={ViewIngredients} options={{ headerShown:false }}/>
                <Stack.Screen name="AddItems" component={AddItems} options={{ headerShown:false}}/>
                <Stack.Screen name="CreateOrders" component={CreateOrders} options={{ headerShown:false}}/>
                <Stack.Screen name="ViewInventoryOrders" component={ViewInventoryOrders} options={{ headerShown:false}}/>
                <Stack.Screen name="ViewPlan" component={ViewPlan} options={{ headerShown:false}}/>
                <Stack.Screen name="planTimeTable" component={planTimeTable} options={{ headerShown:false}}/>
                <Stack.Screen name="PlanMenu" component={PlanMenu} options={{ headerShown:false}}/>
                <Stack.Screen name="AddMenuItems" component={AddMenuItems} options={{ headerShown:false}}/>
                <Stack.Screen name="PlanUsers" component={PlanUsers} options={{ headerShown:false}}/>
                <Stack.Screen name="AddUsers" component={AddUsers} options={{ headerShown:false}}/>
                <Stack.Screen name="AddCombo" component={AddCombo} options={{ headerShown:false}}/>
                <Stack.Screen name="ViewTimeTable" component={ViewTimeTable} options={{ headerShown:false}}/>
                <Stack.Screen name="PlanDeliveries" component={PlanDeliveries} options={{ headerShown:false}}/>
                <Stack.Screen name="ViewDeliveries" component={ViewDeliveries} options={{ headerShown:false}}/>
            </Stack.Navigator>
        );
    }
}