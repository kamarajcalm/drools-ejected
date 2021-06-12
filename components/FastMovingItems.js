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
export default class FastMovingItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
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
                    height={height}
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
        
        </View>
    );
  }
}
const styles = StyleSheet.create({
    text: {
        fontFamily
    }
})