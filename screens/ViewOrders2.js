import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, TextInput } from 'react-native';
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
const screenHeight = Dimensions.get('screen').height;
import { StatusBar, } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import orders from '../data/orders'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import HttpsClient from '../HttpsClient';
import Modal from "react-native-modal";
import DropDownPicker from 'react-native-dropdown-picker';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import { BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter, } from 'react-native-bluetooth-escpos-printer';
import moment from 'moment';
import base64Image from '../assets/base64/drools';
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
const paymentStatus = [
    {
        label: "Paid",
        value: "Paid"
    },
    {
        label: "NotPaid",
        value: "NotPaid"
    },
]
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
let options = {
    width: 40,
    height: 30,
    gap: 20,
    direction: BluetoothTscPrinter.DIRECTION.FORWARD,
    reference: [0, 0],
    tear: BluetoothTscPrinter.TEAR.ON,
    sound: 0,
 
    image: [{ x: 160, y: 160, mode: BluetoothTscPrinter.BITMAP_MODE.OVERWRITE, width: 60, image: base64Image }]
}
class ViewOrders2 extends Component {
    constructor(props) {
        let item = props.route.params.item
        super(props);
        this.state = {
            item,
            modal: false,
            open: false,
            ordervalue: orderStatus[0].value,
            open2: false,
            paymentvalue: paymentStatus[0].value,
            complementModal:false,
            complementItem:"",
            paymentmode:null,
        };
    }
    getSubtotal = () => {
        let total = 0
        this.state.item.items.forEach((item) => {
            total += item.quantity
        })
        return total
    }
        printComplement  = async() =>{
            await BluetoothEscposPrinter.printPic(base64Image, { width: 200, left: 100, gap: 0 });
        await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
        await BluetoothEscposPrinter.setBlob(0);
        await BluetoothEscposPrinter.setBlob(0)
         await BluetoothEscposPrinter.printText(`Hey mate! We’ve given you a complimentary ${this.state.complementItem} :) 
Your feedback is very valuable for us to grow. We’re a new restaurant, please do rate us out mate. \n\r`, {
            encoding: 'GBK',
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1,
        });

        await BluetoothEscposPrinter.printText("\n\r", {});
        await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
        await BluetoothEscposPrinter.printText("****THANK YOU****\n\r", {
            encoding: 'GBK',
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1,
        });
            await BluetoothEscposPrinter.printText("\n\r", {});
            await BluetoothEscposPrinter.printText("\n\r", {});
            await BluetoothEscposPrinter.printText("\n\r", {});
    }
    print = async () => {

        await BluetoothEscposPrinter.printPic(base64Image, { width: 200, left: 100, gap: 0 });
        await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
        await BluetoothEscposPrinter.setBlob(0);
        await BluetoothEscposPrinter.setBlob(0);
        await BluetoothEscposPrinter.printText("# 109 , Ground floor , 5th main corner , 60 ft road , AGB layout, Hesaragatta road\n\r", {
            encoding: 'GBK',
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1,
        });
        await BluetoothEscposPrinter.printText("Bangalore 560090\n\r", {});
        await BluetoothEscposPrinter.printText("PHONE:9010131080\n\r", {});
        await BluetoothEscposPrinter.printText("GSTIN:29AASFD3741M1ZS\n\r", {});
        await BluetoothEscposPrinter.printText("\n\r", {});
        let columnWidths = [16, 16]
        await BluetoothEscposPrinter.printColumn(columnWidths,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
            [`BILLNO:${this.state.item.id}`, `DATE:${moment(new Date()).format("DD/MM/YYYY")}`], { fonttype: 0 });
        await BluetoothEscposPrinter.printText("\n\r", {});
        await BluetoothEscposPrinter.printText("--------------------------------\n\r", {});
        let columnWidts = [16, 6, 5, 5]
        await BluetoothEscposPrinter.printColumn(columnWidts,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
            ["ITEM", 'PRICE', 'QTY', 'AMT'], {});
        await BluetoothEscposPrinter.printText("--------------------------------\n\r", {});
        this.state.item.items.forEach(async (i) => {
            let columnWidth = [16, 6, 5, 5]
            await BluetoothEscposPrinter.printColumn(columnWidth,
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                [`${i.itemTitle}`, `${Math.round(i.item_price * 100/105,2)}`, `${i.quantity}`, `${(Math.round(i.item_price * 100/105,2)) * i.quantity}`], {});
        })
        let columnWidth0 = [9, 12, 11]
        await BluetoothEscposPrinter.printText("--------------------------------\n\r", {});
        let columnWidth4 = [16, 6, 5, 5]
        await BluetoothEscposPrinter.printColumn(columnWidth4,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
            ["TOTAL", ``, `${this.getSubtotal()}`, `${this.state.item.cart_bill}`], {});

        // await BluetoothEscposPrinter.printColumn(columnWidth0,
        //     [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
        //     [``, `CGST @2.50%`, ` + ${Math.floor(this.state.item.gst/2)}`], {});
        await BluetoothEscposPrinter.printColumn(columnWidth0,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
            [``, `CGST @2.50%`, ` + ${(this.state.item.gst) / 2}`], {});
        await BluetoothEscposPrinter.printColumn(columnWidth0,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
            [``, `SGST @2.50%`, ` + ${(this.state.item.gst) / 2}`], {});
        await BluetoothEscposPrinter.printText("--------------------------------\n\r", {});
        await BluetoothEscposPrinter.printColumn(columnWidth0,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
              [``, ``, `${(this.state.item.cart_bill+this.state.item.gst+this.state.item.money_saved)}`], {});
        if (this.state.item.oneplusone) {
            await BluetoothEscposPrinter.printColumn(columnWidth0,
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                [``, `Offer Name`, ` - 1+1`], {});
        }
        await BluetoothEscposPrinter.printColumn(columnWidth0,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
            [``, `discount`, ` - ${this.state.item.money_saved}`], {});
        await BluetoothEscposPrinter.printText("--------------------------------\n\r", {});
        let columnWidth5 = [16, 16]
        await BluetoothEscposPrinter.printColumn(columnWidth5,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
            ["GRAND TOTAL", `${this.state.item.total_price}`], { fonttype: 0 });
        await BluetoothEscposPrinter.printText("--------------------------------\n\r", {});


        await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
        await BluetoothEscposPrinter.printText(`PaymentMode:${this.state?.item?.payment_mode}\n\r`, {});
        let printwidth = [10, 22]
        if (this.state.item.order_type == "Takeaway") {
            await BluetoothEscposPrinter.printColumn(printwidth,
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                [`Name :`, `${this.state.item?.customer_name}`], {});
            await BluetoothEscposPrinter.printColumn(printwidth,
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                [`Mobile :`, `${this.state.item?.customer_mobile}`], {});
            await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
            await BluetoothEscposPrinter.printText("ADDRESS:\n\r", {
                encoding: 'GBK',
                codepage: 0,
                widthtimes: 0,
                heigthtimes: 0,
                fonttype: 1,
            });
            await BluetoothEscposPrinter.printText(`${this.state?.item?.customer_address}`, {});
        }

        await BluetoothEscposPrinter.printText("\n\r", {});
        await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
        if(this.state.complement){
         await BluetoothEscposPrinter.printText(`Hey mate! We’ve given you a complimentary ${this.state.complementItem} :) 
Your feedback is very valuable for us to grow. We’re a new restaurant, please do rate us out mate. \n\r`, {
            encoding: 'GBK',
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1,
        });

        }
     
        await BluetoothEscposPrinter.printText("****THANK YOU****\n\r", {
            encoding: 'GBK',
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1,
        });
        await BluetoothEscposPrinter.printText("\n\r", {});
        await BluetoothEscposPrinter.printText("\n\r", {});
        await BluetoothEscposPrinter.printText("\n\r", {});
        if(this.state.item.order_type == "Takeaway"){
            await BluetoothEscposPrinter.printText("\n\r", {});
            await BluetoothEscposPrinter.printText("\n\r", {});
            await BluetoothEscposPrinter.printText("\n\r", {});
            await BluetoothEscposPrinter.printText("\n\r", {});
            await BluetoothEscposPrinter.printText("\n\r", {});
            await BluetoothEscposPrinter.printText("\n\r", {});
        }
        await BluetoothTscPrinter.TEAR
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

    getOrders = async () => {
        let api = `${url}/api/drools/cart/${this.state.item.id}/`
        console.log(api)
        const data = await HttpsClient.get(api)

        if (data.type == "success") {
            this.setState({ item: data.data })
        }
    }
    completeOrder = async () => {
          this.setState({creating:true})
            if(this.state.paymentmode==null){
                 this.setState({creating:false})
             return this.showSimpleMessage("Please Select payment mode","orange","info")
         }
        let api = `${url}/api/drools/createOrder/`
        let sendData = {
            status: this.state.ordervalue,
            payment_status: this.state.paymentvalue,
            cart_id: this.state.item.id,
            discount:Number(this.state.discount),
            payment_mode:this.state.paymentmode
        }
        let post = await HttpsClient.post(api, sendData)
        console.log(post)
        if (post.type == "success") {
            this.setState({ modal: false })
            this.showSimpleMessage("Order Saved SuccessFully", "green", "success")
            return this.props.navigation.goBack()
        } else {

            this.showSimpleMessage(`${post.data.failed}`, "red", "failure")
        }
    }
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getOrders()

        });
    }
    componentWillUnmount() {
        this._unsubscribe()
    }
    editCash = async() =>{
        if(this.state.paymentmode==null){
            return this.showSimpleMessage("Please select Payment Mode","orange","info")
        }
        let api = `${url}/api/drools/cart/${this.state.item.id}/`
        let sendData ={
                payment_mode:this.state.paymentmode
        }
        let patch = await HttpsClient.patch(api,sendData)
        if(patch.type=="success"){
            this.setState({modal:false})
            this.getOrders()
            return this.showSimpleMessage("Edied Successfully","green","success")
        }else{
           return this.showSimpleMessage("Try Again","red","danger") 
        }
       
    }
    footer = () => {
        return (
            <View style={{ marginVertical: 10 }}>
                <View style={{ flexDirection: "row", height: height * 0.1, margin: 10 }}>
                    <View style={{ flex: 0.2 }}>

                    </View>
                    <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}>
                        <View style={{ alignSelf: "flex-end", marginRight: 20 }}>
                            <Text style={[styles.text, { color: "#fff", fontSize: 22, }]}>bill :</Text>
                        </View>
                        <View style={{ alignSelf: "flex-end", marginRight: 20 }}>
                            <Text style={[styles.text, { color: "#fff", fontSize: 22, }]}>GST :</Text>
                        </View>
                        <View style={{ alignSelf: "flex-end", marginRight: 20 }}>
                            <Text style={[styles.text, { color: "#fff", fontSize: 22, }]}>total price :</Text>
                        </View>
                        <View style={{ alignSelf: "flex-end", marginRight: 20 }}>
                            <Text style={[styles.text, { color: "#fff", fontSize: 22, }]}>Money Saved :</Text>
                        </View>
                        <View style={{ alignSelf: "flex-end", marginRight: 20 }}>
                            <Text style={[styles.text, { color: "#fff", fontSize: 22, }]}>PaymentMode :</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                        <View>
                            <Text style={[styles.text, { color: primaryColor, fontSize: 22 }]}>₹ {this.state.item.cart_bill}</Text>
                        </View>
                          <View>
                            <Text style={[styles.text, { color: primaryColor, fontSize: 22 }]}>₹ {this.state.item.gst}</Text>
                          </View>
                           <View>
                            <Text style={[styles.text, { color: primaryColor, fontSize: 22 }]}>₹ {this.state.item.total_price}</Text>
                           </View>
                           <View>
                            <Text style={[styles.text, { color: primaryColor, fontSize: 22 }]}>₹ {this.state.item.money_saved}</Text>
                           </View>
        
                        <View>
                            <Text style={[styles.text, { color: primaryColor, fontSize: 22 }]}>{this.state.item.payment_mode}</Text>
                        </View>
                      
                    </View>
                </View>
                {/* <View style={{ alignItems: "center", marginTop: 20, flexDirection: "row", justifyContent: "space-around" }}>
                    <TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center", backgroundColor: primaryColor }}
                        onPress={() => { this.setState({ modal: true }) }}
                    >
                        <Text style={[styles.text, { color: "#fff" }]}>Complete Order</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center", backgroundColor: primaryColor }}
                        onPress={() => { this.props.navigation.navigate('SearchDishes2', { item: this.state.item }) }}
                    >
                        <Text style={[styles.text, { color: "#fff" }]}>Add Items</Text>
                    </TouchableOpacity>
                </View> */}
                     {
                    this.state.item.order_type =="Takeaway"&&
                    <View style={{  margin: 20 }}>
                          <View style={{flexDirection:"row",marginTop:10}}>
                               <View>
                                   <Text style={[styles.text,{color:"#fff",fontSize:22}]}>Name : </Text>
                               </View>
                               <View>
                                <Text style={[styles.text, { color: "#fff", fontSize: 22 }]}>{this.state.item.customer_name} </Text>
                               </View>
                          </View>
                        <View style={{ flexDirection: "row",marginTop:10 }}>
                            <View>
                                <Text style={[styles.text, { color: "#fff", fontSize: 22 }]}>Phone : </Text>
                            </View>
                            <View>
                                <Text style={[styles.text, { color: "#fff", fontSize: 22 }]}>{this.state.item.customer_mobile} </Text>
                            </View>
                        </View>
                    </View>
                }
                <View style={{ alignItems: "center", justifyContent: "center", marginVertical: 30, flexDirection: "row" }}>
                    <TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center", backgroundColor: "green" }}
                        onPress={() => { this.print() }}
                    >
                        <Text style={[styles.text, { color: "#fff" }]}>Print</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: "row", marginLeft: 10 }}>
                        <View>
                            <Text style={[styles.text, { color: "#fff" }]}>status:</Text>
                        </View>

                        <View style={{ marginLeft: 10, width: 10, height: 10, backgroundColor: this.props.bluetooth ? "green" : "red", borderRadius: 10, marginTop: 5 }}>

                        </View>
                    </View>
                </View>
                <View style={{alignItems:"center",justifyContent:"center",marginVertical:20}}>
                    <TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center", backgroundColor:primaryColor }}
                      onPress={()=>{this.setState({modal:true})}}
                    >
                           <Text style={[styles.text,{color:"#fff"}]}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
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
    setOpen2 = (open2) => {
        this.setState({
            open2
        });
    }

    setValue2 = (callback) => {

        this.setState(state => ({
            paymentvalue: callback(state.value)
        }));
    }

    setItems2 = (callback) => {

        this.setState(state => ({
            items: callback(state.items)
        }));
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
    complementModal =()=>{
        return (
            <Modal
                statusBarTranslucent={true}
                isVisible={this.state.complementModal}
                deviceHeight={screenHeight}
                onBackdropPress={() => { this.setState({ complementModal: false }) }}
            >
                <View style={{flex:1,alignItems:"center",marginTop:40}}>
                         <View style={{height:height*0.4,backgroundColor:"#fff",width:width*0.8}}>
                         <View>
                            <Text style={[styles.text, { color: "#000", fontSize: 22 }]}>Paid By :</Text>
                        </View>
                        <View style={{ marginTop: 10, width: width * 0.7, height: this.state.open3 ? height * 0.3 : height * 0.08 }}>
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
                               <View style={{ alignItems: "center" ,marginVertical:20}}>
                            <TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center", backgroundColor: primaryColor }}
                                onPress={() => {
                                    if(this.state.complementItem==""){
                                        return this.showSimpleMessage("please enter item","orange","info")
                                    }
                                      this.setState({complement:true,complementModal:false},()=>{
                                          this.printComplement()
                                         return this.showSimpleMessage("Complement added successfully","green","success")
                                    })
                                }}
                            >
                                <Text style={[styles.text, { color: "#fff" }]}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            


            </Modal>
        )
    }

    cashEditModal =()=>{
        return (
                        <Modal
                statusBarTranslucent={true}
                isVisible={this.state.modal}
                deviceHeight={screenHeight}
                onBackdropPress={() => { this.setState({ modal: false }) }}
            >
                <View style={{}}>

                    <View style={{ height: height * 0.4, backgroundColor: "#fff", borderRadius: 5, alignItems: "center", justifyContent: "space-around" }}>
                       
                         <View>
                            <Text style={[styles.text, { color: "#000", fontSize: 22 }]}>Paid By :</Text>
                        </View>
                        <View style={{ marginTop: 10, width: width * 0.7, height: this.state.open3 ? height * 0.3 : height * 0.08 }}>
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
                        <View style={{ alignItems: "center" }}>
                            <TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center", backgroundColor: primaryColor }}
                                onPress={() => {
                                    this.editCash()
                                }}
                            >
                                <Text style={[styles.text, { color: "#fff" }]}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>



                </View>

            </Modal>
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
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Order Details</Text>

                        </View>
                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                        </View>
                    </View>
                </LinearGradient>

                <FlatList
                    style={{ marginTop: 20 }}
                    data={this.state.item.items}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={this.footer()}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ height: height * 0.1, margin: 15, borderColor: "#E6E9F0", borderBottomWidth: 0.5, flexDirection: "row" }}>
                                <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center", flexDirection: "row" ,}}>
                                    <View style={[styles.boxWithShadow, { height: 25, width: 25, backgroundColor: "#333", alignItems: "center", justifyContent: "center" }]}>
                                        <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>{item.quantity}</Text>
                                    </View>
                                    <View style={{ marginLeft: 5 }}>
                                        <Text style={[styles.text, { color: "#fff" }]}>X</Text>
                                    </View>
                                    <View>
                                        <Text style={[styles.text, { color: "#fff" }]}> ₹ {item.item_price}-{item.discount_price}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
                                    <View>
                                        <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>{item.itemTitle}</Text>
                                    </View>
                                    {/* <View>
                                        <Text style={[styles.text, { color: "#fff" }]}>1 plate | ₹ {item.itemPrice}</Text>
                                    </View> */}
                                </View>
                                <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                                    <View>
                                        <Text style={[styles.text, { color: primaryColor, fontSize: 22 }]}>₹ {(item.total_price) - Math.ceil((item.total_price * 5) / 100)}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />
                 {
                     this.cashEditModal()
                 }
           
                {
                    this.complementModal()
                }
            </View>

        );
    }
}
const styles = StyleSheet.create({
    text: {
        fontFamily
    },
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    }
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
        bluetooth: state.bluetoothStatus
    }
}
export default connect(mapStateToProps, { selectTheme })(ViewOrders2);