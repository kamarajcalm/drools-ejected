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
import orders from '../data/orders'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { set } from 'react-native-reanimated';
import HttpsClient from '../HttpsClient';
class ViewOrders extends Component {
    
    constructor(props) {
        let item = props.route.params.item
        super(props);
        this.state = {
            item
        };
    }
    getOrders = async () => {
        let api = `${url}/api/drools/cart/${this.state.item.id}/`
        const data = await HttpsClient.get(api)
  
        if (data.type == "success") {
            this.setState({ item: data.data })
        }
    }
    completeOrder =async()=>{
        let api = `${url}/api/drools/createOrder/`
        let sendData ={
            status:"Completed",
            payment_status:"Paid",
            cart_id:this.state.item.id
        }
        let post = await HttpsClient.post(api,sendData)
        console.log(post)
    }
    componentDidMount(){
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
                            <Text style={[styles.text,{color:"#fff",fontSize:22,}]}>Total :</Text>
                        </View>
                        <View style={{ alignSelf: "flex-end", marginRight: 20 }}>
                            <Text style={[styles.text, { color: "#fff", fontSize: 22, }]}>Actual Price :</Text>
                        </View>
                        <View style={{ alignSelf: "flex-end", marginRight: 20 }}>
                            <Text style={[styles.text, { color: "#fff", fontSize: 22, }]}>Money Saved :</Text>
                        </View>
                    </View>
                    <View style={{flex:0.2,alignItems:"center",justifyContent:"center"}}>
                        <Text style={[styles.text, { color: primaryColor, fontSize: 25 }]}>₹ {this.state.item.cart_bill}</Text>
                        <Text style={[styles.text, { color: primaryColor, fontSize: 25 }]}>₹ {this.state.item.total_price}</Text>
                        <Text style={[styles.text, { color: primaryColor, fontSize: 25 }]}>₹ {this.state.item.money_saved}</Text>
                    </View>
                </View> 
                <View style={{alignItems:"center",marginTop:20,flexDirection:"row",justifyContent:"space-around"}}>
                    <TouchableOpacity style={{height:height*0.05,width:width*0.4,alignItems:"center",justifyContent:"center",backgroundColor:primaryColor}}
                     onPress={()=>{this.completeOrder()}}
                    >
                        <Text style={[styles.text,{color:"#fff"}]}>Complete Order</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center", backgroundColor: primaryColor }}
                        onPress={() => { this.props.navigation.navigate('SearchDishes2',{item:this.state.item})}}
                    >
                        <Text style={[styles.text, { color: "#fff" }]}>Add Items</Text>
                    </TouchableOpacity>
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
                                    {/* <View>
                                        <Text style={[styles.text, { color: "#fff" }]}>1 plate | ₹ {item.itemPrice}</Text>
                                    </View> */}
                                </View>
                                <View style={{flex:0.2,alignItems:"center",justifyContent:"center"}}>
                                     <View>
                                        <Text style={[styles.text, { color: primaryColor, fontSize: 22 }]}>₹ {item.total_price}</Text>
                                     </View>
                                </View>
                            </View>
                        )
                    }}
               />


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
    }
}
export default connect(mapStateToProps, { selectTheme })(ViewOrders);