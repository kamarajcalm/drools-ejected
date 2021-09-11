import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, ScrollView, Alert} from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily = settings.fontFamily
const themeColor = settings.themeColor
const url =settings.url
const screenHeight =Dimensions.get('screen').height
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5, AntDesign, Octicons} from '@expo/vector-icons';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import HttpsClient from '../HttpsClient';
export default class Stocks extends Component {
    constructor(props) {
        let types= [
            { label: 'Piece', value: 'Piece' },
            { label: 'Gram', value: 'Gram' },
        ]
        super(props);
        this.state = {
            Items: [],
            modal:false,
            itemName:"",
            minQty:"",
            description:"",
            types,
            selectedType:types[0].value,
            open: false,
            refreshing:false
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
    addItem =async () => {
        this.setState({creating:true})
        if (this.state.itemName == "") {
               this.setState({creating:false})
            return this.showSimpleMessage("Please add Name", "#dd7030",)
        }
        // if (this.state.description == "") {
        //     return this.showSimpleMessage("Please add description", "#dd7030",)
        // }
        if (this.state.minQty == "") {
                   this.setState({creating:false})
            return this.showSimpleMessage("Please add minQty", "#dd7030",)
        }
        const api = `${url}/api/drools/ingridents/`
        let sendData = {
            title: this.state.itemName,
            description:this.state.description,
            minimum_quantity:Number(this.state.minQty),
            type:this.state.selectedType
        }
        let post = await HttpsClient.post(api,sendData)
        console.log(post,sendData)
        if(post.type =="success"){
                   this.setState({creating:false})
            this.getItems()
             this.setState({modal:false})
            this.setState({ title: "", description: "", minimum_quantity:""})
            this.showSimpleMessage("Added SuccessFully", "#00A300", "success")
        }else{
                   this.setState({creating:false})
            return this.showSimpleMessage("Try again", "#B22222", "danger")
        }
      
    }
    getItems =async() =>{
        this.setState({refreshing:true})
        const api = `${url}/api/drools/ingridents/`
        const data = await HttpsClient.get(api)
        console.log(api)
        if (data.type == "success") {
            this.setState({ Items: data.data, refreshing:false})
        }else{
            this.setState({ refreshing:false})
        }
    }
    componentDidMount(){
       this.getItems() 
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
          this.getItems()

        });
    }
    componentWillUnmount(){
        this._unsubscribe();
    }
    validateColor =(item)=>{
       if(item.value == this.state.selectedType){
           return primaryColor
       }
       return "black"
    }
    edit = async()=>{
        this.setState({creating:true})
              if (this.state.itemName == "") {
                   this.setState({creating:false})
            return this.showSimpleMessage("Please add Name", "#dd7030",)
        }
 
        if (this.state.minQty == "") {
              this.setState({creating:false})
            return this.showSimpleMessage("Please add minQty", "#dd7030",)
        }
        const api = `${url}/api/drools/ingridents/${this.state.selectedItem.id}/`
        let sendData = {
            title: this.state.itemName,
            description:this.state.description,
            minimum_quantity:Number(this.state.minQty),
            type:this.state.selectedType
        }
        let post = await HttpsClient.patch(api,sendData)
        console.log(post,sendData)
        if(post.type =="success"){
              this.setState({creating:false})
            this.getItems()
            this.setState({modal:false})
            this.setState({ title: "", description: "", minimum_quantity:""})
            this.showSimpleMessage("Edited SuccessFully", "#00A300", "success")
        }else{
              this.setState({creating:false})
            return this.showSimpleMessage("Try again", "#B22222", "danger")
        }  
    }
    ItemAddModal = () => {
      
        return (
            <Modal
                statusBarTranslucent={true}
                deviceHeight={screenHeight}
                isVisible={this.state.modal}
                onBackdropPress={() => { this.setState({ modal: false }) }}
            >
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <View style={{ height: height * 0.6, backgroundColor: "#eee", borderRadius: 10, }}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >
                           
                            <View style={{ padding: 20 }}>
                                <Text style={[styles.text]}>Enter Item</Text>
                                <TextInput
                                    value={this.state.itemName}
                                    style={{ height: 38, width: width * 0.8, backgroundColor: "#fafafa", borderRadius: 5, marginTop: 5 }}
                                    selectionColor={primaryColor}
                                    onChangeText={(itemName) => { this.setState({ itemName }) }}
                                />
                            </View>
                            <View style={{ padding: 20 }}>
                                <Text style={[styles.text]}>Enter description</Text>
                                <TextInput

                                    value={this.state.description}
                                    style={{ height: 38, width: width * 0.8, backgroundColor: "#fafafa", borderRadius: 5, marginTop: 5 }}
                                    selectionColor={primaryColor}
                                    onChangeText={(description) => { this.setState({ description }) }}
                                />
                            </View>
                            <View style={{ padding: 20 }}>
                                <Text style={[styles.text]}>Enter Min Qty</Text>
                                <TextInput

                                    value={this.state.minQty}
                                    style={{ height: 38, width: width * 0.8, backgroundColor: "#fafafa", borderRadius: 5, marginTop: 5 }}
                                    selectionColor={primaryColor}
                                    onChangeText={(minQty) => { this.setState({ minQty }) }}
                                />
                            </View>
                            <View style={{ paddingHorizontal: 20 ,alignItems:"center"}}>
                                <Text style={[styles.text]}>Type :</Text>
                                {
                                    this.state.types.map((i,index)=>{
                                        return(
                                            <TouchableOpacity style={{flexDirection:"row"}} key={index}
                                             onPress ={()=>{
                                                 this.setState({selectedType:i.value})
                                             }}
                                            >
                                                <View style={{alignItems:"center",justifyContent:"center"}}>
                                                    <Octicons name="primitive-dot" size={24} color={this.validateColor(i)} />
                                                </View>
                                                 <View style={{marginLeft:10,}}>
                                                    <Text style={[styles.text]}>{i.value}</Text>
                                                 </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                            <View style={{ alignItems: "center" }}>
                             {!this.state.creating?   <TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center", backgroundColor: primaryColor }}
                                    onPress={() => { 
                                        if(this.state.edit){
                                           this.edit()
                                        }else{
                                                this.addItem() 
                                        }
                                    
                                    
                                    }}
                                >
                                    <Text style={[styles.text, { color: "#fff" }]}>{this.state.edit?"Edit":"Add"}</Text>
                                </TouchableOpacity>:
                                <View style={{ height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center", backgroundColor: primaryColor }}>
                                    <ActivityIndicator size={"large"}  color={"#fff"}/>
                                </View>
                                }
                            </View>
                      
                        </ScrollView>
                    </View>

                </View>
            </Modal>
        )
    }
    header = () => {
        return (
            <View style={{ flexDirection: "row", paddingVertical: 10, flex: 1 }}>
                <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                    <View>
                        <Text style={[styles.text, { textDecorationLine: "underline", color: "#000" }]}>Item</Text>
                    </View>
                </View>
                <View style={{flex:0.3,alignItems:"center",justifyContent:"center"}}>
                    <View>
                        <Text style={[styles.text, { textDecorationLine: "underline", color: "#000" }]}>Unit</Text>
                    </View>
                </View>
        
                <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                    <View>
                        <Text style={[styles.text, { textDecorationLine: "underline", color: "#000" }]}>Min Qty</Text>
                    </View>
                </View>
                <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                    <View>
                        <Text style={[styles.text, { textDecorationLine: "underline", color: "#000" }]}>Edit</Text>
                    </View>
                </View>
                <View style={{flex:0.1}}>

                </View>
            </View>
        )

    }
    deleteItem = async (item, index) => {
        let duplicate = this.state.Items
        let api = `${url}/api/drools/ingridents/${item.id}/`
        let del = await HttpsClient.delete(api)
        if (del.type == "success") {
            duplicate.splice(index, 1)
            this.setState({ Items: duplicate })
            return this.showSimpleMessage("deleted SuccessFully", "#00A300", "success")
        } else {
            return this.showSimpleMessage("try again ", "red", "danger")
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
    validateText =(item)=>{
        if (item.avaliableQty.available_kg!=null){
            return (
                <>
                    <Text style={[styles.text, { color: "#000" }]}>{item.avaliableQty.available_kg} </Text>
                    <View style={{marginLeft:5}}>
                    
                        <Text style={[styles.text,]}>Kg</Text>
                    </View>
               </>
           )
        }
       return(
           <>
               <Text style={[styles.text, { color: "#000" }]}>{item.avaliableQty.available_quantity} </Text>
           <View style={{marginLeft:5}}>
      
               <Text style={[styles.text,]}>Pieces</Text>
           </View>
          </>
       )
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
             
                <FlatList
                    contentContainerStyle={{paddingBottom:90}}
                    refreshing={this.state.refreshing}
                    onRefresh={()=>{this.getItems()}}
                    data={this.state.Items}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={this.header()}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={{ flexDirection: "row", paddingVertical: 10, flex: 1 }}
                             onPress={()=>{this.props.navigation.navigate('ViewIngredients',{item})}}
                            >
                                <View style={{ flex: 0.3, flexDirection:"row"}}>
                                    <View style={{}}>
                                              <Text style={[styles.text, {  color: "#000" }]}> {index+1} .</Text> 
                                    </View>
                                    <View style={{alignItems:"center",justifyContent:"center",flexWrap:"wrap",}}>
                                        <Text style={[styles.text, {  color: "#000",}]}>{item.title}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                                    {
                                        item.type=="Piece"?<View>
                                            <Text style={[styles.text, {  color: "#000" }]}>{item.avaliableQty.available_quantity} piece</Text>
                                        </View>:
                                        <View>
                                            <Text style={[styles.text, {  color: "#000" }]}>{item.avaliableQty.available_kg} Kg</Text>
                                        </View>
                                    }
                           
                            
                                </View>
                             
                                <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                                    <View>
                                        <Text style={[styles.text, { color: "#000" }]}>{item.minimum_quantity} {item.type}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                                    <TouchableOpacity 
                                     onPress={()=>{
                                         this.setState({edit:true,modal:true,itemName:item.title,minQty:item.minimum_quantity.toString(),selectedType:item.type,selectedItem:item})
                                     }} 
                                    >
                                       <Entypo name="edit" size={24} color={"orange"} />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={{flex:0.1,alignItems:"center",justifyContent:"center"}}
                                 onPress={()=>{this.createAlert(item,index)}}
                                >
                                    <Entypo name="circle-with-cross" size={24} color="red" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )
                    }}
                />
                {
                    this.ItemAddModal()
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