import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, Alert, AsyncStorage,ScrollView} from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily = settings.fontFamily
const themeColor = settings.themeColor
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import orders from '../data/orders';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import momemt from 'moment';
import { CommonNavigationAction, CommonActions } from '@react-navigation/native'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Linking } from 'react-native';
class ProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
componentDidMount(){
  console.log(this.props.user)
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
                        <Text style={[styles.text,{color:"#fff",fontSize:20}]}>{this.props?.user?.name}</Text>
                   </View>
                </View>  
                  <View style={{flexDirection:"row",marginTop:20}}>
                  <View style={{flex:0.5,flexDirection:"row"}}>
                    <View style={{flex:0.9,alignItems:"center",justifyContent:"center"}}>
                           <Text style={[styles.text,{color:"#fff",fontSize:20}]}>Mobile</Text>
                    </View>
                     <View style={{flex:0.1,alignItems:"center",justifyContent:"center"}}>
                           <Text style={[styles.text,{color:"#fff",fontSize:20}]}> : </Text>
                     </View>
                  </View>
                   <View style={{flex:0.5,alignItems:"center",justifyContent:"center"}}>
                        <Text style={[styles.text,{color:"#fff",fontSize:20}]}>{this.props?.user?.user.username}</Text>
                   </View>
                </View>
                    <View style={{flexDirection:"row",marginTop:20}}>
                  <View style={{flex:0.5,flexDirection:"row"}}>
                    <View style={{flex:0.9,alignItems:"center",justifyContent:"center"}}>
                           <Text style={[styles.text,{color:"#fff",fontSize:20}]}>Address</Text>
                    </View>
                     <View style={{flex:0.1,alignItems:"center",justifyContent:"center"}}>
                           <Text style={[styles.text,{color:"#fff",fontSize:20}]}> : </Text>
                     </View>
                  </View>
                   <View style={{flex:0.5,alignItems:"center",justifyContent:"center"}}>
                        <Text style={[styles.text,{color:"#fff",fontSize:20}]}>{this.props?.user?.address}</Text>
                   </View>
                </View>
                      <View style={{flexDirection:"row",marginTop:20}}>
                  <View style={{flex:0.5,flexDirection:"row"}}>
                    <View style={{flex:0.9,alignItems:"center",justifyContent:"center"}}>
                           <Text style={[styles.text,{color:"#fff",fontSize:20}]}>Street</Text>
                    </View>
                     <View style={{flex:0.1,alignItems:"center",justifyContent:"center"}}>
                           <Text style={[styles.text,{color:"#fff",fontSize:20}]}> : </Text>
                     </View>
                  </View>
                   <View style={{flex:0.5,alignItems:"center",justifyContent:"center"}}>
                        <Text style={[styles.text,{color:"#fff",fontSize:20}]}>{this.props?.user?.street}</Text>
                   </View>
                </View>
                <View style={{alignItems:"center",justifyContent:"center",marginVertical:30}}>
                     <TouchableOpacity style={{height:height*0.05,width:width*0.4,alignItems:"center",justifyContent:"center",backgroundColor:primaryColor}}
                      onPress={()=>{this.props.navigation.navigate("EditAccount")}}
                     >
                           <Text style={[styles.text,{color:"#fff"}]}>Edit</Text>
                     </TouchableOpacity>
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