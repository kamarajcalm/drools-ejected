import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, ScrollView } from 'react-native';
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
const screenHeight = Dimensions.get("screen").height
import { StatusBar, } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import orders from '../data/orders'
import { FontAwesome, AntDesign, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import HttpsClient from '../HttpsClient';
import Modal from "react-native-modal";
class SearchDishes2 extends Component {
    constructor(props) {
        let item = props.route.params.item
        super(props);
        this.state = {
            item,
            searchText: "",
            categories: [],
            items: [],
            selectedItems: [],
            selectedCategory: null,
            modal:false
        };
    }
    searchDishes = async (text) => {
        this.setState({ selectedCategory: null })
        let api = `${url}/api/drools/items/?search=${text}`
        let data = await HttpsClient.get(api)

        if (data.type == "success") {
            data.data.forEach((i) => {
                i.selected = false
            })
            this.setState({ items: data.data })
        }
    }
    getCategories = async () => {
        let api = `${url}/api/drools/category/`
        const data = await HttpsClient.get(api)
        if (data.type == "success") {
            this.setState({ categories: data.data })
        }
    }
    getItems = async () => {
        let api = `${url}/api/drools/items/?category=${this.state.selectedCategory.id}`
        let data = await HttpsClient.get(api)
        console.log(data)
        if (data.type == "success") {
            this.setState({ items: data.data })
        }
    }
    selectDish = (item, idx) => {

        let data = this.state.selectedItems
        let duplicate = this.state.items
        duplicate[idx].selected = !duplicate[idx].selected
        this.setState({ items: duplicate })
        var found = data.find(function (element) {
            return element.id === item.id;
        });
        if (found) {
            let index = data.indexOf(found)
            data.splice(index, 1)
            this.setState({ selectedItems: data })
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
    componentDidMount() {
       
        this.getCategories()
    }
    validateColor = (item) => {
        console.log(item)
        if (item.selected) {
            return "green"
        }

        return primaryColor
    }
    validateBackground = (item) => {
        if (this.state.selectedCategory == item) {
            return primaryColor
        }
        return "#fafafa"
    }
    selectCategory = (item) => {
        this.setState({ selectedCategory: item }, () => {
            this.getItems()
        })

    }
    addItems = async () => {
    
            let api = `${url}/api/drools/addCart/`
            let sendData = {
                items: this.state.selectedItems,
                cart: this.state.item.id,
                edit_cart: true
            }
      
            let post = await HttpsClient.post(api, sendData)
            if (post.type == "success") {
                this.setState({modal:false})
                this.props.navigation.goBack()
            }

     

    }
    changeComment = (text, item, index) => {
        let duplicate = this.state.selectedItems
        duplicate[index].comments = text
        this.setState({ selectedItems: duplicate })
    }
    addQuantity = (item, index) => {
        let duplicate = this.state.selectedItems
        duplicate[index].quantity = duplicate[index].quantity + 1
        this.setState({ selectedItems: duplicate })
    }
    decreaseQuantity = (item, index) => {
        let duplicate = this.state.selectedItems
        duplicate[index].quantity = duplicate[index].quantity - 1
        this.setState({ selectedItems: duplicate })
    }
    deleteItem = (index) => {
        let duplicate = this.state.selectedItems
        duplicate.splice(index, 1)
        this.setState({ selectedItems: duplicate })
    }
    modal =()=>{
        return(
            <Modal
             isVisible ={this.state.modal}
             deviceHeight ={screenHeight}
             onBackdropPress ={()=>{this.setState({modal:false})}}
            >
                <View style={{ justifyContent: "center" }}>

                    <ScrollView style={{ height: height * 0.7, backgroundColor: "#eee", borderRadius: 10, }}
                        showsVerticalScrollIndicator={false}
                    >
                       
                        {
                            this.state.selectedItems.map((item, index) => {
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
                                        <View style={{}}>
                                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                                <Text style={[styles.text]}>Comments :</Text>
                                            </View>
                                            <View style={{ alignItems: "center" }}>
                                                <TextInput
                                                    value={item.comments}
                                                    style={{ height: height * 0.1, width: "90%", backgroundColor: "#fff", paddingLeft: 5, textAlignVertical: "top" }}
                                                    selectionColor={primaryColor}
                                                    onChangeText={(text) => { this.changeComment(text, item, index) }}
                                                />
                                            </View>

                                        </View>
                                        <View style={{ position: "absolute", right: 5, top: 5 }}>
                                            <TouchableOpacity
                                                onPress={() => { this.deleteItem(index) }}

                                            >
                                                <Entypo name="circle-with-cross" size={24} color="red" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })
                        }
                            <View style={{alignItems:"center",marginVertical:20}}
                            
                            >
                                  <TouchableOpacity style={{height:height*0.05,width:width*0.4,alignItems:"center",justifyContent:"center",backgroundColor:primaryColor}}
                                   onPress ={()=>{this.addItems()}}
                                  >
                                      <Text style={[styles.text,{color:"#fff"}]}>Add items</Text>
                                  </TouchableOpacity>
                            </View>   
                    </ScrollView>



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
                        <TouchableOpacity style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}
                        >
                            <Ionicons name="caret-back" size={24} color={secondaryColor} />
                        </TouchableOpacity>
                        <View style={{ flex: 0.9, alignItems: "center", justifyContent: "center" }}>
                            <TextInput
                                style={{ height: 38, width: "90%", backgroundColor: "#fff", borderRadius: 5, paddingLeft: 5 }}
                                selectionColor={primaryColor}
                                placeholder={"search Dishes"}
                                onChangeText={(text) => { this.searchDishes(text) }}
                            />

                        </View>

                    </View>


                </LinearGradient>
                <FlatList
                    contentContainerStyle={{height:height*0.07,width}}
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
              
                      
                        <FlatList
                            style={{ marginTop: 0 }}
                            contentContainerStyle={{}}
                            data={this.state.items}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ height: height * 0.15, backgroundColor: "#eee", marginTop: 10, width: width * 0.9, alignSelf: "center", justifyContent: "center" }}>
                                        <View style={{ alignItems: "center", marginTop: 5 }}>
                                            <Text style={[styles.text, { fontSize: 22 }]}>{item.title}</Text>
                                        </View>
                                        <View style={{ marginTop: 10, alignItems: "center" }}>
                                            <TouchableOpacity style={{ backgroundColor: this.validateColor(item), alignItems: "center", justifyContent: "center", height: height * 0.05, width: width * 0.3 }}
                                                onPress={() => { this.selectDish(item, index) }}
                                            >
                                                <Text style={[styles.text, { color: "#fff" }]}>{item.selected ? "Remove" : "Add"}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    
                  
    
        
                <View style={{ position: "absolute", width, bottom: 30, alignItems: "center", justifyContent: "space-around", flexDirection: "row" }}>
                    <TouchableOpacity style={{ height: height * 0.05, width: width * 0.3, backgroundColor: primaryColor, alignItems: "center", justifyContent: "center" }}
                     onPress ={()=>{this.setState({modal:true})}}
                    >
                        <Text style={[styles.text, { color: "#fff", }]}>Selected ({this.state.selectedItems.length})</Text>
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
export default connect(mapStateToProps, { selectTheme })(SearchDishes2);
