import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet,FlatList,Image} from 'react-native';
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
import momemt from 'moment';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import HttpsClient from '../HttpsClient';
class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            today:momemt(new Date()).format("YYYY-MM-DD"),
            orders:[]
        };
    }
    hideDatePicker = () => {
        this.setState({show:false})
    };
    handleConfirm = (date) => {
        this.setState({ today:momemt(date).format("YYYY-MM-DD")},()=>{
            this.getOrders()
        })
        this.hideDatePicker();
    };
    getOrders = async () => {
        let api = `${url}/api/drools/cart/?date=${this.state.today}`
        const data = await HttpsClient.get(api)
        console.log(api)
        if (data.type == "success") {
            this.setState({ orders: data.data })
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
    render() {
     
        return (
           <View style={{flex:1,backgroundColor:themeColor}}>
                <LinearGradient
                    style={{ height: height * 0.12, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                    colors={gradients}
                >
                    <View style={{ marginTop: Constants.statusBarHeight, flex: 1, flexDirection: "row" }}>
                        <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}
                        
                        >
                         
                        </View>
                        <View style={{ flex: 0.4, alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>History</Text>

                        </View>
                        <TouchableOpacity style={{ flex: 0.3, alignItems: "center", justifyContent: "space-around" ,flexDirection:"row"}}
                         onPress ={()=>{this.setState({show:true})}}
                        > 
                        <View>
                          <Text style={[styles.text,{color:"#fff"}]}>{this.state.today}</Text>
                        </View>
                            <Fontisto name="date" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                <FlatList
                    style={{ backgroundColor: "#333" }}
                    data={this.state.orders}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={{ height: height * 0.18, borderColor: "#fff", borderBottomWidth: 0.5, flexDirection: "row", paddingVertical: 10 }}
                                onPress={() => { this.props.navigation.navigate('ViewOrders2', { item }) }}
                            >

                                <View style={{ flex: 1, }}>
                                    <View style={{ flex: 0.7, padding: 10, }}>
                                        <View style={{ flex: 0.7, }}>
                                            <View style={{ flex: 0.5, }}>
                                                <View>
                                                    <Text style={[styles.text, { fontSize: 18, color: primaryColor }]}>Table : {item.table}</Text>

                                                </View>
                                            </View>
                                            <View style={{ flex: 0.5, alignItems: "flex-end", paddingRight: 20 }}>
                                                <Text style={[styles.text, { fontSize: 18, color: "#fff" }]}># {item.id}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 0.2 }}>
                                            <Text style={[styles.text, { color: "#fff" }]}>10:00 am</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", flex: 0.25, alignItems: "center", justifyContent: "space-around" }}>
                                        <Text style={[styles.text, { color: this.validateColor(item) }]}>{item.cart_status}</Text>
                                        <Text style={[styles.text, { color: primaryColor }]}>{item.order_type}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", flex: 0.15, alignItems: "center", justifyContent: "space-around" }}>
                                        <View>
                                            <Text style={[styles.text, { color: "#eee" }]}>Items Count: {item.items.length}</Text>
                                        </View>
                                        <View>
                                            <Text style={[styles.text, { color: "#fafafa" }]}>Price : ₹{item.cart_bill}</Text>
                                        </View>
                                    </View>
                                </View>
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
    }
}
export default connect(mapStateToProps, { selectTheme })(History);