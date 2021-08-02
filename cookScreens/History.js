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
const url = settings.url
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
            orders:[],
            refreshing:false
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
    getOrders = async() =>{
        let api = `${url}/api/drools/ordercompletion/?date=${this.state.today}`
        let data = await HttpsClient.get(api)
        
       if(data.type=="success"){
           this.setState({ orders: data?.data[0]?.data||[]})
       }
     
    }
    componentDidMount(){
        this.getOrders()
    }
    renderheader = () => {
        return (
            <View style={{ alignItems: "center" }}>
                <Text style={[styles.text, { color: "#fff", textDecorationLine: "underline" }]}>Items :</Text>
            </View>

        )
    }
    refresh =()=>{
        this.setState({orders:[]},()=>{
            this.getOrders()
        })
    }
    render() {
     
        return (
           <View style={{flex:1,backgroundColor:themeColor}}>
                <LinearGradient
                    style={{ height: height * 0.12, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                    colors={gradients}
                >
                    <View style={{ flex: 1, flexDirection: "row" }}>
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
                    refreshing={this.state.refreshing}
                    onRefresh={() => { this.refresh() }}
                    data={this.state.orders}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={this.renderheader()}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={{ borderColor: "#333", borderBottomWidth: 0.5, padding: 20, }}
                                onPress={() => { this.props.navigation.navigate('ViewOrder', { item }) }}
                            >
                                <View style={{ marginTop: 10, flexDirection: "row", flex: 1 }} key={index}>
                                    <View style={{ flexDirection: "row", flex: 0.6 }}>
                                        <View style={{ flexDirection: 'row', flex: 0.7, alignItems: "center", justifyContent: "center" }}>
                                            <View>
                                                <Text style={[styles.text, { color: "#fff", fontSize: 20 }]}>{index + 1} . </Text>
                                            </View>
                                            <View>
                                                <Text style={[styles.text, { color: "#fff", fontSize: 20 }]}>{item.title}</Text>
                                            </View>
                                        </View>

                                        <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}> X {item.itemcount}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 0.4, alignItems: "center", justifyContent: "center" }}>
                                        <Text style={[styles.text,{color:"green"}]}>Completed</Text>
                                         
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                    <Text style={[styles.text, { color: "#fff" }]}>Table : </Text>
                                    {
                                        item.objs.map((item, index) => {
                                            return (
                                                <Text key={index} style={[styles.text, { color: "#fff" }]}>
                                                    {item.tableTitle},
                                                </Text>
                                            )
                                        })
                                    }
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