import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, Alert, AsyncStorage,ScrollView,TextInput, ActivityIndicator} from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily = settings.fontFamily
const themeColor = settings.themeColor
const url =settings.url
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import orders from '../data/orders';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import momemt from 'moment';
import { CommonNavigationAction, CommonActions } from '@react-navigation/native'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Linking } from 'react-native';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import HttpsClient from '../HttpsClient';
class ProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
componentDidMount(){
  console.log(this.props.user)
}
      showSimpleMessage(content, color, type = "info", props = {}) {
        const message = {
            message: content,
            backgroundColor: color,
            icon: { icon: "auto", position: "left" },
            type,
            ...props,
        };

        showMessage(message);
    }

  render() {
    return (
      <View style={{flex:1,backgroundColor:"#000"}}>

        <LinearGradient
          style={{ height: height * 0.12, alignItems: "center", justifyContent: "center" }}
          colors={gradients}
        >
          <View
            style={{ marginTop: Constants.statusBarHeight, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
          >


            <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
              onPress={()=>{this.props.navigation.goBack()}}
            >
                 <Ionicons name="caret-back" size={24} color={secondaryColor} />
            </TouchableOpacity>
            <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
              <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Info</Text>

            </View>
            <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

            </View>
          </View>
        </LinearGradient>
        <ScrollView style={{}}>
                <View style={{flexDirection:"row",marginTop:20}}>
                  <View style={{flex:0.5,flexDirection:"row"}}>
                    <View style={{flex:0.9,alignItems:"center",justifyContent:"center"}}>
                           <Text style={[styles.text,{color:"#fff",fontSize:20}]}>Name</Text>
                    </View>
                     <View style={{flex:0.1,alignItems:"center",justifyContent:"center"}}>
                           <Text style={[styles.text,{color:"#fff",fontSize:20}]}> : </Text>
                     </View>
                  </View>
                   <View style={{flex:0.5,alignItems:"center",justifyContent:"center"}}>
                        <Text style={[styles.text,{color:primaryColor,fontSize:20}]}>{this.props?.user?.user?.username}</Text>
                   </View>
                </View>
        </ScrollView>   
    
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
    user:state.selectedUser,
  }
}
export default connect(mapStateToProps, { selectTheme })(ProfileInfo);