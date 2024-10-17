// services/weatherService.js
const axios = require("axios");
const WeatherData = require("../models/WeatherData");
const DailySummary = require("../models/DailySummary");
const config = require("../config/config");

async function fetchWeatherData(city) {
  try {
    const response = await axios.get(config.URL, { params: { q: city, APPID: config.API_KEY, units: 'metric' } });

    /*
    https://api.openweathermap.org/data/2.5/weather?q=kanpur&appid=09d8bf
    {
      "coord": {
      "lon": 80.35,
      "lat": 26.4667
      },
      "weather": [
      {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01n"
      }
      ],
      "base": "stations",
      "main": {
      "temp": 301.23,
      "feels_like": 300.75,
      "temp_min": 301.23,
      "temp_max": 301.23,
      "pressure": 1009,
      "humidity": 38,
      "sea_level": 1009,
      "grnd_level": 993
      },
      "visibility": 10000,
      "wind": {
      "speed": 0.36,
      "deg": 19,
      "gust": 0.71
      },
      "clouds": {
      "all": 1
      },
      "dt": 1729170917,
      "sys": {
      "country": "IN",
      "sunrise": 1729125525,
      "sunset": 1729166926
      },
      "timezone": 19800,
      "id": 1267995,
      "name": "Kanpur",
      "cod": 200
      }
      */
    const { main, weather } = response.data; // response.data contains the actual weather data
    const { temp, feels_like } = main; // Now destructure temp and feels_like from main
      
    console.log(`Temperature: ${temp}, Feels Like: ${feels_like}, Weather: ${weather[0].description}`);
    const timestamp = new Date();

    await WeatherData.create({
      city: city,
      temp: temp,
      feels_like: feels_like,
      condition: weather[0].main,
      timestamp: timestamp
    });

    await DailySummary.create({
      city: city,
      date: timestamp,
      avg_temp: temp,
      max_temp: temp,
      min_temp: temp,
      dominant_condition: weather[0].description,
      timestamp: timestamp
    });

  } catch (error) {
    console.error(`Error fetching weather data: ${error.message}`);
  }
}

module.exports = fetchWeatherData;
