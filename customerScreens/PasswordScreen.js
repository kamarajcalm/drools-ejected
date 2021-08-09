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
class PasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword:"",
      newPassword:"",
      confirmNewPassword:""
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
save = async()=>{
   this.setState({creating:true})
  if(this.state.oldPassword==""){
      this.setState({creating:false})
    return this.showSimpleMessage("please fill old Password","orange","info")
  }
  if(this.state.newPassword==""){
          this.setState({creating:false})
    return this.showSimpleMessage("please fill new Password","orange","info")
  }
    if(this.state.confirmNewPassword==""){
            this.setState({creating:false})
    return this.showSimpleMessage("please confirm new Password","orange","info")
  }
    if(this.state.newPassword!=this.state.confirmNewPassword){
            this.setState({creating:false})
    return this.showSimpleMessage("confirm password does not match","orange","info")
  }
  let api =`${url}/api/profile/changePassword/`
     let sendData ={
         oldpassword:this.state.oldPassword,
         newpassword:this.state.newPassword,
         user:this.props.user.user.id
     }
     let post = await HttpsClient.post(api,sendData)
     console.log(post)
     if(post.type=="success"){
               this.setState({creating:false})
       this.showSimpleMessage("password Changed SuccessFully","green","success")
       return this.logOut()
     }else{
               this.setState({creating:false})
       this.showSimpleMessage("please enter correct password","red","danger")
     }
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
              <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Change Password</Text>

            </View>
            <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

            </View>
          </View>
        </LinearGradient>
        <ScrollView style={{}}>
                    <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                    <View>
                        <Text style={[styles.text, { color: "#fff", fontSize: 22 }]}>Enter Old Password: </Text>
                    </View>
                    <TextInput
                        secureTextEntry={true}

                        value={this.state.oldPassword}
                        style={{ height: 35, width: width * 0.8, backgroundColor: "#fafafa", marginTop: 10, paddingLeft: 5 }}
                        selectionColor={themeColor}
                        onChangeText={(oldPassword) => { this.setState({ oldPassword }) }}
                    />
                </View>
                   <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                    <View>
                        <Text style={[styles.text, { color: "#fff", fontSize: 22 }]}>Enter new Password: </Text>
                    </View>
                    <TextInput
                        secureTextEntry={true}

                        value={this.state.newPassword}
                        style={{ height: 35, width: width * 0.8, backgroundColor: "#fafafa", marginTop: 10, paddingLeft: 5 }}
                        selectionColor={themeColor}
                        onChangeText={(newPassword) => { this.setState({ newPassword }) }}
                    />
                </View>
                <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                    <View>
                        <Text style={[styles.text, { color: "#fff", fontSize: 22 }]}>Confirm new Password: </Text>
                    </View>
                    <TextInput
                        secureTextEntry={true}

                        value={this.state.confirmNewPassword}
                        style={{ height: 35, width: width * 0.8, backgroundColor: "#fafafa", marginTop: 10, paddingLeft: 5 }}
                        selectionColor={themeColor}
                        onChangeText={(confirmNewPassword) => { this.setState({ confirmNewPassword }) }}
                    />
                </View>
                 <View style={{alignItems:"center",justifyContent:"center",marginVertical:30}}>
                     {!this.state.creating?<TouchableOpacity style={{height:height*0.05,width:width*0.4,alignItems:"center",justifyContent:"center",backgroundColor:primaryColor}}
                      onPress={()=>{this.save()}}
                     >
                           <Text style={[styles.text,{color:"#fff"}]}>Save</Text>
                     </TouchableOpacity>:
                     <View  style={{height:height*0.05,width:width*0.4,alignItems:"center",justifyContent:"center",backgroundColor:primaryColor}}>
                          <ActivityIndicator  size={"large"} color={"#fff"}/>
                     </View>
                     }
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
export default connect(mapStateToProps, { selectTheme })(PasswordScreen);