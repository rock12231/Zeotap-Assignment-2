// services/saveWeatherService.js
const axios = require("axios");
const WeatherData = require("../models/WeatherData");
const DailySummary = require("../models/DailySummary");
const config = require("../config/config");

async function fetchWeatherData(city) {
  try {
    const response = await axios.get(config.URL, { params: { q: city, APPID: config.API_KEY, units: 'metric' } });
    const data = response.data;
    const { coord, main, weather, wind, sys } = response.data;

    console.log(`coord: ${coord} main: ${main} weather: ${weather} wind: ${wind} sys: ${sys}`);

    await WeatherData.create({
      city: city,
      temp: main.temp,
      feels_like: main.feels_like,
      condition: weather[0].main
    });


    await DailySummary.create({
      city: city,
      country: sys.country,
      lon: coord.lon,
      lat: coord.lat,
      temperature: main.temp,
      feels_like: main.feels_like,
      temp_min: main.temp_min,
      temp_max: main.temp_max,
      pressure: main.pressure,
      humidity: main.humidity,
      visibility: data.visibility,
      wind_speed: wind.speed,
      wind_deg: wind.deg,
      wind_gust: wind.gust ? wind.gust : 0,
      weather_main: weather[0].main,
      weather_description: weather[0].description,
      sunrise: sys.sunrise,
      sunset: sys.sunset
    });


  } catch (error) {
    console.error(`Error fetching weather data: ${error.message}`);
  }
}

module.exports = fetchWeatherData;



/*
      const temp = {
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
        "temp": 300.67,
        "feels_like": 300.09,
        "temp_min": 300.67,
        "temp_max": 300.67,
        "pressure": 1011,
        "humidity": 34,
        "sea_level": 1011,
        "grnd_level": 997
      },
      "visibility": 10000,
      "wind": {
        "speed": 3.07,
        "deg": 345,
        "gust": 3.01
      },
      "clouds": {
        "all": 0
      },
      "dt": 1729604429,
      "sys": {
        "country": "IN",
        "sunrise": 1729557694,
        "sunset": 1729598654
      },
      "timezone": 19800,
      "id": 1267995,
      "name": "Kanpur",
      "cod": 200
    }

      https://api.openweathermap.org/data/2.5/weather?q=kanpur&appid=09d8bf
    */