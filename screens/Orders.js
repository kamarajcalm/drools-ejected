import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, AsyncStorage,Switch} from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme ,bluetoothStatus,setOnePlusOne,setShowIncome} from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily =settings.fontFamily
const themeColor = settings.themeColor
const url =settings.url
import { StatusBar ,} from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import orders from '../data/orders'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import NormalOrders from './NormalOrders';
import TakeAway from './TakeAway';
import CreateOnline from './CreateOnline';
import { BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter, } from 'react-native-bluetooth-escpos-printer';
import OnlineOrders from './OnlineOrders';
import History from './History';
import MonthPicker from 'react-native-month-year-picker';
import HttpsClient from '../HttpsClient';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
const months = ["January","Febrauary","March","April","May","June","July","August","September","Octobor","November","December"]
const incomes = [
    {
        date:"1/2/2021",
        Account:"SBI",
        Cash:"$4000",
        Total:"$4000"
    },
    {
        date: "1/2/2021",
        Account: "SBI",
        Cash: "$4000",
        Total: "$4000"
    },
    {
        date: "1/2/2021",
        Account: "SBI",
        Cash: "$4000",
        Total: "$4000"
    },
    {
        date: "1/2/2021",
        Account: "SBI",
        Cash: "$4000",
        Total: "$4000"
    },
    {
        date: "1/2/2021",
        Account: "SBI",
        Cash: "$4000",
        Total: "$4000"
    },
    {
        date: "1/2/2021",
        Account: "SBI",
        Cash: "$4000",
        Total: "$4000"
    },
    {
        date: "1/2/2021",
        Account: "SBI",
        Cash: "$4000",
        Total: "$4000"
    },
]
const Month = ["Janauary","Feb"]
 class Orders extends Component {
    constructor(props) {
        const d = new Date()
        const month = d.getMonth() + 1
        const year = d.getFullYear()
        super(props);
        const routes = [
            { key: 'Dining', title: 'Dining' },
            { key: 'Take Away', title: 'Take Away' },
            { key: 'History', title:'History'},
        ];
        this.state = {
            routes,
            index: 0,
            oneplusOne:false,
            show:false,
            year,
            month,
            incomes: [],
            income:null,
            refreshing:false,
            fromDate: moment(new Date()).format("YYYY-MM-DD"),
            data:null
        };
    }
     renderScene = ({ route, }) => {
         switch (route.key) {

             case 'Dining':
                 return <NormalOrders navigation={this.props.navigation} />
             case 'Take Away':
                 return <TakeAway navigation={this.props.navigation} />
             case 'History':
                 return <History navigation={this.props.navigation} />
             default:
                 return null;
         }
     };
     enableBluetooth =async()=>{
         BluetoothManager.enableBluetooth().then(async(r) => {
             const address = await AsyncStorage.getItem("bluetoothAddress")
             const name = await AsyncStorage.getItem("bluetoothName")
             if(address==null){
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
         }, (err) => {
             alert(err)
         });
     }
     toggleSwitch =()=>{
         this.props.setOnePlusOne(!this.props.oneplusOne)
    
     }
     getBills = async()=>{
       let api = `${url}/api/drools/bulkBill/?date=${this.state.fromDate}`
       const data = await HttpsClient.get(api)
       if(data.type=="success"){
           this.setState({incomes:data.data.data,data:data.data})
       }
     }
     componentDidMount(){
         console.log(this.props)
         this.enableBluetooth()
         
         this.getBills()
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
     refresh =()=>{
         this.getBills()
     }
     footer =()=>{
         return(
             <View style={{ flexDirection: "row",marginBottom:20}}>
                 <View style={{ flex: 2.5, alignItems: "center", justifyContent: "center",  }}>
                 
                 </View>
                 <View style={{ flex: 2.5, alignItems: "center", justifyContent: "center",  }}>
                     
                 </View>
                 <View style={{ flex: 2.5, alignItems: "center", justifyContent: "center",paddingVertical:5 }}>
                     <Text style={[styles.text, { color: primaryColor, fontSize:18}]}>Total</Text>
                 </View>
                 <View style={{ flex: 2.5, alignItems: "center", justifyContent: "center", borderColor: "gray", borderWidth: 1,borderRightWidth:0}}>
                     <Text style={[styles.text, { color: primaryColor, fontSize: 18 }]}> ₹ {this.state?.data?.totalamount}</Text>
                 </View>
             </View>
         )
     }
     header =()=>{
         return(
             <View style={{flexDirection:"row",marginTop:10,borderColor:"gray",borderWidth:1,}}>
                 <View style={{ flex: 2.5, alignItems: "center", justifyContent: "center", borderColor: "gray", borderRightWidth: 1,paddingVertical:5}}>
                        <Text style={[styles.text,{color:primaryColor,}]}>#</Text>
                  </View>
                 <View style={{ flex: 2.5, alignItems: "center", justifyContent: "center", borderColor: "gray", borderRightWidth: 1, paddingVertical: 5}}>
                     <Text style={[styles.text, { color: primaryColor, }]}>Bill No</Text>
                  </View>
                 <View style={{ flex: 2.5, alignItems: "center", justifyContent: "center", borderColor: "gray", borderRightWidth: 1, paddingVertical: 5}}>
                     <Text style={[styles.text, { color: primaryColor, }]}>Mode</Text>
                  </View>
                 <View style={{ flex: 2.5, alignItems: "center", justifyContent: "center"  ,paddingVertical: 5}}>
                     <Text style={[styles.text, { color:primaryColor, }]}>Cash</Text>
                  </View>
             </View>
         )
     }
    render() {
        const { index, routes } = this.state
        return (
            <View style={{flex:1,backgroundColor:themeColor}}>
                <StatusBar style={"light"}/>
                   {/* Headers */}
                    <LinearGradient
                        style={{ height: height * 0.12, flexDirection: "row",}}
                        colors={gradients}
                    >
                    <View style={{marginTop:Constants.statusBarHeight,flexDirection:"row",flex:1}}>
                            <View style={{flex:0.2}}>
                                
                            </View>
                             <View style={{flex:0.6,alignItems:"center",justifyContent:"center"}}>
                                    <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Orders </Text>
                             </View>
                             <View style={{flex:0.2,flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
                                 
                             </View>
                       
                    </View>
                    </LinearGradient>
                <TabView
                    style={{ backgroundColor: "#ffffff" }}
                    navigationState={{ index, routes }}
                    renderScene={this.renderScene}
                    onIndexChange={(index) => { this.setState({ index }) }}
                    initialLayout={{ width }}
                    renderTabBar={(props) =>
                        <TabBar
                            {...props}
                            renderLabel={({ route, focused, color }) => (
                                <Text style={{ color: focused ? primaryColor : 'gray', margin: 8, fontWeight: "bold" }}>
                                    {route.title}
                                </Text>
                            )}
                            style={{ backgroundColor: "#fff", height: 50, fontWeight: "bold", color: "red" }}
                            labelStyle={{ fontWeight: "bold", color: "red" }}
                            indicatorStyle={{ backgroundColor: primaryColor, height: 5 }}
                        />
                    }

                />
                    
                {this.props.showIncome&&<View style={{position:"absolute",top:Constants.statusBarHeight,height,width,backgroundColor:"#000"}}>
                       <View style={{alignItems:"flex-end",marginTop:10,marginRight:20}}>
                       <TouchableOpacity 
                            onPress={() => { this.props.setShowIncome(false)}}
                       >
                            <Entypo name="circle-with-cross" size={24} color="red"/>
                       </TouchableOpacity>
                   </View>
                   <View style={{alignItems:"center"}}>
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
                   </View>
 
            
                   <FlatList 
                     contentContainerStyle={{paddingBottom:90}}
                     refreshing={this.state.refreshing}
                     onRefresh = {()=>{this.refresh()}}
                     ListFooterComponent={this.footer()}
                     ListHeaderComponent={this.header()}
                     data={this.state.incomes}
                     keyExtractor={(item,index)=>index.toString()}
                     renderItem ={({item,index})=>{
                         return(
                             <View style={{ flexDirection: "row", borderColor: "gray", borderBottomWidth: 1, }}>
                                 <View style={{ flex: 2.5, alignItems: "center", justifyContent: "center", borderColor: "gray", borderRightWidth: 1, paddingVertical: 5 }}>
                                     <Text style={[styles.text, { color: "#fff", }]}>{index+1}</Text>
                                 </View>
                                 <View style={{ flex: 2.5, alignItems: "center", justifyContent: "center", borderColor: "gray", borderRightWidth: 1, paddingVertical: 5 }}>
                                     <Text style={[styles.text, { color: "#fff", }]}> {item.billno}</Text>
                                 </View>
                                 <View style={{ flex: 2.5, alignItems: "center", justifyContent: "center", borderColor: "gray", borderRightWidth: 1, paddingVertical: 5 }}>
                                     <Text style={[styles.text, { color: "#fff", }]}> {item.mode}</Text>
                                 </View>
                                 <View style={{ flex: 2.5, alignItems: "center", justifyContent: "center",paddingVertical:5 }}>
                                     <Text style={[styles.text, { color: "#fff", }]}> ₹ {item.amount}</Text>
                                 </View>
                             </View>
                         )
                     }}
                   />
              </View>}
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
const styles =StyleSheet.create({
   text:{
       fontFamily
   }
})
const mapStateToProps = (state) => {
   
    return {
        theme: state.selectedTheme,
        bluetooth:state.bluetoothStatus,
        oneplusOne: state.onePlusOne,
        showIncome: state.showIncome
    }
}
export default connect(mapStateToProps, { selectTheme, bluetoothStatus, setOnePlusOne, setShowIncome})(Orders);