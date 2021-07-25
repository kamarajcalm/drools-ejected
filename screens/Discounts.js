import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, TextInput } from 'react-native';
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
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import HttpsClient from '../HttpsClient';
class Discounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onlineDiscount:"",
            takeAwayDiscount:"",
            diningDiscount:"",
            edit:false,
           
        };
    }
    getDiscount = async () => {
        let api = `${url}/api/drools/droolsDiscount/1/`
        let data = await HttpsClient.get(api)
        if (data.type == "success") {
            this.setState({
                onlineDiscount: data.data.online_discount.toString(),
                takeAwayDiscount: data.data.takeaway_discount.toString(),
                diningDiscount: data.data.online_discount.toString(),
              
            })
        }
    }
    componentDidMount() {
        this.getDiscount()
    }
    save = async () => {
        let api = `${url}/api/drools/droolsDiscount/${1}/`
        let sendData = {
            online_discount : Number(this.state.onlineDiscount),
            takeaway_discount: Number(this.state.takeAwayDiscount),
            dining_discount: Number(this.state.diningDiscount)
        }
        let post = await HttpsClient.patch(api, sendData)
        if (post.type == "success") {
            this.getDiscount()
            return this.showSimpleMessage("Saved SuccessFully", "#00A300", "success")

        } else {
            return this.showSimpleMessage("Try again", "#dd7030",)
        }
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
    render() {

        return (
            <View style={{ flex: 1, backgroundColor: themeColor }}>

                <LinearGradient
                    style={{ height: height * 0.12, alignItems: "center", justifyContent: "center" }}
                    colors={gradients}
                >
                    <View
                        style={{ marginTop: Constants.statusBarHeight, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                    >


                        <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Ionicons name="caret-back" size={24} color={secondaryColor} />
                        </TouchableOpacity>
                        <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Discounts</Text>

                        </View>
                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                        </View>
                    </View>
                </LinearGradient>

                <View style={{ flex: 1 }}>
                    <View style={{ marginTop: 10, marginLeft: 20 }}>
                        <Text style={[styles.text, { fontSize: 22, color: "#fff" }]}>Online Discount : </Text>
                        <TextInput
                            ref={ref => this.textRef = ref}
                            value={this.state.onlineDiscount}
                            editable={this.state.edit}
                            keyboardType={"numeric"}
                            style={{ height:38, width: width * 0.8, backgroundColor: "#fff", marginTop: 10, paddingLeft: 10 }}
                            selectionColor={primaryColor}
                            onChangeText={(onlineDiscount) => { this.setState({ onlineDiscount }) }}
                        />
                    </View>
                    <View style={{ marginTop: 10, marginLeft: 20 }}>
                        <Text style={[styles.text, { fontSize: 22, color: "#fff" }]}>Dining Discount : </Text>
                        <TextInput
                            value={this.state.diningDiscount}
                            editable={this.state.edit}
                            keyboardType={"numeric"}
                            style={{ height: 38, width: width * 0.8, backgroundColor: "#fff", marginTop: 10, paddingLeft: 10 }}
                            selectionColor={primaryColor}
                            onChangeText={(diningDiscount) => { this.setState({ diningDiscount }) }}
                        />
                    </View>
               
                    <View style={{ marginTop: 10, marginLeft: 20 }}>
                        <Text style={[styles.text, { fontSize: 22, color: "#fff" }]}>TakeAway Discount : </Text>
                        <TextInput
                            value={this.state.takeAwayDiscount}
                            editable={this.state.edit}
                            keyboardType={"numeric"}
                            style={{ height:38, width: width * 0.8, backgroundColor: "#fff", marginTop: 10, paddingLeft: 10 }}
                            selectionColor={primaryColor}
                            onChangeText={(takeAwayDiscount) => { this.setState({ takeAwayDiscount }) }}
                        />
                    </View>
                    <View style={{ position: "absolute", width, bottom: 30, flexDirection: "row", paddingVertical: 20, flexDirection: "row" }}>
                        <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ edit: true }, () => {
                                        this.textRef.focus()
                                    })
                                }}
                                style={{ backgroundColor: primaryColor, height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center" }}
                            >
                                <Text style={[styles.text, { color: '#fff', }]}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}>
                            <TouchableOpacity
                                onPress={() => { this.save() }}
                                style={{ backgroundColor: "green", height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center" }}
                            >
                                <Text style={[styles.text, { color: '#fff', }]}>save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
    }
}
export default connect(mapStateToProps, { selectTheme })(Discounts);