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
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Categories from './Categories';
import Stocks from './Stocks';
import InventoryOrders from './InventoryOrders';
import SubscriptionPlans from './SubscriptionPlans';

class Inventory extends Component {
  constructor(props) {
    super(props);
      const routes = [
          { key: 'Categories', title: 'Categories' },
          { key: 'Stocks', title: 'Stocks'},
          { key: 'Orders', title: 'Orders' },
          { key: 'Plans', title: 'Subscription-Plans' },

      ];
    this.state = {
        routes,
        index: 0,
    };
  }
    renderScene = ({ route, }) => {
        switch (route.key) {
            case 'Categories':
                return <Categories navigation={this.props.navigation}/>
            case 'Stocks':
                return <Stocks navigation ={this.props.navigation}/>
            case 'Orders':
                return <InventoryOrders navigation={this.props.navigation} />
            case 'Plans':
                return <SubscriptionPlans navigation={this.props.navigation} />
            default:
                return null;
        }
    };
    getStocks =()=>{
        
    }
    componentDidMount(){
        this.getStocks()
    }
  render() {
      const { index, routes } = this.state
    return (
      <View style={{flex:1}}>
            <LinearGradient
                style={{ height: height * 0.12, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                colors={gradients}
            >
                <View style={{ marginTop: Constants.statusBarHeight, flex: 1, flexDirection: "row" }}>
                    <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}

                    >

                    </View>
                    <View style={{ flex: 0.4, alignItems: "center", justifyContent: "center" }}>
                        <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Inventory</Text>

                    </View>
                    <View style={{ flex: 0.3, alignItems: "center", justifyContent: "space-around", flexDirection: "row" }}
                      
                    >
                     
                    </View>
                </View>
            </LinearGradient>

            <TabView
                
                style={{ backgroundColor: "#ffffff" }}
                navigationState={{ index, routes }}
                renderScene={this.renderScene}
                onIndexChange={(index) => { this.setState({index}) }}
                initialLayout={{width}}
                renderTabBar={(props) =>
                    <TabBar
                        scrollEnabled={true}
                        {...props}
                        renderLabel={({ route, focused, color }) => (
               
                                      <Text style={{ color: focused ? themeColor : 'gray', fontWeight: "bold" ,fontFamily}}>
                                {route.title}
                            </Text>
                       
                          
                        )}
                        tabStyle={{fontFamily}}
                        style={{ backgroundColor: "#fff", height: 50, fontWeight: "bold", color: "red" ,fontFamily}}
                        labelStyle={{ fontWeight: "bold", color: "red", fontFamily }}
                        indicatorStyle={{ backgroundColor: themeColor, height: 5 }}
                    />
                }

            />

     
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
export default connect(mapStateToProps, { selectTheme })(Inventory);