import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, ActivityIndicator,AsyncStorage } from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const themeColor = settings.themeColor
const fontFamily = settings.fontFamily
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { CommonNavigationAction, CommonActions } from '@react-navigation/native'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
class DefaultScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getUser = async()=>{
       let login = await AsyncStorage.getItem("login")
       if(login){
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
    }
    componentDidMount(){
        this.getUser()
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
    }
}
export default connect(mapStateToProps, { selectTheme })(DefaultScreen);