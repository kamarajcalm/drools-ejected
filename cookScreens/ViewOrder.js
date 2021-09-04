import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, AsyncStorage, FlatList, Alert, ScrollView, TextInput} from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily = settings.fontFamily
const screenHeight =Dimensions.get("screen").height
const url =settings.url
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { CommonNavigationAction, CommonActions } from '@react-navigation/native'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import HttpsClient from '../HttpsClient';
import Modal from "react-native-modal";
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import moment from 'moment';
class ViewOrder extends Component {
    constructor(props) {
         let item =props.route.params.item
        super(props);
        this.state = {
            item,
            selectedItem:null,
            selectedIndex:null,
            modal:false,
            finishQty:"",
            finishAll:null
        };
    }
    createAlert = (item, index) => {
        Alert.alert(
            `Are you Sure to Decline  table ${item.table}`,
            ``,
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => { this.DeclineSingle(item, index) } }
            ]
        );
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
    completeAll = async(item)=>{
      let items = [item.pk]
       let api =`${url}/api/drools/cookComplete/`
       let sendData ={
           items,
           status:"Finished",
           json:item
       }
       let post = await HttpsClient.post(api,sendData)
       if(post.type =="success"){
           this.showSimpleMessage("Completed SuccessFully","green","success")
           return this.props.navigation.goBack()
       }else{
           this.showSimpleMessage("Try Again", "red", "danger")
       }
    }

    footer =()=>{
        return(
            <View style={{marginVertical:20,flexDirection:"row",alignItems:"center",justifyContent:"center",}}>
               
                {/* <TouchableOpacity
                    onPress={() => { this.completeAll() }}
                    style={{ height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center", backgroundColor: primaryColor }}
                >
                    <Text style={[styles.text, { color: "#fff" }]}>Complete All</Text>
                </TouchableOpacity> */}
            </View>
        )
    }
    startSingle = async(item,index)=>{
        let api = `${url}/api/drools/cartitems/${item.pk}/`
        let sendData ={
            item_status:"Cooking"
        }
        let patch = await HttpsClient.patch(api,sendData)
        if(patch.type=="success"){
            let duplicate = this.state.item
            duplicate.objs[index].status = "Cooking"
            this.setState({item:duplicate})
           return   this.showSimpleMessage("Started SuccessFully", "#00A300", "success")
        }else{
            this.showSimpleMessage("Try again", "red", "danger")
        }
    }
    cookOrderComplete =async()=>{
        let api = `${url}/api/drools/cookComplete/`
        let sendData = {
            
            status: "Finished",
            json: this.state.item,
            onlyOrder:true
        }
        let post = await HttpsClient.post(api, sendData)
        if (post.type == "success") {
            
        } else {
           
        }
    }
    completeSingle = async()=>{
    
       return
        // let api = `${url}/api/drools/cartitems/${this.state.selectedItem.pk}/`
        // let sendData = {
        //     item_status:"Finished",
        //     finished_quantity:this.state.finishAll,
        //     quantity: this.state.selectedItem.quantity - this.state.finishAll,
       
        // }
       
      
        // let patch = await HttpsClient.patch(api, sendData)
        // console.log(patch)
        // if (patch.type == "success") {
         
        //     let duplicate = this.state.item
        //     duplicate.itemcount = duplicate.itemcount-this.state.finishAll
        //     duplicate.objs[this.state.selectedIndex].status = "Finished"
        //     duplicate.objs[this.state.selectedIndex].quantity = duplicate.objs[this.state.selectedIndex].quantity-this.state.finishAll
        //     this.setState({ item: duplicate ,modal:false},()=>{
        //         this.cookOrderComplete()
        //     })
        //     return this.showSimpleMessage("Finished SuccessFully", "#00A300", "success")
        // } else {
        //     this.showSimpleMessage("Try again", "red", "danger")
        // }
    }
    completethisOnly = async()=>{
       let items = [this.state.selectedItem.pk]
       let api =`${url}/api/drools/cookComplete/`
       let sendData ={
           items,
           status:"Finished",
           json:this.state.selectedItem,
           updateQuantity:this.state.finishQty
       }
  
       let post = await HttpsClient.post(api,sendData)
       console.log(post)
       if (post.type == "success"){
          this.setState({modal:false})
          this.showSimpleMessage("Finished SuccessFully", "#00A300", "success")
          return this.props.navigation.goBack()

        } else {
            this.showSimpleMessage("Try again", "red", "danger")
        }

    }
    callApi = async(item)=>{
       let api = `${url}/api/drools/checkCart/?cart=${this.state.item.cartpk}`
       let data  = await HttpsClient.get(api)
       console.log(data)
    }
    DeclineSingle  = async(item,index)=>{
     
        let api = `${url}/api/drools/cartitems/${item.pk}/`
        let sendData = {
            item_status: "Declined"
        }
        let patch = await HttpsClient.patch(api, sendData)
        if (patch.type == "success") {
            this.callApi()
            let duplicate = this.state.item
            duplicate.objs[index].status = "Declined"
            this.setState({ item: duplicate })
            return this.showSimpleMessage("Declined SuccessFully", "#00A300", "success")
        } else {
            this.showSimpleMessage("Try again", "red", "danger")
        }
    }
    validateItem =(item,index)=>{
        if (item.status =="Pending"){
            return (
                <>
                    <TouchableOpacity
                        onPress={()=>{
                      
                                this.startSingle(item,index)
                      
                           
                        }}
                        style={{ height: height * 0.05, width: "80%", alignItems: "center", justifyContent: "center", backgroundColor: "green" }}
                    >
                        <Text style={[styles.text, { color: "#fff" }]}>Start</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { this.createAlert(item,index)}}
                        style={{ height: height * 0.05, width: "80%", alignItems: "center", justifyContent: "center", backgroundColor: "red",marginTop:20 }}
                    >
                        <Text style={[styles.text, { color: "#fff" }]}>Decline</Text>
                    </TouchableOpacity>
                </>
            )
        }
        if (item.status == "Cooking"){
            return (
                <>
                    <TouchableOpacity
                        onPress={() => {
                            if(item.quantity==1){
                               this.completeAll(item)
                            }else{
                                 this.setState({ selectedItem: item,finishQty:item.quantity.toString(), selectedIndex: index,finishAll:item.quantity},()=>{
                                     this.setState({modal:true})
                                  }) 
                            }
                    }}
                        style={{ height: height * 0.05, width: "80%", alignItems: "center", justifyContent: "center", backgroundColor: "green" }}
                    >
                        <Text style={[styles.text, { color: "#fff" }]}>Complete</Text>
                    </TouchableOpacity>
               
                </>
            )
        }
        if (item.status == "Declined") {
            return (
                <>
                   <View >
                      <Text style={[styles.text,{color:"red"}]}>Declined</Text>
                   </View>

                </>
            )
        }
        if (item.status == "Finished") {
            return (
                <>
                    <View >
                        <Text style={[styles.text, { color: "green" }]}>Completed</Text>
                    </View>

                </>
            )
        }
    }
    completeModal =()=>{
        return(
            <Modal
                isVisible={this.state.modal}
                deviceHeight={screenHeight}
                onBackdropPress={() => { this.setState({ modal: false }) }}
            >
                <View style={{ justifyContent: "center" }}>

                    <View style={{ height: height * 0.4, backgroundColor: "#eee", borderRadius: 10,alignItems:"center",justifyContent:"center"}}
               
                    >    
                       
                         <View>
                   
                                <TouchableOpacity 
                                   onPress={()=>{this.completeAll(this.state.selectedItem)}}
                                  style ={{height:height*0.05,width:width*0.4,alignItems:'center',justifyContent:"center",backgroundColor:primaryColor}}
                                >
                                     <Text style={[styles.text,{color:"#fff"}]}>Complete All</Text>
                                </TouchableOpacity>

                            
                         </View>
                         <View style={{marginTop:10}}>
                             <Text style={[styles.text,]}> Or </Text>
                         </View>
                         <View>
                             <Text style={[styles.text]}>How many you have Finished ?</Text>
                             <TextInput 
                                keyboardType={"numeric"}
                                value={this.state.finishQty}
                                style={{height:38,width:width*0.5,backgroundColor:"#fafafa",marginTop:5,paddingLeft:5}}
                                selectionColor={primaryColor}
                                onChangeText={(finishQty) => { this.setState({finishQty})}}
                             />
                         </View>
                        <View style={{marginTop:10}}>

                            <TouchableOpacity
                                onPress={()=>{this.completethisOnly()}}
                                style={{ height: height * 0.05, width: width * 0.4, alignItems: 'center', justifyContent: "center", backgroundColor: "green" }}
                            >
                                <Text style={[styles.text, { color: "#fff" }]}>Finish This</Text>
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
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Order Details</Text>

                        </View>
                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                        </View>
                    </View>

                </LinearGradient>
                 <View style={{flex:1}}>
                      <View style={{alignItems:"center",justifyContent:"center",marginTop:10}}>
                          <View style={{alignItems:"center",justifyContent:"center"}}>
                            <Text style={[styles.text, { fontSize: 22, textDecorationLine: "underline" }]}>Item Name:</Text>
                          </View>
                          <View style={{alignItems:"center",justifyContent:"center",marginTop:10}}>
                            <Text style={[styles.text, { color: primaryColor, fontSize: 22, }]}>{this.state.item.title} X {this.state.item.itemcount}</Text>

                          </View>
                          
                      </View>
                     
                          <View style={{marginLeft:10}}>
                              <Text style={[styles.text,{fontSize:22,textDecorationLine:"underline"}]}>Order Info :</Text>
                          </View>
                       

                         
                          <FlatList 
                            ListFooterComponent={this.footer()}
                            data={this.state.item.objs}
                            keyExtractor ={(item,index)=>index.toString()}
                            renderItem ={({item,index})=>{
                                console.log(item)
                                return(
                                    <View style={{ backgroundColor: "#eee"}}>
                                    <View style={{paddingLeft:20,marginTop:10,height:height*0.2,backgroundColor:"#eee",alignItems:"center",justifyContent:"space-around",flexDirection:"row"}}>
                                       <View style={{flex:0.1,alignItems:"center",justifyContent:"center"}}>
                                           <Text style={[styles.text]}> # {index+1}</Text>
                                       </View>
                                       <View style={{flex:0.6,alignItems:"center",justifyContent:"space-around"}}>
                                            
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[styles.text]}>OrderTime : </Text>
                                                <Text style={[styles.text, { color: primaryColor }]}>{moment(`${item.time}`).format("hh:mm a")}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[styles.text]}>Table: </Text>
                                                <Text style={[styles.text, { color: primaryColor }]}>{item.tableTitle}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[styles.text]}>Order Status : </Text>
                                                <Text style={[styles.text, { color: primaryColor }]}>{item.status}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[styles.text]}>Required Qty : </Text>
                                                <Text style={[styles.text, { color: primaryColor }]}>{item.quantity}</Text>
                                            </View>
                                       </View>
                                       <View style={{flex:0.3,alignItems:"center",justifyContent:"space-around"}}>
                                           {
                                                this.validateItem(item,index)
                                           }
                                       </View>
                                      
                                    </View>
                                    <View>
                                        <View style={{paddingHorizontal:20}}>  
                                                <Text style={[styles.text, {}]}>Comments :</Text>
                                        </View>
                                        <View style={{padding:20}}>
                                                <Text style={[styles.text, {}]}>{item.comments}</Text>
                                        </View>
                                    </View>
                                    </View>
                                )
                            }}
                          />
                      
                      
                
                 </View>
                 {
                     this.completeModal()
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
export default connect(mapStateToProps, { selectTheme })(ViewOrder);