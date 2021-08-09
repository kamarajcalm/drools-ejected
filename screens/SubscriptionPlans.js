import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, TextInput,ScrollView, ActivityIndicator ,Alert} from 'react-native';
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
import DropDownPicker from 'react-native-dropdown-picker';

const frequency = [
    {
        label: "MAN", value: "MAN"
    },
        {
            label: "AN", value: "AN"
    }
    ,
    {
        label: "MN", value:"MN"
    },
    {
        label: "MA", value: "MA"
    }
 
   
]
const screenHeight = Dimensions.get("screen").height
export default class SubscriptionPlans extends Component {
    constructor(props) {
        super(props);
        this.state = {
          plans:[],
          modal:false,
          name:"",
          price:"",
          open:false,
          items: frequency,
          value: frequency[0].label
        };
    }
    getPlans = async()=>{
        let api = `${url}/api/drools/droolsplans/`
        let data = await HttpsClient.get(api)
        console.log(api)
        if(data.type=="success"){
            this.setState({ plans:data.data})
        }
    }
    componentDidMount() {
          this.getPlans()
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getPlans()

        });
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
    componentWillUnmount() {
        this._unsubscribe()
    }
    create = async()=>{
        this.setState({creating:true})
        if (this.state.name==""){
            this.setState({ creating: false })
            return this.showSimpleMessage("Please fill Plan Name","orange","info")
        }
        if (this.state.price == "") {
            this.setState({ creating: false })
            return this.showSimpleMessage("Please fill Price", "orange", "info")
        }
        let api = `${url}/api/drools/createPlan/`
        let sendData ={
            title:this.state.name,
            price:this.state.price,
            plan_type: this.state.value
        }
        let post = await HttpsClient.post(api,sendData)
        if(post.type=="success"){
            this.setState({ creating: false ,modal:false,name:"",price:""})
            this.getPlans()
            return this.showSimpleMessage("Plan Created SuccessFully", "green", "success")
        }else{
            this.setState({ creating: false })
            return this.showSimpleMessage("Try Again", "red", "danger")
        }
    }
    edit = async()=>{
        this.setState({ creating: true })
        if (this.state.name == "") {
            this.setState({ creating: false })
            return this.showSimpleMessage("Please fill Plan Name", "orange", "info")
        }
        if (this.state.price == "") {
            this.setState({ creating: false })
            return this.showSimpleMessage("Please fill Price", "orange", "info")
        }
        let api = `${url}/api/drools/droolsplans/${this.state.selectedItem.id}/`
        let sendData = {
            title: this.state.name,
            price: this.state.price,
            plan_type: this.state.value
        }
        let post = await HttpsClient.patch(api, sendData)
        if (post.type == "success") {
            this.setState({ creating: false, modal: false, name: "", price: "" })
            this.getPlans()
            return this.showSimpleMessage("Plan Edited SuccessFully", "green", "success")
        } else {
            this.setState({ creating: false })
            return this.showSimpleMessage("Try Again", "red", "danger")
        }
    }
    setOpen = (open) => {
        this.setState({
            open
        });
    }

    setValue = (callback) => {

        this.setState(state => ({
            value: callback(state.value)
        }));
    }

    setItems = (callback) => {

        this.setState(state => ({
            items: callback(state.items)
        }));
    }
    header =()=>{
        return(
            <View style={{flexDirection:"row",marginTop:10}}>
                  <View style={{flex:0.1,alignItems:"center",justifyContent:"center"}}>
                         <Text style={[styles.text,{color:"#000",fontSize:22,textDecorationLine:"underline"}]}>#</Text>
                  </View> 
                  <View style={{flex:0.5,alignItems:"center",justifyContent:"center"}}>
                    <Text style={[styles.text, { color: "#000", fontSize: 22, textDecorationLine: "underline"}]}>Plan Name</Text>
                  </View>
                  <View style={{flex:0.2,alignItems:"center",justifyContent:"center"}}>
                    <Text style={[styles.text, { color: "#000", fontSize: 22, textDecorationLine: "underline" }]}>Price</Text>
                  </View>
                <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text, { color: "#000", fontSize: 22, textDecorationLine: "underline" }]}>Action</Text>
                </View>
            </View>
        )
    }
    modal =()=>{
        const {open,items,value} = this.state
        return(
            <Modal
               statusBarTranslucent={true}
               isVisible={this.state.modal}
               deviceHeight={screenHeight}
               onBackdropPress={()=>{this.setState({modal:false})}}
            >
               <View style={{alignItems:"center",justifyContent:"center"}}>
                    <View style={{height:height*0.6,backgroundColor:"#fff",width:width*0.9,borderRadius:10}}>
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
                            <View style={{ paddingHorizontal: 20, marginTop: 20 ,height:this.state.open?height*0.3:height*0.08}}>
                                <View>
                                    <Text style={[styles.text, { color: "#000", fontSize: 22 }]}>Select Frequency:</Text>
                                </View>
                                <DropDownPicker
                                    style={{ height: height *0.05 }}
                                    containerStyle={{ height: height * 0.05 }}
                                    open={open}
                                    value={value}
                                    items={this.state.items}
                                    setOpen={this.setOpen}
                                    setValue={this.setValue}
                                    setItems={this.setItems}
                                    placeholder="select a frequency"
                                />
                            </View>
                          <View style={{ margin: 20, alignItems: "center", justifyContent: "center" }}>
                                {!this.state.creating?<TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center", backgroundColor: primaryColor }}
                                    onPress={() => { 
                                        if(this.state.edit) {
                                              this.edit()
                                        }else{
                                             this.create()
                                        }
                                    
                                    }}
                                >
                                    <Text style={[styles.text, { color: "#fff" }]}>{this.state.edit?"edit":"Create"}</Text>
                                </TouchableOpacity>:
                                    <View style={{ height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center", backgroundColor: primaryColor }}>
                                      <ActivityIndicator  size={"large"} color={"#fff"}/>
                                </View>
                                
                            }
                            </View>
                           </ScrollView>
                     </View>
               </View>
            </Modal>
        )
    }
    deleteItem = async(item,index)=>{
        let api = `${url}/api/drools/droolsplans/${item.id}/`
        let del =  await HttpsClient.delete(api)
        console.log(del)
        if(del.type=="success"){
            let duplicate =  this.state.plans
            duplicate.splice(index,1)
            this.setState({ plans:duplicate})
           return this.showSimpleMessage("Deleted SuccessFully","green","success")
        }else{
            return this.showSimpleMessage("Try again", "red", "danger")
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
    render() {
        return (
            <View style={{ flex: 1 }}>
                  <FlatList 
                     ListHeaderComponent={this.header()}
                     data={this.state.plans}
                     keyExtractor={(item,index)=>index.toString()}
                     renderItem={({item,index})=>{
                            return(
                                <TouchableOpacity style={{ flexDirection: "row", backgroundColor:"#fafafa",paddingVertical:20,marginTop:2}}
                                 onPress={()=>{this.props.navigation.navigate("ViewPlan",{item})}}
                                >
                                    <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                                        <Text style={[styles.text, { color: "#000",  }]}>{index+1}</Text>
                                    </View>
                                    <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}>
                                        <Text style={[styles.text, { color: "#000", }]}>{item.title}</Text>
                                    </View>
                                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                                        <Text style={[styles.text, { color: "#000", }]}> ₹ {item.price}</Text>
                                    </View>
                                    <View style={{ flex: 0.2, alignItems: "center", justifyContent:"space-around",flexDirection:"row" }}>
                                         <TouchableOpacity 
                                           onPress={()=>{this.createAlert(item,index)}}
                                         >
                                            <MaterialIcons name="delete" size={24} color="red" />
                                         </TouchableOpacity>
                                         <TouchableOpacity 
                                            onPress={() => { this.setState({ edit: true, name: item.title, price: item.price.toString(),value:item.plan_type,modal:true,selectedItem:item})}}
                                         >
                                            <Entypo name="edit" size={24} color="orange" />
                                         </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
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
                    justifyContent: "space-around",
                    borderRadius: 20,
                    flexDirection:"row"
                }}>
                    <TouchableOpacity
                        onPress={() => { this.setState({modal:true,edit:false}) }}
                    >
                        <AntDesign name="pluscircle" size={40} color={primaryColor} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.navigate("PlanMenu",)}}
                    >
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <MaterialIcons name="restaurant-menu" size={40} color={primaryColor} />
                        </View>
                      
                    </TouchableOpacity>
                     <TouchableOpacity
                        onPress={() => { this.props.navigation.navigate("PlanDeliveries")}}
                    >
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                          <MaterialIcons name="delivery-dining" size={40} color={primaryColor} />
                        </View>
                      
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