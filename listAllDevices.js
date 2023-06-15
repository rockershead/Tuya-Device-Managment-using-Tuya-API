const axios = require("axios");
const qs = require("qs");
var CryptoJS = require("crypto-js");
const config = require("./config.json");
const { calcSign, stringToSign } = require("./utils");

const base_url = config.base_url;
const client_id = config.client_id;
const secret = config.secret;
var timestamp = new Date().getTime();
const httpMethod = "GET";
//var accessToken="77dd22418f98191677f9804dfb57d1da"
//var device_id=config.device_id
var nonce = config.nonce;

const path = `/v1.0/users/${config.user_id}/devices`;

const listAllDevices = function (accessToken) {
  return new Promise(function (resolve, reject) {
    var signStr = stringToSign(path, httpMethod);
    var sign = calcSign(
      client_id,
      timestamp,
      nonce,
      signStr,
      secret,
      accessToken
    );

    axios({
      method: httpMethod,

      url: base_url + path,

      headers: {
        "content-type": "application/x-www-form-urlencoded",
        client_id: client_id,
        sign: sign,
        t: timestamp,
        sign_method: "HMAC-SHA256",
        access_token: accessToken,
      },
    }).then((response) => {
      resolve(response.data.result);
    });
  });
};

module.exports = { listAllDevices };
