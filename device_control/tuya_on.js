const axios = require('axios');

var CryptoJS = require("crypto-js");
const config=require("./config.json")
const {calcSign,stringToSign}=require("./utils")


const httpMethod='POST'





const tuya_on=function(accessToken,device_id){
   return new Promise(function(resolve,reject){
    const base_url=config.base_url
    const client_id=config.client_id
    
    const secret=config.secret

    
    
    var timestamp = new Date().getTime();
    const onBody={"commands":[{"code": "switch_1","value":true}]}


    var nonce = config.nonce
    const path='/v1.0/devices/'+device_id+'/commands'
      var signStr=stringToSign(path,httpMethod,onBody)
      var sign = calcSign(client_id, timestamp, nonce, signStr, secret,accessToken);
      
   axios({

      method: httpMethod,
    
      url: base_url+path,
      data:onBody,
      headers: { 'content-type': 'application/json','client_id':client_id,'sign':sign,'t':timestamp,'sign_method':'HMAC-SHA256','access_token':accessToken} 
   }).then(function (response) {
          console.log(response.data)
           resolve(response.data)
           //return { result: true, success: true, t: 1641624459479 }
    



  })


   })

  


}



module.exports={tuya_on};

