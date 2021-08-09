import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, Alert} from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily =settings.fontFamily
const themeColor = settings.themeColor
const url = settings.url
import { StatusBar ,} from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import cookOrders from '../data/cookOrders';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5, Foundation } from '@expo/vector-icons';
import { set } from 'react-native-reanimated';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import Modal from 'react-native-modal';
import HttpsClient from '../HttpsClient';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import * as Notifications from 'expo-notifications';
import Morning from './Morning';
import AfterNoon from './AfterNoon';
import Night from './Night';

const screenHeight = Dimensions.get('screen').height
 class SubscriptionOrders extends Component {
    constructor(props) {
        super(props);
             const routes = [
            { key: 'Morning', title: 'Morning' },
            { key: 'AfterNoon', title: 'AfterNoon' },
            { key: 'Night', title:'Night'},
        ];
        this.state = {
            routes,
            index: 0,
            orders:null
        };
    }
   getOrders = async()=>{
       let api = `${url}/api/drools/cookSuborders/`
       let data = await HttpsClient.get(api)
       if(data.type =="success"){
          this.setState({orders:data.data})
       }
      
   } 
     componentDidMount() {
       
         this.getOrders()
         this._unsubscribe = this.props.navigation.addListener('focus', () => {
            

         });
   
     }
     componentWillUnmount() {
         this._unsubscribe()
      
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

     renderScene = ({ route, }) => {
         switch (route.key) {
             case 'Morning':
                 return <Morning navigation={this.props.navigation} orders={this.state.orders?.MORNING}/>
             case 'AfterNoon':
                 return <AfterNoon navigation={this.props.navigation} orders={this.state.orders?.AFTERNOON}/>
             case 'Night':
                 return <Night navigation={this.props.navigation} orders={this.state.orders?.NIGHT} />
             default:
                 return null;
         }
     };
    render() {
       const { index, routes } = this.state
        return (
            <View style={{flex:1,backgroundColor:themeColor}}>
                <StatusBar style={"light"}/>
                   {/* Headers */}
                    <LinearGradient
                        style={{ height: height * 0.12, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                        colors={gradients}
                    >
                    <View style={{marginTop:Constants.statusBarHeight,flexDirection:"row"}}>
                        <TouchableOpacity 
                        style ={{flex:0.2,alignItems:"center",justifyContent:"center"}}
                        >

                        </TouchableOpacity>
                        <View style={{flex:0.6,alignItems:"center",justifyContent:"center"}}>
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Plan Orders</Text>
                        </View>
                        <View style={{flex:0.2,alignItems:"center",justifyContent:"center"}}>

                        </View>
                           
                    </View>
                    </LinearGradient>
                     <TabView
                        style={{ backgroundColor: "#ffffff", }}
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
export default connect(mapStateToProps, { selectTheme })(SubscriptionOrders);