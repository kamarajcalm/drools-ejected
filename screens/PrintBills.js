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
import moment from 'moment';
import { CommonNavigationAction, CommonActions } from '@react-navigation/native'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Linking } from 'react-native';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import HttpsClient from '../HttpsClient';
import { BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter, } from 'react-native-bluetooth-escpos-printer';
import base64Image from '../assets/base64/drools';
class PrintBills extends Component {
  constructor(props) {
        let start = moment().subtract(30, 'days').calendar()
    super(props);
    this.state = {
        fromDate: moment(start).format("YYYY-MM-DD"),
        toDate: moment(new Date()).format("YYYY-MM-DD"),
        show: false,
        show2: false,
        data:[]
    };
  }
      hideDatePicker = () => {
        this.setState({ show: false })
    };

    handleConfirm = (date) => {
        let fromDate = moment(date).format("YYYY-MM-DD")
        this.setState({ fromDate },()=>{
this.getBills()
        })
        this.hideDatePicker();
    };
    hideDatePicker2 = () => {
        this.setState({ show2: false })
    };

    handleConfirm2 = (date) => {
        let toDate = moment(date).format("YYYY-MM-DD")
        this.setState({ toDate },()=>{
     this.getBills()
        })
        this.hideDatePicker2();
    };
    getBills =async () =>{
         let api = `${url}/api/drools/cart/?fromDate=${this.state.fromDate}&toDate=${this.state.toDate}`
         console.log(api)
         let data = await HttpsClient.get(api)
         if(data.type =="success"){
            this.setState({data:data.data})
         }
    }
     print = async (item) => {

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
            [`BILLNO:${item.id}`, `DATE:${moment(new Date()).format("DD/MM/YYYY")}`], { fonttype: 0 });
        await BluetoothEscposPrinter.printText("\n\r", {});
        await BluetoothEscposPrinter.printText("--------------------------------\n\r", {});
        let columnWidts = [16, 6, 5, 5]
        await BluetoothEscposPrinter.printColumn(columnWidts,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
            ["ITEM", 'PRICE', 'QTY', 'AMT'], {});
        await BluetoothEscposPrinter.printText("--------------------------------\n\r", {});
        item.items.forEach(async (i) => {
            let columnWidth = [16, 6, 5, 5]
            await BluetoothEscposPrinter.printColumn(columnWidth,
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                [`${i.itemTitle}`, `${i.item_price - Math.ceil((i.item_price * 5) / 100)}`, `${i.quantity}`, `${(i.item_price - Math.ceil((i.item_price * 5) / 100)) * i.quantity}`], {});
        })
        let columnWidth0 = [9, 12, 11]
        await BluetoothEscposPrinter.printText("--------------------------------\n\r", {});
        let columnWidth4 = [16, 6, 5, 5]
        await BluetoothEscposPrinter.printColumn(columnWidth4,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
            ["TOTAL", ``, `${this.getSubtotal()}`, `${item.cart_bill}`], {});

        // await BluetoothEscposPrinter.printColumn(columnWidth0,
        //     [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
        //     [``, `CGST @2.50%`, ` + ${Math.floor(this.state.item.gst/2)}`], {});
        await BluetoothEscposPrinter.printColumn(columnWidth0,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
            [``, `CGST @2.50%`, ` + ${(item.gst) / 2}`], {});
        await BluetoothEscposPrinter.printColumn(columnWidth0,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
            [``, `SGST @2.50%`, ` + ${(item.gst) / 2}`], {});
        await BluetoothEscposPrinter.printText("--------------------------------\n\r", {});
        await BluetoothEscposPrinter.printColumn(columnWidth0,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
            [``, ``, `${(item.cart_bill + item.gst)}`], {});
        if (item.oneplusone) {
            await BluetoothEscposPrinter.printColumn(columnWidth0,
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                [``, `Offer Name`, ` - 1+1`], {});
        }
        await BluetoothEscposPrinter.printColumn(columnWidth0,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
            [``, `discount`, ` - ${item.money_saved}`], {});
        await BluetoothEscposPrinter.printText("--------------------------------\n\r", {});
        let columnWidth5 = [16, 16]
        await BluetoothEscposPrinter.printColumn(columnWidth5,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
            ["GRAND TOTAL", `${item.total_price}`], { fonttype: 0 });
        await BluetoothEscposPrinter.printText("--------------------------------\n\r", {});


        await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
        await BluetoothEscposPrinter.printText(`PaymentMode:${this.state?.item?.payment_mode}\n\r`, {});
        let printwidth = [10, 22]
        if (item.order_type == "Takeaway") {
            await BluetoothEscposPrinter.printColumn(printwidth,
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                [`Name :`, `${item?.customer_name}`], {});
            await BluetoothEscposPrinter.printColumn(printwidth,
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                [`Mobile :`, `${item?.customer_mobile}`], {});
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
        if(item.order_type == "Takeaway"){
            await BluetoothEscposPrinter.printText("\n\r", {});
            await BluetoothEscposPrinter.printText("\n\r", {});
            await BluetoothEscposPrinter.printText("\n\r", {});
            await BluetoothEscposPrinter.printText("\n\r", {});
            await BluetoothEscposPrinter.printText("\n\r", {});
            await BluetoothEscposPrinter.printText("\n\r", {});
        }
        await BluetoothTscPrinter.TEAR
    }
componentDidMount(){
 this.getBills()
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
printAll =() =>{
    this.state.data.forEach((item)=>{
        this.print(item)
    })
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
              <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Print Bills</Text>

            </View>
            <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

            </View>
          </View>
        </LinearGradient>
         <View style={{height:height*0.08,backgroundColor:"#000", flexDirection: "row", alignItems: "center", justifyContent: "space-around", }}>

              <TouchableOpacity style={{ flexDirection: "row" }}
                        onPress={() => { this.setState({ show: true }) }}
                    >
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.text, { color: "#fff" }]}>{this.state.fromDate}</Text>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 10 }}>
                            <Fontisto name="date" size={24} color="#fff" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "row" }}
                        onPress={() => { this.setState({ show2: true }) }}
                    >
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.text, { color: "#fff" }]}>{this.state.toDate}</Text>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 10 }}>
                            <Fontisto name="date" size={24} color="#fff" />
                        </View>
                    </TouchableOpacity>
        </View>
        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
           <View>
               <Text style={[styles.text,{color:"#fff"}]}>Total Count: {this.state.data.length}</Text>
           </View>
           <View style={{marginTop:20}}>
                <TouchableOpacity style={{height:height*0.05,alignItems:"center",justifyContent:"center",width:width*0.3,backgroundColor:primaryColor}}
                  onPress={()=>{this.printAll()}}
                >
                      <Text style={[styles.text,{color:"#fff"}]}>Print</Text>
                </TouchableOpacity>
           </View>
        </View>   
         <DateTimePickerModal
                isVisible={this.state.show}
                mode="date"
                onConfirm={this.handleConfirm}
                onCancel={this.hideDatePicker}
            />
            <DateTimePickerModal
                testID="44"
                isVisible={this.state.show2}
                mode="date"
                onConfirm={this.handleConfirm2}
                onCancel={this.hideDatePicker2}
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
    user:state.selectedUser,
  }
}
export default connect(mapStateToProps, { selectTheme })(PrintBills);