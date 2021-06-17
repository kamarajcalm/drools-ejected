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

 class NormalOrders extends Component {
  constructor(props) {
      console.log(props)
    super(props);
    this.state = {
        orders:[]
    };
  }
     getOrders = async()=>{
         let api = `${url}/api/drools/cart/?order_type=Dining&cart_status=Pending`
         const data = await HttpsClient.get(api)
         console.log(api)
         if(data.type =="success"){
             this.setState({orders:data.data})
         }
     }
   componentDidMount (){
       this.getOrders()
       this._unsubscribe = this.props.navigation.addListener('focus', () => {
           this.getOrders()

       });
   }
   componentWillUnmount(){
        this._unsubscribe()
   }
     validateColor =(item)=>{
         if (item.cart_status =="Pending"){
             return "orange"
         }
     }
  render() {
    return (
      <View style={{flex:1}}>
            <FlatList
                        style={{backgroundColor:"#333"}}
                        data={this.state.orders}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                              <TouchableOpacity style={{height:height*0.18,borderColor:"#fff",borderBottomWidth:0.5,flexDirection:"row",paddingVertical:10}}
                                    onPress={() => { this.props.navigation.navigate('ViewOrder',{item})}}
                              >
                               
                                <View style={{ flex: 1, }}>
                                        <View style={{flex:0.7,padding: 10,}}>
                                            <View style={{flex:0.7,}}> 
                                                <View style={{ flex: 0.5,}}>
                                                    <View>
                                                        <Text style={[styles.text, { fontSize: 18, color: primaryColor }]}>Table : {item.table}</Text>

                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.5, alignItems: "flex-end", paddingRight: 20 }}>
                                                    <Text style={[styles.text, { fontSize: 18, color:"#fff" }]}># {item.id}</Text>
                                                </View>
                                            </View>
                                           <View style={{flex:0.2}}>
                                               <Text style={[styles.text,{color:"#fff"}]}>10:00 am</Text>
                                           </View>
                                        </View>
                                        <View style={{ flexDirection: "row", flex: 0.25, alignItems: "center", justifyContent: "space-around" }}>
                                            <Text style={[styles.text, { color: this.validateColor(item) }]}>{item.cart_status}</Text>
                                        </View>
                                        <View style={{flexDirection:"row",flex:0.15,alignItems:"center",justifyContent:"space-around"}}>
                                            <View>
                                                <Text style={[styles.text,{color:"#eee"}]}>Items Count: {item.items.length}</Text>
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
                    onPress={() => { this.props.navigation.navigate("CreateNormalOrder", )}}
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
export default connect(mapStateToProps, { selectTheme })(NormalOrders);