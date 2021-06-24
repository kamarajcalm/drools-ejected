import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Alert, StyleSheet, FlatList, Image, TextInput, KeyboardAvoidingView,Platform, ScrollView} from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily = settings.fontFamily
const themeColor = settings.themeColor
const url =settings.url
import { StatusBar, } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import orders from '../data/orders'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import HttpsClient from '../HttpsClient';
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
            availableQty:"",
            minQty:"",
            searchResults:[],
            selectedItem:null,
            editItem:null,
            edit:false
        };
    }
    getItem = async()=>{
        let api = `${url}/api/drools/items/${this.state.item.id}/`
        let data = await HttpsClient.get(api)
 
        if(data.type =="success"){
            this.setState({ item:data.data})
        }
    }
    addIngredients =async()=>{
      
        if (this.state.requiredQty == "") {
            return this.showSimpleMessage("Please add AvailableQty", "#dd7030",)
        }
        if (this.state.selectedItem == "") {
            return this.showSimpleMessage("Please add Item by search", "#dd7030",)
        }
        let api = `${url}/api/drools/ingridient_add/`
        let sendData ={
            ingridient:this.state.selectedItem.id,
            grams: this.state.availableQty,
            pk:this.state.item.id
        }
        let post = await HttpsClient.post(api,sendData)
         if(post.type =="success"){
            this.getItem()
             this.showSimpleMessage("Added SuccessFully", "#00A300", "success")
             this.setState({ searchName: "", availableQty: "", modal: false, })
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
    searchItems = async (text) => {
        this.setState({ searchName:text})
        let api = `${url}/api/drools/ingridents/?search=${text}`
        let data = await HttpsClient.get(api)
        if (data.type == "success") {
            this.setState({ searchResults: data.data })
        }
    }
    selectItem =(item)=>{
        this.setState({ searchName:item.title,searchResults:[],selectedItem:item})
    }
    EditIngredient =async()=>{
        let api = `${url}/api/drools/itemsubs/${this.state.editItem.id}/`
  
            let sendData ={
               
                grams: this.state.availableQty,
            
            }
            let patch =await HttpsClient.patch(api,sendData)
            if(patch.type =="success"){
                this.getItem()
                this.setState({
                    editmodal: false, selectedItem: null, searchName: "",
                    availableQty: "",})
                this.showSimpleMessage("Edited SuccessFully", "#00A300", "success")
            }else{
                this.showSimpleMessage("Try again", "red", "success")
            }
        
    }
    modal =()=>{
          return(
              <Modal
                
                  statusBarTranslucent={true}
                  onBackdropPress={() => { this.setState({modal:false})}}
                  deviceHeight={screenHeight}
                  isVisible={this.state.modal}
              >  
              

             
                  <View style={{ }}>
                  
                 
                      <View style={{ height: height * 0.5, backgroundColor: "#fff", width: width * 0.9, borderRadius: 10 }}>
                        <ScrollView>
                          
                            <View style={{padding:20}}>
                                <Text style={[styles.text]}>Enter Item</Text>
                                <TextInput 
                                  value ={this.state.searchName}
                                  style={{height:height*0.05,width:width*0.8,backgroundColor:"#eee",borderRadius:5,marginTop:5}}
                                  selectionColor={primaryColor}
                                  onChangeText={(searchName) => { this.searchItems(searchName)}}
                                />
                            </View>
                          {this.state.searchResults.length > 0 && <View style={{ position: "relative", backgroundColor: "#fff", height: height * 0.1, width: width * 0.6, top: 0, alignSelf: "center" }}>
                              {
                                  this.state.searchResults.map((item, idx) => {
                                      return (
                                          <TouchableOpacity
                                              onPress={() => { this.selectItem( item) }}
                                              style={{ backgroundColor: "blue", marginTop: 5 }}
                                              key={idx}>
                                              <Text style={[styles.text, { color: "#fff", }]}>{item.title}</Text>
                                          </TouchableOpacity>
                                      )
                                  })
                              }

                          </View>}
                          <View style={{ padding: 20 }}>
                              <Text style={[styles.text]}>Enter Required Qty</Text>
                              <TextInput
                                  keyboardType={"numeric"}
                                  value={this.state.availableQty}
                                  style={{ height: height * 0.05, width: width * 0.8, backgroundColor: "#eee", borderRadius: 5, marginTop: 5 }}
                                  selectionColor={primaryColor}
                                  onChangeText={(availableQty) => { this.setState({ availableQty }) }}
                              />
                          </View>
                       
                          {!this.state.edit?<View style={{alignItems:"center"}}>
                              <TouchableOpacity style={{height:height*0.05,width:width*0.4,alignItems:"center",justifyContent:"center",backgroundColor:primaryColor}}
                               onPress={()=>{this.addIngredients()}}
                              >
                                  <Text style={[styles.text,{color:"#fff"}]}>Add</Text>
                              </TouchableOpacity>
                              </View> : <View style={{ alignItems: "center" }}>
                                  <TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center", backgroundColor: primaryColor }}
                                      onPress={() => { this.EditIngredient() }}
                                  >
                                      <Text style={[styles.text, { color: "#fff" }]}>Edit</Text>
                                  </TouchableOpacity>
                              </View>
                          }
                          </ScrollView>
                      </View>
              
                  </View>
             
              </Modal>
          )
    }
    header =()=>{
        return(
            <View style={{flexDirection:"row",paddingVertical:20}}>
                <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text, { color: primaryColor, textDecorationLine: "underline" }]}>#</Text>
                </View>
                <View style={{flex:0.23,alignItems:"center",justifyContent:"center"}}>
                   <Text style ={[styles.text,{color:primaryColor,textDecorationLine:"underline"}]}>Item</Text>
                </View>
                <View style={{flex:0.23,alignItems:"center",justifyContent:"center"}}>
                    <Text style={[styles.text, { color: primaryColor, textDecorationLine: "underline" }]}> Qty</Text>
                </View>
               <View style={{flex:0.23,alignItems:"center",justifyContent:"center"}}>
                    <Text style={[styles.text, { color: primaryColor, textDecorationLine: "underline" }]}>Type</Text>
               </View>
               <View style={{flex:0.1}}>

               </View>
                <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                   
                </View>
            </View>
        )
    }
    footer =()=>{

        return(
            <View style={{marginTop:20,flex:1,}}>
               
                <View style={{alignSelf:"center"}}>
                    <Text style={[styles.text,{fontSize:22,textDecorationLine:"underline",color:"#fff"}]}>Description :</Text>
                </View>
                <View style={{marginTop:5,paddingLeft:6}}>
                    <Text style={[styles.text,{color:"#fff"}]}>{this.state.item.description}</Text>
                </View>
            </View>
        )
    }
    deleteItem = async(item, index)=>{
        let api = `${url}/api/drools/itemsubs/${item.id}/`
        let del = await HttpsClient.delete(api)
        if(del.type=="success"){
            let duplicate = this.state.item
            duplicate.subItems.splice(index, 1)
            this.setState({ item: duplicate })
            this.showSimpleMessage("deleted successfully","green","success")
        }else{
            this.showSimpleMessage("Try again", "red", "failure")
        }
   
    }
    createAlert = (item, index) => {
        Alert.alert(
            "Do you want to delete?",
            `${item.title}`,
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
    setEdit  =(item)=>{
        this.setState({searchName: item.title, availableQty: item.quantity.toString(), edit: true, editItem: item},()=>{
            this.setState({editmodal:true})
        })

    }
    editmodal =()=>{
        return(
            <Modal
                style={{ flex: 1 }}
                statusBarTranslucent={true}
                onBackdropPress={() => {
                    this.setState({
                        editmodal: false, selectedItem: null, searchName: "",
                        availableQty: "",
                    }) }}
                deviceHeight={screenHeight}
                isVisible={this.state.editmodal}
            >



                <View style={{}}>


                    <View style={{ height: height * 0.3, backgroundColor: "#fff", width: width * 0.9, borderRadius: 10 }}>
                        <ScrollView>

                         
                            <View style={{ padding: 20 }}>
                                <Text style={[styles.text]}>Enter Required Qty</Text>
                                <TextInput
                                    keyboardType={"numeric"}
                                    value={this.state.availableQty}
                                    style={{ height: height * 0.05, width: width * 0.8, backgroundColor: "#eee", borderRadius: 5, marginTop: 5 }}
                                    selectionColor={primaryColor}
                                    onChangeText={(availableQty) => { this.setState({ availableQty }) }}
                                />
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center", backgroundColor: primaryColor }}
                                    onPress={() => { this.EditIngredient() }}
                                >
                                    <Text style={[styles.text, { color: "#fff" }]}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>

                </View>

            </Modal>
        )
    }
    validateColor =()=>{
        if (this.state.item.item_status =="Available"){
            return "green"
        }
        if (this.state.item.item_status == "outofstock") {
            return "red"
        }
        return "#ffff"
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
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>{this.state.item.title}</Text>

                        </View>
                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                        </View>
                    </View>
                </LinearGradient>
             
                <View style={{ flexDirection: "row", height: height * 0.3, width}}>
                    <View style={{flex:0.4}}>
                        <Image
                            source={{ uri: this.state.item.displayPicture }}
                            style={{ height:"100%",width:"100%"}}
                        />
                    </View>
                   <View style={{flex:0.6}}>
                        <View style={{alignSelf:"center"}}>
                            <Text style={[styles.text, { fontSize: 22, textDecorationLine: "underline", color: "#fff" }]}>Item Info:</Text>
                        </View>
                        <View style={{marginTop:10,marginLeft:10,flexDirection:"row"}}>
                            <View style={{}}>
                                <Text style={[styles.text, { color: "#fff",fontSize:18 }]}>Price : </Text>
                            </View>
                            <View style={{}}>
                                <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>₹ {this.state.item.item_price}</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 10, marginLeft: 10, flexDirection: "row" }}>
                            <View style={{}}>
                                <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Discount Price : </Text>
                            </View>
                            <View style={{}}>
                                <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>₹ {this.state.item.discount_price}</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 10, marginLeft: 10, flexDirection: "row" }}>
                            <View style={{}}>
                                <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Stock : </Text>
                            </View>
                            <View style={{}}>
                                <Text style={[styles.text, { color:this.validateColor(), fontSize: 18 ,}]}>{this.state.item.item_status}</Text>
                            </View>
                        </View>
                   </View>
                </View>
                <View style={{alignItems:"center",marginTop:10}}>
                    <Text style={[styles.text,{color:"#fff",fontSize:20,textDecorationLine:"underline"}]}>Required Ingredients</Text>
                </View>
                <FlatList
                  ListFooterComponent ={this.footer()}
                  ListHeaderComponent={this.header()} 
                  data={this.state.item.subItems}
                  keyExtractor ={(item,index)=>index.toString()}
                  renderItem ={({item,index})=>{
                    return(
                        <View style={{ flexDirection: "row",marginTop:10 }}>
                            <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                                <Text style={[styles.text, { color: "#fff",  }]}>{index+1}</Text>
                            </View>
                            <View style={{ flex: 0.23, alignItems: "center", justifyContent: "center" }}>
                                <Text style={[styles.text, { color: "#fff", }]}>{item.title}</Text>
                            </View>
                            <View style={{ flex: 0.23, alignItems: "center", justifyContent: "center" }}>
                                <Text style={[styles.text, { color: "#fff",}]}>{item.quantity}</Text>
                            </View>
                            <View style={{ flex: 0.23, alignItems: "center", justifyContent: "center" }}>
                                <Text style={[styles.text, { color: "#fff",}]}>{item.type}</Text>
                            </View>
                            <TouchableOpacity style={{ flex: 0.1,alignItems:"center",justifyContent:"center" }}
                             onPress ={()=>{
                                 this.setEdit(item)
                             }}
                            > 
                                <Entypo name="edit" size={24} color="red" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}
                             onPress ={()=>{this.createAlert(item,index)}}
                            >
                                <Entypo name="circle-with-cross" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    )
                  }}
                />
                {
                    this.modal()
                }
                {
                    this.editmodal()
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