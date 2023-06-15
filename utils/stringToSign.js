var CryptoJS = require("crypto-js");
const qs = require("qs");

const stringToSign = function (path, method, body) {
  var headersStr = "";
  let query = {};

  var bodyStr = "";
  if (body != undefined) {
    bodyStr = JSON.stringify(body);
  }
  const [uri, pathQuery] = path.split("?");
  const queryMerged = Object.assign(query, qs.parse(pathQuery));
  const sortedQuery = {};
  Object.keys(queryMerged)
    .sort()
    .forEach((i) => (sortedQuery[i] = queryMerged[i]));

  const querystring = decodeURIComponent(qs.stringify(sortedQuery));
  //console.log(querystring);
  const url = querystring ? `${uri}?${querystring}` : uri;

  var sha256 = CryptoJS.SHA256(bodyStr);

  var signUrl = method + "\n" + sha256 + "\n" + headersStr + "\n" + url;
  //console.log(signUrl);

  return signUrl;
};

module.exports = { stringToSign };
