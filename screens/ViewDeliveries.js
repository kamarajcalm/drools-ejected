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
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import MoriningDeliveries from './MoriningDeliveries';
import AfterNoonDeliveries from './AfterNoonDeliveries';
import NightDeliveries from './NightDeliveries';
import DropDownPicker from 'react-native-dropdown-picker';

 class ViewDeliveries extends Component {
  constructor(props) {
          let item = props.route.params.item
    super(props);
   
    this.state = {
       item,
      items:[
          { label: 'Completed', value: 'Completed' },
          { label: 'Declined', value: 'Declined' },
          { label: 'PreparedNDeclined', value: 'PreparedNDeclined' },
          { label: 'Pending', value: 'Pending' },
       
      ],
      open:false,
      value:item.sub_status
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
save = async()=>{
  let api = `${url}/api/drools/completeBills/`
  let sendData ={
      order:this.state.item.id,
      status:this.state.value
  }
  let post  = await HttpsClient.post(api,sendData)
  console.log(post)
  if(post.type=="success"){
       this.showSimpleMessage("order saved Successfully","green","success")
       return this.props.navigation.goBack()
  }else{
     this.showSimpleMessage("Try Again","red","danger")
  }
}
    setOpen =(open)=> {
        this.setState({
            open
        });
    }

    setValue =(callback)=> {
        this.setState(state => ({
            value: callback(state.value)
        }));
    }

    setItems = (callback) =>{
        this.setState(state => ({
            items: callback(state.items)
        }));
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
        const { index, routes } = this.state
         const { open, value, } = this.state;
    return (
      <View style={{flex:1}}>
            {/* Headers */}
            <LinearGradient
                style={{ height: height * 0.12, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                colors={gradients}
            >
                <View style={{ marginTop: Constants.statusBarHeight, flex: 1, flexDirection: "row" }}>
                    <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                        <Ionicons name="caret-back" size={24} color={secondaryColor} />
                    </TouchableOpacity>
                    <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" ,flexDirection:"row" }}>
                      <View>
                                <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Details</Text>
                      </View>
                    

                    </View>
                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                    </View>
                </View>
            </LinearGradient>
               <ScrollView style={{backgroundColor:"#000"}}>
                     <View style={{paddingHorizontal:10}}>
                            <View style={{alignItems:"center",justifyContent:"center"}}>
                                  <Text style={[styles.text,{color:"#fff",fontSize:22,textDecorationLine:"underline"}]}>User Details :</Text>
                            </View>
                            <View style={{paddingHorizontal:10,marginTop:10}}>
                                    <View style={{flexDirection:"row"}}>
                                      <View style={{alignItems:"center",justifyContent:"center"}}>
                                              <Text style={[styles.text,{color:"#fff",fontSize:22,textDecorationLine:"underline"}]}>Name:</Text>
                                      </View>
                                       <View style={{marginLeft:10,alignItems:"center",justifyContent:"center"}}>
                                               <Text style={[styles.text,{color:primaryColor,fontSize:22,}]}>{this.state?.item?.userDetails?.name}</Text>
                                       </View>
                                      
                                    </View>
                            </View>
                                <View style={{paddingHorizontal:10,marginTop:10}}>
                                    <View style={{flexDirection:"row"}}>
                                      <View style={{alignItems:"center",justifyContent:"center"}}>
                                              <Text style={[styles.text,{color:"#fff",fontSize:22,textDecorationLine:"underline"}]}>Address:</Text>
                                      </View>
                                       <View style={{marginLeft:10,alignItems:"center",justifyContent:"center"}}>
                                               <Text style={[styles.text,{color:primaryColor,fontSize:22,}]}>{this.state?.item?.userDetails?.address}</Text>
                                       </View>
                                      
                                    </View>
                            </View>
                               <View style={{paddingHorizontal:10,marginTop:10}}>
                                    <View style={{flexDirection:"row"}}>
                                      <View style={{alignItems:"center",justifyContent:"center"}}>
                                              <Text style={[styles.text,{color:"#fff",fontSize:22,textDecorationLine:"underline"}]}>Street:</Text>
                                      </View>
                                       <View style={{marginLeft:10,alignItems:"center",justifyContent:"center"}}>
                                               <Text style={[styles.text,{color:primaryColor,fontSize:22,}]}>{this.state?.item?.userDetails?.street}</Text>
                                       </View>
                                      
                                    </View>
                            </View>
                                  <View style={{paddingHorizontal:10,marginTop:10}}>
                                    <View style={{flexDirection:"row"}}>
                                      <View style={{alignItems:"center",justifyContent:"center"}}>
                                              <Text style={[styles.text,{color:"#fff",fontSize:22,textDecorationLine:"underline"}]}>Phone No:</Text>
                                      </View>
                                       <View style={{marginLeft:10,alignItems:"center",justifyContent:"center"}}>
                                               <Text style={[styles.text,{color:primaryColor,fontSize:22,}]}>{this.state?.item?.userDetails?.mobile}</Text>
                                       </View>
                                      
                                    </View>
                            </View>
                     </View>
                     <View style={{paddingHorizontal:10}}>
                           <View style={{alignItems:"center",justifyContent:"center",marginTop:20,}}>
                                  <Text style={[styles.text,{color:"#fff",fontSize:22,textDecorationLine:"underline"}]}>Order Details :</Text>
                            </View>
                                    <View style={{paddingHorizontal:10,marginTop:10}}>
                                    <View style={{flexDirection:"row"}}>
                                      <View style={{alignItems:"center",justifyContent:"center"}}>
                                              <Text style={[styles.text,{color:"#fff",fontSize:22,textDecorationLine:"underline"}]}>Combo:</Text>
                                      </View>
                                       <View style={{marginLeft:10,alignItems:"center",justifyContent:"center"}}>
                                               <Text style={[styles.text,{color:primaryColor,fontSize:22,}]}>{this.state?.item?.itemDetails?.title}</Text>
                                       </View>
                                      
                                    </View>
                                    <View style={{alignItems:"center",justifyContent:"center",marginTop:10}}>
                                           <Text style={[styles.text,{color:"#fff",fontSize:22,textDecorationLine:"underline"}]}>Items :</Text>
                                    </View>
                                    
                                        {
                                          this.state?.item?.itemDetails?.items.map((item,index)=>{
                                                  return(
                                                    <View key ={index} style={{flexDirection:"row",marginTop:10,alignItems:"center",justifyContent:"center"}}>
                                                        <View>
                                                              <Text style={[styles.text,{color:"#fff"}]}>{index+1} .</Text>
                                                        </View>
                                                        <View>
                                                            <Text style={[styles.text,{color:primaryColor}]}>{item}</Text>
                                                        </View>
                                                    </View>
                                                  )
                                          })
                                        }
                        
                            </View>
                     </View>
                            <View style={{marginTop:20,flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
                             <TouchableOpacity style={{height:26,width:26,backgroundColor:"#fff",elevation:5,alignItems:"center",justifyContent:"center",borderRadius:13}}
                               onPress={()=>{this.callNumber(this.state.item.userDetails.mobile)}}
                             >
                                <Feather name="phone" size={20} color= {primaryColor}/>
                              </TouchableOpacity>
                               <TouchableOpacity style={{height:26,width:26,backgroundColor:"#fff",elevation:5,alignItems:"center",justifyContent:"center",borderRadius:13}}
                                    onPress={()=>{
                                      Linking.openURL(
                                    `https://www.google.com/maps/dir/?api=1&destination=` +
                                   this.state.item.userDetails.lat +
                                    `,` +
                                    this.state.item.userDetails.lang +
                                    `&travelmode=driving`
                                );
                                 }}
                               >
                             <FontAwesome5 name="directions" size={20} color={primaryColor}/>
                              </TouchableOpacity>
                     </View>
                     <View>
                       <View style={{paddingHorizontal:20,marginTop:20}}>
                           <Text style={[styles.text,{color:"#fff",textDecorationLine:"underline",fontSize:22}]}>Select Status :</Text>
                       </View>
                       <View style={{height:this.state.open?height*0.3:height*0.08,paddingHorizontal:20,marginTop:10}}>
                    <DropDownPicker
                        
                        style={{height:height*0.05,width:width*0.6}}
                        containerStyle={{height:height*0.05,width:width*0.6}}
                        open={open}
                        value={value}
                        items={this.state.items}
                        setOpen={this.setOpen}
                        setValue={this.setValue}
                        setItems={this.setItems}
                        placeholder ="select a day"
                    />
                       </View>
                
                     </View>
                     <View style={{alignItems:"center",justifyContent:"center",marginVertical:20}}>
                              <TouchableOpacity 
                              style={{height:height*0.05,width:width*0.3,alignItems:"center",justifyContent:"center",backgroundColor:primaryColor}}
                               onPress={()=>{this.save()}}
                              >
                                          <Text style={[styles.text,{color:"#fff"}]}>Save</Text>
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
    }
}
export default connect(mapStateToProps, { selectTheme })(ViewDeliveries);