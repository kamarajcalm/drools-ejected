import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image} from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
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


 class Orders extends Component {
    constructor(props) {
        super(props);
        const routes = [
            { key: 'Dining', title: 'Dining' },
            { key: 'Take Away', title: 'Take Away' },
            { key: 'Online', title:'Online'},
        ];
        this.state = {
            routes,
            index: 0,
        };
    }
     renderScene = ({ route, }) => {
         switch (route.key) {

             case 'Dining':
                 return <NormalOrders navigation={this.props.navigation} />
             case 'Take Away':
                 return <TakeAway navigation={this.props.navigation} />
             case 'Online':
                 return <CreateOnline navigation={this.props.navigation} />
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
                    <View style={{marginTop:Constants.statusBarHeight}}>
                            <Text style={[styles.text, { color: "#fff",fontSize: 18 }]}>Orders</Text>
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
                                <Text style={{ color: focused ? themeColor : 'gray', margin: 8, fontWeight: "bold" }}>
                                    {route.title}
                                </Text>
                            )}
                            style={{ backgroundColor: "#fff", height: 50, fontWeight: "bold", color: "red" }}
                            labelStyle={{ fontWeight: "bold", color: "red" }}
                            indicatorStyle={{ backgroundColor: themeColor, height: 5 }}
                        />
                    }

                />
                    {/* <FlatList
                     
                        data={orders}
                        keyExtractor={(item, index) => item.tableNo}
                        renderItem={({ item, index }) => {
                            return (
                              <TouchableOpacity style={{height:height*0.15,borderColor:"#333",borderBottomWidth:0.5,flexDirection:"row",paddingVertical:10}}
                                    onPress={() => { this.props.navigation.navigate('ViewOrder',{item})}}
                              >
                               
                                <View style={{ flex: 1, }}>
                                        <View style={{flex:0.7,padding: 10,}}>
                                            <View style={{flex:0.7,}}> 
                                                <View style={{ flex: 0.5,}}>
                                                    <View>
                                                    <Text style={[styles.text, { fontSize: 18, color: "#fff" }]}>Table : {item.tableNo}</Text>

                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.5, alignItems: "flex-end", paddingRight: 20 }}>
                                                    <Text style={[styles.text, { fontSize: 18, color: "#454545" }]}># {index + 1}</Text>
                                                </View>
                                            </View>
                                           <View style={{flex:0.3}}>
                                               <Text style={[styles.text,{color:"#fff"}]}>10:00 am</Text>
                                           </View>
                                        </View>
                                        <View style={{flexDirection:"row",flex:0.3,alignItems:"center",justifyContent:"space-around"}}>
                                            <View>
                                                <Text style={[styles.text,{color:"#eee"}]}>Items Count: {item.totalItems}</Text>
                                            </View>
                                            <View>
                                                <Text style={[styles.text, { color: "#fafafa" }]}>Price : ₹{item.totalCost}</Text>
                                            </View>
                                        </View>
                                 </View>
                              </TouchableOpacity>
                            )
                        }}
                    /> */}
           
        
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
export default connect(mapStateToProps, { selectTheme })(Orders);