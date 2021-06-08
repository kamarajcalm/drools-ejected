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
import { StatusBar, } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import orders from '../data/orders'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { set } from 'react-native-reanimated';
class ViewOrders extends Component {
    
    constructor(props) {
        let item = props.route.params.item
        super(props);
        this.state = {
            item
        };
    }
    footer =()=>{
        return(
            <View style={{}}>
               <View style={{flexDirection:"row",height:height*0.03,margin:20}}>
                    <View style={{ flex: 0.2 }}>

                    </View>
                    <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center"}}>
                        <View style={{ alignSelf: "flex-end", marginRight:20 }}>
                            <Text style={[styles.text,{color:"#fff",fontSize:22,}]}>Total :</Text>
                        </View>
                       
                    </View>
                    <View style={{flex:0.2,alignItems:"center",justifyContent:"center"}}>
                        <Text style={[styles.text, { color: primaryColor, fontSize: 25 }]}>₹ {this.state.item.totalCost}</Text>
                    </View>
                </View> 
                <View style={{alignItems:"center",marginTop:20}}>
                    <TouchableOpacity style={{height:height*0.05,width:width*0.4,alignItems:"center",justifyContent:"center",backgroundColor:primaryColor}}>
                        <Text style={[styles.text,{color:"#fff"}]}>Complete Order</Text>
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
                                        <Text style={[styles.text,{color:"#fff",fontSize:18}]}>{item.count}</Text>
                                    </View>
                                    <View style={{marginLeft:5}}>
                                        <Text style={[styles.text,{color:"#fff"}]}>X</Text>
                                    </View>
                                    <View>
                                        <Text style={[styles.text, { color: "#fff" }]}> ₹ {item.itemPrice}</Text>
                                    </View>
                                </View>
                                <View style={{flex:0.6,alignItems:"center",justifyContent:"center"}}>
                                    <View>
                                        <Text style={[styles.text, { color: "#fff",fontSize:18 }]}>{item.name}</Text>
                                    </View>
                                    <View>
                                        <Text style={[styles.text, { color: "#fff" }]}>1 plate | ₹ {item.itemPrice}</Text>
                                    </View>
                                </View>
                                <View style={{flex:0.2,alignItems:"center",justifyContent:"center"}}>
                                     <View>
                                        <Text style={[styles.text, { color: primaryColor,fontSize:22 }]}>₹ {item.totalPrice}</Text>
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