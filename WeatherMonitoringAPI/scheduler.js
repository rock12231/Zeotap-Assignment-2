// scheduler.js
const cron = require("node-cron");
const fetchWeatherData = require("./services/weatherService");

const cities = ["Delhi", "Mumbai", "Chennai", "Bangalore", "Kolkata", "Hyderabad"]; // Replace with your desired cities

// Schedule the weather fetching task every 1 minutes
cron.schedule("*/50 * * * *", () => {
  cities.forEach(city => fetchWeatherData(city));
});
