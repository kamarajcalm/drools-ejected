import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily = settings.fontFamily
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
export default class MyTabbar3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    icon = (label, isFocused) => {
        if (label == "Menu") {
            return (
                <MaterialIcons name="restaurant-menu" size={24}  color={isFocused ? primaryColor : secondaryColor}/>
       
            )
        }
        if (label == "History") {
            return (
                <FontAwesome name="history" size={24} color={isFocused ? primaryColor : secondaryColor} />
            )
        }
    
        if (label == "Profile") {
            return (
                <Ionicons name="person-circle-sharp" size={24} color={isFocused ? primaryColor : secondaryColor} />
            )
        }
        
    }
    render() {
        const { state, descriptors, navigation } = this.props
        return (
            <LinearGradient
                style={{ height: height * 0.07, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                colors={gradients}
            >
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            key={index}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
                        >
                            {
                                this.icon(label, isFocused)
                            }
                            <Text style={[styles.text, { color: isFocused ? primaryColor : secondaryColor }]}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </LinearGradient>
        );
    }
}
const styles = StyleSheet.create({
    text: {
        fontFamily
    }
})