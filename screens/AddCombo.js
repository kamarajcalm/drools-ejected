
import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Alert, StyleSheet, FlatList, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
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
const screenHeight = Dimensions.get("screen").height
import DropDownPicker from 'react-native-dropdown-picker';
// const day = [
//     {
//         label: "Monday", value: "MONDAY"
//     },
//     {
//         label: "Tuesday", value: "TUESDAY"
//     },
//     {
//         label: "Wednesday", value: "WEDNESDAY"
//     },
//     {
//         label: "Thursday", value: "THURSDAY"
//     },
//     {
//         label: "Friday", value: "FRIDAY"
//     },
//     {
//         label: "Saturday", value: "SATURDAY"
//     },
//     {
//         label: "Sunday", value: "SUNDAY"
//     },
// ]
// const frequency = [
//     {
//         label: "Morning", value: "MORNING"
//     },
//     {
//         label: "AfterNoon", value: "AFTERNOON"
//     },
//     {
//         label: "Night", value: "NIGHT"
//     }
// ]
class AddCombo extends Component {
  constructor(props) {
      let item = props.route.params.item
    super(props);
    this.state = {
        combos:[],
        combos2:[],
        item,
        open: false,
        open2: false,
        // days: day,
        // frequencies: frequency,
        defaultName:"",
        choiceName:"",
        defaultDish:null,
        selectedDish:null,
        choices:[],
        planPk:this.props.route.params.planPk,
        frequencyPk: this.props.route.params.frequencyPk
    };
  }
  
    createAlert = (item, index) => {
        Alert.alert(
            `Do you want to Add ${item.title}?`,
            ``,
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => { this.addCombo(item, index) } }
            ]
        );
    }
    searchCombo =async(text)=>{
        this.setState({ defaultName: text, defaultDish:null})
        let api = `${url}/api/drools/menu/?search=${text}`
        let data = await HttpsClient.get(api)
        console.log(api)
        if (data.type == "success") {
            this.setState({ combos: data.data })
        }
    }
    searchCombo2 = async (text) => {
        this.setState({ choiceName: text })
        let api = `${url}/api/drools/menu/?search=${text}`
        let data = await HttpsClient.get(api)
        console.log(api)
        if (data.type == "success") {
            this.setState({ combos2: data.data })
        }
    }
    addDish = async()=>{
       if(this.state.selectedDish==null){
           return this.showSimpleMessage("Please Select Dish","orange","info")
       }
        this.state.choices.push(this.state.selectedDish)
        this.setState({ choices: this.state.choices, selectedDish:null,choiceName:""})
    }
    removeItem = (item,index) =>{
         let duplicate = this.state.choices
         duplicate.splice(index,1)
        this.setState({ choices:duplicate})
    }
    // setOpen = (open) => {
    //     this.setState({
    //         open
    //     });
    // }

    // setValue = (callback) => {

    //     this.setState(state => ({
    //         day: callback(state.value)
    //     }));
    // }

    // // setItems = (callback) => {

    // //     this.setState(state => ({
    // //         days: callback(state.days)
    // //     }));
    // // }
    // setOpen2 = (open2) => {
    //     this.setState({
    //         open2
    //     });
    // }

    // setValue2 = (callback) => {

    //     this.setState(state => ({
    //         frequency: callback(state.value)
    //     }));
    // }

    // // setItems2 = (callback) => {

    // //     this.setState(state => ({
    // //         frequencies: callback(state.frequencies)
    // //     }));
    // // }
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
    create = async()=>{
    //    this.setState({creating:true})
        let api = `${url}/api/drools/addTimetable/`
        let choices = []
        this.state.choices.forEach((i)=>{
            return choices.push(i.id)
        })
        let sendData ={
            edit:true,
            additem: choices,
            adddefault: this.state.defaultDish.id,
            timetable: this.state.frequencyPk
            
        }
  
        let post = await HttpsClient.post(api,sendData)
        console.log(post)
    }
  render() {
      const { open, value, } = this.state
    return (
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
                        <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Add Combo</Text>

                    </View>
                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                    </View>
                </View>
             
            </LinearGradient>
            <ScrollView >
                {/* <View style={{ paddingHorizontal: 20, marginTop: 20,}}>
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
                    </View> */}

                <View style={{ paddingHorizontal: 20, marginTop: 20, }}>
                    <View>
                        <Text style={[styles.text, { color: "#000", fontSize: 22 }]}>Select Default Combo:</Text>
                    </View>

                    <TextInput
                        value={this.state.defaultName}
                        style={{ height: 35, width: width * 0.7, backgroundColor: "#fafafa", marginTop: 10, paddingLeft: 5 }}
                        selectionColor={themeColor}
                        onChangeText={(defaultName) => { this.searchCombo(defaultName) }}
                    />
                </View>
                {this.state.combos.length > 0 && <View style={{ marginHorizontal: 20, width: width * 0.8, backgroundColor: '#fafafa', borderColor: "#333", borderTopWidth: 0.5 }}>
                    {
                        this.state.combos.map((i, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={{ padding: 15, justifyContent: "center", width: width * 0.8, borderColor: "#333", borderBottomWidth: 0.3, height: 35 }}
                                    onPress={() => {
                                        this.setState({ defaultName: i.title, defaultDish: i, combos: [] })
                                    }}
                                >
                                    <Text style={[styles.text, { color: themeColor, }]}>{i.title}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>}
                <View style={{ paddingHorizontal: 20, marginTop: 20, }}>
              
                    <View>
                        <Text style={[styles.text, { color: "#000", fontSize: 22 }]}>Select Choices Combo:</Text>
                    </View>
                    {
                        this.state.choices.map((item, index) => {
                            return (
                                <View key={index} style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                                    <View>
                                        <Text style={[styles.text, { color: "#000" }]}>{item.title}</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={{ marginLeft: 5 }}
                                        onPress={() => {


                                            this.removeItem(item, index)

                                        }}
                                    >
                                        <Entypo name="circle-with-cross" size={24} color="red" />
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                    <View style={{ flexDirection: "row" }}>
                        <TextInput
                            value={this.state.choiceName}
                            style={{ height: 35, width: width * 0.7, backgroundColor: "#fafafa", marginTop: 10, paddingLeft: 5 }}
                            selectionColor={themeColor}
                            onChangeText={(choiceName) => { this.searchCombo2(choiceName) }}
                        />
                        <TouchableOpacity style={{ height: 35, width: width * 0.2, alignItems: "center", justifyContent: "center", backgroundColor: primaryColor, marginTop: 10, marginLeft: 10 }}
                            onPress={() => { this.addDish() }}
                        >
                            <Text style={[styles.text, { color: "#fff" }]}>Add</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.combos2.length > 0 && <View style={{ width: width * 0.8, backgroundColor: '#fafafa', borderColor: "#333", borderTopWidth: 0.5 }}>
                        {
                            this.state.combos2.map((i, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={{ padding: 15, justifyContent: "center", width: width * 0.8, borderColor: "#333", borderBottomWidth: 0.3, height: 35 }}
                                        onPress={() => {
                                            this.setState({ choiceName: i.title, selectedDish: i, combos2: [] })
                                        }}
                                    >
                                        <Text style={[styles.text, { color: themeColor, }]}>{i.title}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>}
                </View>
                <View style={{alignItems:"center",justifyContent:"center",marginVertical:20}}>
                 { !this.state.creating?  <TouchableOpacity 
                     style={styles.button}
                     onPress ={()=>{this.create()}}
                    >
                        <Text style={[styles.text,{color:"#fff"}]}>Create</Text> 
                    </TouchableOpacity>:
                    <View style={styles.button}>
                         <ActivityIndicator color={"#fff"} size={"large"}/>
                    </View>
                    }
                </View>
            </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    text: {
        fontFamily
    },
    button: {
        height: height * 0.05,
        width: width * 0.3,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: primaryColor
    }
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
    }
}
export default connect(mapStateToProps, { selectTheme })(AddCombo);