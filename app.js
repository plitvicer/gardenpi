const BME280 = require('bme280-sensor');

// The BME280 constructor options are optional.
// 
const options = {
  i2cBusNo   : 1, // defaults to 1
  i2cAddress : 0x76 // defaults to 0x77
};

const bme280 = new BME280(options);

// Read BME280 sensor data, repeat
//
const readSensorData = () => {
  bme280.readSensorData()
    .then((data) => {
      // temperature_C, pressure_hPa, and humidity are returned by default.
      // I'll also calculate some unit conversions for display purposes.
      //
      data.temperature_F = BME280.convertCelciusToFahrenheit(data.temperature_C);
      data.pressure_inHg = BME280.convertHectopascalToInchesOfMercury(data.pressure_hPa);
 
      return `data = ${JSON.stringify(data, null, 2)}`;
      setTimeout(readSensorData, 2000);
    })
    .catch((err) => {
      return `BME280 read error: ${err}`;
      setTimeout(readSensorData, 2000);
    });
};

// Initialize the BME280 sensor
//
bme280.init()
  .then(() => {
    console.log('BME280 initialization succeeded');
  })
  .catch((err) => console.error(`BME280 initialization failed: ${err} `));


var http = require('http');
var server = http.createServer(
    function (request, response) { 
        response.writeHead(200, { "Content-Type": "text/plain" }); 
        response.end(readSensorData());
     }
);
server.listen(8000);
console.log("Server running at http://127.0.0.1:8000/");