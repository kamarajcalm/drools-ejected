import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, TextInput ,ScrollView} from 'react-native';
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
const screenHeight = Dimensions.get("screen").height;
const paymentMode = [
    {
        label: "Cash",
        value: "Cash"
    },

    {
        label: "Phonepe",
        value: "Phonepe"
    },
    {
        label: "Online",
        value: "Online"
    },
    {
        label: "Personal1",
        value: "Personal1"
    },
    {
        label: "Personal2",
        value: "Personal2"
    },
]
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
export default class CreateOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            searchResults:[],
            searchName:"",
            selectedItem:null,
            price:"",
            Quantity:"",
            arrivingDate:"",
            show: false,
            paymentmode:null,
        };
    }
    getItems =()=>{
        let api =`${url}/`
    }
    componentDidMount(){
        this.getItems()
    }
    purchaseOrder = async()=>{
        let api = `${url}/api/drools/showMinimum/`
        let data = await HttpsClient.get(api)
        console.log(data)
        if(data.type =="success"){
            this.setState({ orders:data.data})
        }
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
    addItem =()=>{
        if (this.state.selectedItem ==null){
            return this.showSimpleMessage("Please add item by search", "#dd7030",)
        }
        if (this.state.Quantity == "") {
            return this.showSimpleMessage("Please add Qty", "#dd7030",)
        }
       
      let pushObj ={
          ingridient:this.state.selectedItem.id,
          quantity:this.state.Quantity,
          title:this.state.selectedItem.title
      }
        let duplicate = this.state.orders
        duplicate.push(pushObj)
        this.setState({ orders: duplicate, selectedItem: null, Quantity: "", modal: false, searchName:""})
    }
    searchItems = async (text) => {
        this.setState({ searchName: text })
        let api = `${url}/api/drools/ingridents/?search=${text}`
        let data = await HttpsClient.get(api)
        if (data.type == "success") {
            this.setState({ searchResults: data.data })
        }
    }
    selectItem = (item) => {
        this.setState({ searchName: item.title, searchResults: [], selectedItem: item })
    }
    validateType = () => {
        if (this.state?.selectedItem?.type == 'Gram') {
            return (
                <View style={{ padding: 20 }}>
                    <Text style={[styles.text]}>Enter Gram</Text>
                    <TextInput
                        keyboardType={"phone-pad"}
                        value={this.state.Quantity}
                        style={{ height: height * 0.05, width: width * 0.7, backgroundColor: "#fafafa", borderRadius: 5, marginTop: 5 }}
                        selectionColor={primaryColor}
                        onChangeText={(Quantity) => { this.setState({ Quantity }) }}
                    />
                </View>
            )
        }
        return (
            <View style={{ padding: 20 }}>
                <Text style={[styles.text]}>Enter Pieces</Text>
                <TextInput
                    keyboardType={"phone-pad"}
                    value={this.state.Quantity}
                    style={{ height:38, width: width * 0.7, backgroundColor: "#fafafa", borderRadius: 5, marginTop: 5 }}
                    selectionColor={primaryColor}
                    onChangeText={(Quantity) => { this.setState({ Quantity }) }}
                />
            </View>
        )
    }
    createOrder =async()=>{
        if(this.state.orders.length == 0){
            return this.showSimpleMessage("Please add items", "#dd7030",)
        }
        if (this.state.arrivingDate == "") {
            return this.showSimpleMessage("Please add Arriving Date", "#dd7030",)
        }
        if(this.state.paymentmode==null){
            return this.showSimpleMessage("Please Select payment Mode", "#dd7030",)
        }
        let api =`${url}/api/drools/createPurchaseOrder/`
        let sendData ={
              items:this.state.orders,
              date:this.state.arrivingDate,
              payment_mode:this.state.paymentmode
        }
        let post = await HttpsClient.post(api,sendData)
        if(post.type =="success"){
            this.showSimpleMessage("Order Created SuccessFully", "green","success")
            return this.props.navigation.goBack()
        }else{
            this.showSimpleMessage("Try Again", "red", "danger")
        }

    }
    modal=()=>{
       return(
           <Modal
               isVisible={this.state.modal}
               deviceHeight={screenHeight}
               onBackdropPress={() => { this.setState({ modal: false }) }}
           >
               <View style={{ justifyContent: "center" }}>

                   <ScrollView style={{ height: height * 0.5, backgroundColor: "#eee", borderRadius: 10, }}
                       showsVerticalScrollIndicator={false}
                   >

                       <View style={{padding:20}}>
                           <View>
                               <Text style={[styles.text, { color: "#000" }]}>Select Item</Text>
                               <TextInput
                                   value={this.state.searchName}
                                  style ={{height:38,width:width*0.7,backgroundColor:"#fafafa",borderRadius:5,marginTop:5}}
                                  selectionColor={primaryColor}
                                   onChangeText={(searchName) => { this.searchItems(searchName) }}
                               />
                           </View>
                           {this.state.searchResults.length > 0 && <View style={{ position: "relative", backgroundColor: "#fff", height: height * 0.1, width: width * 0.6, top: 0, alignSelf: "center" }}>
                               {
                                   this.state.searchResults.map((item, idx) => {
                                       return (
                                           <TouchableOpacity
                                               onPress={() => { this.selectItem(item) }}
                                               style={{ backgroundColor: "blue", marginTop: 5 }}
                                               key={idx}>
                                               <Text style={[styles.text, { color: "#fff", }]}>{item.title}</Text>
                                           </TouchableOpacity>
                                       )
                                   })
                               }

                           </View>}
                         
                       </View>
                       {
                           this.validateType()
                       }
                     
                       <View style={{ alignItems: "center", marginVertical: 20 }}

                       >
                           <TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center", backgroundColor: primaryColor }}
                               onPress={() => { this.addItem() }}
                           >
                               <Text style={[styles.text, { color: "#fff" }]}>Add item</Text>
                           </TouchableOpacity>
                       </View>
                   </ScrollView>



               </View>

           </Modal>
       )
    }
    hideDatePicker = () => {
        this.setState({ show: false })
    };
    handleConfirm = (date) => {
        this.setState({ arrivingDate: moment(date).format("YYYY-MM-DD") })
        this.hideDatePicker();
    };
    footer =()=>{
        return(
            <View style={{marginVertical:20,alignItems:"center"}}>
                <TouchableOpacity style={{backgroundColor:primaryColor,height:height*0.05,width:width*0.4,alignItems:"center",justifyContent:"center"}}
                  onPress={()=>{this.createOrder()}}
                
                >
                    <Text style={[styles.text,{color:"#fff"}]}>Create Order</Text>
                </TouchableOpacity>
            </View>
        )
    }
    changeQuantity =(Text,index)=>{
        let duplicate =this.state.orders
        duplicate[index].quantity  = Text
        this.setState({ orders: duplicate})
    }
    deleteItem = (index)=>{
        let duplicate = this.state.orders
         duplicate.splice(index,1)
        this.setState({ orders: duplicate })
    }
         setOpen3 = (open3) => {
        this.setState({
            open3
        });
    }

    setValue3 = (callback) => {

        this.setState(state => ({
            paymentmode: callback(state.value)
        }));
    }

    setItems3 = (callback) => {

        this.setState(state => ({
            items: callback(state.items)
        }));
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
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
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Create Order</Text>

                        </View>
                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                        </View>
                    </View>
                </LinearGradient>
                <View style={{flex:1}}>

                      <View style={{padding:20}}>
                          <View>
                            <Text style={[styles.text,{color:"#000",fontSize:22}]}>Add Items</Text>
                          </View>
                     
                          <View style={{alignItems:"center"}}>
                              <TouchableOpacity 
                                onPress ={()=>{this.setState({modal:true})}}
                              >
                                <AntDesign name="pluscircle" size={24} color={primaryColor} />
                              </TouchableOpacity>
                           
                          </View>
                      </View>
                      <View style={{marginTop:10,alignItems:"center"}}>
                            <TouchableOpacity style={{backgroundColor:primaryColor,height:height*0.05,width:width*0.4,alignItems:"center",justifyContent:"center"}}
                             onPress={()=>{this.purchaseOrder()}}
                            >
                                <Text style={[styles.text,{color:'#fff'}]}>Create Purchase Order</Text>
                            </TouchableOpacity>
                      </View>
                      <View style={{marginTop:20,marginLeft:20}}>
                          <Text style={[styles.text,{color:"#000",fontSize:16}]}>Select Payment Mode</Text>
                      </View>
                         <View style={{ marginTop: 10, width: width * 0.7, height: this.state.open3 ? height * 0.3 : height * 0.08,marginLeft:20 }}>
                            <DropDownPicker
                                style={{ height: height * 0.05 }}
                                containerStyle={{ height: height * 0.05 }}
                                open={this.state.open3}
                                value={this.state.paymentmode}
                                items={paymentMode}
                                setOpen={this.setOpen3}
                                setValue={this.setValue3}
                                setItems={this.setItems3}
                                placeholder="select a mode"
                            />
                        </View>
                    <View style={{ padding: 20 }}>
                        <Text style={[styles.text]}>Enter Arriving date</Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ show: true })
                            }}
                            style={{ height: height * 0.05, width: width * 0.8, backgroundColor: "#fafafa", borderRadius: 5, marginTop: 5, flexDirection: "row", paddingHorizontal: 10, alignItems: "center", justifyContent: "space-between" }}
                        >
                            <View>
                                <Text style={[styles.text, { color: "#000" }]}>{this.state.arrivingDate}</Text>
                            </View>
                            <View>
                                <MaterialIcons name="date-range" size={24} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        contentContainerStyle={{alignItems:"center"}}
                        ListFooterComponent={this.footer()}
                        data={this.state.orders}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{height:height*0.15,backgroundColor:"#fafafa",width:width*0.8,alignItems:"center",justifyContent:"center",borderRadius:5}}>
                                   <View style={{flexDirection:"row"}}>
                                         <View>
                                             <Text style={[styles.text]}>Item : </Text>
                                         </View>
                                         <View>
                                            <Text style={[styles.text]}>{item.title}</Text>
                                         </View>
                                       
                                   </View>
                                   <View style ={{}}>
                                        <View>
                                            <Text style={[styles.text]}>Quantity :</Text>
                                        </View>
                                        <TextInput 
                                          style ={{height:38,width:width*0.6,backgroundColor:"#eee",marginTop:5}}
                                          selectionColor={primaryColor}
                                          value ={item.quantity.toString()}
                                            onChangeText={(text) => { this.changeQuantity(text,index)}}
                                        />
                                   </View>
                                    <View style={{ position: "absolute", right: 5, top: 5 }}>
                                        <TouchableOpacity
                                            onPress={() => { this.deleteItem(index) }}

                                        >
                                            <Entypo name="circle-with-cross" size={24} color="red" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>
              
                {
                    this.modal()
                }
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