'use strict';

console.log("test");

let apiKeys = {};
let zipText = 38401;
let cityName;
let currentWeather;
let dateTime;
let cityNameForecast;
let nextWeatherForecast;
let dateTimeForecast;

  $('#submit').on('click', submitFunction);

$('#zipcode').on('keypress', function(e) {
  let keycode = e.which || e.keycode;
  if (keycode === 13) {
    if ($('#zipcode').val().length > 5) {
    window.alert("Zipcodes are only five characters long.");
  }
    submitFunction();
  }
});


//http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID={APIKEY}
//api.openweathermap.org/data/2.5/weather?zip=${zipText}

function submitFunction() {
  if ($('#zipcode').val().length > 5) {
    window.alert("Zipcodes are only five characters long.");
  }
    zipText = $('#zipcode').val();
    console.log($('#zipcode').val());
    getWeather();
    getWeatherForecast();
}

  function getWeather (apiKeys, uid){
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url:`http://api.openweathermap.org/data/2.5/weather?zip=${zipText}&APPID=7e0fda8622696ebb17985552e0bacf4d`
      }).then((response) => {
        resolve(response);
        console.log("response", response);
        currentWeather = response.weather[0].description;
        cityName = response.name;
        console.log("cityname", cityName);
        parseWeatherToDom(cityName, currentWeather);
        });
      }, (error) => {
        reject(error);
        console.log(error);
      });
  }

  function getWeatherForecast (apiKeys, uid){
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url:`http://api.openweathermap.org/data/2.5/forecast/weather?zip=${zipText}&APPID=7e0fda8622696ebb17985552e0bacf4d`
      }).then((response2) => {
        resolve(response2);
        console.log("response2", response2);
        nextWeatherForecast = response2.list[0].weather[0].description;
        dateTimeForecast = response2.list[0].dt_txt;
        parseWeatherToDom(nextWeatherForecast, dateTimeForecast);
        });
      }, (error) => {
        reject(error);
        console.log(error);
      });
  }

  function parseWeatherToDom () {
    $('#output').html('');
    let parseToDom = `<h1>Current Weather for: ${cityName}</h1>`;
    parseToDom += `<h4>Currently, the weather conditions are '${currentWeather}.'</h4>`;
    parseToDom += `<br><h1>Forecast conditions:</h1>`;
    parseToDom += `<h4>The next predicted conditions are: ${nextWeatherForecast}, at ${dateTimeForecast}.</h4>`;

    $('#output').append(parseToDom);
  }














