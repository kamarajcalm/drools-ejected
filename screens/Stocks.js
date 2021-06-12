import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily = settings.fontFamily
const themeColor = settings.themeColor
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
export default class Stocks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Items: [],
            categoryName: ""
        };
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
    addCategory = () => {
        if (this.state.categoryName == "") {
            return this.showSimpleMessage("Please add Name", "#dd7030",)
        }
        let pushObj = {
            name: this.state.categoryName,
            availableQty:0,
            MinQty:0
        }
        let duplicate = this.state.Items
        duplicate.push(pushObj)
        this.setState({ Items: duplicate, categoryName: "" })
        this.showSimpleMessage("Added SuccessFully", "#00A300", "success")
    }
    header = () => {
        return (
            <View style={{ flexDirection: "row", paddingVertical: 10, flex: 1 }}>
                <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                    <View>
                        <Text style={[styles.text, { textDecorationLine: "underline", color: "#000" }]}>Item</Text>
                    </View>
                </View>
                <View style={{flex:0.3,alignItems:"center",justifyContent:"center"}}>
                    <View>
                        <Text style={[styles.text, { textDecorationLine: "underline", color: "#000" }]}>Available Qty</Text>
                    </View>
                </View>
                <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                    <View>
                        <Text style={[styles.text, { textDecorationLine: "underline", color: "#000" }]}>Min Qty</Text>
                    </View>
                </View>
                <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                    <View>
                        <Text style={[styles.text, { textDecorationLine: "underline", color: "#000" }]}>Action</Text>
                    </View>
                </View>

            </View>
        )

    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: height * 0.08, flexDirection: 'row', backgroundColor: "#fff", alignItems: "center", justifyContent: "space-around" }}>
                    <View>
                        <TextInput
                            value={this.state.categoryName}
                            style={{ height: height * 0.05, width: width * 0.6, backgroundColor: "#fafafa", borderRadius: 10 }}
                            placeholder={"Enter category"}
                            selectionColor={themeColor}
                            onChangeText={(categoryName) => { this.setState({ categoryName }) }}
                        />
                    </View>
                    <View>
                        <TouchableOpacity style={{ height: height * 0.05, width: width * 0.3, alignItems: "center", justifyContent: "center", backgroundColor: themeColor, borderRadius: 10 }}
                            onPress={() => { this.addCategory() }}
                        >
                            {this.state.creating ? <ActivityIndicator size={"small"} color={"#fff"} /> : <Text style={[styles.text, { color: "#fff" }]}>Add</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={this.state.Items}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={this.header()}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ flexDirection: "row", paddingVertical: 10, flex: 1 }}>
                                <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                                    <View>
                                        <Text style={[styles.text, {  color: "#000" }]}>{index+1} .{item.name}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                                    <View>
                                        <Text style={[styles.text, { color: "#000" }]}>{item.availableQty}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                                    <View>
                                        <Text style={[styles.text, {  color: "#000" }]}>{item.MinQty}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                                    <TouchableOpacity 
                                     onPress={()=>{this.props.navigation.navigate('ViewStock',{item})}}
                                    >
                                        <Text style={[styles.text, { textDecorationLine: "underline", color: "#000" }]}>Edit</Text>
                                    </TouchableOpacity>
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