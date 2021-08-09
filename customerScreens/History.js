import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Alert, StyleSheet, FlatList, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment  from 'moment';
const screenHeight = Dimensions.get("screen").height;
 class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
        today:moment(new Date()).format("YYYY-MM-DD"),
          show:false,
          orders:[],
          refreshing:false
    };
  }
    hideDatePicker = () => {
        this.setState({show:false})
    };
    handleConfirm = (date) => {
        this.setState({ today: moment(date).format("YYYY-MM-DD"), orders:[]},()=>{
        this.getOrders()
        })
        this.hideDatePicker();
    };
    getOrders = async() =>{
      this.setState({refreshing:true})
            let api =`${url}/api/drools/suborders/?user=${this.props.user.user.id}&date=${this.state.today}`
            let data = await HttpsClient.get(api)
            if(data.type=="success"){
                this.setState({orders:data.data,refreshing:false})
            }else{
               this.setState({refreshing:false})
            }
            
    }
    componentDidMount(){
        this.getOrders()
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
    refresh =()=>{
        this.getOrders()
    }
  render() {
    return (
      <View style={{flex:1,backgroundColor:"#000"}}>
             {/* Headers */}
        <LinearGradient
          style={{ height: height * 0.12, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
          colors={gradients}
        >
          <View style={{ marginTop: Constants.statusBarHeight, flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}
           
            >
       
            </View>
            <View style={{ flex: 0.4, alignItems: "center", justifyContent: "center" }}>
              <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>History</Text>

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
          refreshing ={this.state.refreshing}
          onRefresh ={()=>{this.refresh()}}
          data={this.state.orders}
          keyExtractor={(item,index)=>index.toString()}
          renderItem={({item,index})=>{
             return(
                <TouchableOpacity style={{flexDirection:"row",paddingVertical:20,borderBottomWidth:0.5,borderColor:"gray"}}
                     onPress={()=>{}}
                    >
                         <View style={{flex:0.1,alignItems:"center",justifyContent:"center"}}>
                              <Text style={[styles.text,{color:"#fff"}]}>{index+1} .</Text>
                         </View>
                         <View style={{flex:0.6,alignItems:"center",justifyContent:"center"}}>
                               <View>
                                   <Text style={[styles.text,{color:"#fff",fontSize:22}]}>{item.category}</Text>
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
                          <View style={{flex:0.3,alignItems:"center",justifyContent:"space-around"}}>
                              {
                                item.itemDetails.items.map((item,index)=>{
                                      return(
                                        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}} key={index}>
                                             <View>
                                                  <Text style={[styles.text,{color:"#fff"}]}>{index+1}.</Text>
                                             </View>
                                             <View>
                                                  <Text style={[styles.text,{color:"#fff"}]}>{item}</Text>
                                             </View>
                                        </View>
                                      )
                                })
                              } 
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
    user:state.selectedUser
  }
}
export default connect(mapStateToProps, { selectTheme })(History);