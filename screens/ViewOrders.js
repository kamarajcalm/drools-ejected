import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image ,TextInput} from 'react-native';
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
const screenHeight =Dimensions.get('screen').height;
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
const baseImage ="iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAC4jAAAuIwF4pT92AAALYGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA2LTExVDE1OjQyOjE1KzA1OjMwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA2LTEyVDE2OjU5OjI0KzA1OjMwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wNi0xMlQxNjo1OToyNCswNTozMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N2I4ZDA2YjYtNWFlZS0zMTQ0LWE4M2ItNjM4MjUxZTM4MjNjIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6OTZmMDcyMjAtZmMyYy00NjRlLWFmYzQtMjgwYzBjZDc3NWE2IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6OTVhNWFiOWUtZDNmOC01ODQyLWI5YTgtYjFmMWNlMTllYzg3IiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHRpZmY6T3JpZW50YXRpb249IjEiIHRpZmY6WFJlc29sdXRpb249IjMwMDAwMDAvMTAwMDAiIHRpZmY6WVJlc29sdXRpb249IjMwMDAwMDAvMTAwMDAiIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiIGV4aWY6Q29sb3JTcGFjZT0iMSIgZXhpZjpQaXhlbFhEaW1lbnNpb249IjMwMDAiIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIzMDAwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NWE1YWI5ZS1kM2Y4LTU4NDItYjlhOC1iMWYxY2UxOWVjODciIHN0RXZ0OndoZW49IjIwMjEtMDYtMTFUMTU6NDI6MTUrMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi4zIChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZTQ0YjJlODUtNzgzZS0zYzRkLWJiMjUtZGJiNmQ3NWQxNzEzIiBzdEV2dDp3aGVuPSIyMDIxLTA2LTExVDE1OjQ3OjEyKzA1OjMwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjMxM2U3MjgxLWJjYmUtODk0YS1iNjFiLTU3OWYwNTY0MDMyZSIgc3RFdnQ6d2hlbj0iMjAyMS0wNi0xMlQxNjo1OToyNCswNTozMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3YjhkMDZiNi01YWVlLTMxNDQtYTgzYi02MzgyNTFlMzgyM2MiIHN0RXZ0OndoZW49IjIwMjEtMDYtMTJUMTY6NTk6MjQrMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi4zIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzEzZTcyODEtYmNiZS04OTRhLWI2MWItNTc5ZjA1NjQwMzJlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MWZjZTVkMmItZGUwMC1jYzRkLThiYTAtNmMzYWI3OTNjOTcxIiBzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6OTVhNWFiOWUtZDNmOC01ODQyLWI5YTgtYjFmMWNlMTllYzg3Ii8+IDxwaG90b3Nob3A6VGV4dExheWVycz4gPHJkZjpCYWc+IDxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0iRHJvb2xzIiBwaG90b3Nob3A6TGF5ZXJUZXh0PSJEcm9vbHMiLz4gPHJkZjpsaSBwaG90b3Nob3A6TGF5ZXJOYW1lPSJvbyIgcGhvdG9zaG9wOkxheWVyVGV4dD0ib28iLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqebSZwAAAOQSURBVGiB7ZgxiBxlFMd//3g2SQQ3hVpEwcHGRpAV7QLCbh2LbNKJiCwGrWzWylLvmjRWZyGKYLELIgQ0ZJeIICgyVwmCyh4IxiBIDiFRsbhnse+bezs7t3ck7o2B+cOw8833fe+9//v+782wMjPuZRyrO4C7RUOgbjQE6kZDoG40BOpGQ6BuNATqxlq6kTQ3IakNdICW/24DW8DEzLaOMMYFxC/ohROQ1JK0CeRAG9gBNpgF3wbGksZOcKWQ1DpwkZnNMZKUS5pK6kjq+XgQjUoaSropqb+a0EHSuiSr8pFiNrN5AmFTx8dtH+cVDnIncXCW7oxAz32vLyNQllAP2DKziY93lvgYMauPVZ3CoSRaEHBNZ8AkzHf8d7tib1rXu5PoDoFsie8C8QSyivmUhaquUxj2usjCuF2Wlj+r8kGS7D6+JxVze0haCpobBsNTf7ZwnF7klorc73uSNv3+po9T0VtZ05L6vs7cVxbIFrXn64rmUlnE7ig5bgUj032y1k+ES0EPvc2aN4U0l4c9fUlZCH7ge8buOyXkg2CrSNayLpScbQYjw6pOE7I6cMMmaVwxl4Jse9DT0qkNJcUO2Av7PwqJKeS3jEArBJOucQqsRCAGZlqU0DjIMpd0MQSaBz9vS3omKKAXbD9fTk6ZwFwbNbMdoMvszZta6EKBafZiazErsKJbmNkIeBPomlk3bLkBvBvsxabwKHCOvW627bavA/eFtVmVEhbexCHIPGSkFZ63StkvslxhIxX6NUlfhbXtoO1Lkl7x8TCsuRFOdqrQSPaVUMl50mE5+ERs4M+SwwWZlRKx6cTTvlTQufvK3X6UXV8VLTYSUNB/2XHG7INuwuwYM/aOecPMNsLadSAzs/MVBNLbusXsLT8Kcz38g9E+/fUxjj9wme7JK5p9TGbAeZf1AoHCxn4E/FkbGLCn8xHwXpXRu8L41qvAL8DPdE9+d9DyOcXE4/ivL+ACcLYqiDOAAbfh1OjMC58YnF67dPUc8Drw9GF9FCewCkh6EXgK+BN4K86deEjcEvCb9YEn34cnLsKVf2a8fgwflMt9rJhAun0HeA74AfgW+On4w9r98G8ufP+HvfT1g7p+dY0vd3+3N4C/oCSTZT6OiADACeA14Fng1JrQ/ad1+5HH9fnLnWMfX/tsd+eLb3aLxf8LAkeBe/5fiYZA3WgI1I2GQN1oCNSNhkDdaAjUjX8BydAduWgxBkoAAAAASUVORK5CYII="
const orderStatus =[
    {
        label:"Completed",
        value:"Completed"
    },
    {
        label: "Declined",
        value: "Declined"
    },
]
const paymentStatus =[
    {
        label: "Paid",
        value: "Paid"
    },
    {
        label: "NotPaid",
        value: "NotPaid"
    },
]
class ViewOrders extends Component {
    constructor(props) {
        let item = props.route.params.item
        super(props);
        this.state = {
            item,
            modal:false,
            open: false,
            ordervalue:orderStatus[0].value,
            open2: false,
            paymentvalue:paymentStatus[0].value,
            discount:"",
            onlineDiscount:"",
            takeAwayDiscount:"",
            diningDiscount:""
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
    getOrders = async () => {
        let api = `${url}/api/drools/cart/${this.state.item.id}/`
        const data = await HttpsClient.get(api)
        console.log(api,"pjioio")
        if (data.type == "success") {
            this.setState({ item: data.data })
        }
    }
    completeOrder =async()=>{
        let api = `${url}/api/drools/createOrder/`
        let sendData ={
            status:this.state.ordervalue,
            payment_status:this.state.paymentvalue,
            cart_id:this.state.item.id,
            discount:this.state.discount
        }
        let post = await HttpsClient.post(api,sendData)
        console.log(post)
        if(post.type=="success"){
            this.setState({modal:false})
            this.showSimpleMessage("Order Saved SuccessFully", "green","success")
            return this.props.navigation.goBack()
        }else{

            this.showSimpleMessage(`${post.data.failed}`, "red", "failure")
        }
    }
    getSubtotal =()=>{
        let total =0
        this.state.item.items.forEach((item)=>{
           total +=  item.quantity
        })
        return total
    }
    print = async () => {
    
        await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
        await BluetoothEscposPrinter.setBlob(0);
        await BluetoothEscposPrinter.printText("Drools\n\r", {
            encoding: 'GBK',
            codepage: 0,
            widthtimes: 3,
            heigthtimes: 3,
            fonttype: 1,
        });
        await BluetoothEscposPrinter.setBlob(0);
        await BluetoothEscposPrinter.printText("# 109 , Ground floor , 5th main corner , 60 ft road , AGB layout, Hesaragatta road\n\r", {
            encoding: 'GBK',
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1,
        });
        await BluetoothEscposPrinter.printText("Bangalore 560090\n\r", {});
        await BluetoothEscposPrinter.printText("PHONE:8976979769\n\r", {});
        await BluetoothEscposPrinter.printText("GSTIN:GDFTJLPHF3534\n\r", {});
        await BluetoothEscposPrinter.printText("\n\r", {});
        let columnWidths = [16, 16]
        await BluetoothEscposPrinter.printColumn(columnWidths,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
            [`BILLNO:${this.state.item.id}`, `DATE:${moment(new Date()).format("DD/MM/YYYY")}`], { fonttype: 0 });
        await BluetoothEscposPrinter.printText("\n\r", {});
        await BluetoothEscposPrinter.printText("--------------------------------\n\r", {});
        let columnWidts = [10, 6, 8, 8]
        await BluetoothEscposPrinter.printColumn(columnWidts,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
            ["ITEM", 'QTY', 'Price', 'Amt'], {});
        await BluetoothEscposPrinter.printText("--------------------------------\n\r", {});
        this.state.item.items.forEach(async (i) => {
            let columnWidth = [10, 6, 8, 8]
            await BluetoothEscposPrinter.printColumn(columnWidth,
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                [`${i.itemTitle}`, `${i.quantity}`, `${i.item_price}`, `${i.total_price}`], {});
        })
        await BluetoothEscposPrinter.printText("--------------------------------\n\r", {});
        let columnWidth4 = [10, 6, 8, 8]
        await BluetoothEscposPrinter.printColumn(columnWidth4,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
            ["SUBTOTAL", `${this.getSubtotal()}`, '', `${this.state.item.cart_bill}`], {});
        await BluetoothEscposPrinter.printText("--------------------------------\n\r", {});

       
            let columnWidth0 = [9, 12, 11]
           
        await BluetoothEscposPrinter.printColumn(columnWidth0,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
            [``, `GST @5.00%`, `${this.state.item.gst}`],{});
        await BluetoothEscposPrinter.printColumn(columnWidth0,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
            [``, `discount`, `${this.state.item.money_saved}`],{});
        await BluetoothEscposPrinter.printText("--------------------------------\n\r", {});
        let columnWidth5 = [16, 16]
        await BluetoothEscposPrinter.printColumn(columnWidth5,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
            ["TOTAL", `${this.state.item.total_price}`], { fonttype: 0 });
        await BluetoothEscposPrinter.printText("--------------------------------\n\r", {});
        await BluetoothEscposPrinter.printText("\n\r", {});
        await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
        await BluetoothEscposPrinter.printText("THANK YOU\n\r", {
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
    getDiscount = async()=>{
        let api = `${url}/api/drools/droolsDiscount/1/`
        let data = await HttpsClient.get(api)
        if (data.type == "success") {
            if (this.state.item.order_type =="Dining"){
                this.setState({ discount:data.data.online_discount.toString()})
            }
            if (this.state.item.order_type == "Takeaway") {
                this.setState({ discount: data.data.takeaway_discount.toString()})
            }
            if (this.state.item.order_type == "Online"){
                this.setState({ discount: data.data.takeaway_discount.toString() })
            }
        }
    }
    componentDidMount(){
        this.getDiscount()
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getOrders()
        });
    }
    componentWillUnmount(){
          
        this._unsubscribe()
    }
    footer =()=>{
        return(
            <View style={{marginVertical:10}}>
               <View style={{flexDirection:"row",height:height*0.06,margin:10}}>
                    <View style={{ flex: 0.2 }}>

                    </View>
                    <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center"}}>
                        <View style={{ alignSelf: "flex-end", marginRight:20 }}>
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
                    </View>
                    <View style={{flex:0.2,alignItems:"center",justifyContent:"center"}}>
                        <Text style={[styles.text, { color: primaryColor, fontSize: 25 }]}>₹ {this.state.item.cart_bill}</Text>
                        <Text style={[styles.text, { color: primaryColor, fontSize: 25 }]}>₹ {this.state.item.gst}</Text>
                        <Text style={[styles.text, { color: primaryColor, fontSize: 25 }]}>₹ {this.state.item.total_price}</Text>
                        <Text style={[styles.text, { color: primaryColor, fontSize: 25 }]}>₹ {this.state.item.money_saved}</Text>
                    </View>
                </View>
                 <View style={{marginVertical:10,marginLeft:10}}>
                     <Text style={[styles.text,{color:"#fff"}]}>Enter Discount %</Text>
                     <View style={{marginVertical:10}}>
                        <TextInput 
                          keyboardType={"numeric"}
                          style={{height:height*0.05,width:width*0.8,backgroundColor:"#fff",paddingLeft:10}}
                          selectionColor={primaryColor}
                          onChangeText={(discount) => { this.setState({ discount})}}
                          value={this.state.discount}
                       
                        />
                     </View>
                </View> 
                <View style={{alignItems:"center",marginTop:20,flexDirection:"row",justifyContent:"space-around"}}>
                    <TouchableOpacity style={{height:height*0.05,width:width*0.4,alignItems:"center",justifyContent:"center",backgroundColor:primaryColor}}
                     onPress={()=>{this.setState({modal:true})}}
                    >
                        <Text style={[styles.text,{color:"#fff"}]}>Complete Order</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center", backgroundColor: primaryColor }}
                        onPress={() => { this.props.navigation.navigate('SearchDishes2',{item:this.state.item})}}
                    >
                        <Text style={[styles.text, { color: "#fff" }]}>Add Items</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={{alignItems:"center",justifyContent:"center",marginVertical:30,flexDirection:"row"}}>
                    <TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center", backgroundColor: "green" }}
                        onPress={() => {this.print()}}
                    >
                        <Text style={[styles.text, { color: "#fff" }]}>Print</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: "row" ,marginLeft:10}}>
                        <View>
                            <Text style={[styles.text, { color: "#fff" }]}>status:</Text>
                        </View>
                     
                        <View style={{ marginLeft: 10, width: 10, height: 10, backgroundColor: this.props.bluetooth ? "green" : "red" ,borderRadius:10,marginTop:5}}>

                        </View>
                    </View>
                </View> */}
                {
                    this.state.item.order_type =="Takeaway"&&
                    <View style={{ flexDirection: "row", height: height * 0.06, margin: 20 }}>
                        <View style={{ flex: 0.2 }}>

                        </View>
                        <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
                            <View style={{ alignSelf: "flex-end", marginRight: 20 }}>
                                <Text style={[styles.text, { color: "#fff", fontSize: 22, }]}>Name :</Text>
                            </View>
                            <View style={{ alignSelf: "flex-end", marginRight: 20 }}>
                                <Text style={[styles.text, { color: "#fff", fontSize: 22, }]}>Mobile :</Text>
                            </View>
                    
                        </View>
                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.text, { color: primaryColor, fontSize: 25 }]}> {this.state.item.customer_name}</Text>
                            <Text style={[styles.text, { color: primaryColor, fontSize: 25 }]}> {this.state.item.customer_mobile}</Text>
                  
                        </View>
                    </View>
                }
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
    completeModal = ()=>{
        return(
            <Modal
                statusBarTranslucent ={true}
                isVisible={this.state.modal}
                deviceHeight={screenHeight}
                onBackdropPress={() => { this.setState({ modal: false }) }}
            >
                <View style={{ }}>

                    <View style={{height:height*0.5,backgroundColor:"#fff",borderRadius:5,alignItems:"center",justifyContent:"space-around"}}>
                        <View>
                            <Text style={[styles.text,{color:"#000",fontSize:22}]}>Order Status :</Text>
                        </View>
                        <View style={{ marginTop: 10 ,width:width*0.7,height:this.state.open?height*0.1:height*0.08}}>
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
                        <View>
                            <Text style={[styles.text, { color: "#000", fontSize: 22 }]}>Payment Status :</Text>
                        </View>
                        <View style={{ marginTop: 10, width: width * 0.7, height: this.state.open2 ? height * 0.1 : height * 0.08}}>
                            <DropDownPicker
                                style={{ height: height * 0.05 }}
                                containerStyle={{ height: height * 0.05 }}
                                open={this.state.open2}
                                value={this.state.paymentvalue}
                                items={paymentStatus}
                                setOpen={this.setOpen2}
                                setValue={this.setValue2}
                                setItems={this.setItems2}
                                placeholder="select a Table"
                            />
                        </View>
                        <View style ={{alignItems:"center"}}>
                            <TouchableOpacity style ={{height:height*0.05,width:width*0.4,alignItems:"center",justifyContent:"center",backgroundColor:primaryColor}}
                             onPress ={()=>{
                                 this.completeOrder()
                             }}
                            >
                                <Text style ={[styles.text,{color:"#fff"}]}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>



                </View>

            </Modal>
        )
    }
    validateColor =(item)=>{
        if (item.item_status =="Pending"){
            return "orange"
        }
        if (item.item_status == "Finished") {
            return "green"
        }
        return "red"
    }
    render() {
         console.log(this.props.bluetoothStatus,"bluuruu")
        return (
            <View style={{ flex: 1, backgroundColor: themeColor }}>
                <StatusBar style={"light"} />
                {/* Headers */}
                <LinearGradient
                    style={{ height: height * 0.12, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                    colors={gradients}
                >
                    <View style={{ marginTop: Constants.statusBarHeight ,flex:1,flexDirection:"row"}}>
                        <TouchableOpacity style={{flex:0.2,alignItems:"center",justifyContent:"center"}}
                         onPress={()=>{this.props.navigation.goBack()}}
                        >
                            <Ionicons name="caret-back" size={24} color={secondaryColor} />
                        </TouchableOpacity>
                        <View style={{flex:0.6,alignItems:"center",justifyContent:"center"}}>
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Order Details</Text>

                        </View>
                        <View style={{flex:0.2,alignItems:"center",justifyContent:"center"}}>

                        </View>
                    </View>
                </LinearGradient>

               <FlatList 
                    style={{marginTop:20}}
                    data={this.state.item.items}
                    keyExtractor ={(item,index)=>index.toString()}
                    ListFooterComponent={this.footer()}
                    renderItem ={({item,index})=>{
                        return(
                            <View style={{ height: height * 0.1, margin: 15, borderColor:"#E6E9F0",borderBottomWidth:0.5,flexDirection:"row"}}>
                                <View style={{flex:0.2,alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                                    <View style={[styles.boxWithShadow,{height:25,width:25,backgroundColor:"#333",alignItems:"center",justifyContent:"center"}]}>
                                        <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>{item.quantity}</Text>
                                    </View>
                                    <View style={{marginLeft:5}}>
                                        <Text style={[styles.text,{color:"#fff"}]}>X</Text>
                                    </View>
                                    <View>
                                        <Text style={[styles.text, { color: "#fff" }]}> ₹ {item.item_price}-{item.discount_price}</Text>
                                    </View>
                                </View>
                                <View style={{flex:0.6,alignItems:"center",justifyContent:"center"}}>
                                    <View>
                                        <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>{item.itemTitle}</Text>
                                    </View>
                                    <View>
                                        <Text style={[styles.text, { color: this.validateColor(item) }]}> {item.item_status}</Text>
                                    </View>
                                </View>
                                <View style={{flex:0.2,alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                                     <View>
                                        <Text style={[styles.text, { color: primaryColor, fontSize: 22 }]}>₹ {item.total_price}</Text>
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
        bluetooth:state.bluetoothStatus
    }
}
export default connect(mapStateToProps, { selectTheme })(ViewOrders);