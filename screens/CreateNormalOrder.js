import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image ,TextInput, ScrollView} from 'react-native';
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
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import orders from '../data/orders'
import { FontAwesome, AntDesign, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import HttpsClient from '../HttpsClient';
import DropDownPicker from 'react-native-dropdown-picker';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
class CreateNormalOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables:[],
            open: false,
            value: null,
            Items:[],
            dishes:[]
        };
    }
    getTables = async () => {
        let api = `${url}/api/drools/tables/`
        let data = await HttpsClient.get(api)
        if (data.type == "success") {
           let tables= []
           data.data.forEach((i)=>{
              let pushObj ={
                     label:`Table ${i.id}`,
                     value: i.id,
                    }
               tables.push(pushObj)
           })
           console.log(tables)
           this.setState({tables})
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
    placeOrder = async()=>{
        if (this.state.value == null) {
            return this.showSimpleMessage("Please add Table", "#dd7030",)
        }
        if(this.state.dishes.length==0){
            return this.showSimpleMessage("Please add Items", "#dd7030",)
        }
        let api = `${url}/api/drools/addCart/`
         let sendData ={
              items:this.state.dishes,
              tablepk:this.state.value,
              add_cart:true
         }
         let post =await HttpsClient.post(api,sendData)
         console.log(post)
         if(post.type =="success"){
              this.props.navigation.goBack()
             return this.showSimpleMessage("Order placed SuccessFully", "green","success")

         }else{
             return this.showSimpleMessage("SomeThing Went Wrong", "red", "danger")
         }
    }
   componentDidMount(){
       this.getTables();
   }
    backFunction =(dishes)=>{
        this.setState({ dishes: this.state.dishes.concat(dishes)})
    }
    changeComment = (text, item, index)=>{
        let duplicate = this.state.dishes
        duplicate[index].comments = text
        this.setState({ dishes: duplicate })
    }
    addQuantity =(item,index)=>{
      let duplicate =this.state.dishes
      duplicate[index].quantity = duplicate[index].quantity+1
      this.setState({ dishes: duplicate})
    }
    decreaseQuantity = (item, index)=>{
        let duplicate = this.state.dishes
        duplicate[index].quantity = duplicate[index].quantity - 1
        this.setState({ dishes: duplicate })
    }
    deleteItem = (index)=>{
        let duplicate = this.state.dishes
        duplicate.splice(index,1)
        this.setState({ dishes: duplicate })
    }
    footer =()=>{
        return(
            <View style={{marginVertical:20,alignItems:"center"}}>
                <TouchableOpacity style={{height:height*0.05,width:width*0.4,alignItems:"center",justifyContent:"center",backgroundColor:primaryColor}}
                 onPress ={()=>{
                     this.placeOrder()
                 }}
                >
                    <Text style={[styles.text,{color:"#fff"}]}>Place Order</Text>
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        const {open,value} = this.state
        return (
            <View style={{ flex: 1 }}>
                {/* Headers */}
                <LinearGradient
                    style={{ height: height * 0.12, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                    colors={gradients}
                >
                    <View style={{ marginTop: Constants.statusBarHeight, flex: 1, flexDirection: "row" }}>
                        <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
                            onPress={() => { this.props.navigation.goBack()}}
                        >
                            <Ionicons name="caret-back" size={24} color={secondaryColor} />
                        </TouchableOpacity>
                        <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Create Normal Order</Text>

                        </View>
                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                        </View>
                    </View>
                </LinearGradient>
                <ScrollView>
                <View style={{padding:20}}>
                    <Text style={[styles.text, {fontSize:22}]}>Select Table :</Text>
                    <View style={{marginTop:10}}>
                        <DropDownPicker
                            style={{ height: height * 0.05 }}
                            containerStyle={{ height: height * 0.05 }}
                            open={open}
                            value={value}
                            items={this.state.tables}
                            setOpen={this.setOpen}
                            setValue={this.setValue}
                            setItems={this.setItems}
                            placeholder="select a Table"
                        />
                    </View>
                    <View style={{marginTop:30}}>
                        <View>
                            <Text style={[styles.text,{fontSize:22}]}>Add Items:</Text>
                        </View>
                        <View style={{marginTop:10,alignItems:"center"}}>
                            <TouchableOpacity 
                                onPress={() => { this.props.navigation.navigate('SearchDishes', { backFunction: (dishes) => { this.backFunction(dishes) } })}}
                            
                            >
                                <Ionicons name="ios-add-circle-sharp" size={30} color={primaryColor} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                       
                            {
                                this.state.dishes.map((item, index) => {
                                    return (
                                        <View style={{ height: height * 0.2, alignSelf: "center", width: width * 0.9, backgroundColor: "#eeee", marginTop: 10 }}
                                            key={index}
                                        >
                                            <View style={{ marginTop: 10, alignItems: "center" }}>
                                                <Text style={[styles.text, { fontSize: 22, color: "#000", }]}>{item.title}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "center" }}>
                                                <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }}
                                                    onPress={() => { this.decreaseQuantity(item, index) }}
                                                >
                                                    <AntDesign name="minuscircle" size={20} color={primaryColor} />
                                                </TouchableOpacity>
                                                <View style={{ marginHorizontal: 20, alignItems: "center", justifyContent: "center" }}>
                                                    <Text style={[styles.text, { fontSize: 22 }]}>{item.quantity}</Text>
                                                </View>
                                                <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }}
                                                    onPress={() => { this.addQuantity(item, index) }}
                                                >
                                                    <AntDesign name="pluscircle" size={20} color={primaryColor} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{  }}>
                                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                                    <Text style={[styles.text]}>Comments :</Text>
                                                </View>
                                                <View style={{ alignItems: "center" }}>
                                                    <TextInput
                                                        value={item.comments}
                                                        style={{ height: height*0.1, width: "90%", backgroundColor: "#fff", paddingLeft: 5, textAlignVertical: "top" }}
                                                        selectionColor={primaryColor}
                                                        onChangeText={(text) => { this.changeComment(text, item, index) }}
                                                    />
                                                </View>

                                            </View>
                                            <View style ={{position:"absolute",right: 5,top:5}}>
                                                 <TouchableOpacity 
                                                  onPress ={()=>{this.deleteItem(index)}}
                                                 
                                                 >
                                                    <Entypo name="circle-with-cross" size={24} color="red" />
                                                 </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                            {
                                this.footer()
                            }
               
                    </View>
                   
                   
                </View>
                </ScrollView>
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
export default connect(mapStateToProps, { selectTheme })(CreateNormalOrder);