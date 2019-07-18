// Get current temperature by using Zip Code or City and State
//Solution: Use Node.js to connect to OpenWeatherMap API to get that information and print it out.

const weather = require('./weather.js');

const query = process.argv.slice(2);
//query: 94123
//query: San Mateo CA
//query: Rome Italy

query.forEach(weather.get);
