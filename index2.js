const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
} = require("./iss_promised.js");

fetchMyIP()
  .then((ipAdd) => {
    const ip = JSON.parse(ipAdd).ip;
    return fetchCoordsByIP(ip);
  })
  .then((geoData) => {
    const parsedBody = JSON.parse(geoData);
    const latLong = { lat: parsedBody.latitude, long: parsedBody.longitude };
    return fetchISSFlyOverTimes(latLong);
  })
  .then((flyoverTimes) => {
    const flyoverTimesObj = JSON.parse(flyoverTimes);
    printPassTimes(flyoverTimesObj);
  })

  .catch((error) => {
    console.log(error);
  });

const printPassTimes = function (flyoverTimes) {
  for (const objectInResponseArr of flyoverTimes.response) {
    const formattedDateTime = new Date(0);
    formattedDateTime.setUTCSeconds(objectInResponseArr.risetime);
    const formattedDuration = objectInResponseArr.duration;
    console.log(
      `Next pass at ${formattedDateTime} for ${formattedDuration} seconds!`
    );
  }
};
