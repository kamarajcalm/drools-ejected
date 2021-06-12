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
import DateTimePickerModal from "react-native-modal-datetime-picker";

const data = {
    labels: ["Idli", "Vada", "dosa", "Kabab", "chickenFry", "fishFry"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43]
        }
    ]
};
const items = [
    {
        item: "kabab",
        count: 90
    },
    {
        item: "chickenFry",
        count: 80
    },
    {
        item: "FishFry",
        count: 80
    },
]
import moment from 'moment';
export default class NetProfit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromDate:moment(new Date).format("YYYY-MM-DD"),
            toDate: moment(new Date).format("YYYY-MM-DD"),
            show:false,
            show2:false
        };
    }
    hideDatePicker = () => {
        this.setState({show:false})
    };

    handleConfirm = (date) => {
        let fromDate = moment(date).format("YYYY-MM-DD")
        this.setState({ fromDate})
        this.hideDatePicker();
    };
    hideDatePicker2 = () => {
        this.setState({ show2: false })
    };

    handleConfirm2 = (date) => {
        let toDate = moment(date).format("YYYY-MM-DD")
        this.setState({ toDate })
        this.hideDatePicker2();
    };
    render() {
        return (
            <View style={{ flex: 1, }}>
                 <LinearGradient
                    style={{ }}
                    colors={gradients}
                >
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", height: height * 0.1 }}>
                        <TouchableOpacity style={{ flexDirection: "row" }}
                         onPress={()=>{this.setState({show:true})}}
                        >
                            <View style={{alignItems:"center",justifyContent:"center"}}>
                                <Text style={[styles.text,{color:"#fff"}]}>{this.state.fromDate}</Text>
                            </View>
                            <View style={{alignItems:"center",justifyContent:"center",marginLeft:10}}>
                                <Fontisto name="date" size={24} color="#fff" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: "row" }}
                            onPress={() => { this.setState({ show2: true }) }}
                        >
                            <View style={{alignItems:"center",justifyContent:"center"}}>
                                <Text style={[styles.text,{color:"#fff"}]}>{this.state.toDate}</Text>
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center",marginLeft:10 }}>
                                <Fontisto name="date" size={24} color="#fff" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{alignItems:"center",flexDirection:"row",justifyContent:"center",paddingVertical:10}}>
                        <Text style={[styles.text,{color:'#fff'}]}>Total Sales : </Text>
                        <Text style={[styles.text,{color:primaryColor,fontSize:22}]}> ₹ 5000</Text>
                    </View>
                </LinearGradient>
 
                <ScrollView
                    style={{}}
                    horizontal={true}
                    // i needed the scrolling to start from the end not the start
                    showsHorizontalScrollIndicator={false} // to hide scroll bar
                >
                    <BarChart
                        showValuesOnTopOfBars
                        style={{}}
                        data={data}
                        width={width * 1.5}
                        height={height*0.82}
                        chartConfig={{
                            backgroundColor: "#000000",
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: { borderRadius: 0, borderWidth: 1, borderColor: '#fff' },
                            propsForDots: { r: "2", strokeWidth: "2", stroke: "#fff", },
                            propsForBackgroundLines: { color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, },
                            fillShadowGradient: primaryColor,
                            fillShadowGradientOpacity: 1,
                        }}
                        verticalLabelRotation={30}
                    />
                </ScrollView>
                <DateTimePickerModal
                    isVisible={this.state.show}
                    mode="date"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                />
                <DateTimePickerModal
                    testID="44"
                    isVisible={this.state.show2}
                    mode="date"
                    onConfirm={this.handleConfirm2}
                    onCancel={this.hideDatePicker2}
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