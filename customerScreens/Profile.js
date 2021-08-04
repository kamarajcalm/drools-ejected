import React, { Component } from 'react';
import { View, Text, TouchableOpacity ,AsyncStorage} from 'react-native';
import { CommonNavigationAction, CommonActions } from '@react-navigation/native';
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  logOut =()=>{
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
  render() {
    return (
      <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <TouchableOpacity 
              onPress ={()=>{this.logOut()}}
            >
                 <Text >Logout</Text>
            </TouchableOpacity>
      </View>
    );
  }
}
