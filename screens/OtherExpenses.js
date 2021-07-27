import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
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
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import orders from '../data/orders';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import momemt from 'moment';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import Modal from 'react-native-modal';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5, AntDesign} from '@expo/vector-icons';
import HttpsClient from '../HttpsClient';
const screenHeight =Dimensions.get("screen").height
class OtherExpenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otherExpenses: [],
            modal:false,
            expenseTitle:"",
            expenseAmount:"",
            date: momemt(new Date()).format("YYYY-MM-DD"),
            date2: momemt(new Date()).format("YYYY-MM-DD"),
            show:false,
            creating:false,
            show2:false
        };
    }
    hideDatePicker = () => {
        this.setState({ show: false },()=>{
            setTimeout(()=>{
                this.setState({modal:true})
            },500)
        })
    };
    handleConfirm = (date) => {
        this.setState({ date: momemt(date).format("YYYY-MM-DD"), }, () => {
            
        })
        this.hideDatePicker();
    };
    hideDatePicker2 = () => {
        this.setState({ show2: false }, () => {
       
        })
    };
    handleConfirm2 = (date) => {
        this.setState({ date2: momemt(date).format("YYYY-MM-DD"), }, () => {
            this.getExtraExpenses();
        })
        this.hideDatePicker2();
    };
    getExtraExpenses = async () => {
        let api = `${url}/api/drools/otherexpenses/?date=${this.state.date2}`
        let data = await HttpsClient.get(api)
        if (data.type == "success") {
            this.setState({ otherExpenses: data.data })
        }
    }
    componentDidMount() {
      
        this.getExtraExpenses()
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
    create = async()=>{
        this.setState({ creating: true })
        let api = `${url}/api/drools/otherexpenses/`
        let sendData ={
            date:this.state.date,
            expense:this.state.expenseAmount,
            comments:this.state.expenseTitle
        }
        let post = await HttpsClient.post(api,sendData)
        if(post.type =="success"){
            this.setState({creating:false,modal:false})
            this.showSimpleMessage("Added Successfully","green","success")
            this.getExtraExpenses()
        }else{
            this.setState({ creating: false })
            this.showSimpleMessage("Try Again", "red", "danger")
        }
    }
    edit = async()=>{
        this.setState({ creating: true })
        let api = `${url}/api/drools/otherexpenses/${this.state.selectedItem.id}/`
        let sendData = {
            date: this.state.date,
            expense: this.state.expenseAmount,
            comments: this.state.expenseTitle
        }
        let post = await HttpsClient.patch(api, sendData)
        if (post.type == "success") {
            this.setState({ creating: false, modal: false })
            this.showSimpleMessage("Edited Successfully", "green", "success")
            this.getExtraExpenses()
        } else {
            this.setState({ creating: false })
            this.showSimpleMessage("Try Again", "red", "danger")
        }
    }
    modal =()=>{
        return(
        <Modal 
          isVisible={this.state.modal}
          deviceHeight={screenHeight}
          statusBarTranslucent={true}
          onBackdropPress={()=>{this.setState({modal:false})}}
        >
          <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                    <View style={{ height: height * 0.5, width: width * 0.8, borderRadius: 10, backgroundColor: "#fff", marginTop: 20}}>

          
               <ScrollView 
                  contentContainerStyle={{}}
               >
                   <View style={{marginTop:10,marginLeft:20}}>
                       <Text style={[styles.text,{color:"#000",fontSize:20}]}>Expense Title :</Text>
                       <TextInput 
                          value={this.state.expenseTitle}
                          selectionColor={themeColor}
                          style={{height:35,width:width*0.7,backgroundColor:"#fafafa",marginTop:10}}
                                onChangeText={(expenseTitle) => { this.setState({ expenseTitle})}}
                       />
                   </View>
                        <View style={{ marginTop: 10, marginLeft: 20 }}>
                                <Text style={[styles.text, { color: "#000", fontSize: 20 }]}>Expense Amount :</Text>
                                <TextInput
                                    value={this.state.expenseAmount}
                                    selectionColor={themeColor}
                                    style={{ height: 35, width: width * 0.7, backgroundColor: "#fafafa",marginTop:10 }}
                                onChangeText={(expenseAmount) => { this.setState({ expenseAmount}) }}
                                />
                            </View>
                        <View style={{ marginTop: 10, marginLeft: 20 }}>
                            <Text style={[styles.text, { color: "#000", fontSize: 20 }]}>Date :</Text>
                            <TouchableOpacity 
                                onPress={()=>{this.setState({modal:false},()=>{
                                    setTimeout(()=>{
                                         this.setState({show:true})
                                    },500)
                                })}}
                                style={{ height: 35, width: width * 0.7, backgroundColor: "#fafafa", marginTop: 10 ,flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:15}}
                            >
                                 <View>
                                        <Text style={[styles.text]}>{this.state.date}</Text>
                                 </View>
                                 <View>
                                    <MaterialIcons name="date-range" size={24} color="black" />
                                 </View>
                            </TouchableOpacity>
                        </View>
                        {!this.state.edit?<View style={{marginTop:15,alignItems:"center",justifyContent:"center"}}>
                              <TouchableOpacity style={{height:height*0.05,width:width*0.4,backgroundColor:primaryColor,alignItems:"center",justifyContent:"center"}}
                                onPress={()=>{
                                    this.create()
                                }}
                              >
                                 { this.state.creating?<ActivityIndicator size={"large"} color={"#fff"}/>:<Text style={[styles.text,{color:"#fff"}]}>Create</Text>}
                              </TouchableOpacity>
                      
                        </View>:
                                <View style={{ marginTop: 15, alignItems: "center", justifyContent: "center" }}>
                                    <TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, backgroundColor: primaryColor, alignItems: "center", justifyContent: "center" }}
                                        onPress={() => {
                                            this.edit()
                                        }}
                                    >
                                        {this.state.creating ? <ActivityIndicator size={"large"} color={"#fff"} /> : <Text style={[styles.text, { color: "#fff" }]}>Edit</Text>}
                                    </TouchableOpacity>

                                </View>
                        }
               </ScrollView>
                    </View>
           
          </View>    
        </Modal>
        )
    }
    deleteItem = async(item,index)=>{
        let api = `${url}/api/drools/otherexpenses/${item.id}/`
        let del = await HttpsClient.delete(api)
        if(del.type =="success"){
            this.showSimpleMessage("deleted successfuly","green","success")
            let duplicate = this.state.otherExpenses
            duplicate.splice(index,1)
            this.setState({ otherExpenses:duplicate})
        }else{
            this.showSimpleMessage("Try Again", "red", "danger")
        }
    }
    renderHeader =()=>{
        return(
            <View style={{ flexDirection: "row",marginTop:10 }}>
                <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>#</Text>
                </View>
                <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Title</Text>
                </View>
                <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Amount</Text>
                </View>
                <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Date</Text>
                </View>
                <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Actions</Text>
                </View>
            </View>
        )
  
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


                        <TouchableOpacity style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Ionicons name="caret-back" size={24} color={secondaryColor} />
                        </TouchableOpacity>
                        <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Other Expenses</Text>

                        </View>
                        <TouchableOpacity style={{ flex: 0.3, alignItems: "center", justifyContent: "center" ,flexDirection:"row"}}
                         onPress={()=>{this.setState({show2:true})}}
                        >
                            <Text style={[styles.text,{color:"#fff"}]}>{this.state.date2}</Text>
                            <MaterialIcons name="date-range" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                 <FlatList  
                    ListHeaderComponent={this.renderHeader()} 
                    data={this.state.otherExpenses}
                    keyExtractor={(item,index)=>index.toString()}
                    renderItem={({item,index})=>{
                            return(
                                <View style={{ flexDirection: "row",marginTop:10}}>
                                    <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                                        <Text style={[styles.text, { color: "#fff", }]}>{index+1}</Text>
                                    </View>
                                    <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                                        <Text style={[styles.text, { color: "#fff",  }]}>{item.comments}</Text>
                                    </View>
                                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                                        <Text style={[styles.text, { color: "#fff", }]}>₹ {item.expense}</Text>
                                    </View>
                                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                                        <Text style={[styles.text, { color: "#fff", }]}>{item.date}</Text>
                                    </View>
                                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "space-around" ,flexDirection:"row"}}>
                                        <TouchableOpacity 
                                            onPress={() => { this.setState({ expenseAmount: item.expense.toString(), expenseTitle: item.comments, date: item.date, modal: true, edit: true, selectedItem:item})}}
                                        >
                                            <Entypo name="edit" size={24} color="orange" />
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                          onPress={()=>{this.createAlert(item,index)}}
                                        >
                                            <AntDesign name="delete" size={24} color="red" />
                                        </TouchableOpacity>
                                    </View>
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
                        <AntDesign name="pluscircle" size={40} color={primaryColor}/>
                    </TouchableOpacity>
                </View>
                <DateTimePickerModal
                    isVisible={this.state.show}
                    mode="date"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                />
                <DateTimePickerModal
                    testID={"2"}
                    isVisible={this.state.show2}
                    mode="date"
                    onConfirm={this.handleConfirm2}
                    onCancel={this.hideDatePicker2}
                />
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
export default connect(mapStateToProps, { selectTheme })(OtherExpenses);