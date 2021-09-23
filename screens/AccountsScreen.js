import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
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
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import orders from '../data/orders';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import momemt from 'moment';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import Modal from 'react-native-modal';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5, AntDesign} from '@expo/vector-icons';
import HttpsClient from '../HttpsClient';
import MonthPicker from 'react-native-month-year-picker';

const months = ["January","Febrauary","March","April","May","June","July","August","September","Octobor","November","December"]
const screenHeight =Dimensions.get("screen").height
class AccountsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
           data :[],
            date2: momemt(new Date()).format("YYYY-MM-DD"),
            totalPrice:"",
            phonepeTotaldown:"",
            cashTotaldown:"",
            onlineTotaldown:"",
            personal1Totaldown:"",
            personal2Totaldown:"",
            refreshing:false,
            cashTotal:null,
            onlineTotal:null,
            personal1Total:null,
            personal2Total:null,
            phonepeTotal:null
        };
    }
   getAccounts = async()=>{
      let api =`${url}/api/drools/expenseDate/?date=${this.state.date2}`
      console.log(api)
      const data =await HttpsClient.get(api)
      if(data.type=="success"){
          let dataa = []
          let total={

          }
           for(let property in data.data){
             if(data.data[property]?.items){
                   total[`${property}total`] = data.data[property].total
                   data.data[property].items.forEach((item)=>{
                      
                    let pushObj = {
                        type:property,
                        title:item.title,
                        total_price:item.total_price,
                        orderType:item.type
                    } 
                   
                  dataa.push(pushObj)
                })
             }
          
         
           }
           console.log(total)
           this.setState({
             data:dataa,
             totalPrice:data.data.total_price,
             phonepeTotaldown:total.Phonepetotal,
             cashTotaldown:total.Cashtotal,
             onlineTotaldown:total.Onlinetotal,
             personal1Totaldown:total.Personal1total,
             personal2Totaldown:total.Personal2total
            })
      }
   } 
   getBalances = async()=>{
       let api =`${url}/api/drools/getBalance/`
       let data  = await HttpsClient.get(api)
       if(data.type=="success"){
           this.setState({
               cashTotal:data.data.Cash,
               onlineTotal:data.data.Online,
               personal1Total:data.data.Personal1,
               personal2Total:data.data.Personal2,
               phonepeTotal:data.data.Phonepe
           })
       }
   }
    componentDidMount() {
       this.getAccounts()
       this.getBalances()
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
   header =()=>{
     return (
  
         <View style={{flexDirection:"row",marginTop:10,borderColor:"gray",borderWidth:1,}}>
               <View style={{width:width*0.1,alignItems:"center",justifyContent:"center",borderColor: "gray", borderRightWidth: 1,}}>
                <Text style={[styles.text,{color:"#fff"}]}>#</Text>
            </View>
            <View style={{width:width*0.3,alignItems:"center",justifyContent:"center",borderColor: "gray", borderRightWidth: 1,}}>
                <Text style={[styles.text,{color:"#fff"}]}>Phonepe</Text>
            </View>
            <View style={{width:width*0.3,alignItems:"center",justifyContent:"center",borderColor: "gray", borderRightWidth: 1,}}>
                <Text style={[styles.text,{color:"#fff"}]}>Cash</Text>
            </View>
            <View style={{width:width*0.3,alignItems:"center",justifyContent:"center",borderColor: "gray", borderRightWidth: 1,}}>
                <Text style={[styles.text,{color:"#fff"}]}>Online</Text>
            </View>
              <View style={{width:width*0.3,alignItems:"center",justifyContent:"center",borderColor: "gray", borderRightWidth: 1,}}>
                <Text style={[styles.text,{color:"#fff"}]}>Personal 1</Text>
            </View>
            <View style={{width:width*0.3,alignItems:"center",justifyContent:"center",borderColor: "gray", borderRightWidth: 1,}}>
                <Text style={[styles.text,{color:"#fff"}]}>Personal 2</Text>
            </View>
         </View>
       
        
     )
   }
   getColor =(item)=>{
      if(item.orderType=="Order"){
          return "green"
      }
      return "red"
   }
    hideDatePicker2 = () => {
        this.setState({ show2: false }, () => {
       
        })
    };
    handleConfirm2 = (date) => {
        this.setState({ date2: momemt(date).format("YYYY-MM-DD"), }, () => {
          
        })
        this.hideDatePicker2();
    };
    footer =()=>{
      return(
          <>
        <View style={{flexDirection:"row",borderColor:"gray",borderWidth:1,}}>
               <View style={{width:width*0.1,alignItems:"center",justifyContent:"center",borderColor: "gray", borderRightWidth: 1,}}>
                
            </View>
            <View style={{width:width*0.3,alignItems:"center",justifyContent:"center",borderColor: "gray", borderRightWidth: 1,}}>
                <Text style={[styles.text,{color:"#fff"}]}>{this.state.phonepeTotaldown}</Text>
            </View>
            <View style={{width:width*0.3,alignItems:"center",justifyContent:"center",borderColor: "gray", borderRightWidth: 1,}}>
                <Text style={[styles.text,{color:"#fff"}]}>{this.state.cashTotaldown}</Text>
            </View>
            <View style={{width:width*0.3,alignItems:"center",justifyContent:"center",borderColor: "gray", borderRightWidth: 1,}}>
                <Text style={[styles.text,{color:"#fff"}]}>{this.state.onlineTotaldown}</Text>
            </View>
              <View style={{width:width*0.3,alignItems:"center",justifyContent:"center",borderColor: "gray", borderRightWidth: 1,}}>
                <Text style={[styles.text,{color:"#fff"}]}>{this.state.personal1Totaldown}</Text>
            </View>
            <View style={{width:width*0.3,alignItems:"center",justifyContent:"center",borderColor: "gray", borderRightWidth: 1,}}>
                <Text style={[styles.text,{color:"#fff"}]}>{this.state.personal2Totaldown}</Text>
            </View>
         
         </View>
              <View style={{marginVertical:20,alignItems:"center",justifyContent:"center"}}>
                <Text style={[styles.text,{color:"#fff"}]}>Total: {this.state.totalPrice}</Text>
               </View>
               </>
      )
    }
    getTotalPrice =(item)=>{
  

        if(item.orderType=="Order"){
           return ` + ${item.total_price}`
        }

         return ` - ${item.total_price}`
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: themeColor }}>

                <LinearGradient
                    style={{ height: height * 0.12, alignItems: "center", justifyContent: "center" }}
                    colors={gradients}
                >
                    <View
                        style={{ marginTop: Constants.statusBarHeight, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                    >


                        <TouchableOpacity style={{ flex: 0.15, alignItems: "center", justifyContent: "center" }}
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Ionicons name="caret-back" size={24} color={secondaryColor} />
                        </TouchableOpacity>
                        <View style={{ flex: 0.45,alignItems:"flex-end"  }}>
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 ,}]}>Accounts</Text>

                        </View>
                         <TouchableOpacity style={{ flex: 0.4, alignItems: "center", justifyContent: "center" ,flexDirection:"row"}}
                         onPress={()=>{this.setState({show2:true})}}
                        >
                            <Text style={[styles.text,{color:"#fff"}]}>{this.state.date2}</Text>
                            <MaterialIcons name="date-range" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                <View style={{flex:1}}>
                  <View style={{alignItems:"center",justifyContent:"space-around",marginVertical:10,flexWrap:"wrap",flexDirection:"row"}}>
                    <View style={{marginTop:10}}>
                                <Text style={[styles.text,{color:"#fff"}]}>Phonepe  : ₹ {this.state.phonepeTotal}</Text>
                    </View>
                     <View style={{marginTop:10}}>
                            <Text style={[styles.text,{color:"#fff"}]}>Cash  : ₹ {this.state.cashTotal}</Text>
                       </View>     
                       <View style={{marginTop:10}}>
                               <Text style={[styles.text,{color:"#fff"}]}>Online  : ₹ {this.state.onlineTotal}</Text>
                       </View>
                         <View style={{marginTop:10}}>
                           <Text style={[styles.text,{color:"#fff"}]}>Personal1  : ₹ {this.state.personal1Total}</Text>
                           </View>  
                            <View style={{marginTop:10}}>
                                 <Text style={[styles.text,{color:"#fff"}]}>Personal2  : ₹ {this.state.personal2Total}</Text>
                            </View>
                           
                  </View>
                  <ScrollView 
                    horizontal={true}
                  >
                            <FlatList 
                              refreshing={this.state.refreshing}
                              onRefresh={()=>{
                                this.getAccounts()
                              }}
                              ListFooterComponent={this.footer()}
                              ListHeaderComponent={this.header()}
                              data={this.state.data}
                              keyExtractor={(item,index)=>index.toString()}
                              renderItem={({item,index})=>{
                              
                                  return (
                                      <View style={{flexDirection:"row",borderColor:"gray",borderWidth:1,}}>
                                            <View style={{width:width*0.1,alignItems:"center",justifyContent:"center",borderColor: "gray", borderRightWidth: 1,}}>
                                                  <Text style={[styles.text,{color:"#fff"}]}>{index+1}</Text>
                                              </View>
                                            <View style={{width:width*0.3,alignItems:"center",justifyContent:"center",borderColor: "gray", borderRightWidth: 1,}}>
                                              <View>
                                                  <Text style={[styles.text,{color:this.getColor(item)}]}>{item.type=="Phonepe"&& this.getTotalPrice(item)}</Text>
                                              </View>
                                              <View>
                                                   <Text style={[styles.text,{color:"#fff"}]}>{item.type=="Phonepe"&& (item.title)}</Text>
                                              </View>
                                            </View>
                                            <View style={{width:width*0.3,alignItems:"center",justifyContent:"center",borderColor: "gray", borderRightWidth: 1,}}>
                                                  <View>
                                                  <Text style={[styles.text,{color:this.getColor(item)}]}>{this.getTotalPrice(item)}</Text>
                                              </View>
                                              <View>
                                                   <Text style={[styles.text,{color:"#fff"}]}>{item.type=="Cash"&& (item.title)}</Text>
                                              </View>
                                            </View>
                                            <View style={{width:width*0.3,alignItems:"center",justifyContent:"center",borderColor: "gray", borderRightWidth: 1,}}>
                                                     <View>
                                                  <Text style={[styles.text,{color:this.getColor(item)}]}>{item.type=="Online"&&this.getTotalPrice(item)}</Text>
                                              </View>
                                              <View>
                                                   <Text style={[styles.text,{color:"#fff"}]}>{item.type=="Online"&& (item.title)}</Text>
                                              </View>
                                            </View>
                                              <View style={{width:width*0.3,alignItems:"center",justifyContent:"center",borderColor: "gray", borderRightWidth: 1,}}>
                                                       <View>
                                                  <Text style={[styles.text,{color:this.getColor(item)}]}>{item.type=="Personal1"&&this.getTotalPrice(item)}</Text>
                                              </View>
                                              <View>
                                                   <Text style={[styles.text,{color:"#fff"}]}>{item.type=="Personal1"&& (item.title)}</Text>
                                              </View>
                                            </View>
                                            <View style={{width:width*0.3,alignItems:"center",justifyContent:"center",borderColor: "gray", borderRightWidth: 1,}}>
                                                           <View>
                                                  <Text style={[styles.text,{color:this.getColor(item)}]}>{item.type=="Personal2"&&this.getTotalPrice(item)}</Text>
                                              </View>
                                              <View>
                                                   <Text style={[styles.text,{color:"#fff"}]}>{item.type=="Personal2"&& (item.title)}</Text>
                                              </View>
                                            </View>
                                        </View>
                                  )
                              }}
                            /> 
                              <DateTimePickerModal
                                  testID={"2"}
                                  isVisible={this.state.show2}
                                  mode="date"
                                  onConfirm={this.handleConfirm2}
                                  onCancel={this.hideDatePicker2}
                              />

                  </ScrollView>
                </View>
                 
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
export default connect(mapStateToProps, { selectTheme })(AccountsScreen);