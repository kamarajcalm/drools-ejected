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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
  }
  async loadFonts() {
    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      Alegreya:require('./assets/fonts/Alegreya-VariableFont_wght.ttf'),


    });
    this.setState({ fontsLoaded: true });
  }
  componentDidMount() {
    this.loadFonts();
  }
  render() {
        if (this.state.fontsLoaded) {
          return (
            <Provider store={createStore(reducers)}>
               <AppNavigator />
              <FlashMessage
                position="top"
                hideStatusBar={false}
              />
            </Provider>
          );
        } else {
          return null;
        }
      
      }
  }

