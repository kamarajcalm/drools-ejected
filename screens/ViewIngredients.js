import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, KeyboardAvoidingView, Platform,Alert} from 'react-native';
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
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import HttpsClient from '../HttpsClient';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView} from 'react-native-gesture-handler';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Instock from '../components/Instock';
import Sold from '../components/Sold';
import Loss from '../components/Loss';


const screenHeight = Dimensions.get("screen").height
class ViewIngredients extends Component {
    
    constructor(props) {
        let item = props.route.params.item
        super(props);
        const routes = [
            { key: 'In Stock', title: 'In Stock' },
            { key: 'Sold', title: 'Sold' },
            { key: 'Loss', title: 'Loss' },

        ];
        this.state = {
            routes,
            index: 0,
            item
        };
    
    }
  
    componentDidMount(){
      
    }
    renderScene = ({ route, }) => {
        switch (route.key) {

            case 'In Stock':
                return <Instock navigation={this.props.navigation} props={this.props}/>
            case 'Sold':
                return <Sold navigation={this.props.navigation} props={this.props}/>
            case 'Loss':
                return <Loss navigation={this.props.navigation} props={this.props}/>
            default:
                return null;
        }
    };
    render(){
        const { index, routes } = this.state
        return(
            <View style={{flex:1}}>

       
            <LinearGradient
                style={{ height: height * 0.12, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                colors={gradients}
            >
                <View style={{ marginTop: Constants.statusBarHeight, flex: 1, flexDirection: "row" }}>
                    <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                        <Ionicons name="caret-back" size={24} color={secondaryColor} />
                    </TouchableOpacity>
                    <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
                        <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>{this.state.item.title}</Text>

                    </View>
                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

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
            </View>
        )
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
export default connect(mapStateToProps, { selectTheme })(ViewIngredients);