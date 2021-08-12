import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, ScrollView, ActivityIndicator } from 'react-native';
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
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
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
    searchDishes = async (text) => {
        this.setState({ selectedCategory: null })
        let api = `${url}/api/drools/items/?search=${text}&invalid=false`
        let data = await HttpsClient.get(api)

        if (data.type == "success") {
            data.data.forEach((i) => {
                i.selected = false,
                i.quantity = 1
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
        let api = `${url}/api/drools/items/?category=${this.state.selectedCategory.id}&invalid=false`
        let data = await HttpsClient.get(api)
        console.log(data)
        if (data.type == "success") {
            data.data.forEach((i) => {
                i.selected = false
                i.quantity = 1
            })
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
            duplicate[idx].quantity = found.quantity
            duplicate[idx].comments = found.comments
            this.showSimpleMessage("Item already added", "orange", "success")
        } else {
            let pushObj = {
                quantity:1,
                id: item.id,
                comments: "",
                title: item.title,
               
            }
            data.push(pushObj)
            this.setState({ selectedItems: data })

        }


    }
    addQuantity = (item, idx) => {

        let data = this.state.selectedItems
        let duplicate = this.state.items

        duplicate[idx].quantity += 1
        this.setState({ items: duplicate })
        var found = data.find(function (element) {
            return element.id === item.id;
        });
        if (found) {
            let index = data.indexOf(found)
            data[index].quantity += 1
            this.setState({ selectedItems: data }, () => {
                console.log(this.state.selectedItems)
            })
        }
    }
    decreaseQuantity = (item, idx) => {
        let data = this.state.selectedItems
        let duplicate = this.state.items
        duplicate[idx].quantity -= 1

        if (duplicate[idx].quantity == 0) {
            duplicate[idx].quantity=1
            duplicate[idx].selected = false
            this.setState({ items: duplicate })
            var found = data.find(function (element) {
                return element.id === item.id;
            });
            if (found) {
                let index = data.indexOf(found)
                data.splice(index, 1)
                this.setState({ selectedItems: data })
            }
        } else {
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
            this.setState({creating:true})
            let api = `${url}/api/drools/addCart/`
            let sendData = {
                items: this.state.selectedItems,
                cart: this.state.item.id,
                edit_cart: true
            }
      
            let post = await HttpsClient.post(api, sendData)
            if (post.type == "success") {
                this.setState({ creating: false })
                this.showSimpleMessage("Item Added successFully","green","success")
               return this.props.navigation.goBack()
            }else{
                this.setState({ creating: false })
                this.showSimpleMessage("Try Again", "red", "danger")
            }

     

    }
    changeComment = (text, item, index) => {
        let duplicate = this.state.selectedItems
        duplicate[index].comments = text
        this.setState({ selectedItems: duplicate })
    }
    // addQuantity = (item, index) => {
    //     let duplicate = this.state.selectedItems
    //     duplicate[index].quantity = duplicate[index].quantity + 1
    //     this.setState({ selectedItems: duplicate })
    // }
    // decreaseQuantity = (item, index) => {
    //     let duplicate = this.state.selectedItems
    //     duplicate[index].quantity = duplicate[index].quantity - 1
    //     this.setState({ selectedItems: duplicate })
    // }
    // deleteItem = (index) => {
    //     let duplicate = this.state.selectedItems
    //     duplicate.splice(index, 1)
    //     this.setState({ selectedItems: duplicate })
    // }
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
                                    <View style={{ minHeight: height * 0.2, alignSelf: "center", width: width * 0.9, backgroundColor: "#eeee", marginTop: 10 }}
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
    validateButton = (item, index) => {

        if (!item.selected) {
            return (
                <TouchableOpacity style={{ backgroundColor: "#3f3f3f", alignItems: "center", justifyContent: "center", height: height * 0.05, width: "80%" }}
                    onPress={() => { this.selectDish(item, index) }}
                >
                    <Text style={[styles.text, { color: "#fff" }]}>Add</Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{ height: height * 0.05, width: width * 0.3, flexDirection: "row", alignItems: "center", justifyContent: "space-around", backgroundColor: "#3f3f3f" }}>
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
                <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }}
                    onPress={() => {
                        this.addQuantity(item, index)
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
                <View
                    style={{ height: height * 0.08 }}
                >
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingRight: 20 }}
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
                    contentContainerStyle={{ paddingBottom: 100 }}
                    data={this.state.items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ borderColor: "#333", borderBottomWidth: 0.5 }}>
                            <View style={{ minHeight: height * 0.08, backgroundColor: "#eee", width: width, flexDirection: "row",}}>
                                <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                                    <Text style={[styles.text, { fontSize: 18 }]}>{index + 1} .</Text>
                                </View>
                                <View style={{ alignItems: "center", marginTop: 5, flex: 0.5, alignItems: "center", justifyContent: "center" }}>
                                    <Text style={[styles.text, { fontSize: 18 }]}>{item.title}</Text>
                                </View>
                                <View style={{ marginTop: 10, alignItems: "center", flex: 0.4, alignItems: "center", justifyContent: "center" }}>
                                    {
                                        this.validateButton(item, index)
                                    }
                                </View>
                           
                            </View>
                        { item.selected&&<View style={{}}>
                                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                                        <Text style={[styles.text]}>Comments :</Text>
                                    </View>
                                    <View style={{ alignItems: "center" ,marginVertical:10}}>
                                        <TextInput
                                            value={item.comments}
                                            style={{ height: height * 0.1, width: "90%", backgroundColor: "#fff", paddingLeft: 5, textAlignVertical: "top" }}
                                            selectionColor={primaryColor}
                                            onChangeText={(text) => { this.changeComment(text, item, index) }}
                                        />
                                    </View>

                                </View>}
                            </View>
                        )
                    }}
                />
                    
                  
    
        
                <View style={{ position: "absolute", width, bottom: 30, alignItems: "center", justifyContent: "space-around", flexDirection: "row" }}>
                    <View style={{ height: height * 0.05, width: width * 0.3, backgroundColor: primaryColor, alignItems: "center", justifyContent: "center" }}
                    
                    >
                        <Text style={[styles.text, { color: "#fff", }]}>Selected ({this.state.selectedItems.length})</Text>
                    </View>
                 {this.state.selectedItems.length>0&&<View>
                     {!this.state.creating?   <TouchableOpacity
                            style={{ height: height * 0.05, width: width * 0.3, backgroundColor: primaryColor, alignItems: "center", justifyContent: "center" }}
                            onPress={() => {
                                this.addItems()
                            }}
                        >
                            <Text style={[styles.text, { color: "#fff", }]}>Proceed</Text>
                        </TouchableOpacity>:
                            <View style={{ height: height * 0.05, width: width * 0.3, backgroundColor: primaryColor, alignItems: "center", justifyContent: "center" }}>
                              <ActivityIndicator  size={"large"} color={"#fff"}/>
                        </View>
                        }

                 </View>}
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
export default connect(mapStateToProps, { selectTheme })(SearchDishes2);
