const axios = require("axios");

var CryptoJS = require("crypto-js");
const config = require("../config.json");
const { calcSign, stringToSign } = require("../utils");

const httpMethod = "GET";

const get_electric_data = function (accessToken, device_id) {
  return new Promise(function (resolve, reject) {
    const base_url = config.base_url;
    const client_id = config.client_id;
    const secret = config.secret;
    var timestamp = new Date().getTime();

    var nonce = config.nonce;
    const path = "/v1.0/devices/" + device_id;
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
      // console.log(response.data.result.status)
      if (response.data.result.status[3] != undefined) {
        var current = response.data.result.status[3].value / 1000;
      } else {
        var current = "N.A.";
      }
      if (response.data.result.status[4] != undefined) {
        var power = response.data.result.status[4].value / 10;
      } else {
        var power = "N.A.";
      }
      if (response.data.result.status[5] != undefined) {
        var voltage = response.data.result.status[5].value / 10;
      } else {
        var voltage = "N.A";
      }

      //var data={"current":current+'A',"voltage":voltage+'V',"power":power+"W"}
      var data = { current: current, voltage: voltage, power: power };

      resolve(data);
    });
  });
};

module.exports = { get_electric_data };
