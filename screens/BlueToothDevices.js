import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image,AsyncStorage } from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme,bluetoothStatus } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily = settings.fontFamily
const themeColor = settings.themeColor
const url = settings.url
import { StatusBar, } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import orders from '../data/orders'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import NormalOrders from './NormalOrders';
import TakeAway from './TakeAway';
import CreateOnline from './CreateOnline';
import { BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter, } from 'react-native-bluetooth-escpos-printer';

 class BlueToothDevices extends Component {
  constructor(props) {
    super(props);
    this.state = {
        devices: [],
        selectedDevice: null
    };
  }
     getBluetoothDevices = () => {
         BluetoothManager.enableBluetooth().then((r) => {
             var paired = [];
             if (r && r.length > 0) {
                 for (var i = 0; i < r.length; i++) {
                     try {
                         paired.push(JSON.parse(r[i])); // NEED TO PARSE THE DEVICE INFORMATION
                     } catch (e) {
                         //ignore
                     }
                 }
             }
             console.log(JSON.stringify(paired))
             this.setState({ devices: paired })
         }, (err) => {
             alert(err)
         });
     }
     connectToDevice = (item) => {
         BluetoothManager.connect(item.address) // the device address scanned.
             .then((s) => {
                 this.props.bluetoothStatus(true)
                 AsyncStorage.setItem("bluetoothAddress", `${item.address}`)
                 AsyncStorage.setItem("bluetoothName", `${item.name}`)
                 this.setState({
                     selectedDevice: item

                 })
             }, (e) => {
                 this.setState({
                     loading: false
                 })
                 alert(e);
             })
     }
     getPreviousConnectedDevice = async()=>{
         const address = await AsyncStorage.getItem("bluetoothAddress")
         const name = await AsyncStorage.getItem("bluetoothName")
         if (address == null) {
             alert("please connect bluetooth Printer")
             return
         }
         BluetoothManager.connect(address) // the device address scanned.
             .then((s) => {
                 alert("Printer connected")
                 this.props.bluetoothStatus(true)
             }, (e) => {
                 this.setState({
                     loading: false
                 })
                 alert(e);
             })
         this.setState({ selectedDevice: { address: address, name: name}})
     }
    componentDidMount() {
         this.getBluetoothDevices()
         this.getPreviousConnectedDevice()
     }
  render() {
    return (
        <View style={{ flex: 1,  }}>
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
                        <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>BlueToothDevices</Text>

                    </View>
                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                    </View>
                </View>
            </LinearGradient>
            <FlatList
                data={this.state.devices}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {

                    return (
                        <TouchableOpacity style={{ marginTop: 5,backgroundColor:"#eeee",paddingVertical:20,flexDirection:"row",alignItems:"center",justifyContent:"center" }}
                            onPress={() => { this.connectToDevice(item) }}
                        >
                            
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
            <View style={{marginVertical:20,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                <Text style={[styles.text,{color:"#000",fontWeight:"bold",fontSize:22}]}>Selected Device:{this.state.selectedDevice?.name}</Text>
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
export default connect(mapStateToProps, { selectTheme, bluetoothStatus})(BlueToothDevices);