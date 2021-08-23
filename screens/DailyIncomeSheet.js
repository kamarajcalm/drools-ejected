import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily = settings.fontFamily
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import FastMovingItems from '../components/FastMovingItems';
import DayWise from '../components/DayWise';
import TimeWise from '../components/TimeWise';
import NetProfit from '../components/NetProfit';
import moment from 'moment';
import MonthPicker from 'react-native-month-year-picker';
import HttpsClient from '../HttpsClient';
const url =settings.url
const months = ["January","Febrauary","March","April","May","June","July","August","September","Octobor","November","December"]
class DailyIncomeSheet extends Component {
    constructor(props) {
        let item = props.route.params.item
        super(props);
        this.state = {
            item,
            incomes: [],
            refreshing:false
        };
    }
        
     getBills = async()=>{
       let api = `${url}/api/drools/bulkBill/?date=${moment(this.state.item.day).format("YYYY-MM-DD")}`
       const data = await HttpsClient.get(api)
       console.log(api)
       if(data.type=="success"){
           this.setState({incomes:data.data.data,data:data.data})
       }
     }
    componentDidMount(){
       this.getBills()
    }
         refresh =()=>{
         this.getBills()
     }
     footer =()=>{
         return(
             <View style={{ flexDirection: "row",marginBottom:20}}>
                 <View style={{ flex: 2.5, alignItems: "center", justifyContent: "center",  }}>
                 
                 </View>
                 <View style={{ flex: 2.5, alignItems: "center", justifyContent: "center",  }}>
                     
                 </View>
                 <View style={{ flex: 2.5, alignItems: "center", justifyContent: "center",paddingVertical:5 }}>
                     <Text style={[styles.text, { color: primaryColor, fontSize:18}]}>Total</Text>
                 </View>
                 <View style={{ flex: 2.5, alignItems: "center", justifyContent: "center", borderColor: "gray", borderWidth: 1,borderRightWidth:0}}>
                     <Text style={[styles.text, { color: primaryColor, fontSize: 18 }]}> ₹ {this.state?.data?.totalamount}</Text>
                 </View>
             </View>
         )
     }
     header =()=>{
         return(
             <View style={{flexDirection:"row",marginTop:10,borderColor:"gray",borderWidth:1,}}>
                 <View style={{ flex: 2.5, alignItems: "center", justifyContent: "center", borderColor: "gray", borderRightWidth: 1,paddingVertical:5}}>
                        <Text style={[styles.text,{color:primaryColor,}]}>#</Text>
                  </View>
                 <View style={{ flex: 2.5, alignItems: "center", justifyContent: "center", borderColor: "gray", borderRightWidth: 1, paddingVertical: 5}}>
                     <Text style={[styles.text, { color: primaryColor, }]}>Bill No</Text>
                  </View>
                 <View style={{ flex: 2.5, alignItems: "center", justifyContent: "center", borderColor: "gray", borderRightWidth: 1, paddingVertical: 5}}>
                     <Text style={[styles.text, { color: primaryColor, }]}>Mode</Text>
                  </View>
                 <View style={{ flex: 2.5, alignItems: "center", justifyContent: "center"  ,paddingVertical: 5}}>
                     <Text style={[styles.text, { color:primaryColor, }]}>Cash</Text>
                  </View>
             </View>
         )
     }
    render() {

        return (
            <View style={{ flex: 1,backgroundColor:"#000"}}>

                {/* Headers */}
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
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>{moment(this.state.item.day).format("YYYY-MM-DD")}</Text>

                        </View>
                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                        </View>
                    </View>
                </LinearGradient>
              <FlatList 
                     contentContainerStyle={{paddingBottom:90}}
                     refreshing={this.state.refreshing}
                     onRefresh = {()=>{this.refresh()}}
                     ListFooterComponent={this.footer()}
                     ListHeaderComponent={this.header()}
                     data={this.state.incomes}
                     keyExtractor={(item,index)=>index.toString()}
                     renderItem ={({item,index})=>{
                         return(
                             <View style={{ flexDirection: "row", borderColor: "gray", borderBottomWidth: 1, }}>
                                 <View style={{ flex: 2.5, alignItems: "center", justifyContent: "center", borderColor: "gray", borderRightWidth: 1, paddingVertical: 5 }}>
                                     <Text style={[styles.text, { color: "#fff", }]}>{index+1}</Text>
                                 </View>
                                 <View style={{ flex: 2.5, alignItems: "center", justifyContent: "center", borderColor: "gray", borderRightWidth: 1, paddingVertical: 5 }}>
                                     <Text style={[styles.text, { color: "#fff", }]}> {item.billno}</Text>
                                 </View>
                                 <View style={{ flex: 2.5, alignItems: "center", justifyContent: "center", borderColor: "gray", borderRightWidth: 1, paddingVertical: 5 }}>
                                     <Text style={[styles.text, { color: "#fff", }]}> {item.mode}</Text>
                                 </View>
                                 <View style={{ flex: 2.5, alignItems: "center", justifyContent: "center",paddingVertical:5 }}>
                                     <Text style={[styles.text, { color: "#fff", }]}> ₹ {item.amount}</Text>
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
    }
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
    }
}
export default connect(mapStateToProps, { selectTheme })(DailyIncomeSheet);