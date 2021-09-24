import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, ScrollView, ActivityIndicator, Alert,Keyboard} from 'react-native';
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
import MonthPicker from 'react-native-month-year-picker';
const months = ["January","Febrauary","March","April","May","June","July","August","September","Octobor","November","December"]
const screenHeight =Dimensions.get("screen").height
import DropDownPicker from 'react-native-dropdown-picker';
const paymentMode = [
    {
        label: "Cash",
        value: "Cash"
    },

    {
        label: "Phonepe",
        value: "Phonepe"
    },
    {
        label: "Online",
        value: "Online"
    },
    {
        label: "Personal1",
        value: "Personal1"
    },
    {
        label: "Personal2",
        value: "Personal2"
    },
]
class DailyExpenses extends Component {
    constructor(props) {
         const d = new Date()
        const month = d.getMonth() + 1
        const year = d.getFullYear()
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
            show2:false,
            year,
            month,
            data:null,
            keyBoardHeight:0,
            refreshing:false,
            paymentmode:null,
        };
    }
     setOpen3 = (open3) => {
        this.setState({
            open3
        });
    }

    setValue3 = (callback) => {

        this.setState(state => ({
            paymentmode: callback(state.value)
        }));
    }

    setItems3 = (callback) => {

        this.setState(state => ({
            items: callback(state.items)
        }));
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
        let api = `${url}/api/drools/otherExpenses/?date=${this.state.date2}`
        let data = await HttpsClient.get(api)
        console.log(api)
        console.log(data.data)
        if (data.type == "success") {
            this.setState({ otherExpenses: data.data.expenses,data:data.data})
        }
    }
   
    componentDidMount() {
                        Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        this.getExtraExpenses()
    }
         _keyboardDidShow = (e) => {
            console.log()
        this.setState({keyBoardHeight:e.endCoordinates.height})
    };

    _keyboardDidHide = () => {
        this.setState({ keyBoardHeight: 0 })
    };
       componentWillUnmount(){
   
             Keyboard.removeListener('keyboardDidShow', this._keyboardDidShow);
        Keyboard.removeListener('keyboardDidHide', this._keyboardDidHide);
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
        if(this.state.paymentmode==null){
            return this.showSimpleMessage("please select payment mode","orange","info")
        }
        this.setState({ creating: true })
        let api = `${url}/api/drools/createExpense/`
        let sendData ={
            date:this.state.date,
            expense:Number(this.state.expenseAmount),
            comments:this.state.expenseTitle,
            payment_mode:this.state.paymentmode
        }
        let post = await HttpsClient.post(api,sendData)
        console.log(post)
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
          if(this.state.paymentmode==null){
            return this.showSimpleMessage("Please Enter payment Mode","orange","info")
        }
        this.setState({ creating: true })
        let api = `${url}/api/drools/createExpense/`
        let sendData = {
            date: this.state.date,
            expense: Number(this.state.expenseAmount),
            comments: this.state.expenseTitle,
            edit:this.state.selectedItem.id,
            payment_mode:this.state.paymentmode
        }
        let post = await HttpsClient.post(api, sendData)
        console.log(post)
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
          style={{marginBottom:this.state.keyBoardHeight}}
          isVisible={this.state.modal}
          deviceHeight={screenHeight}
          statusBarTranslucent={true}
          onBackdropPress={()=>{this.setState({modal:false})}}
        >
          <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                    <View style={{ height: height * 0.6, width: width * 0.8, borderRadius: 10, backgroundColor: "#fff", marginTop: 20}}>

          
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
                   <View style={{marginLeft:10}}>
                            <Text style={[styles.text, { color: "#000", fontSize: 22 }]}>Paid By :</Text>
                        </View>
                        <View style={{ marginTop: 10, width: width * 0.7, height: this.state.open3 ? height * 0.3 : height * 0.08,marginLeft:20 }}>
                            <DropDownPicker
                                style={{ height: height * 0.05 }}
                                containerStyle={{ height: height * 0.05 }}
                                open={this.state.open3}
                                value={this.state.paymentmode}
                                items={paymentMode}
                                setOpen={this.setOpen3}
                                setValue={this.setValue3}
                                setItems={this.setItems3}
                                placeholder="select a mode"
                            />
                        </View>
                        <View style={{ marginTop: 10, marginLeft: 20 }}>
                                <Text style={[styles.text, { color: "#000", fontSize: 20 }]}>Expense Amount :</Text>
                                <TextInput
                                    keyboardType={"numeric"}
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
                                <View style={{ marginVertical: 15, alignItems: "center", justifyContent: "center" }}>
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
        console.log(item)
        let api = `${url}/api/drools/deleteOrder/`
        let sendData ={
            expense:item.id
        }
        let del = await HttpsClient.post(api,sendData)
        console.log(del)
        if(del.type =="success"){
            this.showSimpleMessage("deleted successfuly","green","success")
             this.getExtraExpenses()
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
                    <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Mode</Text>
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
    footer =() =>{
        return (
            <View style={{marginVertical:20}}>
                <View style={{alignSelf:"flex-end",marginHorizontal:20}}>
                      <Text style={[styles.text,{color:"#fff",fontSize:20}]}>Total : ₹ {this.state.data?.total_expense?.sum}</Text>
                </View>
            </View>
        )
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


                        <TouchableOpacity style={{ flex: 0.15, alignItems: "center", justifyContent: "center" }}
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Ionicons name="caret-back" size={24} color={secondaryColor} />
                        </TouchableOpacity>
                        <View style={{ flex: 0.5,alignItems:"flex-end" }}>
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 ,}]}>Daily Expenses</Text>

                        </View>
                        <TouchableOpacity style={{ flex: 0.35, alignItems: "center", justifyContent: "center" ,flexDirection:"row"}}
                         onPress={()=>{this.setState({show2:true})}}
                        >
                            <Text style={[styles.text,{color:"#fff"}]}>{this.state.date2}</Text>
                            <MaterialIcons name="date-range" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                 <FlatList 
                    contentContainerStyle={{paddingBottom:90}}
                    refreshing={this.state.refreshing}
                    onRefresh={()=>{this.getExtraExpenses()}}
                    ListFooterComponent={this.footer()} 
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
                                        <Text style={[styles.text, { color: "#fff", }]}>{item.payment_mode}</Text>
                                    </View>
                                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "space-around" ,flexDirection:"row"}}>
                                        <TouchableOpacity 
                                            onPress={() => { this.setState({ expenseAmount: item.expense.toString(), expenseTitle: item.comments, date: item.date, modal: true, edit: true, selectedItem:item,paymentmode:item.payment_mode})}}
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
export default connect(mapStateToProps, { selectTheme })(DailyExpenses);