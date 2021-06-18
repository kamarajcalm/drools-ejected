import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, TextInput} from 'react-native';
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
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import orders from '../data/orders';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import momemt from 'moment';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import HttpsClient from '../HttpsClient';
class ExpenseScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
           employeeExpense:"",
           edit:false,
           electricityExpense:"",
           otherExpense:"",
           Total:""
        };
    }
    getExpenses = async()=>{
        let api = `${url}/api/drools/droolsExpenses/`
        let data = await HttpsClient.get(api)
        if(data.type =="success"){
            this.setState({
                employeeExpense: data.data[0].employee_expense.toString(),
                electricityExpense: data.data[0].electricity_expense.toString(),
                otherExpense: data.data[0].other_expense.toString(),
                Total: data.data[0].total_expense
            })
        }
    }
    componentDidMount(){
        this.getExpenses()
    }
    save = async()=>{
       let api =`${url}/api/drools/postExpenses/`
       let sendData ={
           employee_expense: Number(this.state.employeeExpense),
           other_expense: Number(this.state.otherExpense),
           electricity_expense: Number(this.state.electricityExpense)
       }
       let post =await HttpsClient.post(api,sendData)
        if(post.type=="success"){
            this.getExpenses()
            return this.showSimpleMessage("Saved SuccessFully", "#00A300", "success")
           
        }else{
            return this.showSimpleMessage("Try again", "#dd7030",)
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
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Expense</Text>

                        </View>
                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                        </View>
                    </View>
                </LinearGradient>

                        <View style={{ flex: 1 }}>
                             <View style={{marginTop:10,marginLeft:20}}>
                                 <Text style={[styles.text,{fontSize:22,color:"#fff"}]}>Employee expense : </Text>
                                 <TextInput
                                   ref = {ref=>this.textRef=ref}
                                   value={this.state.employeeExpense}
                                   editable={this.state.edit}
                                   keyboardType={"numeric"} 
                                   style={{height:height*0.05,width:width*0.8,backgroundColor:"#fff",marginTop:10,paddingLeft:10}}
                                   selectionColor={primaryColor}
                                   onChangeText={(employeeExpense) => { this.setState({ employeeExpense})}}
                                 />
                             </View>
                        <View style={{ marginTop: 10, marginLeft: 20 }}>
                            <Text style={[styles.text, { fontSize: 22, color: "#fff" }]}>Electricity expense : </Text>
                            <TextInput
                                value={this.state.electricityExpense}
                                editable={this.state.edit}
                                keyboardType={"numeric"}
                                style={{ height: height * 0.05, width: width * 0.8, backgroundColor: "#fff", marginTop: 10, paddingLeft: 10 }}
                                selectionColor={primaryColor}
                                onChangeText={(electricityExpense) => { this.setState({ electricityExpense }) }}
                            />
                        </View>
                        <View style={{ marginTop: 10, marginLeft: 20 }}>
                            <Text style={[styles.text, { fontSize: 22, color: "#fff" }]}>other expense : </Text>
                            <TextInput
                                value={this.state.otherExpense}
                                editable={this.state.edit}
                                keyboardType={"numeric"}
                                style={{ height: height * 0.05, width: width * 0.8, backgroundColor: "#fff", marginTop: 10, paddingLeft: 10 }}
                                selectionColor={primaryColor}
                                 onChangeText={(otherExpense) => { this.setState({ otherExpense }) }}
                            />
                        </View>
                        <View style={{marginTop:20}}>
                             <View style={{flexDirection:"row",alignSelf:"flex-end",paddingRight:20}}>
                                 <Text style={{color:"#fff",fontSize:22}}>Total : </Text>
                            <Text style={[styles.text, { color: primaryColor, fontSize: 22 }]}> ₹ {this.state.Total}</Text>
                             </View>
                        </View>
                             <View style={{position:"absolute",width,bottom:30,flexDirection:"row",paddingVertical:20,flexDirection:"row"}}>
                                  <View style={{flex:0.5,alignItems:"center",justifyContent:"center"}}>
                                      <TouchableOpacity 
                                        onPress={()=>{this.setState({edit:true},()=>{
                                            this.textRef.focus()
                                        })}}
                                        style={{backgroundColor:primaryColor,height:height*0.05,width:width*0.4,alignItems:"center",justifyContent:"center"}}
                                      >
                                           <Text style={[styles.text,{color:'#fff',}]}>Edit</Text>
                                      </TouchableOpacity>
                                  </View>
                                  <View style={{flex:0.5,alignItems:"center",justifyContent:"center"}}>
                            <TouchableOpacity
                                onPress={() => { this.save() }}
                                style={{ backgroundColor: "green", height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center" }}
                            >
                                <Text style={[styles.text, { color: '#fff', }]}>save</Text>
                            </TouchableOpacity>
                                  </View>
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
export default connect(mapStateToProps, { selectTheme })(ExpenseScreen);
