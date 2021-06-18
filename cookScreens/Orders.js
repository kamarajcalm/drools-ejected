import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, Alert} from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily =settings.fontFamily
const themeColor = settings.themeColor
const url = settings.url
import { StatusBar ,} from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import cookOrders from '../data/cookOrders';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5, Foundation } from '@expo/vector-icons';
import { set } from 'react-native-reanimated';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import Modal from 'react-native-modal';
import HttpsClient from '../HttpsClient';
const screenHeight = Dimensions.get('screen').height
 class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
             cookOrders:[],
             Modal:false,
             selectedItem:null
        };
    }
     getOrders = async ()=>{
         let api = `${url}/api/drools/cookOrders/`
         let data =await HttpsClient.get(api)
         console.log(data)
         if(data.type =="success"){
             this.setState({ cookOrders:data.data})
         }
     }
     componentDidMount() {
         this.getOrders()
         this._unsubscribe = this.props.navigation.addListener('focus', () => {
             this.getOrders()

         });
     }
     componentWillUnmount() {
         this._unsubscribe()
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
     createAlert = (item,index)=>{
         Alert.alert(
             `Complete ${item.item}`,
             ``,
             [
                 {
                     text: "No",
                     onPress: () => console.log("Cancel Pressed"),
                     style: "cancel"
                 },
                 { text: "Yes", onPress: () => { this.completeOrder(item,index) } }
             ]
         );
     }
     completeOrder = (item, index)=>{
         this.showSimpleMessage("Completed SuccessFully", "#00A300", "success")
         let duplicate = this.state.cookOrders
         duplicate[index].isCompleted = true
         this.setState({ cookOrders: duplicate})
      
     }
     clearTable = (item, index)=>{
           let duplicate =this.state.cookOrders
           duplicate.splice(index,1)
           this.setState({ cookOrders:duplicate})
     }
     clearAlert2 =(item,index)=>{
         Alert.alert(
             `Are you sure to clear Table ${item.tableNo}`,
             ``,
             [
                 {
                     text: "No",
                     onPress: () => console.log("Cancel Pressed"),
                     style: "cancel"
                 },
                 { text: "Yes", onPress: () => { this.clearTable(item, index) } }
             ]
         );
     }
     renderheader =()=>{
         return(
             <View style={{ alignItems: "center" }}>
                 <Text style={[styles.text, { color: "#fff", textDecorationLine: "underline" }]}>Required Items :</Text>
             </View>

         )
     }
     startCooking = (item, index)=>{
         this.showSimpleMessage("Started SuccessFully", "#00A300", "success")
         let duplicate = this.state.cookOrders
         duplicate[index].isStarted = true
         this.setState({ cookOrders: duplicate })
     }

     increaseCount =()=>{
         let duplicate =this.state.selectedItem
         duplicate.completedCount = duplicate.completedCount+1
         this.setState({ selectedItem: duplicate})
         
     }
     decreaseCount =()=>{
         let duplicate = this.state.selectedItem
         duplicate.completedCount = duplicate.completedCount - 1
         this.setState({ selectedItem:duplicate})
     }
     completeOrder =()=>{
         this.setState({modal:false})
         this.showSimpleMessage("order completed SuccessFully", "#00A300", "success")
     }
     completeModal =()=>{
         return(
             <Modal 
               onBackdropPress={() => { this.setState({ modal:false})}}
               statusBarTranslucent={true}
               deviceHeight={screenHeight}
               isVisible={this.state.modal}
             >
             <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                   <View style={{height:height*0.4,backgroundColor:"#fff",width:width*0.9,borderRadius:10}}>
                       <View style={{alignItems:"center",paddingVertical:10}}>
                           <Text style={[styles.text,{color:primaryColor,fontSize:22,textDecorationLine:"underline"}]}>Complete Order</Text>
                       </View>
                       <View style={{flexDirection:"row",paddingHorizontal:20,marginTop:10}}>
                           <View style={{alignItems:"center",justifyContent:"center"}}>
                                 <Text style={[styles.text]}>Item Name : </Text>
                                
                           </View>
                             <View style={{ alignItems: "center", justifyContent: "center" }}>
                                 <Text style={[styles.text, { color: "#000", fontSize: 20 }]}>{this.state?.selectedItem?.item} </Text>
                            </View>   
                       </View>
                         <View style={{ flexDirection: "row", paddingHorizontal: 20,marginTop:10}}>
                             <View style={{alignItems:"center",justifyContent:"center"}}>
                                 <Text style={[styles.text]}>Total Count Required : </Text>
                             </View>
                             <View style={{alignItems:'center',justifyContent:"center"}}>
                                 <Text style={[styles.text, { color: "#000", fontSize: 20 }]}>{this.state?.selectedItem?.count}</Text>

                             </View>
                         </View>
                         <View style={{ paddingHorizontal: 20, marginTop: 10}}>
                             <View>
                                 <Text style={[styles.text]}>Table Details :</Text>
                             </View>
                             {
                                 this.state?.selectedItem?.tables.map((i,idx)=>{
                                     return(
                                         <View key={idx}
                                          style={{flexDirection:"row",marginLeft:10,marginTop:10}}
                                         >
                                           
                                             <View style={{alignItems:"center",justifyContent:"center"}}>
                                                 <Text style={[styles.text, { color: '#000' }]}>Table : </Text>
                                             </View>
                                             <View style={{alignItems:"center",justifyContent:"center"}}>
                                                 <Text style={[styles.text, { color: '#000' ,fontSize:20,fontWeight:"bold"}]}>{i.tableNO} </Text>
                                             </View>
                                             <View style={{alignItems:"center",justifyContent:"center"}}>
                                                 <Text style={[styles.text, { color: '#000' }]}>X </Text>
                                             </View>
                                             <View>
                                                 <Text style={[styles.text, { color: '#000' ,fontSize:20}]}>{i.count}</Text>
                                             </View>
                                         </View>
                                     )
                                 })
                             }
                         
                         </View>
                         <View style={{alignItems:"center",paddingVertical:20}}>
                             <TouchableOpacity style={{height:height*0.05,alignItems:"center",justifyContent:"center",backgroundColor:primaryColor,width:width*0.4}}
                              onPress={()=>{this.completeOrder()}}
                             >
                                 <Text style={[styles.text,{color:"#fff"}]}>Complete</Text>
                             </TouchableOpacity>
                         </View>
                   </View>
             </View>
             </Modal>
         )
     }
    render() {
      
        return (
            <View style={{flex:1,backgroundColor:themeColor}}>
                <StatusBar style={"light"}/>
                   {/* Headers */}
                    <LinearGradient
                        style={{ height: height * 0.12, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                        colors={gradients}
                    >
                    <View style={{marginTop:Constants.statusBarHeight,flexDirection:"row"}}>
                        <TouchableOpacity 
                        style ={{flex:0.2,alignItems:"center",justifyContent:"center"}}
                        >

                        </TouchableOpacity>
                        <View style={{flex:0.6,alignItems:"center",justifyContent:"center"}}>
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Orders</Text>
                        </View>
                        <View style={{flex:0.2,alignItems:"center",justifyContent:"center"}}>

                        </View>
                           
                    </View>
                    </LinearGradient>

                    <FlatList
                     
                    data={this.state.cookOrders}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={this.renderheader()}
                    renderItem={({ item, index }) => {
                            return (
                               <View style={{borderColor:"#333",borderBottomWidth:0.5,padding: 20,}}>
                                    <View style={{ marginTop: 10, flexDirection: "row", flex: 1 }} key={index}>
                                        <View style={{ flexDirection: "row", flex: 0.5 }}>
                                            <View style={{flexDirection:'row',flex:0.7}}>
                                                <View>
                                                    <Text style={[styles.text, { color: "#fff", fontSize: 20 }]}>{index + 1} . </Text>
                                                </View>
                                                <View>
                                                    <Text style={[styles.text, { color: "#fff", fontSize: 20 }]}>{item.title}</Text>
                                                </View>
                                            </View>
                                          
                                            <View style={{flex:0.3,alignItems:"center",justifyContent:"center"}}>
                                                <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}> X {item.itemcount}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}>
                                            <TouchableOpacity
                                                style={{ height: height * 0.04, backgroundColor: "#e58300", alignItems: "center", justifyContent: "center", width: "60%" }}
                                                onPress={() => {
                                                   this.props.navigation.navigate('ViewOrder',{item})

                                                }}

                                            >
                                                <Text style={[styles.text, { color: "#fff" }]}>View</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                               
                           
                               </View>
                            )
                        }}
                    />
           
               {
                   this.completeModal()
               }
            </View>
       
        );
    }
}
const styles =StyleSheet.create({
   text:{
       fontFamily
   }
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
    }
}
export default connect(mapStateToProps, { selectTheme })(Orders);