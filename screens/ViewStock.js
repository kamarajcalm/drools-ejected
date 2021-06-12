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
import { StatusBar, } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import orders from '../data/orders'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
const screenHeight = Dimensions.get("screen").height
class ViewStock extends Component {
    constructor(props) {
        super(props);
        let item = props.route.params.item
        this.state = {
            item
        };
    }

  save =()=>{
      this.showSimpleMessage("saved SuccessFully", "#00A300", "success")
      this.props.navigation.goBack();
  }
  delete =()=>{
      this.showSimpleMessage("deleted SuccessFully", "#00A300", "success")
      this.props.navigation.goBack();
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
                <StatusBar style={"light"} />
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
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>{this.state.item.name}</Text>

                        </View>
                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                        </View>
                    </View>
                </LinearGradient>
                <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                    <View style={{padding:20}}>
                        <View>
                            <Text style={[styles.text, { color: '#fff' }]}>Available Qty</Text>
                        </View>
                        <TextInput
                             keyboardType={"numeric"}
                            style={{ width: width * 0.8, height: height * 0.05, backgroundColor: "#eee", borderRadius: 5,marginTop:10 ,paddingLeft:5}}
                            selectionColor={primaryColor}
                            value={this.state.availableQty}
                            onChangeText={(availableQty) => { this.setState({ availableQty }) }}
                        />
                    </View>
                    <View style={{ padding: 20 }}>
                        <View>
                            <Text style={[styles.text, { color: '#fff' }]}>Required Qty</Text>
                        </View>
                        <TextInput
                            keyboardType={"numeric"}
                            style={{ width: width * 0.8, height: height * 0.05, backgroundColor: "#eee", borderRadius: 5, marginTop: 10,paddingLeft:5 }}
                            selectionColor={primaryColor}
                            value={this.state.requiredQty}
                            onChangeText={(requiredQty) => { this.setState({ requiredQty }) }}
                        />
                    </View>
                </View>
                <View style={{position:"absolute",bottom:30,width,flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
                    <TouchableOpacity style={{height:height*0.05,width:width*0.4,backgroundColor:"green",alignItems:"center",justifyContent:"center"}}
                      onPress={()=>{this.save()}}
                    >
                       <Text style={[styles.text,{color:"#fff"}]}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, backgroundColor: primaryColor, alignItems: "center", justifyContent: "center"}}
                        onPress={() => { this.delete() }}
                    >
                        <Text style={[styles.text, { color: "#fff" }]}>Delete</Text>
                    </TouchableOpacity>
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
export default connect(mapStateToProps, { selectTheme })(ViewStock);