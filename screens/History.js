import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet,FlatList,Image,ActivityIndicator,Alert} from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme ,setTodayIncome,setShowIncome} from '../actions';
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
import momemt from 'moment';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import HttpsClient from '../HttpsClient';
class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            today:momemt(new Date()).format("YYYY-MM-DD"),
            orders:[],
            refreshing:false,
            offset:0,
            loadmore:true,
            first:true
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
    hideDatePicker = () => {
        this.setState({show:false})
    };
    handleConfirm = (date) => {
        this.setState({ today: momemt(date).format("YYYY-MM-DD"), orders:[]},()=>{
            this.getOrders()
        })
        this.hideDatePicker();
    };
    getOrders = async () => {
        this.setState({ refreshing:true,first:false})
        let api = `${url}/api/drools/cart/?date=${this.state.today}&limit=${6}&offset=${this.state.offset}`
        const data = await HttpsClient.get(api)
        console.log(api)
        if (data.type == "success") {
            if(data.data.next==null){
                this.setState({loadmore:false})
            }
            this.setState({ orders: this.state.orders.concat(data.data.results), refreshing:false})
        }else{
            this.setState({refreshing:false})
        }
    }
    getIncome = async()=>{
        let api = `${url}/api/drools/netIncome/`
        let data = await HttpsClient.get(api)
        if(data.type =="success"){
            this.props.setTodayIncome(data.data.today_income)
        }

    }
    componentDidMount() {
     
        this.getOrders()
        this.getIncome()
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            if(!this.state.first){
                this.setState({ orders: [], offset: 0, loadmore: true }, () => {
                    this.getOrders()
                    this.getIncome()
                })
            }
        });
    }
    componentWillUnmount() {
        this._unsubscribe()
    }
    validateColor = (item) => {
        if (item.cart_status == "Pending") {
            return "orange"
        }
        if (item.cart_status == "Completed") {
            return "green"
        }
        if (item.cart_status == "Declined") {
            return "red"
        }
    }
    footer =()=>{
        if(this.state.loadmore){
            return(
                <ActivityIndicator size={"large"}  color={primaryColor}/>
            )
        }else{
            return null
        }
    }
    loadmore =()=>{
         if(this.state.loadmore){
             this.setState({ offset: this.state.offset + 6 }, () => {
                 this.getOrders()
             })
         }
     
    }
    deleteItem = async(item,index)=>{
        let api = `${url}/api/drools/cart/${item.id}/`
        let del = await HttpsClient.delete(api)
        if(del.type=="success"){
            let duplicate =  this.state.orders
            duplicate.splice(index,1)
            this.setState({ orders:duplicate})
            return this.showSimpleMessage("Deleted SuccessFully","green","success")
        }else{
            return this.showSimpleMessage("Try Again", "red", "danger")
        }
    }
    createAlert = (item, index) => {
        Alert.alert(
            "Do you want to delete?",
            ``,
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => { this.deleteItem(item, index) } }
            ]
        );
    }
    render() {
     
        return (
           <View style={{flex:1,backgroundColor:themeColor}}>
            <LinearGradient
                    style={{ height: height * 0.05, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                    colors={gradients}
                >
                    <TouchableOpacity style={{ flex: 1, flexDirection: "row" }}
                        onPress={() => { this.props.setShowIncome(true) }}
                    >
                       
                        <View style={{ flex: 0.7, alignItems: "center", justifyContent: "center" }}>
                          
                          {this.props.user.is_manager&&  <Text style={[styles.text, { color: "#fff", fontSize: 20 }]}>Today Income: ₹ {this.props.todayIncome}</Text>}
                        </View>
                        <TouchableOpacity style={{ flex: 0.3, alignItems: "center", justifyContent: "space-around" ,flexDirection:"row"}}
                         onPress ={()=>{this.setState({show:true})}}
                        > 
                        <View>
                          <Text style={[styles.text,{color:"#fff"}]}>{this.state.today}</Text>
                        </View>
                            <Fontisto name="date" size={24} color="#fff" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </LinearGradient>
                <FlatList
                    bounces={false}
                    ListFooterComponent={this.footer()}
                    refreshing={this.state.refreshing}
                    onRefresh={()=>{this.setState({orders:[],offset:0,loadmore:true},()=>{
                        this.getOrders();
                        this.getIncome();
                    })}}
                    style={{ backgroundColor: "#333" }}
                    data={this.state.orders}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={()=>{this.loadmore()}}
                    onEndReachedThreshold={0.1}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={{ height: height * 0.2, borderColor: "#fff", borderBottomWidth: 0.5, flexDirection: "row", paddingVertical: 10 }}
                                onPress={() => { this.props.navigation.navigate('ViewOrders2', { item }) }}
                            >

                                <View style={{ flex: 1, }}>
                                    <View style={{ flex: 0.5, paddingHorizontal:10 }}>
                                        <View style={{ flex: 0.7, }}>
                                            <View style={{ flex: 0.5, }}>
                                                <View>
                                                    <Text style={[styles.text, { fontSize: 18, color: primaryColor }]}>Table : {item.tableTitle}</Text>
                                                     <Text style={[styles.text, { fontSize: 18, color: primaryColor ,textAlign:"center"}]}>{item.timeAgo}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 0.5, alignItems: "flex-end", paddingRight: 20 }}>
                                                <Text style={[styles.text, { fontSize: 18, color: "#fff" }]}># {item.id}</Text>
                                                <Text style={[styles.text, {  color: "#fff" }]}> {momemt(item.updated).format('hh:mm a')}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 0.2 }}>
                                            <Text style={[styles.text, { color: "#fff" }]}>{momemt(item.created).format('hh:mm a')}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", flex: 0.35, alignItems: "center", justifyContent: "space-between" ,paddingHorizontal:10}}>
                                     
                                        <Text style={[styles.text, { color: primaryColor }]}>{item.order_type}</Text>
                                        <Text style={[styles.text, { color: this.validateColor(item) }]}>{item.cart_status}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", flex: 0.15, alignItems: "center", justifyContent: "space-around" }}>
                                        <View>
                                            <Text style={[styles.text, { color: "#eee" }]}>Items Count: {item.items.length}</Text>
                                        </View>
                                        <View>
                                            <Text style={[styles.text, { color: "#fafafa" }]}>Price : ₹{item.total_price}</Text>
                                        </View>
                                    </View>
                                </View>
                            {this.props.user.is_manager&&<View style={{position:"absolute",top:10,right:10}}>
                                    <TouchableOpacity 
                                      onPress={()=>{this.createAlert(item,index)}}
                                    >
                                        <MaterialIcons name="delete" size={24} color="red"/>
                                    </TouchableOpacity>
                              
                                </View>}
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
const styles =StyleSheet.create({
 text:{
     fontFamily
 }
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
        todayIncome: state.todayIncome,
        user:state.selectedUser
    }
}
export default connect(mapStateToProps, { selectTheme, setTodayIncome, setShowIncome})(History);