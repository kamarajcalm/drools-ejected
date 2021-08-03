import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, ActivityIndicator,AsyncStorage } from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme, selectUser} from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const themeColor = settings.themeColor
const fontFamily = settings.fontFamily
const url = settings.url
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { CommonNavigationAction, CommonActions } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import * as Updates from 'expo-updates';
import HttpsClient from '../HttpsClient';
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

class DefaultScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getUser = async()=>{
   
       let login = await AsyncStorage.getItem("login")
       let user = await AsyncStorage.getItem("user")
       if(login){
            let api = `${url}/api/profile/users/?myself=true`
            let data = await HttpsClient.get(api)
             if(data.type=="success"){
                 this.props.selectUser(data.data[0]);

                 if (data.data[0].occupation == "Cook") {
                     return this.props.navigation.dispatch(
                         CommonActions.reset({
                             index: 0,
                             routes: [
                                 {
                                     name: 'CookTab',

                                 },

                             ],
                         })
                     )
                 }
                 if (data.data[0].occupation == "Customer") {
                     return this.props.navigation.dispatch(
                         CommonActions.reset({
                             index: 0,
                             routes: [
                                 {
                                     name: 'CustomerTab',

                                 },

                             ],
                         })
                     )
                 }
                 return this.props.navigation.dispatch(
                     CommonActions.reset({
                         index: 0,
                         routes: [
                             {
                                 name: 'AdminTab',

                             },

                         ],
                     })
                 )
             }else{
                 return this.props.navigation.dispatch(
                     CommonActions.reset({
                         index: 0,
                         routes: [
                             {
                                 name: 'LoginScreen',

                             },

                         ],
                     })
                 )
             }
    
       
       }else{
           return this.props.navigation.dispatch(
               CommonActions.reset({
                   index: 0,
                   routes: [
                       {
                           name: 'LoginScreen',

                       },

                   ],
               })
           )
       }
    }
    OTAUpdate = async () => {
        try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
                try {
                    await Updates.fetchUpdateAsync();
                    await Updates.reloadAsync();
                } catch (e) {
                    return
                }
            }else{
                this.getUser()
            }
        } catch (e) {
            return this.getUser()
        }
    }
    componentDidMount(){
        this.OTAUpdate()
        // this.getUser()
    }
    render() {

        return (
            <View style={{ flex: 1 ,alignItems:"center",justifyContent:"center",backgroundColor:themeColor}}>

                {/* Headers */}
               <ActivityIndicator size={"large"} color={secondaryColor}/>
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
        user: state.selectedUser,
    }
}
export default connect(mapStateToProps, { selectTheme, selectUser})(DefaultScreen);