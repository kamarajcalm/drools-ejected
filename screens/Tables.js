import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image ,ScrollView,TextInput} from 'react-native';
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
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import orders from '../data/orders';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import momemt from 'moment';
import Modal from "react-native-modal";
import { FontAwesome, AntDesign ,MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
class Tables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables:[]
        };
    }
    header =() =>{
        return(
            <View style={{flexDirection:"row",flex:1,marginTop:10}}>
                <View style={{flex:0.5,alignItems:"center",justifyContent:"center"}}>
                    <Text style={[styles.text,{color:primaryColor,textDecorationLine:"underline"}]}>Table No</Text>
                </View>
                <View style={{flex:0.5,alignItems:"center",justifyContent:"center"}}>
                    <Text style={[styles.text, { color: primaryColor, textDecorationLine: "underline" }]}>Action</Text>
                </View>
            </View>
        )
    }
    addTable =()=>{

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


                    <View style={{ height: height * 0.3, backgroundColor: "#fff", width: width * 0.9, borderRadius: 10 }}>
                        <ScrollView>


                            <View style={{ padding: 20 }}>
                                <Text style={[styles.text]}>Enter Table NO</Text>
                                <TextInput
                                    keyboardType={"numeric"}
                                    value={this.state.No}
                                    style={{ height: height * 0.05, width: width * 0.8, backgroundColor: "#eee", borderRadius: 5, marginTop: 5 }}
                                    selectionColor={primaryColor}
                                    onChangeText={(No) => { this.setState({ NO }) }}
                                />
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center", backgroundColor: primaryColor }}
                                    onPress={() => { this.addTable()}}
                                >
                                    <Text style={[styles.text, { color: "#fff" }]}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>

                </View>

            </Modal>
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
                      ListHeaderComponent ={this.header()}
                      keyExtractor ={(item,index)=>index.toString()}
                      data={this.state.tables}
                      renderItem ={({item,index})=>{
                            return(
                                <View>

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