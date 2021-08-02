import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, TextInput,ScrollView } from 'react-native';
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
import moment from 'moment';

const screenHeight = Dimensions.get("screen").height
export default class SubscriptionPlans extends Component {
    constructor(props) {
        super(props);
        this.state = {
          plans:[],
          modal:false,
          name:"",
          price:""
        };
    }

    componentDidMount() {

        this._unsubscribe = this.props.navigation.addListener('focus', () => {
           

        });
    }
    componentWillUnmount() {
        this._unsubscribe()
    }
    create =()=>{

    }
    modal =()=>{
        return(
            <Modal
               statusBarTranslucent={true}
               isVisible={this.state.modal}
               deviceHeight={screenHeight}
               onBackdropPress={()=>{this.setState({modal:false})}}
            >
               <View style={{alignItems:"center",justifyContent:"center"}}>
                    <View style={{height:height*0.5,backgroundColor:"#fff",width:width*0.9,borderRadius:10}}>
                           <ScrollView>
                            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                                <View>
                                    <Text style={[styles.text, { color: "#000", fontSize: 22 }]}>Plan Name : </Text>
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
                                    <Text style={[styles.text, { color: "#000", fontSize: 22 }]}>Price: </Text>
                                </View>
                                <TextInput
                                    keyboardType={"numeric"}
                                    value={this.state.price}
                                    style={{ height: 35, width: width * 0.8, backgroundColor: "#fafafa", marginTop: 10, paddingLeft: 5 }}
                                    selectionColor={themeColor}
                                    onChangeText={(price) => { this.setState({ price }) }}
                                />
                            </View>
                            <View style={{ margin: 20, alignItems: "center", justifyContent: "center" }}>
                                <TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center", backgroundColor: primaryColor }}
                                    onPress={() => { this.create() }}
                                >
                                    <Text style={[styles.text, { color: "#fff" }]}>Create</Text>
                                </TouchableOpacity>
                            </View>
                           </ScrollView>
                     </View>
               </View>
            </Modal>
        )
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                  <FlatList 
                     lis
                     data={this.state.plans}
                     keyExtractor={(item,index)=>{index.toString()}}
                     renderItem={({item,index})=>{
                            return(
                                <View>

                                </View>
                            )
                     }}
                  />

                <View style={{
                    position: "absolute",
                    bottom: 50,
                    left: 20,
                    right: 20,
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20
                }}>
                    <TouchableOpacity
                        onPress={() => { this.setState({modal:true}) }}
                    >
                        <AntDesign name="pluscircle" size={40} color={primaryColor} />
                    </TouchableOpacity>
                </View>
                {
                    this.modal()
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