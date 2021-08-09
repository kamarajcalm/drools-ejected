import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Alert, StyleSheet, FlatList, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView ,Linking} from 'react-native';
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
import orders from '../data/orders'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import HttpsClient from '../HttpsClient';
const screenHeight = Dimensions.get("screen").height
import momemt from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
export default class MoriningDeliveries extends Component {
      constructor(props) {
        super(props);
        this.state = {
          show:false,
          orders:[],
          today:momemt(new Date()).format("YYYY-MM-DD"),
        };
    }
       hideDatePicker = () => {
        this.setState({show:false})
    };
    handleConfirm = (date) => {
        this.setState({ today: momemt(date).format("YYYY-MM-DD"), orders:[]},()=>{
        this.getDeliveries()
        })
        this.hideDatePicker();
    };
    getDeliveries = async() =>{
      let api =`${url}/api/drools/suborders/?category=MORNING&date=${this.state.today}`
      let data = await HttpsClient.get(api)
      if(data.type =="success"){
           this.setState({orders:data.data})
      }
    }
    componentDidMount(){
          this.getDeliveries()
          this._unsubscribe = this.props.navigation.addListener('focus', () => {
                this.getDeliveries()
       });
    }
    componentWillUnmount(){
      this._unsubscribe()
    }
    validateColor =(status)=>{
        if(status =="Completed"){
          return "green"
        }
          if(status =="Declined"){
          return "red"
        }
        if(status =="PreparedNDeclined"){
          return "red"
        }
            if(status =="Pending"){
          return "orange"
        }
    }
    callNumber = phone => {
  console.log('callNumber ----> ', phone);
  let phoneNumber = phone;
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
  }
  else  {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
  .then(supported => {
    if (!supported) {
      Alert.alert('Phone number is not available');
    } else {
      return Linking.openURL(phoneNumber);
    }
  })
  .catch(err => console.log(err));
};
  render() {
    return (
      <View style={{flex:1,backgroundColor:"#000"}}>
           <LinearGradient
                    style={{ height: height * 0.05, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                    colors={gradients}
                >
                    <View style={{ flex: 1, flexDirection: "row" }}
                        onPress={() => { this.props.setShowIncome(true) }}
                    >
                       
                        <View style={{ flex: 0.7, alignItems: "center", justifyContent: "center" }}>
                          
                         
                        </View>
                        <TouchableOpacity style={{ flex: 0.3, alignItems: "center", justifyContent: "space-around" ,flexDirection:"row"}}
                         onPress ={()=>{this.setState({show:true})}}
                        > 
                        <View>
                          <Text style={[styles.text,{color:"#fff"}]}>{this.state.today}</Text>
                        </View>
                            <Fontisto name="date" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            <FlatList 
              data={this.state.orders}
              keyExtractor={(item,index)=>index.toString()}
              renderItem ={({item,index})=>{
                  return(
                    <TouchableOpacity style={{flexDirection:"row",paddingVertical:20,borderBottomWidth:0.5,borderColor:"gray"}}
                     onPress={()=>{this.props.navigation.navigate('ViewDeliveries',{item})}}
                    >
                         <View style={{flex:0.1,alignItems:"center",justifyContent:"center"}}>
                              <Text style={[styles.text,{color:"#fff"}]}>{index+1} .</Text>
                         </View>
                         <View style={{flex:0.7,alignItems:"center",justifyContent:"center"}}>
                               <View>
                                   <Text style={[styles.text,{color:"#fff",fontSize:22}]}>{item.userDetails.name}</Text>
                               </View>
                               <View style={{marginTop:10}}>
                                     <Text style={[styles.text,{color:primaryColor,}]}>{item.itemDetails.title}</Text>
                               </View>
                               <View style={{marginTop:10,alignSelf:"flex-end",flexDirection:"row"}}>
                                 <View>
                                            <Text style={[styles.text,{color:"#fff",}]}> status</Text>
                                 </View>
                                <View>
                                     <Text style={[styles.text,{color:this.validateColor(item.sub_status)}]}> :{item.sub_status}</Text>
                                </View>
                               </View>
                         </View>
                         <View style={{flex:0.2,alignItems:"center",justifyContent:"space-around"}}>
                              <TouchableOpacity style={{height:26,width:26,backgroundColor:"#fff",elevation:5,alignItems:"center",justifyContent:"center",borderRadius:13}}
                               onPress={()=>{this.callNumber(item.userDetails.mobile)}}
                              >
                                <Feather name="phone" size={20} color= {primaryColor}/>
                              </TouchableOpacity>
                               <TouchableOpacity style={{height:26,width:26,backgroundColor:"#fff",elevation:5,alignItems:"center",justifyContent:"center",borderRadius:13}}
                                 onPress={()=>{
                                      Linking.openURL(
                                    `https://www.google.com/maps/dir/?api=1&destination=` +
                                   item.userDetails.lat +
                                    `,` +
                                     item.userDetails.lang +
                                    `&travelmode=driving`
                                );
                                 }}
                               >
                             <FontAwesome5 name="directions" size={20} color={primaryColor}/>
                              </TouchableOpacity>
                         </View>
                    </TouchableOpacity>
                  )
              }}
            />  
               <DateTimePickerModal
                    isVisible={this.state.show}
                    mode="date"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    text: {
        fontFamily
    }
})