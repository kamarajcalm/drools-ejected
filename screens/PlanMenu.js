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
const screenHeight = Dimensions.get("screen").height


class PlanMenu extends Component {
    constructor(props) {
     
        super(props);
        this.state = {
           menus:[],
           modal:false
        };
    }
    getMenu = async() =>{
        let api =`${url}/api/drools/menu/`
        let data =await HttpsClient.get(api)
        console.log(api)
        if (data.type ="success"){
            this.setState({ menus:data.data})
        }
    }
    componentDidMount(){
        this.getMenu()
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getMenu()
        });
    }
    componentWillUnmount(){
        this._unsubscribe()
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
    deleteItem = async(item,index)=>{
        let api = `${url}/api/drools/menu/${item.id}/`
        let del = await HttpsClient.delete(api)
        if(del.type=="success"){
            let duplicate = this.state.menus
            duplicate.splice(index,1)
            this.setState({menus:duplicate})
            return this.showSimpleMessage("Deleted SuccessFully","green","success")
        }else{
            return this.showSimpleMessage("Try Again", "red", "danger")
        }
    }
    createAlert = (item, index) => {
        Alert.alert(
            "Do you want to delete?",
            ``,
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => { this.deleteItem(item, index) } }
            ]
        );
    }
    header =() =>{
        return(
            <View style={{flexDirection:"row",marginTop:10}}>
                    <View style={{flex:0.1,alignItems:"center",justifyContent:"center"}}>
                        <Text style={[styles.text,{color:"#000",fontSize:20,textDecorationLine:"underline"}]}>#</Text>
                    </View>
                    <View style={{flex:0.6,alignItems:"center",justifyContent:"center"}}>
                        <Text style={[styles.text, { color: "#000", fontSize: 20, textDecorationLine: "underline" }]}>Name</Text>
                    </View>
                    <View style={{flex:0.3,alignItems:"center",justifyContent:"center"}}>
                          <Text style={[styles.text, { color: "#000", fontSize: 20, textDecorationLine: "underline" }]}>Action</Text>
                    </View>
            </View>
        )
    }
    edit = async() =>{
        let api = `${url}/api/drools/menu/${this.state.selectedItem.id}/`
        let sendData ={
            title:this.state.name
        }
        let patch = await HttpsClient.patch(api,sendData)
        if(patch.type=="success"){
            this.setState({modal:false})
            this.getMenu()
            return this.showSimpleMessage("Edited SuccessFully","green","success")
        }else{
            this.showSimpleMessage("Try Again","red", "danger")
        }
    }
    modal =  () =>{
          return(
              <Modal 
                isVisible={this.state.modal}
                deviceHeight={screenHeight}
                onBackdropPress ={()=>{this.setState({modal:false})}}
                statusBarTranslucent={true}
              >
                <View style={{flex:1,alignItems:"center",justifyContent:"center"}}> 
                        <View style={{height:height*0.4,backgroundColor:"#fff",borderRadius:10}}>
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
                          <View style={{marginTop:20,alignItems:"center",justifyContent:"center"}}>
                              <TouchableOpacity style={{height:height*0.05,width:width*0.3,alignItems:"center",justifyContent:"center",backgroundColor:primaryColor}}
                               onPress={()=>{this.edit()}}
                              >
                                    <Text style={[styles.text,{color:"#fff"}]}>Edit</Text>
                              </TouchableOpacity>
                          </View>
                        </View>
                </View>
              </Modal>
          )
    }
    render() {
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
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Menu</Text>

                        </View>
                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                        </View>
                    </View>
                </LinearGradient>
                 <View style={{flex:1}}>
                         <FlatList 
                           ListHeaderComponent= {this.header()}
                           data={this.state.menus}
                           keyExtractor ={(item,index)=>index.toString()}
                           renderItem={({item,index})=>{
                                return(
                                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                                        <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                                            <Text style={[styles.text, { color: "#000", }]}>{index+1}</Text>
                                        </View>
                                        <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
                                            <TouchableOpacity 
                                             onPress={()=>{this.setState({modal:true,name:item.title,selectedItem:item})}}
                                            >
                                                <Text style={[styles.text, { color: "#000", textDecorationLine: "underline" }]}>{item.title}</Text>
                                            </TouchableOpacity>
                                    
                                        </View>
                                        <View style={{ flex: 0.3, alignItems: "center", justifyContent:"space-around" ,flexDirection:"row"}}>
                                             <TouchableOpacity 
                                                onPress={() => { this.props.navigation.navigate("AddMenuItems", { item ,edit:true})}}
                                             >
                                                <Entypo name="edit" size={24} color="orange" />
                                             </TouchableOpacity>
                                             <TouchableOpacity 
                                               onPress={()=>{this.createAlert(item,index)}}
                                             >
                                                  <MaterialIcons name="delete" size={24} color="red" />
                                             </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                           }}
                         />    
                 </View>

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
                        onPress={() => { this.props.navigation.navigate("AddMenuItems",{item:this.state.item,edit:false})}}
                    >
                        <AntDesign name="pluscircle" size={40} color={primaryColor}/>
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
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
    }
}
export default connect(mapStateToProps, { selectTheme })(PlanMenu);