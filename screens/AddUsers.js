import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, TextInput ,Alert} from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily = settings.fontFamily
const themeColor = settings.themeColor
const url = settings.url
import { StatusBar, } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import orders from '../data/orders'
import { FontAwesome, AntDesign, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import HttpsClient from '../HttpsClient';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";

 class AddUsers extends Component {
  constructor(props) {
      let item = props.route.params.item
    super(props);
    this.state = {
        users:[],
        item
    };
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
     addUser = async(item,index)=>{
     
        let api =`${url}/api/drools/planmembers/`
        let sendData ={
            user: item.user.id,
            plan:this.state.item.id
        }
        let post = await HttpsClient.post(api,sendData)
        if(post.type="success"){
            this.showSimpleMessage("User Added SuccessFully","green","success")
            return this.props.navigation.goBack()
        }else{
            this.showSimpleMessage("Try Again", "red", "danger")
        }
     }
     searchUsers= async(text)=>{
         let api = `${url}/api/profile/users/?searchUser=${text}`
         let data = await HttpsClient.get(api)
       
         if(data.type=="success"){
             this.setState({ users:data.data})
         }
     }
     createAlert = (item, index) => {
         Alert.alert(
             `Do you want to Add ${item.name}?`,
             ``,
             [
                 {
                     text: "No",
                     onPress: () => console.log("Cancel Pressed"),
                     style: "cancel"
                 },
                 { text: "Yes", onPress: () => { this.addUser(item, index) } }
             ]
         );
     }
  render() {
    return (
      <View style={{flex:1}}>
            <LinearGradient
                style={{ height: height * 0.12, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                colors={gradients}
            >
                <View style={{ marginTop: Constants.statusBarHeight, flex: 1, flexDirection: "row" }}>
                    <TouchableOpacity style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}
                    >
                        <Ionicons name="caret-back" size={24} color={secondaryColor} />
                    </TouchableOpacity>
                    <View style={{ flex: 0.9, alignItems: "center", justifyContent: "center" }}>
                        <TextInput
                            style={{ height: 38, width: "90%", backgroundColor: "#fff", borderRadius: 5, paddingLeft: 5 }}
                            selectionColor={primaryColor}
                            placeholder={"search Users"}
                            onChangeText={(text) => { this.searchUsers(text) }}
                        />

                    </View>

                </View>


            </LinearGradient>
            <FlatList 
               data={this.state.users}
               keyExtractor={(item,index)=>index.toString()}
               renderItem ={({item,index})=>{
                   return(
                       <TouchableOpacity style={{height:height*0.1,backgroundColor:"#fafafa",marginTop:5,alignItems:"center",justifyContent:"center"}}
                        onPress ={()=>{this.createAlert(item,index)}}
                       >
                           <View style={{alignItems:"center",justifyContent:"center"}}>
                               <Text style={[styles.text,{color:"#000",fontSize:22}]}>{item.name} - {item.user.username}</Text>
                           </View>
                       </TouchableOpacity>
                   )
               }}
            />

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
export default connect(mapStateToProps, { selectTheme })(AddUsers);