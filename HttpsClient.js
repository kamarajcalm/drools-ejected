import React from 'react';
import { AsyncStorage } from 'react-native';

async function getCredentials(){
    const sessionid = await AsyncStorage.getItem('sessionid');
    const csrf = await AsyncStorage.getItem('csrf');
  
    return {csrf:csrf,sessionid:sessionid}
}

const HttpsClient = {

    get: async function(url){
       var token = await getCredentials()
       var returnData = {
         type:'fail',
         data:null,
         error:null
       }
       await fetch(url).then((response) => {
         var status = response.status.toString()
         if(status.includes('20')){
            returnData.type='success'
         }
         return response.json()
         }).then((responseJson) => {
            returnData.data=responseJson
         })
         .catch((error) => {
           returnData.error=error
           return
         });
       return returnData
    },

    post:async function(url,data){
      var token = await getCredentials()
      var returnData = {
        type:'fail',
        data:null,
        error:null
      }
      var headers = {
         "Cookie":"csrf="+token.csrf+"; sessionid=" + token.sessionid +";",
         'Accept':'application/json',
         'Content-Type':'application/json',
         'Referer':url,
         'X-CSRFToken':token.csrf
      }
      var sendData = {}
      for (const property in data) {
        if(property!='bodyType'){
          sendData[property] = data[property]
        }
      }
      sendData = JSON.stringify(sendData)
      if(data.bodyType=='formData'){
        headers = {
           "Cookie" :"csrf="+token.csrf+"; sessionid=" + token.sessionid +";",
           'Accept': 'application/json',
           'Content-Type': 'multipart/form-data;',
           'Referer': url,
           'X-CSRFToken': token.csrf
        }
        sendData = new FormData();
        for (const property in data) {
          if(property!='bodyType'){
            sendData.append(property,data[property])
          }
        }
      }
      if(data.login){
        headers = {
           'Accept': 'application/json',
           'Content-Type': 'multipart/form-data;',
           'Referer': url,
        }
      }
      console.log(sendData,"popppp")
      await fetch(url,{
        method:'POST',
        headers: headers,
        body: sendData
      }).then((response) => {
        var status = response.status.toString()
        if(status.includes('20')){
           returnData.type='success'
        }
        return response.json()
        }).then((responseJson) => {
           returnData.data=responseJson
        })
        .catch((error) => {
          returnData.error=error
          return
        });
      return returnData
    },

    patch:async function(url,data){
      var token = await getCredentials()
      var returnData = {
        type:'fail',
        data:null,
        error:null
      }
      var headers = {
         "Cookie" :"csrf="+token.csrf+"; sessionid=" + token.sessionid +";",
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Referer': url,
         'X-CSRFToken': token.csrf
      }
      var sendData = {}
      for (const property in data) {
        if(property!='bodyType'){
          sendData[property] = data[property]
        }
      }
      sendData = JSON.stringify(sendData)
      if(data.bodyType=='formData'){
        headers = {
           "Cookie" :"csrf="+token.csrf+"; sessionid=" + token.sessionid +";",
           'Accept': 'application/json',
           'Content-Type': 'multipart/form-data;',
           'Referer': url,
           'X-CSRFToken': token.csrf
        }
        sendData = new FormData();
        for (const property in data) {
          if(property!='bodyType'){
            sendData.append(property,data[property])
          }
        }
      }
      await fetch(url,{
        method:'PATCH',
        headers: headers,
        body: sendData
      }).then((response) => {
        var status = response.status.toString()
        if(status.includes('20')){
           returnData.type='success'
        }
        return response.json()
        }).then((responseJson) => {
          // console.log(responseJson);
           returnData.data=responseJson
        })
        .catch((error) => {
          returnData.error=error
          return
        });
      return returnData
    },

    delete:async function(url){
      var token = await getCredentials()
      var returnData = {
        type:'fail',
        data:null,
        error:null
      }
      await fetch(url,{
        method:'DELETE',
        headers: {
           "Cookie" :"csrf="+token.csrf+"; sessionid=" + token.sessionid +";",
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Referer': url,
           'X-CSRFToken': token.csrf
        }
      }).then((response) => {
        var status = response.status.toString()
        if(status.includes('20')){
           returnData.type='success'
        }
        return response.json()
        }).then((responseJson) => {
           returnData.data=responseJson
        })
        .catch((error) => {
          returnData.error=error
          return
        });
      return returnData
    }
}

export default HttpsClient;
