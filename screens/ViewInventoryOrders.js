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
const screenHeight = Dimensions.get("screen").height
import DropDownPicker from 'react-native-dropdown-picker';
const orderStatus = [
    {
        label: "Completed",
        value: "Completed"
    },
    {
        label: "Declined",
        value: "Declined"
    },
]

class ViewInventoryOrders extends Component {
    constructor(props) {
        super(props);
        let item = props.route.params.item

        this.state = {
            item,
            editmodal:false,
            ordervalue:orderStatus[0].value,
            open:false,
            Amount:"",
            selectedItem:null,
            modal:false,
            Amount2:"",
        };
    }
    getItem = async()=>{
        let api = `${url}/api/drools/orders/${this.state.item.id}/`
        let data = await HttpsClient.get(api)
        if(data.type =="success"){
            this.setState({item:data.data})
        }
    }
    setOpen = (open) => {
        this.setState({
            open
        });
    }

    setValue = (callback) => {

        this.setState(state => ({
            ordervalue: callback(state.value)
        }));
    }

    setItems = (callback) => {

        this.setState(state => ({
            items: callback(state.items)
        }));
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
    deleteItem = async()=>{
        let api = `${url}/api/drools/orders/${this.state.item.id}/`
        let patch = await HttpsClient.delete(api)
        if (patch.type == "success") {
            this.showSimpleMessage("Deleted SuccessFully", "green", "success")
      
           return this.props.navigation.goBack()
        } else {
            this.showSimpleMessage("Try Again", "red", "danger")
        }
    }
    edit = async()=>{
        if(this.state.Amount ==""){
            return this.showSimpleMessage("Please add Amount", "#dd7030",)
        }
        let api = `${url}/api/drools/orders/${this.state.item.id}/`
        let sendData ={
            order_status:this.state.ordervalue,
            amount:this.state.Amount
        }
        let patch = await HttpsClient.patch(api,sendData)
        if(patch.type =="success"){
            this.showSimpleMessage("Edited SuccessFully","green","success")
            this.getItem()
            this.setState({ editmodal: false, Amount:""})
        }else{
            this.showSimpleMessage("Try Again", "red", "danger")
        }
    }
    editSingle = async() =>{
        if (this.state.Amount2 == "") {
            return this.showSimpleMessage("Please add Amount", "#dd7030",)
        }
        let api = `${url}/api/drools/ingridientsub/${this.state.selectedItem.id}/`
        let sendData ={
            status:"InStock",
            price:this.state.Amount2
        }
        let patch =await HttpsClient.patch(api,sendData)
        console.log(patch)
        if(patch.type =="success"){
            this.showSimpleMessage("Edited SuccessFully", "green", "success")
            this.getItem()
            this.setState({modal:false, Amount2:""})
        }
        else {
            this.showSimpleMessage("Try Again", "red", "danger")
        }
    }
    createAlert = () => {
        Alert.alert(
            "Do you want to delete?",
            ``,
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => { this.deleteItem() } }
            ]
        );
    }
    modal =()=>{
        return(
            <Modal
                style={{ flex: 1 }}
                statusBarTranslucent={true}
                onBackdropPress={() => {
                    this.setState({
                       modal: false,
                    })
                }}
                deviceHeight={screenHeight}
                isVisible={this.state.modal}
            >




                <View
                    style={{ justifyContent: "center" }}

                >



                    <ScrollView style={{ height: height * 0.3, backgroundColor: "#fff", width: width * 0.9, borderRadius: 10 }}>



                       
                        <View style={{ marginTop: 10 }}>
                            <Text style={[styles.text, { color: "#000", fontSize: 22 }]}>Enter Amount :</Text>
                            <TextInput
                                value={this.state.Amount2}
                                style={{ height: height * 0.05, width: width * 0.6, backgroundColor: "#eee", borderRadius: 5, paddingLeft: 5, marginTop: 10 }}
                                selectionColor={primaryColor}
                                keyboardType={"numeric"}
                                onChangeText={(Amount2) => { this.setState({ Amount2 }) }}
                            />
                        </View>

                        <View style={{ alignItems: "center", marginTop: 10 }}>
                            <TouchableOpacity
                                style={{ height: height * 0.05, width: width * 0.4, backgroundColor: primaryColor, alignItems: 'center', justifyContent: "center" }}
                                onPress={() => { this.editSingle() }}
                            >
                                <Text style={[styles.text, { color: "#fff" }]}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        )
    }
    editmodal = () => {
        return (
            <Modal
                style={{ flex: 1 }}
                statusBarTranslucent={true}
                onBackdropPress={() => {
                    this.setState({
                        editmodal: false,
                    })
                }}
                deviceHeight={screenHeight}
                isVisible={this.state.editmodal}
            >



                
                  <View 
                   style={{justifyContent:"center"}}
                  
                  >

               

                    <ScrollView style={{ height: height * 0.3, backgroundColor: "#fff", width: width * 0.9, borderRadius: 10 }}>
                      


                            <View>
                                <Text style={[styles.text, { color: "#000", fontSize: 22 }]}>Order Status :</Text>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <DropDownPicker
                                    style={{ height: height * 0.05 }}
                                    containerStyle={{ height: height * 0.05 }}
                                    open={this.state.open}
                                    value={this.state.ordervalue}
                                    items={orderStatus}
                                    setOpen={this.setOpen}
                                    setValue={this.setValue}
                                    setItems={this.setItems}
                                    placeholder="select a Table"
                                />
                            </View>
                             <View style={{marginTop:10}}>
                                 <Text style={[styles.text, { color: "#000", fontSize: 22}]}>Enter Amount :</Text>
                                 <TextInput 
                                  value={this.state.Amount}
                                  style={{height:height*0.05,width:width*0.6,backgroundColor:"#eee",borderRadius:5,paddingLeft:5,marginTop:10}}
                                  selectionColor={primaryColor}
                                  keyboardType={"numeric"}
                                  onChangeText={(Amount) => { this.setState({Amount})}}
                                 />
                             </View>
               
                          <View style={{alignItems:"center",marginTop:10}}>
                              <TouchableOpacity 
                               style={{height:height*0.05,width:width*0.4,backgroundColor:primaryColor,alignItems:'center',justifyContent:"center"}}
                               onPress={()=>{this.edit()}}
                              >
                                  <Text style={[styles.text,{color:"#fff"}]}>Save</Text>
                              </TouchableOpacity>
                          </View>
                   </ScrollView>
                </View>
            </Modal>
        )
    }
    validateColor =()=>{
        if (this.state.item.order_status =="Pending"){
            return "orange"
        }
        if (this.state.item.order_status == "Completed"){
            return "green"
        }
        if (this.state.item.order_status == "Declined") {
            return "red"
        }
        return "#fff"
    }
    footer =()=>{
        return(
            <View style={{alignItems:"center",marginTop:10}}>
                 <View style={{flexDirection:"row"}}>
                     <Text style={[styles.text,{color:"#fff"}]}>Order Status : </Text>
                    <Text style={[styles.text, { color: this.validateColor() }]}>{this.state.item.order_status}</Text>
                 </View>
             </View>
        )
    }
    render() {

        return (
            <View style={{ flex: 1, backgroundColor: themeColor }}>
                <StatusBar style={"light"} />
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
                        <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>View Order</Text>

                        </View>
                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                        </View>
                    </View>
                </LinearGradient>
                <View style={{marginVertical:20}}>
                    <View style={{alignItems:"center"}}>
                        <Text style={[styles.text,{color:"#fff",textDecorationLine:"underline"}]}>Ordered Items :</Text>
                    </View>
                </View>
                 <FlatList 
                   ListFooterComponent={this.footer()}
                   data={this.state.item.items}
                   keyExtractor ={(item,index)=>index.toString()}
                   renderItem ={({item,index})=>{
                       return(
                           <View style={{marginTop:10,paddingHorizontal:20,flexDirection:"row",borderBottomColor:"#fff",borderBottomWidth:0.5,paddingVertical:10}}>
                               <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                                    <Text style={[styles.text,{color:"#fff"}]}> # {index+1}</Text>
                                </View>
                               
                               <View style={{flex:0.4,alignItems:"center",justifyContent:"center"}}>
                                  
                                   <View style={{ marginLeft: 10, flexDirection: "row", marginTop: 10 }}>
                                       <Text style={[styles.text, { color: "#fff" }]}>Item : </Text>
                                       <Text style={[styles.text, { color: "#fff" }]}>{item.itemTitle}</Text>
                                   </View>
                                   <View style={{ marginLeft: 10, flexDirection: "row", marginTop: 10 }}>
                                       <Text style={[styles.text, { color: "#fff" }]}>Quantity : </Text>
                                       <Text style={[styles.text, { color: "#fff" }]}>{item.quantity}</Text>
                                   </View>
                                   <View style={{ marginLeft: 10, flexDirection: "row", marginTop: 10 }}>
                                       <Text style={[styles.text, { color: "#fff" }]}>Price : </Text>
                                       <Text style={[styles.text, { color: "#fff" }]}>{item.price}</Text>
                                   </View>
                               </View>
                               <View style={{flex:0.5,alignItems:"center",justifyContent:"center"}}>
                                   <TouchableOpacity style={{ height: height * 0.05, width: width * 0.3, alignItems: "center", justifyContent: "center", backgroundColor:primaryColor }}
                                       onPress={() => {this.setState({selectedItem:item,modal:true}) }}
                                   >
                                       <Text style={[styles.text, { color: "#fff" }]}>Edit</Text>
                                   </TouchableOpacity>
                               </View>
                           </View>
                       )
                   }}
                 />
        
              <View style ={{position:"absolute",bottom:30,width,alignItems:"center",justifyContent:"space-around",flexDirection:"row"}}>
                     <TouchableOpacity style={{height:height*0.05,width:width*0.4,alignItems:"center",justifyContent:"center",backgroundColor:primaryColor}}
                      onPress={()=>{this.setState({editmodal:true})}}
                     >
                          <Text style={[styles.text,{color:"#fff"}]}>Edit</Text>
                     </TouchableOpacity>   
                    <TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center", backgroundColor: "red" }}
                        onPress={() => {this.createAlert()}}
                    >
                        <Text style={[styles.text, { color: "#fff" }]}>Delete</Text>
                    </TouchableOpacity>
              </View>
              {
                  this.editmodal()
              }
              {
                  this.modal()
              }
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
export default connect(mapStateToProps, { selectTheme })(ViewInventoryOrders);