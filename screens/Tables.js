import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image ,ScrollView,TextInput,Alert,Linking} from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily = settings.fontFamily
const themeColor = settings.themeColor
const screenHeight = Dimensions.get('screen').height
const url =settings.url
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import orders from '../data/orders';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import momemt from 'moment';
import Modal from "react-native-modal";
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import { FontAwesome, AntDesign ,MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import HttpsClient from '../HttpsClient';

class Tables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables:[],
            person:"",
            selectedTable:null,
            tableNo:""
        };
    }
    getTables = async()=>{
        let api = `${url}/api/drools/tables/`
        let data =await HttpsClient.get(api)
        console.log(api)
        if(data.type =="success"){
            this.setState({ tables:data.data})
        }
    }
    componentDidMount(){
        this.getTables()
    }
    header =() =>{
        return(
            <View style={{flexDirection:"row",flex:1,marginTop:10}}>
                <View style={{flex:0.2,alignItems:"center",justifyContent:"center"}}>
                    <Text style={[styles.text,{color:primaryColor,textDecorationLine:"underline"}]}>Table No</Text>
                </View>
                <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text, { color: primaryColor, textDecorationLine: "underline" }]}>person</Text>
                </View>
                <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text, { color: primaryColor, textDecorationLine: "underline" }]}>Qr code</Text>
                </View>
                <View style={{flex:0.3,alignItems:"center",justifyContent:"center"}}>
                    <Text style={[styles.text, { color: primaryColor, textDecorationLine: "underline" }]}>Action</Text>
                </View>
            </View>
        )
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
    addTable = async()=>{
     if(this.state.person ==""){
        return this.showSimpleMessage("Please add Total persons", "#dd7030",)
     }
        let api = `${url}/api/drools/tableCreate/`
        let sendData ={
            total_persons:this.state.person,
            title: this.state.tableNo
        }
        let post = await HttpsClient.post(api,sendData)
        if(post.type =="success"){
             this.setState({modal:false,person:""})
             this.getTables()
            return this.showSimpleMessage("Added SucessFully", "green","success")
        }else{
            return this.showSimpleMessage("Try again", "red", "danger")
        }
    }
    editTable = async()=>{
        if (this.state.person == "") {
            return this.showSimpleMessage("Please add Total persons", "#dd7030",)
        }
        let api = `${url}/api/drools/tables/${this.state.selectedTable.id}/`
        let sendData = {
            total_persons: this.state.person,
      

        }
        let post = await HttpsClient.patch(api, sendData)
        console.log(post)
        if (post.type == "success") {
            this.getTables()
            this.setState({ modal: false, person: "" })
            return this.showSimpleMessage("Edited SucessFully", "green", "success")
        } else {
            return this.showSimpleMessage("Try again", "red", "danger")
        }
    }
    modal =()=>{
        return(
            <Modal
                style={{ flex: 1 }}
                statusBarTranslucent={true}
                onBackdropPress={() => {
                    this.setState({
                      modal:false
                    })
                }}
                deviceHeight={screenHeight}
                isVisible={this.state.modal}
            >



                <View style={{}}>


                    <View style={{ height: height * 0.4,backgroundColor: "#fff", width: width * 0.9, borderRadius: 10 }}>
                        <ScrollView>

                            <View style={{ padding: 20 }}>
                                <Text style={[styles.text]}>Enter Table No</Text>
                                <TextInput
                                    keyboardType={"numeric"}
                                    value={this.state.tableNo}
                                    style={{ height: height * 0.05, width: width * 0.8, backgroundColor: "#eee", borderRadius: 5, marginTop: 5 }}
                                    selectionColor={primaryColor}
                                    onChangeText={(tableNo) => { this.setState({ tableNo })}}
                                />
                            </View>
                            <View style={{ padding: 20 }}>
                                <Text style={[styles.text]}>Enter Total Persons</Text>
                                <TextInput
                                    keyboardType={"numeric"}
                                    value={this.state.person}
                                    style={{ height: height * 0.05, width: width * 0.8, backgroundColor: "#eee", borderRadius: 5, marginTop: 5 }}
                                    selectionColor={primaryColor}
                                    onChangeText={(person) => { this.setState({ person }) }}
                                />
                            </View>
                            <View style={{ alignItems: "center" }}>
                              {!this.state.edit?  <TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center", backgroundColor: primaryColor }}
                                    onPress={() => { this.addTable()}}
                                >
                                    <Text style={[styles.text, { color: "#fff" }]}>Add</Text>
                                </TouchableOpacity>:
                                    <TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center", backgroundColor: primaryColor }}
                                        onPress={() => { this.editTable() }}
                                    >
                                        <Text style={[styles.text, { color: "#fff" }]}>Edit</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </ScrollView>
                    </View>

                </View>

            </Modal>
        )
    }
    deleteItem = async(item,index)=>{
        let api = `${url}/api/drools/tables/${item.id}/`
        let del = await HttpsClient.delete(api)

        if(del.type =="success"){
            this.showSimpleMessage("deleted SuccessFully","green","success")
            let duplicate =this.state.tables
            duplicate.splice(index,1)
            this.setState({ tables:duplicate})
        }else{
            this.showSimpleMessage("Try Again", "red", "danger")
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
            <View style={{ flex: 1, backgroundColor: themeColor }}>

                <LinearGradient
                    style={{ height: height * 0.12, alignItems: "center", justifyContent: "center" }}
                    colors={gradients}
                >
                    <View
                        style={{ marginTop: Constants.statusBarHeight, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                    >


                        <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Ionicons name="caret-back" size={24} color={secondaryColor} />
                        </TouchableOpacity>
                        <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Tables</Text>

                        </View>
                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                        </View>
                    </View>
                </LinearGradient>

                <View style={{ flex: 1 }}>

                    <FlatList 
                      contentContainerStyle ={{paddingBottom:100}}
                      ListHeaderComponent ={this.header()}
                      keyExtractor ={(item,index)=>index.toString()}
                      data={this.state.tables}
                      renderItem ={({item,index})=>{
                          console.log(item.qr_code)
                            return(
                                <View style={{ flexDirection: "row", flex: 1, marginTop: 10 }}>
                                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                                        <Text style={[styles.text, { color:"#fff",}]}>{item.title}</Text>
                                    </View>
                                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                                        <Text style={[styles.text, { color: "#fff",  }]}>{item.total_persons}</Text>
                                    </View>
                                    <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                                         <Image 
                                            source={{ uri: item.qr_code}}
                                            style={{height:50,width:50}}
                                            resizeMode={"cover"}
                                         />
                                    </View>
                                    <TouchableOpacity style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}
                                     onPress ={()=>{this.setState({modal:true,edit:true,selectedTable:item})}}
                                    >
                                        <Entypo name="edit" size={24} color={primaryColor} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}
                                        onPress={() => {this.createAlert(item,index) }}
                                    >
                                        <AntDesign name="delete" size={24} color={primaryColor} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}
                                        onPress={() => { Linking.openURL(item.qr_code) }}
                                    >
                                        <Feather name="download" size={24} color={primaryColor}/>
                                    </TouchableOpacity>
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
                            onPress={() => { this.setState({modal:true}) }}
                        >
                            <AntDesign name="pluscircle" size={40} color={primaryColor} />
                        </TouchableOpacity>
                    </View>
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
export default connect(mapStateToProps, { selectTheme })(Tables);