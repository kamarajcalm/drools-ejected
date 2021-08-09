import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image,TextInput } from 'react-native';
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
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
class SeacrchDishes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText:"",
            categories:[],
            items:[],
            selectedItems:[],
            selectedCategory:null,
     
        };
    }
    searchDishes =async(text)=>{
        this.setState({ selectedCategory:null})
        let api = `${url}/api/drools/items/?search=${text}`
        console.log(api)
        let data =await HttpsClient.get(api)
     
        if(data.type =="success"){
             data.data.forEach((i)=>{
                i.selected =false
                i.quantity = 1
             })
             console.log(data.data,"ffffff")
            this.setState({ items:data.data})
        }
    }
    getCategories = async () => {
        let api = `${url}/api/drools/category/`
        const data = await HttpsClient.get(api)
        if (data.type == "success") {

            this.setState({ categories:data.data})
        }
    }
    getItems = async () => {
        let api = `${url}/api/drools/items/?category=${this.state.selectedCategory.id}`
        let data = await HttpsClient.get(api)
    
        if (data.type == "success") {
            data.data.forEach((i) => {
                i.selected = false
                i.quantity = 1
            })
            this.setState({ items: data.data })
        }
    }
    selectDish = (item,idx) => {
        let data = this.state.selectedItems
        let duplicate = this.state.items
        duplicate[idx].selected = !duplicate[idx].selected
        this.setState({ items:duplicate})
        var found = data.find(function (element) {
            return element.id === item.id;
        });
        if (found) {
            duplicate[idx].quantity = found.quantity
            duplicate[idx].comments = found.comments
            this.showSimpleMessage("Item already added", "orange", "success")
        } else {
            let pushObj = {
                quantity: 1,
                id: item.id,
                comments: "",
                title: item.title
            }
            data.push(pushObj)
            this.setState({ selectedItems: data })
          
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
    addQuantity =(item,idx)=>{
    
        let data = this.state.selectedItems
        let duplicate = this.state.items
     
        duplicate[idx].quantity += 1
        this.setState({ items: duplicate })
        var found = data.find(function (element) {
            return element.id === item.id;
        });
        if (found) {
            
            let index = data.indexOf(found)
            data[index].quantity +=1
            this.setState({ selectedItems: data },()=>{
                console.log(this.state.selectedItems)
            })
        }
    }
    decreaseQuantity = (item, idx)=>{
        let data = this.state.selectedItems
        let duplicate = this.state.items
        duplicate[idx].quantity -= 1

        if (duplicate[idx].quantity==0){
            duplicate[idx].quantity = 1
            duplicate[idx].selected=false
            this.setState({ items:duplicate})
            var found = data.find(function (element) {
                return element.id === item.id;
            });
            if (found) {
                let index = data.indexOf(found)
                 data.splice(index,1)
                this.setState({ selectedItems: data })
            }
        }else{
            this.setState({ items: duplicate })
            var found = data.find(function (element) {
                return element.id === item.id;
            });
            if (found) {
                let index = data.indexOf(found)
                data[index].quantity -= 1
                this.setState({ selectedItems: data })
            }
        }
     
    }
    componentDidMount(){
      
        this.getCategories()
    }
    validateColor =(item)=>{
        console.log(item)
      if(item.selected){
          return "green"
      }

      return primaryColor
    }
    validateBackground = (item)=>{
      if(this.state.selectedCategory == item){
          return primaryColor
      }
      return "#fafafa"
    }
    selectCategory =(item)=>{
       this.setState({selectedCategory:item},()=>{
           this.getItems()
       })

    }
    handleNavigation =async()=>{
        if(this.state.addItem){
            let api = `${url}/api/drools/addCart/`
            let sendData = {
                items: this.state.selectedItems,
                cart: this.state.item.id,
                edit_cart: true
            }
            let post = await HttpsClient.post(api,sendData)
            if(post.type =="success"){
                this.props.navigation.goBack()
            }
           
        }else{
            this.props.route.params.backFunction(this.state.selectedItems)
            this.props.navigation.goBack()
        }
      
    }
    validateButton =(item,index)=>{
      
        if(!item.selected){
            return (
                <TouchableOpacity style={{ backgroundColor:"#3f3f3f",alignItems: "center", justifyContent: "center", height: height * 0.05, width:"80%" }}
                    onPress={() => { this.selectDish(item, index) }}
                >
                    <Text style={[styles.text, { color: "#fff" }]}>Add</Text>
                </TouchableOpacity>
            )
        }

        return(
            <View style={{height:height*0.05,width:width*0.3,flexDirection:"row",alignItems:"center",justifyContent:"space-around",backgroundColor:"#3f3f3f"}}>
                <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }}
                    onPress={() => {
                        this.decreaseQuantity(item, index)
                    }}
                >
                    <Entypo name="circle-with-minus" size={24} color="#fff" />
                </TouchableOpacity>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text, { color: "#ffff" }]}>{item.quantity}</Text>
                </View>
                <TouchableOpacity style={{alignItems:"center",justifyContent:"center"}}
                 onPress={()=>{
                     this.addQuantity(item,index)
                 }}
                >
                    <Entypo name="circle-with-plus" size={24} color="#fff" />
                </TouchableOpacity>
              
             
            </View>
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
                        <TouchableOpacity style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}
                            onPress={() => {
                                this.props.route.params.backFunction(this.state.selectedItems)
                                this.props.navigation.goBack()
                                }}
                        >
                            <Ionicons name="caret-back" size={24} color={secondaryColor} />
                        </TouchableOpacity>
                        <View style={{ flex: 0.9, alignItems: "center", justifyContent: "center" }}>
                         <TextInput 
                           style={{height:38,width:"90%",backgroundColor:"#fff",borderRadius:5,paddingLeft:5}}
                           selectionColor ={primaryColor}
                           placeholder={"search Dishes"}
                                onChangeText={(text) => { this.searchDishes(text)}}
                         />

                        </View>
                     
                    </View>

                
                </LinearGradient>
                <View
                 style={{height:height*0.08}}
                >
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{paddingRight:20}}
                        style={{ height: height * 0.07 }}
                        horizontal={true}
                        data={this.state.categories}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={{
                                    height: height * 0.05,
                                    width: width * 0.4,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 10,
                                    backgroundColor: this.validateBackground(item),
                                    marginLeft: 10,
                                    marginTop: 10
                                }}
                                    onPress={() => { this.selectCategory(item) }}
                                >
                                    <Text style={[styles.text]}>{item.title}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
           
                  <FlatList 
                    contentContainerStyle={{paddingBottom:100}}
                    data ={this.state.items}
                    keyExtractor={(item,index)=>index.toString()}
                    renderItem ={({item,index})=>{
                       return(
                           <View style={{minHeight:height*0.07,backgroundColor:"#eee",width:width,flexDirection:"row",borderColor:"#333",borderBottomWidth:0.5}}>
                                <View style={{flex:0.1,alignItems:"center",justifyContent:"center"}}>
                                   <Text style={[styles.text, { fontSize: 18 }]}>{index+1} .</Text>
                                </View>
                               <View style={{alignItems:"center",marginTop:5,flex:0.5,alignItems:"center",justifyContent:"center"}}>
                                   <View>
                                       <Text style={[styles.text, { fontSize: 18 }]}>{item.title}</Text>
                                   </View>
                                    <View>
                                       <Text style={[styles.text, { fontSize: 18 ,color:"#000"}]}> ₹ {item.item_price}</Text>
                                    </View>
                               </View>
                               <View style={{marginTop:10,alignItems:"center",flex:0.4,alignItems:"center",justifyContent:"center"}}>
                                   {
                                       this.validateButton(item,index)
                                   }
                               </View>
                           </View>
                       )
                    }}
                  />
                  <View style={{position:"absolute",width,bottom:30,alignItems:"center",justifyContent:"space-around",flexDirection:"row"}}>
                       <View style={{height:height*0.05,width:width*0.3,backgroundColor:primaryColor,alignItems:"center",justifyContent:"center"}}>
                           <Text style={[styles.text,{color:"#fff",}]}>Selected ({this.state.selectedItems.length})</Text>
                       </View>
                       <TouchableOpacity 
                        style={{ height: height * 0.05, width: width * 0.3, backgroundColor: primaryColor, alignItems: "center", justifyContent: "center" }}
                        onPress={() => {
                            this.props.route.params.backFunction(this.state.selectedItems)
                            this.props.navigation.goBack()
                        }}
                       >
                        <Text style={[styles.text, { color: "#fff", }]}>Proceed</Text>
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
export default connect(mapStateToProps, { selectTheme })(SeacrchDishes);
