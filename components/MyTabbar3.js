import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet,Keyboard } from 'react-native';
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
            showTab:true
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
        componentDidMount(){
        Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    componentWillUnmount(){
        Keyboard.removeListener('keyboardDidShow', this._keyboardDidShow);
        Keyboard.removeListener('keyboardDidHide', this._keyboardDidHide);
    }
    _keyboardDidShow = () => {
        this.setState({showTab:false})
    };

    _keyboardDidHide = () => {
        this.setState({ showTab: true })
    };
    render() {
        const { state, descriptors, navigation } = this.props
        if(this.state.showTab){
    
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
            }else{
                return null
            }
    }
}
const styles = StyleSheet.create({
    text: {
        fontFamily
    }
})