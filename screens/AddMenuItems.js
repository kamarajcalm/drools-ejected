import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Alert, StyleSheet, FlatList, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
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
import { StatusBar, } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import orders from '../data/orders'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import HttpsClient from '../HttpsClient';
import DropDownPicker from 'react-native-dropdown-picker';
const screenHeight = Dimensions.get("screen").height
const day =[
      {
        label: "Monday", value:"Monday"
      },
      {
          label: "Tuesday", value: "Tuesday"
      },
        {
            label: "Wednesday", value: "Wednesday"
        },
    {
        label: "Thursday", value: "Thursday"
    },
    {
        label: "Friday", value: "Friday"
    },
    {
        label: "Saturday", value: "Saturday"
    },
    {
        label: "Sunday", value: "Sunday"
    },
]
const frequency = [
    {
        label:"Morning",value:"Morning"
    },
    {
        label: "AfterNoon", value: "AfterNoon"
    },
    {
        label: "Night", value: "Night"
    }
]
class AddMenuItems extends Component {
    constructor(props) {
        let item = props.route.params.item
        super(props);
        this.state = {
            item,
            open:false,
            open2:false,
            day:day[0].label,
            frequency: frequency[0].label,
            days:day,
            frequencies: frequency,
            itemName:"",
            dishes:[],
            selectedDish:null,
            selectedDishes:[]
        };
    }
    setOpen = (open) => {
        this.setState({
            open
        });
    }

    setValue = (callback) => {

        this.setState(state => ({
            day: callback(state.value)
        }));
    }

    setItems = (callback) => {

        this.setState(state => ({
            days: callback(state.days)
        }));
    }
    setOpen2 = (open2) => {
        this.setState({
            open2
        });
    }

    setValue2 = (callback) => {

        this.setState(state => ({
            frequency: callback(state.value)
        }));
    }

    setItems2 = (callback) => {

        this.setState(state => ({
            frequencies: callback(state.frequencies)
        }));
    }
    showSimpleMessage(content, color, type = "info", props = {}) {
        const message = {
            message: content,
            backgroundColor: color,
            icon: { icon: "auto", position: "left" },
            type,
            ...props,
        };

        showMessage(message);
    }
    searchItem = async(text)=>{
        this.setState({ itemName: text})
        let api = `${url}/api/drools/items/?search=${text}`
        let data = await HttpsClient.get(api)
        if(data.type=="success"){
            this.setState({dishes:data.data})
        }
    }
    addItems = async()=>{
        if(this.state.selectedDish == null){
            return this.showSimpleMessage("Please Add Item","orange","info")
        }
        this.state.selectedDishes.push(this.state.selectedDish)
        this.setState({ selectedDish: null, selectedDishes:this.state.selectedDishes,itemName:""})
    }
    removeItem =(item,index) =>{
        let duplicate = this.state.selectedDishes
        duplicate.splice(index,1)
        this.setState({ selectedDishes: duplicate})
    }
    render() {
        const {open,value,}=this.state
        return (
            <View style={{ flex: 1 }}>
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
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Add Menu</Text>

                        </View>
                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                        </View>
                    </View>
                </LinearGradient>
                <ScrollView style={{  }}>
                    <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                        <View>
                            <Text style={[styles.text, { color: "#000", fontSize: 22 }]}>Combo Name : </Text>
                        </View>
                        <TextInput

                            value={this.state.name}
                            style={{ height: 35, width: width * 0.8, backgroundColor: "#fafafa", marginTop: 10, paddingLeft: 5 }}
                            selectionColor={themeColor}
                            onChangeText={(name) => { this.setState({ name }) }}
                        />
                    </View>
                    <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                        <View>
                            <Text style={[styles.text, { color: "#000", fontSize: 22 }]}>Add Items : </Text>
                        </View>
                        {
                            this.state.selectedDishes.map((item,index)=>{
                                    return(
                                        <View key={index} style={{alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                                            <View>
                                                <Text style={[styles.text,{color:"#000"}]}>{item.title}</Text>
                                            </View>
                                            <TouchableOpacity 
                                             style={{marginLeft:5}}
                                             onPress ={()=>{this.removeItem(item,index)}}
                                            >
                                                <Entypo name="circle-with-cross" size={24} color="red" />
                                            </TouchableOpacity>
                                        </View>
                                    )
                            })
                        }
                        <View style={{flexDirection:"row"}}>
                            <TextInput
                                value={this.state.itemName}
                                style={{ height: 35, width: width * 0.7, backgroundColor: "#fafafa", marginTop: 10, paddingLeft: 5 }}
                                selectionColor={themeColor}
                                onChangeText={(itemName) => { this.searchItem(itemName) }}
                            />
                            <TouchableOpacity style={{ height: 35, width: width * 0.2, alignItems: "center", justifyContent: "center", backgroundColor: primaryColor, marginTop: 10,marginLeft:10 }}
                             onPress ={()=>{this.addItems()}}
                            >
                                <Text style={[styles.text,{color:"#fff"}]}>Add</Text>
                            </TouchableOpacity>
                        </View>
                      
                    </View>
                   {this.state.dishes.length>0&& <View style={{ marginHorizontal: 20, width: width * 0.8, backgroundColor: '#fafafa', borderColor: "#333", borderTopWidth: 0.5}}>
                        {
                            this.state.dishes.map((i, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={{ padding: 15, justifyContent: "center", width: width * 0.8, borderColor: "#333", borderBottomWidth: 0.3, height: 35 }}
                                        onPress={() => {
                                            this.setState({ itemName: i.title, selectedDish: i, dishes:[]})
                                        }}
                                    >
                                        <Text style={[styles.text, { color: themeColor, }]}>{i.title}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>}
                    <View style={{ paddingHorizontal: 20, marginTop: 20,}}>
                        <View>
                            <Text style={[styles.text, { color: "#000", fontSize: 22 }]}>Select Day:</Text>
                        </View>
                   
                   
                    </View>
                    <View style={{width:width*0.8,marginLeft:20 ,height:this.state.open?height*0.4:height*0.08,marginTop:10}}>
                        <DropDownPicker
                            style={{ height: height * 0.05 }}
                            containerStyle={{ height: height * 0.05 }}
                            open={open}
                            value={this.state.day}
                            items={this.state.days}
                            setOpen={this.setOpen}
                            setValue={this.setValue}
                            setItems={this.setItems}
                            placeholder="select a Day"
                        />
                    </View>
                    <View style={{ paddingHorizontal: 20, marginTop: 20, }}>
                        <View>
                            <Text style={[styles.text, { color: "#000", fontSize: 22 }]}>Select Frequency:</Text>
                        </View>


                    </View>
                    <View style={{ width: width * 0.8, marginLeft: 20, marginTop: 10, height: this.state.open2 ? height * 0.2 : height * 0.08, }}>
                        <DropDownPicker
                            style={{ height: height * 0.05 }}
                            containerStyle={{ height: height * 0.05 }}
                            open={this.state.open2}
                            value={this.state.frequency}
                            items={this.state.frequencies}
                            setOpen={this.setOpen2}
                            setValue={this.setValue2}
                            setItems={this.setItems2}
                            placeholder="select a Day"
                        />
                    </View>
                    <View style={{alignItems:"center",justifyContent:"center",marginTop:20}}>
                        <TouchableOpacity style={{height:height*0.05,width:width*0.4,alignItems:"center",justifyContent:"center",backgroundColor:primaryColor}}>
                               <Text style={[styles.text,{color:"#fff"}]}>Create</Text>
                        </TouchableOpacity>
                    </View>
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
const mapStateToProps = (state) => {
    return {
        theme: state.selectedTheme,
    }
}
export default connect(mapStateToProps, { selectTheme })(AddMenuItems);