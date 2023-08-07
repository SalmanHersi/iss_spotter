const request = require("request-promise-native");

const fetchMyIP = function () {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = function (ip) {
  const geoLocationUrl = `https://freegeoip.app/json/${ip}`;
  return request(geoLocationUrl);
};

const fetchISSFlyOverTimes = function (coords) {
  const flyoverUrl = `http://api.open-notify.org/iss-pass.json?lat=${coords.lat}&lon=${coords.long}`;
  return request(flyoverUrl);
};

module.exports = {
  fetchMyIP: fetchMyIP,
  fetchCoordsByIP: fetchCoordsByIP,
  fetchISSFlyOverTimes: fetchISSFlyOverTimes,
};
