import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, ScrollView ,ActivityIndicator} from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily = settings.fontFamily
const themeColor = settings.themeColor
import { StatusBar, } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import orders from '../data/orders'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import HttpsClient from '../HttpsClient';
const screenHeight = Dimensions.get("screen").height
const url = settings.url
import * as ImagePicker from 'expo-image-picker';
class AddItems extends Component {
  constructor(props) {
      let item = props.route.params.item
      let itemm = props.route.params.itemm
    super(props);
    this.state = {
        item,
        itemm,
        openImageModal:false,
        image:null,
        itemPrice:"",
        title:"",
        discountPrice:"",
        ingredients:[

        ],
        searchResults:[],
        creating:false,
        description:"",
        edit:false,
        imgUrl:null
    };
  }
    modalAttach = async (event) => {
        if (event == 'gallery') return this._pickImage();
        if (event == 'camera') {
            this.handlePhoto()
        }
    }
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true
        });
        if (result.cancelled == true) {
            return
        }
        let filename = result.uri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        var type = match ? `image/${match[1]}` : `image`;
        const photo = {
            uri: result.uri,
            type: type,
            name: filename,
        };
        this.setState({ openImageModal: false })
        this.setState({ image: photo, imgUrl: photo.uri})
    };
    handlePhoto = async () => {
        let picture = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.1,
        });
        if (picture.cancelled == true) {
            return
        }

        let filename = picture.uri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        const photo = {
            uri: picture.uri,
            type: type,
            name: filename,
        };
        this.setState({ openImageModal: false })
        this.setState({ image: photo, imgUrl:photo.uri})
    }
    pushItem =()=>{
        let duplicate =this.state.ingredients
        let pushObj ={
            title:"",
            grams:"",
            ingridient:""
        }
        duplicate.push(pushObj)
        this.setState({ ingredients: duplicate})
    }
    componentDidMount(){
        if(this.props.route.params.edit){
            this.setState({
                edit:true,
                title: this.props.route.params.itemm.title,
                description: this.props.route.params.itemm.title.toString(),
                itemPrice: this.props.route.params.itemm.item_price.toString(),
                discountPrice: this.props.route.params.itemm.discount_price.toString(),
                imgUrl: this.props.route.params.itemm.displayPicture
            })
        }
    }
    renderModal =()=>{
        return (
            <Modal
                isVisible={this.state.openImageModal}
                hasBackdrop={true}
                style={[styles.modalView1, { position: 'absolute', bottom: -20, left: 0, }]}
                onBackdropPress={() => { this.setState({ openImageModal: false }); }} useNativeDriver={true} onRequestClose={() => { this.setState({ openImageModal: false }); }} >
                <View style={{ paddingVertical: width * 0.01, }}>
                    <View style={{
                        flexDirection: 'row', height: width * 0.25, justifyContent: 'space-between',
                        borderWidth: 0, backgroundColor: 'transparent', borderRadius: 0, paddingTop: width * 0.05
                    }}>
                        <TouchableOpacity
                            style={{
                                alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', paddingHorizontal: 4,
                                paddingVertical: 6, borderWidth: 0, borderRadius: 0
                            }}
                            onPress={() => { this.modalAttach('gallery') }}>
                            <FontAwesome
                                name="folder"
                                size={width * 0.16}
                                style={{
                                    marginRight: 5, color: primaryColor,
                                    textAlign: 'center', marginLeft: width * 0.1
                                }} />
                            <Text style={{ fontSize: 16, color: primaryColor, textAlign: 'center', marginLeft: width * 0.1 }}>Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', paddingHorizontal: 4, paddingVertical: 6, borderWidth: 0, borderRadius: 0, }}
                            onPress={() => { this.modalAttach('camera') }}>
                            <FontAwesome name="camera" size={width * 0.14} style={{ marginRight: 5, color: primaryColor, textAlign: 'center', marginRight: width * 0.1 }} />
                            <Text style={{ fontSize: 16, color: primaryColor, textAlign: 'center', marginRight: width * 0.1 }}>camera</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
    searchItems =async(text)=>{
        let api = `${url}/api/drools/ingridents/?search=${text}`
        let data =await HttpsClient.get(api)
        if(data.type =="success"){
            this.setState({searchResults:data.data})
        }
    }
    changeTitle =(i,index,Text)=>{
        let duplicate =this.state.ingredients
        duplicate[index].title = Text
        this.setState({ingredients:duplicate})
        this.searchItems(Text)
    }
    changeQty = (i, index, Text)=>{
        let duplicate = this.state.ingredients
        duplicate[index].grams = Text
        this.setState({ ingredients: duplicate })
    }
    removeItems =(i,index)=>{
        let duplicate = this.state.ingredients
        duplicate.splice(index,1)
        this.setState({ ingredients: duplicate })
    }
    selectItem = (i, index, item)=>{
        let duplicate = this.state.ingredients
        duplicate[index].title =item.title
        duplicate[index].ingridient = item.id
        this.setState({ ingredients:duplicate,searchResults:[]})
    }
    edit =async()=>{
        this.setState({ creating: true })
        if (this.state.title == "") {
            this.setState({ creating: false })
            return this.showSimpleMessage("Please add title", "#dd7030",)
        }
        if (this.state.itemPrice == "") {
            this.setState({ creating: false })
            return this.showSimpleMessage("Please add itemPrice", "#dd7030",)
        }
        if (this.state.discountPrice == "") {
            this.setState({ creating: false })
            return this.showSimpleMessage("Please add discountPrice", "#dd7030",)
        }
        if (this.state.description == "") {
            this.setState({ creating: false })
            return this.showSimpleMessage("Please add description", "#dd7030",)
        }
        let api = `${url}/api/drools/items/${this.state.itemm.id}/`
        let sendData ={
            item_price: Number(this.state.itemPrice),
            discount_price: Number(this.state.discountPrice),
            title: this.state.title,
            description: this.state.description,
          
        }
        if(this.state.image){
            sendData.displayPicture = this.state.image,
            sendData.bodyType = "formData"
        }

        let patch = await HttpsClient.patch(api,sendData)
        console.log(patch,api)
        if(patch.type =="success"){
            this.setState({ creating: false })
            this.showSimpleMessage("Edited SuccessFully", "#00A300", "success")
            return this.props.navigation.goBack()
        } else {
            this.setState({ creating: false })
            this.showSimpleMessage("Try again", "red", "danger")
        }
    }
    add =async()=>{
   
        this.setState({creating:true})
        if (this.state.title == "") {
            this.setState({ creating: false })
            return this.showSimpleMessage("Please add title", "#dd7030",)
        }
        if (this.state.itemPrice == "") {
            this.setState({ creating: false })
            return this.showSimpleMessage("Please add itemPrice", "#dd7030",)
        }
        if (this.state.discountPrice == "") {
            this.setState({ creating: false })
            return this.showSimpleMessage("Please add discountPrice", "#dd7030",)
        }
        if (this.state.description == "") {
            this.setState({ creating: false })
            return this.showSimpleMessage("Please add description", "#dd7030",)
        }
        // if(this.state.ingredients.length==0){
        //     this.setState({ creating: false })
        //     return this.showSimpleMessage("Please add ingredients", "#dd7030",)
        // }
        // this.state.ingredients.forEach((i)=>{
        //     if (i.ingridient ==""){
        //         this.setState({ creating: false })
        //         return this.showSimpleMessage("Please add ingredients by search", "#dd7030",)
        //     }
        //     if (i.grams==""){
        //         this.setState({ creating: false })
        //         return this.showSimpleMessage("Please add Qty", "#dd7030",)
        //     }
        // })
   
        let api = `${url}/api/drools/addItem/`
        // var sendData = {}
        // sendData = JSON.stringify(sendData)
        // sendData = new FormData()
        // sendData.append("displayPicture",this.state.image)
        // sendData.append("item_price", Number(this.state.itemPrice))
        // sendData.append("discount_price", Number(this.state.discountPrice))
        // sendData.append("title", this.state.title)
        // sendData.append("description", this.state.description)
        // sendData.append("ingridients[]",this.state.ingredients)

        let sendData ={
      
            item_price:Number(this.state.itemPrice),
            discount_price:Number(this.state.discountPrice),
            title:this.state.title,
            description:this.state.description,
            category:this.state.item.id,
           
        }
        if (this.state.image) {
            sendData.displayPicture = this.state.image,
             sendData.bodyType = "formData"
        }
        let post = await HttpsClient.post(api,sendData)
        console.log(post,"pppp")
        if(post.type =="success"){
            this.setState({ creating: false })
        this.showSimpleMessage("Added SuccessFully", "#00A300", "success")
            return this.props.navigation.goBack()

        }else{
            this.setState({creating:false})
            this.showSimpleMessage("Try again", "red", "danger")
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
      <View style={{flex:1}}>
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
                       {!this.state.edit? <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Add Item</Text>:
                            <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>Edit Item</Text>
                       }

                    </View>
                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                    </View>
                </View>
            </LinearGradient>
            <ScrollView 
             contentContainerStyle ={{padding:20}}
            
            >
                  <View>
                      <Text style={[styles.text]}>Display Picture :</Text>
                      <View style={{alignItems:"center",marginTop:20,flexDirection:"row",justifyContent:"center"}}>
                          <TouchableOpacity 
                            onPress={() => { this.setState({ openImageModal:true})}}
                          >
                            <MaterialIcons name="add-photo-alternate" size={40} color="black" />
                          </TouchableOpacity>
                          <View style={{marginLeft:10}}>
                              <Image 
                                source={{ uri: this?.state?.imgUrl}}
                                style={{height:50,width:50}}
                              />
                          </View>
                         <View>
                            
                         </View>
                      </View>
                  </View>
                <View style={{marginTop:5}}>
                    <Text style={[styles.text,{color:"#000",fontSize:22}]}>Title:</Text>
                    <TextInput
                      
                        selectionColor={primaryColor}
                        value={this.state.title}
                        onChangeText={(title) => { this.setState({ title }) }}
                        style={{ height: height * 0.05, width: width * 0.8, backgroundColor: "#fafafa", borderRadius: 5, marginTop: 10, paddingLeft: 5 }}
                    />
                </View>
                <View style={{ marginTop: 5 }}>
                    <Text style={[styles.text, { color: "#000", fontSize: 22 }]}>Description:</Text>
                    <TextInput

                        selectionColor={primaryColor}
                        value={this.state.description}
                        onChangeText={(description) => { this.setState({ description }) }}
                        style={{ height: height * 0.1, width: width * 0.8, backgroundColor: "#fafafa", borderRadius: 5, marginTop: 10, paddingLeft: 5 ,textAlignVertical:"top"}}
                    />
                </View>
                <View style={{ marginTop: 5 }}>
                    <Text style={[styles.text, { color: "#000", fontSize: 22 }]}>Item Price :</Text>
                      <TextInput 
                         keyboardType ={"numeric"}
                         selectionColor ={primaryColor}
                         value ={this.state.itemPrice}
                         onChangeText={(itemPrice) => { this.setState({ itemPrice})}}
                         style={{height:height*0.05,width:width*0.6,backgroundColor:"#fafafa",borderRadius:5,marginTop:10,paddingLeft:5}}
                      />
                  </View>
                <View style={{marginTop:5}}>
                    <Text style={[styles.text, { color: "#000", fontSize: 22 }]}>Discount Price :</Text>
                    <TextInput
                        keyboardType={"numeric"}
                        selectionColor={primaryColor}
                        value={this.state.discountPrice}
                        onChangeText={(discountPrice) => { this.setState({ discountPrice }) }}
                        style={{ height: height * 0.05, width: width * 0.6, backgroundColor: "#fafafa", borderRadius: 5, marginTop: 10, paddingLeft: 5 }}
                    />
                </View>
                {/* <View style={{ marginTop: 5 }}>
                    <Text style={[styles.text]}>Add Ingredients :</Text>
                    <TouchableOpacity style={{marginTop:10,alignItems:"center"}}
                     onPress={()=>{this.pushItem()}}
                    >
                        <AntDesign name="pluscircle" size={30} color={primaryColor} />
                    </TouchableOpacity>
                </View> */}
                {/* {
                    this.state.ingredients.map((i,index)=>{
                         return(
                             <ScrollView 
                               key={index}
                               style={{height:height*0.25,backgroundColor:"#fafafa",borderRadius:10,width:width*0.7,marginTop:10,alignSelf:"center"}}
                             >
                               <View style={{padding:10}}>

                                   <Text style={[styles.text]}>Item Name :</Text>
                                     <TextInput

                                         selectionColor={primaryColor}
                                         value={i.title}
                                         onChangeText={(title) => { this.changeTitle(i, index, title) }}
                                         style={{ height: height * 0.05, width: width * 0.6, backgroundColor: "#eee", borderRadius: 5, marginTop: 10, paddingLeft: 5 }}
                                     />
                               </View>
                             {this.state.searchResults.length>0&&<View style={{position:"relative",backgroundColor:"#fff",height:height*0.1,width:width*0.6,top:0,alignSelf:"center"}}>
                                    {
                                        this.state.searchResults.map((item,idx)=>{
                                            return(
                                                <TouchableOpacity 
                                                 onPress={()=>{this.selectItem(i,index,item)}}
                                                 style={{backgroundColor:"blue",marginTop:5}}
                                                 key ={idx}>
                                                    <Text style={[styles.text,{color:"#fff",}]}>{item.title}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }

                               </View>}
                                 <View style={{ padding: 10 }}>

                                     <Text style={[styles.text]}>Enter Qty :</Text>
                                     <TextInput
                                         selectionColor={primaryColor}
                                         value={i.grams}
                                         onChangeText={(title) => { this.changeQty(i, index, title) }}
                                         style={{ height: height * 0.05, width: width * 0.6, backgroundColor: "#eee", borderRadius: 5, marginTop: 10, paddingLeft: 5 }}
                                     />
                                 </View>
                                 <TouchableOpacity 
                                   onPress ={()=>{this.removeItems(i,index)}}
                                   style={{position:"absolute",top:5,right:5}}
                                 
                                 >
                                     <Entypo name="circle-with-cross" size={24} color="red" />
                                 </TouchableOpacity>
                             </ScrollView>
                         )
                    })
                } */}
                {this.renderModal()}
              {!this.state.edit?  <View style={{alignItems:"center",marginVertical:20}}>
                   {this.state.creating?<View 
                        style={{ backgroundColor: primaryColor, height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center" }}
                   >
                  <ActivityIndicator size={"large"} color={"#fff"}/>
                   </View> :<TouchableOpacity 
                      onPress ={()=>{this.add()}}
                      style={{backgroundColor:primaryColor,height:height*0.05,width:width*0.4,alignItems:"center",justifyContent:"center"}}
                    >
                        
                        <Text style={[styles.text,{color:'#fff'}]}>Add item</Text>
                    </TouchableOpacity>}
                </View> : <View style={{ alignItems: "center", marginVertical: 20 }}>
                    {this.state.creating ? <View
                        style={{ backgroundColor: primaryColor, height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center" }}
                    >
                        <ActivityIndicator size={"large"} color={"#fff"} />
                    </View> : <TouchableOpacity
                        onPress={() => { this.edit() }}
                        style={{ backgroundColor: primaryColor, height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center" }}
                    >

                        <Text style={[styles.text, { color: '#fff' }]}>Save</Text>
                    </TouchableOpacity>}
                </View>
                }
            </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    text: {
        fontFamily
    },
    modalView1: {
        backgroundColor: '#fff',
        marginHorizontal: 0,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        justifyContent: 'flex-end',
        width: width
    }
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
    }
}
export default connect(mapStateToProps, { selectTheme })(AddItems);