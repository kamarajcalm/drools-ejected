import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import settings from './AppSettings';
import * as Font from 'expo-font';
import AppNavigator from './Navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashMessage from "react-native-flash-message";
import * as Notifications from 'expo-notifications';
import AppLoading from 'expo-app-loading';
import * as Updates from 'expo-updates';
Notifications.setNotificationChannelAsync('cook-notifications', {
  name: 'cook notifications',
  sound: 'alarm.wav', // Provide ONLY the base filename
});
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isReady: false,
      fontsLoaded: false,
    };
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
              return
            }
        } catch (e) {
            return 
        }
    }
  async loadFonts() {
    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      Alegreya:require('./assets/fonts/Alegreya-VariableFont_wght.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }
  loadFunctions = async()=>{
    this.loadFonts();
    this.OTAUpdate();
    this.setState({isReady:true})
  }
  componentDidMount() {
     this.loadFunctions();
  }
  render() {
    if(!this.state.isReady){
        return (
        <AppLoading
          onError={console.warn}
        />
      );
    }
        
          return (
            <Provider store={createStore(reducers)}>
               <AppNavigator />
              <FlashMessage
                position="top"
                hideStatusBar={false}
              />
            </Provider>
          );
        
      }
  }

