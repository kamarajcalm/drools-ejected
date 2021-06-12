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
import DropDownPicker from 'react-native-dropdown-picker';
const data = {
    labels: ["sambar", "Vada", "dosa", "Kabab", "chickenFry", "fishFry"],
    datasets: [
        {
            data: [90, 45, 28, 80, 99, 43]
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
const days =[
    { label: 'Sunday', value: 'Sunday' },
    { label: 'Monday', value: 'Monday' }
]
export default class DayWise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            value: null,
            items:[
                { label: 'Sunday', value: 'Sunday' },
                { label: 'Monday', value: 'Monday' },
                { label: 'Tuesday', value: 'Tuesday' },
                { label: 'Wednesday', value: 'Wednesday' },
                { label: 'Thursday', value: 'Thursday' },
                { label: 'Friday', value: 'Friday' },
                { label: 'Saturday', value: 'Saturday'},

            ]
        };
        this.setValue = this.setValue.bind(this);
    }
    setOpen =(open)=> {
        this.setState({
            open
        });
    }

    setValue =(callback)=> {
        this.setState(state => ({
            value: callback(state.value)
        }));
    }

    setItems = (callback) =>{
        this.setState(state => ({
            items: callback(state.items)
        }));
    }
    render() {
        const { open, value, } = this.state;
        return (
            <View style={{ flex: 1, }}>
                <ScrollView
                    style={{ }}
                    horizontal={true}
                    // i needed the scrolling to start from the end not the start
                    showsHorizontalScrollIndicator={false} // to hide scroll bar
                >
                    <BarChart
                        showValuesOnTopOfBars
                        style={{}}
                        data={data}
                        width={width * 1.5}
                        height={height }
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
          
                <View style={{position:"absolute",top:10,width:width*0.4,right:20}}>
                    <DropDownPicker
                        style={{height:height*0.05}}
                        containerStyle={{height:height*0.05}}
                        open={open}
                        value={value}
                        items={this.state.items}
                        setOpen={this.setOpen}
                        setValue={this.setValue}
                        setItems={this.setItems}
                        placeholder ="select a day"
                    />
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