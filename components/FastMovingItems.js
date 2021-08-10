import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, ScrollView, FlatList ,ActivityIndicator} from 'react-native';
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
import moment from 'moment';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import HttpsClient from '../HttpsClient';
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
export default class FastMovingItems extends Component {
  constructor(props) {
      let start = moment().subtract(30, 'days').calendar()

    super(props);
    this.state = {
        loading:true,
        fromDate: moment(start).format("YYYY-MM-DD"),
        toDate: moment(new Date()).format("YYYY-MM-DD"),
        show: false,
        show2: false,
        data:[]
    };
  }
  getData =async()=>{
      let api =`${url}/api/drools/fastMoving/?start=${this.state.fromDate}&end=${this.state.toDate}`
      let data =await HttpsClient.get(api)
      console.log(api)
      if(data.type =="success"){
        //   let set =  {
        //       labels: data.data.labels,
        //       datasets: [
        //           {
        //               data: data.data.data
        //           }
        //       ]
        //   }

          this.setState({data:data.data.data,loading:false})
      }
  }
    hideDatePicker = () => {
        this.setState({ show: false })
    };

    handleConfirm = (date) => {
        let fromDate = moment(date).format("YYYY-MM-DD")
        this.setState({ fromDate },()=>{
            this.getData()
        })
        this.hideDatePicker();
    };
    hideDatePicker2 = () => {
        this.setState({ show2: false })
    };

    handleConfirm2 = (date) => {
        let toDate = moment(date).format("YYYY-MM-DD")
        this.setState({ toDate },()=>{
            this.getData()
        })
        this.hideDatePicker2();
    };
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
                     <Text style={[styles.text, { color: primaryColor, }]}>item</Text>
                  </View>
                 <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center", borderColor: "gray", borderRightWidth: 1, paddingVertical: 5}}>
                     <Text style={[styles.text, { color: primaryColor, }]}>Qty</Text>
                  </View>
              
             </View>
      )
  }
    loading =()=>{
        if(this.state.loading){
            return(
                <ActivityIndicator size="large" color={primaryColor}/>
            )
        }
        return(
            <View >
 <LinearGradient
                style={{}}
                colors={gradients}
            >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", height: height * 0.1 }}>
                    <TouchableOpacity style={{ flexDirection: "row" }}
                        onPress={() => { this.setState({ show: true }) }}
                    >
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.text, { color: "#fff" }]}>{this.state.fromDate}</Text>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 10 }}>
                            <Fontisto name="date" size={24} color="#fff" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "row" }}
                        onPress={() => { this.setState({ show2: true }) }}
                    >
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.text, { color: "#fff" }]}>{this.state.toDate}</Text>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 10 }}>
                            <Fontisto name="date" size={24} color="#fff" />
                        </View>
                    </TouchableOpacity>
                </View>
             
            </LinearGradient>
            {/* <ScrollView
                bounces={false}
                style={{ }}
                horizontal={true}
                // i needed the scrolling to start from the end not the start
                showsHorizontalScrollIndicator={false} // to hide scroll bar
            >
                <BarChart
                    showValuesOnTopOfBars
                    style={{marginLeft:-30}}
                    data={this.state.data}
                    width={width * 2}
                    height={height*0.8}
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
            </ScrollView> */}
       
        
            </View>
        )
    }
  render() {
    return (
        <View style={{ flex: 1,backgroundColor:"#000" }}>
           {
               this.loading()
           }
             <FlatList 
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
                     <Text style={[styles.text, { color: "#fff", }]}>{item.title}</Text>
                  </View>
                 <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center", borderColor: "gray", borderRightWidth: 1, paddingVertical: 5}}>
                     <Text style={[styles.text, { color:"#fff", }]}>{item.count}</Text>
                  </View>
              
             </View>
                    )
               }}
             />
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