

//Require https module
const https = require('https');
const http = require('http');
const api = require('./api.json');

//Print Error Messages
function printError(error){
  console.error(error.message);
}


//function to print the current weather
// parameters zipcode or City State
//Example message "Current temperature in city is XXF"

function printMessage(location, temp){
  const message =`Current temperature in ${location} is ${temp}F`;
  console.log(message)
}


function get(location){
  try {
  // Connect to the API URL (https://openweathermap.org/)
    const request = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${api.key}`, response => {

      if(response.statusCode === 200) {
      console.log (response.statusCode);
      let body ="";
      // Read the data
      response.on('data', data => {
        //Parse the data
        body += data.toString();
      });

      //Print the data
      response.on('end', () => {
        try {
          const openWeatherR = JSON.parse(body);
          printMessage(location, openWeatherR.main.temp);
        } catch (error) {
          printError(error);
        }
      });

      } else {
      const message = `There was an error getting the weather for ${location}(${http.STATUS_CODES[response.statusCode]})`;
      const statusCodeError = new Error(message);
      printError(statusCodeError);
    }

    });

    // Handling the error event
    request.on('error', error => printError(error));
  } catch (error){
    printError(error);
  }
}

module.exports.get = get;

//const location = process.argv.slice(2);
//location.forEach(getWeather);
