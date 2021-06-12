import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, TextInput} from 'react-native';
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
class ViewItems extends Component {
    constructor(props) {
        super(props);
        let item =props.route.params.item
        this.state = {
            item,
            ingredients:[],
            modal:false,
            searchName:"",
            requiredQty:""
        };
    }
    addIngredients =()=>{
        if (this.state.searchName == "") {
            return this.showSimpleMessage("Please add Item", "#dd7030",)
        }
        if (this.state.requiredQty == "") {
            return this.showSimpleMessage("Please add requiredQty", "#dd7030",)
        }
        let duplicate =this.state.ingredients
        let pushObj ={
            item:this.state.searchName,
            qty:this.state.requiredQty
        }
        duplicate.push(pushObj)
        this.showSimpleMessage("Added SuccessFully", "#00A300", "success")
        this.setState({ searchName: "", requiredQty:"",modal:false})
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
    modal =()=>{
          return(
              <Modal
                  statusBarTranslucent={true}
                  onBackdropPress={() => { this.setState({modal:false})}}
                  deviceHeight={screenHeight}
                  isVisible={this.state.modal}
              >
                  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                      <View style={{ height: height * 0.4, backgroundColor: "#fff", width: width * 0.9, borderRadius: 10 }}>
                            <View style={{padding:20}}>
                                <Text style={[styles.text]}>Enter Item</Text>
                                <TextInput 
                                  value ={this.state.searchName}
                                  style={{height:height*0.05,width:width*0.8,backgroundColor:"#eee",borderRadius:5,marginTop:5}}
                                  selectionColor={primaryColor}
                                  onChangeText={(searchName) => { this.setState({ searchName})}}
                                />
                            </View>
                          <View style={{ padding: 20 }}>
                              <Text style={[styles.text]}>Enter Required Qty</Text>
                              <TextInput
                                  
                                  value={this.state.requiredQty}
                                  style={{ height: height * 0.05, width: width * 0.8, backgroundColor: "#eee", borderRadius: 5, marginTop: 5 }}
                                  selectionColor={primaryColor}
                                  onChangeText={(requiredQty) => { this.setState({ requiredQty }) }}
                              />
                          </View>
                          <View style={{alignItems:"center"}}>
                              <TouchableOpacity style={{height:height*0.05,width:width*0.4,alignItems:"center",justifyContent:"center",backgroundColor:primaryColor}}
                               onPress={()=>{this.addIngredients()}}
                              >
                                  <Text style={[styles.text,{color:"#fff"}]}>Add</Text>
                              </TouchableOpacity>
                          </View>
                      </View>
                  </View>
              </Modal>
          )
    }
    header =()=>{
        return(
            <View style={{flexDirection:"row",paddingVertical:20}}>
                <View style={{flex:0.5,alignItems:"center",justifyContent:"center"}}>
                   <Text style ={[styles.text,{color:primaryColor,textDecorationLine:"underline"}]}>Item</Text>
                </View>
                <View style={{flex:0.5,alignItems:"center",justifyContent:"center"}}>
                    <Text style={[styles.text, { color: primaryColor, textDecorationLine: "underline" }]}>Required Qty</Text>
                </View>
            </View>
        )
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
                <View style={{alignItems:"center"}}>
                    <Text style={[styles.text,{color:"#fff",fontSize:20,textDecorationLine:"underline"}]}>Required Ingredients</Text>
                </View>
                <FlatList
                   ListHeaderComponent={this.header()} 
                  data={this.state.ingredients}
                  keyExtractor ={(item,index)=>index.toString()}
                  renderItem ={({item,index})=>{
                    return(
                        <View style={{ flexDirection: "row", paddingVertical: 20 }}>
                            <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}>
                                <Text style={[styles.text, { color:"#fff", }]}>{index+1} . {item.item}</Text>
                            </View>
                            <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}>
                                <Text style={[styles.text, { color:"#fff", }]}>{item.qty}</Text>
                            </View>
                        </View>
                    )
                  }}
                />
                {
                    this.modal()
                }
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
                        onPress={() => { this.setState({ modal: true }) }}
                    >
                        <AntDesign name="pluscircle" size={40} color={primaryColor} />
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
export default connect(mapStateToProps, { selectTheme })(ViewItems);