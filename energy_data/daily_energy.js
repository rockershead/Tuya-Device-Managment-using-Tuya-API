const axios = require("axios");

var CryptoJS = require("crypto-js");
const config = require("../config.json");
const { calcSign, stringToSign } = require("../utils");

const httpMethod = "GET";

const daily_energy = function (accessToken, device_id) {
  return new Promise(function (resolve, reject) {
    const base_url = config.base_url;
    const client_id = config.client_id;
    const secret = config.secret;
    var timestamp = new Date().getTime();

    var nonce = config.nonce;
    const path =
      "/v1.0/devices/" +
      device_id +
      "/statistics/days?code=add_ele&start_day=20230613&end_day=20230614";

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
    }).then(function (response) {
      //console.log(response.data);
      var object = {
        daily_energy: response.data.result.days,
        device_timestamp: new Date(response.data.t),
      };

      resolve(object);
    });
  });
};

module.exports = { daily_energy };
