import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Alert, StyleSheet, FlatList, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
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
import { StatusBar, } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import orders from '../data/orders'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import HttpsClient from '../HttpsClient';
import moment from 'moment';
const screenHeight = Dimensions.get("screen").height;
class Menu extends Component {
  constructor(props) {

    super(props);
    this.state = {
      menus: [],
      modal:false,
      selectedItem:null,
      selectedPlan:null
    };
  }
  getMenu = async () => {
     const api = `${url}/api/drools/getTimetable/`
     const data = await HttpsClient.get(api)
     console.log(data.data)
     
      // in data.data sessions contains respective frequency by looping through frequecy we get either booked a menu or not 
           
     if(data.type=="success"){
       if(!data.data.error){
            this.setState({menus:data.data})
       }
       
     }
  }
  componentDidMount() {
    this.getMenu()
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getMenu()
    });
  }
  componentWillUnmount() {
    this._unsubscribe()
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


  header =()=>{
    return(
      <View style={{ flexDirection: "row", backgroundColor:"#DFDFE1",height:height*0.08}}>
            <View style={{flex:0.2,alignItems:"center",justifyContent:"center"}}>
                <Text style={[styles.text,{color:primaryColor,fontSize:22}]}>Day</Text>
            </View>
            <View style={{flex:0.266,alignItems:"center",justifyContent:"center"}}>
               <Text style={[styles.text, { color: primaryColor,fontSize:20 }]}>Morning</Text>
            </View>
            <View style={{flex:0.266,alignItems:"center",justifyContent:"center"}}>
              <Text style={[styles.text, { color: primaryColor ,fontSize:20}]}>AfterNoon</Text>
            </View>
            <View style={{flex:0.266,alignItems:"center",justifyContent:"center"}}>
              <Text style={[styles.text, { color:primaryColor ,fontSize:20}]}>Night</Text>
            </View>
      </View>
    )
  }
  seperator =()=>{
    return(
      <View style={{height:1,backgroundColor:"gray"}}>
         
      </View>
    )

  }
  changeDefault = async(item)=>{
    console.log(item,"choiceeeee")
    let api = `${url}/api/drools/bookOrder/`
    let sendData ={
      plan:this.state.selectedPlan.planpk,
      date:this.state.selectedPlan.date,
      category:this.state.selectedItem.session,
      item:item.custompk
    }
    
   let post = await HttpsClient.post(api,sendData)
    if(post.type=="success"){
         this.getMenu()
         this.setState({modal:false})
      return  this.showSimpleMessage("Menu Selected SuccessFully","green","success")
    }else{
      return  this.showSimpleMessage("Try Again","red","danger")
    }
  }
  modal =()=>{
    console.log(this.state.selectedItem)
    return(
      <Modal 
        deviceHeight={screenHeight}
        isVisible={this.state.modal}
        onBackdropPress ={()=>{this.setState({modal:false})}}
        statusBarTranslucent={true}
      >
          <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                 <View style={{height:height*0.5,width:width*0.9,backgroundColor:"#fff",borderRadius:10}}>
                       <View style={{alignItems:"center",justifyContent:"center",marginVertical:10}}>
                            <Text style={[styles.text,{color:"#000",fontSize:22,textDecorationLine:"underline"}]}>{this.state.selectedItem?.session} :</Text>
                       </View>
                       <View style={{paddingHorizontal:10,flexDirection:"row"}}>
                         <View>
                               <Text style={[styles.text,{color:"#000",fontSize:18,textDecorationLine:"underline"}]}>Default</Text>
                         </View>
                         <View>
                            <Text style={[styles.text,{color:"#000",fontSize:18,}]}> : {this.state.selectedItem?.default.title}</Text>
                         </View>
                       </View>
                       <View style={{flexDirection:"row",paddingHorizontal:10}}>
                              <View style={{flex:0.2,alignItems:"center",justifyContent:"center"}}>
                
                              </View>
                              <View style={{flex:0.6,alignItems:"center",justifyContent:"center"}}>
                                  {
                                    this.state.selectedItem?.default?.items?.map((item,index)=>{
                                          return(
                                            <View key={index} style={{flexDirection:"row",marginTop:10}}>
                                              <View>
                                                  <Text style={[styles.text,{color:primaryColor}]}>{index+1} . </Text> 
                                              </View>
                                                <View>
                                                  <Text style={[styles.text,{color:primaryColor}]}>{item}</Text> 
                                                </View>  
                                            </View>
                                          )
                                    })
                                  }
                              </View>
                              <View style={{flex:0.2,alignItems:"center",justifyContent:"center"}}>
                                      
                                                 <TouchableOpacity style={{height:height*0.05,width:"100%",alignItems:"center",justifyContent:"center",backgroundColor:primaryColor}}
                                                 
                                                 onPress={()=>{this.changeDefault(this.state.selectedItem?.default)}}
                                                 >
                                                         <Text style={[styles.text,{color:"#fff"}]}>Select</Text>
                                                 </TouchableOpacity>
                                     
                              </View>
                       </View>
                       <View style={{alignItems:"center",justifyContent:"center",}}>
                         
                       </View>
                       <View style={{alignItems:"center",justifyContent:"center",marginTop:10}}>
                            <Text style={[styles.text,{color:"#000",fontSize:20,textDecorationLine:"underline"}]}>Choices :</Text>
                       </View>
                       <FlatList 
                          showsVerticalScrollIndicator={false}
                          contentContainerStyle={{paddingBottom:20}}
                          data={this.state.selectedItem?.choices||[]}
                          keyExtractor={(item,index)=>index.toString()}
                          renderItem ={({item,index})=>{
                           let it = item
                              return(
                                <View style={{paddingHorizontal:10}}>
                                      <View style={{flexDirection:"row"}}>
                                        <View>
                                               <Text style={[styles.text,{color:"#000",fontSize:18,textDecorationLine:"underline"}]}>{index+1} . </Text> 
                                        </View>
                                           <View >
                                                  <Text style={[styles.text,{color:"#000",fontSize:18,textDecorationLine:"underline"}]}>{item.title} :</Text> 
                                           </View>
                                    
                                      </View>
                                         <View style={{flexDirection:"row"}}>
                                           <View style={{flex:0.2,alignItems:"center",justifyContent:"center"}}>

                                           </View>
                                           <View style={{flex:0.6,alignItems:"center",justifyContent:"center"}}>
                                              {
                                                item?.items?.map((item,index)=>{
                                                      return(
                                                        <View key={index} style={{flexDirection:"row",marginTop:10}}>
                                                          <View>
                                                              <Text style={[styles.text,{color:primaryColor}]}>{index+1} . </Text> 
                                                          </View>
                                                            <View>
                                                              <Text style={[styles.text,{color:primaryColor}]}>{item}</Text> 
                                                            </View>  
                                                        </View>
                                                      )
                                                })
                                              }
                                           </View>
                                             <View style={{flex:0.2,alignItems:"center",justifyContent:"center"}}>
                                                {this.state?.selectedItem?.bookedtitle!=item.title? <TouchableOpacity style={{height:height*0.05,width:"100%",alignItems:"center",justifyContent:"center",backgroundColor:primaryColor}}
                                                 
                                                 onPress={()=>{this.changeDefault(it)}}
                                                 >
                                                         <Text style={[styles.text,{color:"#fff"}]}>Select</Text>
                                                 </TouchableOpacity>
                                                 :<View style={{height:height*0.05,width:"100%",alignItems:"center",justifyContent:"center",}}>
                                                      <Text style={[styles.text,{color:"green"}]}>Booked</Text>  
                                                 </View>
                                                }
                                           </View>
                       
                       </View>
                                </View>
                              )
                          }}
                       />
                 </View>
                 
          </View>
      </Modal>
    )
  }
  validateSession =(session,item)=>{
    if(session?.booked){
      return(
           <TouchableOpacity style={{ flex: 0.266, alignItems: "center", justifyContent: "center" }}

               onPress={()=>{
                   if(item.date==moment(new Date()).format("YYYY-MM-DD")){
                        this.showSimpleMessage("You cannot change Today's menu","orange","info")
                   }
                   else{
                     this.setState({modal:true,selectedItem:session,selectedPlan:item})
                   }
               }}
                      
           >
                <Text style={[styles.text, {  fontSize: 10,color:"#fff"}]}>{session?.bookedtitle}</Text>
           </TouchableOpacity>
      )
    }
    return(
           <TouchableOpacity style={{ flex: 0.266, alignItems: "center", justifyContent: "center" }}
                       onPress={()=>{this.setState({modal:true,selectedItem:session,selectedPlan:item})}}
                      
                      >
                <Text style={[styles.text, {  fontSize: 10,color:"red"}]}>Book now</Text>
           </TouchableOpacity>
    )
  }
empty =()=>{
  return(
    <View style={{height:height*0.6,alignItems:"center",justifyContent:"center"}}>
       <Text style={[styles.text,{color:"#fff"}]}>Please Contact Admin to subscribe to our plans</Text>
    </View>
  )
}
emptySessions =()=>{
  return(
    <View style={{ flex: 0.266, alignItems: "center", justifyContent: "center" }}>
        <Text style={{color:"#fff"}}>-</Text>
    </View>
  )
}
  render() {
    console.log(this.state?.menus[0]?.plantype)
    return (
      <View style={{ flex:1}}>
        <StatusBar style={"light"} />
        {/* Headers */}
        <LinearGradient
          style={{ height: height * 0.12, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
          colors={gradients}
        >
          <View style={{ marginTop: Constants.statusBarHeight, flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
           
            >
       
            </View>
            <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
              <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>{this.state.menus[0]?.plan||"No Plans"}</Text>

            </View>
            <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

            </View>
          </View>
        </LinearGradient>
        <View style={{ flex: 1,backgroundColor:"#000" }}>
            <FlatList 
               ListEmptyComponent={this.empty()}
               ItemSeparatorComponent={this.seperator}
               ListHeaderComponent={this.header}
               data={this.state.menus}
               keyExtractor={(item,index)=>index.toString()}
               renderItem ={({item,index})=>{
               
                  return(
                    <View style={{ flexDirection: "row", backgroundColor: "#000",minHeight:height*0.1}}>
                      <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                        <Text style={[styles.text, { color: "#fff", fontSize: 10}]}>{item.weekday}</Text>
                        <Text style={[styles.text, { color: "#fff", fontSize: 12}]}>{item.date}</Text>
                      </View>
                       {
                         this.state.menus?.[0].plantype=="AN"&&
                           <>
                      {
                        this.emptySessions()
                      }
                      {
                        this.validateSession(item.sessions[0],item)
                      }
                      {
                          this.validateSession(item.sessions[1],item)
                      }
                           </>
                       }
                              {
                         this.state.menus?.[0].plantype=="MAN"&&
                           <>
                  
                      {
                        this.validateSession(item.sessions[0],item)
                      }
                      {
                          this.validateSession(item.sessions[1],item)
                      }
                       {
                          this.validateSession(item.sessions[2],item)
                      }
                           </>
                       }
                                     {
                         this.state.menus?.[0].plantype=="MA"&&
                           <>
                  
                      {
                        this.validateSession(item.sessions[0],item)
                      }
                      {
                          this.validateSession(item.sessions[1],item)
                      }
                     {
                        this.emptySessions()
                      }
                           </>
                       }
                                           {
                         this.state.menus?.[0].plantype=="MN"&&
                           <>
                  
                      {
                        this.validateSession(item.sessions[0],item)
                      }
                       {
                        this.emptySessions()
                      }
                      {
                          this.validateSession(item.sessions[1],item)
                      }
                    
                           </>
                       }
                    </View>
                  )
               }}
            />
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
    user:state.selectedUser
  }
}
export default connect(mapStateToProps, { selectTheme })(Menu);

