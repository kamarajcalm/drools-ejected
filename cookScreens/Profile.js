import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, AsyncStorage} from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily = settings.fontFamily
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { CommonNavigationAction, CommonActions } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    logout = () => {
        AsyncStorage.clear();
        return this.props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'DefaultScreen',

                    },

                ],
            })
        )
    }
    componentDidMount(){
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: false,
                shouldSetBadge: false,
            }),
        });
    }
    render() {

        return (
            <View style={{ flex: 1 }}>

                {/* Headers */}
                <LinearGradient
                    style={{ height: height * 0.12, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                    colors={gradients}
                >
                    <View style={{ marginTop: Constants.statusBarHeight }}>
                        <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Profile</Text>
                    </View>
                  
                </LinearGradient>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <TouchableOpacity 
                     onPress={()=>{this.logout()}}
                    >
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    text: {
        fontFamily
    }
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
    }
}
export default connect(mapStateToProps, { selectTheme })(Profile);