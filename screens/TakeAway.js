import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
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
import { StatusBar, } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import orders from '../data/orders'
import { FontAwesome, AntDesign, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import HttpsClient from '../HttpsClient';
import moment from 'moment';
import axios from 'axios';
class TakeAway extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            refreshing:false
        };
    }
    getOrders = async () => {
        this.setState({refreshing:true})
        let api = `${url}/api/drools/cart/?order_type=Takeaway&cart_status=Pending`
        const data = await HttpsClient.get(api)
        console.log(data , "ooooo")
        if (data.type == "success") {
            this.setState({ orders: data.data, refreshing:false},()=>{
               
            })
        }else{
            this.setState({refreshing:false})
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
    }
    render() {
        
        return (
            <View style={{ flex: 1 }}>
                <LinearGradient
                    style={{ height: height * 0.05, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                    colors={gradients}
                >
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <View>
                            <Text style={[styles.text, { color: "#fff", fontSize: 20 }]}>Today Income: ₹ 10000</Text>
                        </View>
                    </View>
                </LinearGradient>
                <FlatList
                     refreshing={this.state.refreshing}
                     onRefresh={()=>{this.getOrders()}}
                    style={{ backgroundColor: "#333" }}
                    data={this.state.orders}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                      
                        return (
                            <TouchableOpacity style={{ height: height * 0.2, borderColor: "#fff", borderBottomWidth: 0.5, flexDirection: "row", paddingVertical: 10 }}
                                onPress={() => { this.props.navigation.navigate('ViewOrder', { item }) }}
                            >

                                <View
                                    style={{ flex: 1, height: "100%" }}

                                >
                                    <View style={{ flex: 0.5, paddingHorizontal: 10 }}>
                                        <View style={{ flex: 0.7, }}>
                                            <View style={{ flex: 0.5, }}>
                                                <View>
                                                    <Text style={[styles.text, { fontSize: 18, color: primaryColor }]}>Table : {item.tableTitle}</Text>

                                                </View>
                                            </View>
                                            <View style={{ flex: 0.5, alignItems: "flex-end", paddingRight: 20 }}>
                                                <Text style={[styles.text, { fontSize: 18, color: "#fff" }]}># {item.id}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 0.3 }}>
                                            <Text style={[styles.text, { color: "#fff" }]}>{moment(item.created).format("hh:mm a")}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", flex: 0.35, alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10 }}>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[styles.text, { color: "#fff" }]}>Cooking : </Text>
                                            <Text style={[styles.text, { color: this.validateColor(item) }]}>{item.cart_status}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[styles.text, { color: "#fff" }]}>Bill : </Text>
                                            <Text style={[styles.text, { color: this.validateColor(item) }]}>{item.cart_status}</Text>
                                        </View>

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
                            </TouchableOpacity>
                        )
                    }}
                />
                <View style={{
                    position: "absolute",
                    bottom: 50,
                    left: 20,
                    right: 20,
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20
                }}>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.navigate("CreateTakeAway",) }}
                    >
                        <AntDesign name="pluscircle" size={40} color={primaryColor} />
                    </TouchableOpacity>
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
export default connect(mapStateToProps, { selectTheme })(TakeAway);
