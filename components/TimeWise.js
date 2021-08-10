import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, ScrollView, FlatList,ActivityIndicator } from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily = settings.fontFamily
const url = settings.url
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
    labels: ["sambar", "Vada", "dosa", "Kabab", "chickenFry", "fishFry"],
    datasets: [
        {
            data: [90, 45, 28, 80, 99, 43]
        }
    ]
};
const items = [
    { label: 'ALLMONTH', value: 0 },
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 },

]
import DropDownPicker from 'react-native-dropdown-picker';
import HttpsClient from '../HttpsClient';
export default class TimeWise extends Component {
    constructor(props) {
        let years = []
        let year = new Date().getFullYear()
        for (let i = 0; i <= 5; i++) {
            let pushObj = {
                label: year - i,
                value: year - i
            }
            years.push(pushObj)
        }

        super(props);
        this.state = {
            open: false,
            value: items[0].value,
            items: items,
            loading: true,
            data: null,
            years,
            open2: false,
            value2: years[0].value,
        };
    }
    setOpen = (open) => {
        this.setState({
            open
        });
    }

    setValue = (callback) => {
        this.setState(state => ({ value: callback(state.value) }), () => {
            this.getData()
        });
    }

    setItems = (callback) => {
        this.setState(state => ({
            items: callback(state.items)
        }));
    }
    setOpen2 = (open2) => {
        this.setState({
            open2
        });
    }

    setValue2 = (callback) => {
        this.setState(state => ({ value2: callback(state.value2) }), () => {
            this.getData()
        });
    }

    setItems2 = (callback) => {
        this.setState(state => ({
            items: callback(state.items)
        }));
    }
    getData = async () => {
        let api = `${url}/api/drools/peakTime/?month=${this.state.value}&year=${this.state.value2}`
        let data = await HttpsClient.get(api)
        console.log(api)
        if (data.type == "success") {
            // let set = {
            //     labels: data.data.labels,
            //     datasets: [
            //         {
            //             data: data.data.data
            //         }
            //     ]
            // }

            this.setState({ data: data.data, loading: false })
        }
    }
    componentDidMount(){
      this.getData()
    }
      header =() =>{
      return(
             <View style={{flexDirection:"row",marginTop:10,borderColor:"gray",borderWidth:1,}}>
                 <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center", borderColor: "gray", borderRightWidth: 1,paddingVertical:5}}>
                        <Text style={[styles.text,{color:primaryColor,}]}>#</Text>
                  </View>
                 <View style={{ flex: 0.7, alignItems: "center", justifyContent: "center", borderColor: "gray", borderRightWidth: 1, paddingVertical: 5}}>
                     <Text style={[styles.text, { color: primaryColor, }]}>Time</Text>
                  </View>
                 <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center", borderColor: "gray", borderRightWidth: 1, paddingVertical: 5}}>
                     <Text style={[styles.text, { color: primaryColor, }]}>Qty</Text>
                  </View>
              
             </View>
      )
  }
    validate =(open,value,open2,value2)=>{
        if(this.state.loading){
            return(
              <ActivityIndicator  size="large" color={primaryColor}/>
            )
        }
        return(
           <>
                {/* <ScrollView
                    contentContainerStyle={{paddingRight:20}}
                    bounces={false}
                    style={{marginTop:height*0.08}}
                    horizontal={true}
                    // i needed the scrolling to start from the end not the start
                    showsHorizontalScrollIndicator={false} // to hide scroll bar
                >
                    <BarChart
                        
                        showValuesOnTopOfBars
                        style={{marginTop:height*0.07,}}
                        data={this.state.data}
                        width={width *2.5}
                        height={height*0.64}
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
                        verticalLabelRotation={90}
                    />

                </ScrollView> */}
                 <FlatList
                  contentContainerStyle={{paddingBottom:20}}
                 style={{marginTop:height*0.1}} 
               ListHeaderComponent={this.header()}
               data={this.state.data}
               keyExtractor={(item,index)=>index.toString()}
               renderItem={({item,index})=>{
                    return(
                           <View style={{flexDirection:"row",borderColor:"gray",borderWidth:1,}}>
                 <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center", borderColor: "gray", borderRightWidth: 1,paddingVertical:5}}>
                        <Text style={[styles.text,{color:"#fff",}]}>{index+1}</Text>
                  </View>
                 <View style={{ flex: 0.7, alignItems: "center", justifyContent: "center", borderColor: "gray", borderRightWidth: 1, paddingVertical: 5}}>
                     <Text style={[styles.text, { color: "#fff", }]}>{item.name}</Text>
                  </View>
                 <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center", borderColor: "gray", borderRightWidth: 1, paddingVertical: 5}}>
                     <Text style={[styles.text, { color:"#fff", }]}>{item.count}</Text>
                  </View>
              
             </View>
                    )
               }}
             />
                <View style={{ position: "absolute", top: 10, width: width * 0.4, right: 20 }}>
                    <DropDownPicker
                        style={{ height: height * 0.05 }}
                        containerStyle={{ height: height * 0.05 }}
                        open={open}
                        value={value}
                        items={this.state.items}
                        setOpen={this.setOpen}
                        setValue={this.setValue}
                        setItems={this.setItems}
                        placeholder="select a time"
                    />
                </View>
                <View style={{ position: "absolute", top: 10, width: width * 0.4, left: 20 }}>
                    <DropDownPicker
                        style={{ height: height * 0.05 }}
                        containerStyle={{ height: height * 0.05 }}
                        open={open2}
                        value={value2}
                        items={this.state.years}
                        setOpen={this.setOpen2}
                        setValue={this.setValue2}
                        setItems={this.setItems2}
                        placeholder="select a time"
                    />
                </View>
           </>
        )
    }
    render() {
        const { open, value,open2,value2 } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor:"#000"}}>
                {
                    this.validate(open, value, open2, value2)
                }
             
            </View>
        );
    }
}
const styles = StyleSheet.create({
    text: {
        fontFamily
    }
})