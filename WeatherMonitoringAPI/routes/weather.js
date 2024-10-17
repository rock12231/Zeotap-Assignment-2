// routes/weather.js
const express = require("express");
const WeatherData = require("../models/WeatherData");
const DailySummary = require("../models/DailySummary");

const router = express.Router();

// Route to get weather data by city
router.get("/:city", async (req, res) => {
  try {
    const weather = await WeatherData.findOne({
      where: { city: req.params.city },
      order: [["timestamp", "DESC"]],
    });
    if (weather) {
      return res.json(weather);
    }
    return res.status(404).json({ message: "No data available" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get daily summary by city
router.get("/summary/:city", async (req, res) => {
  try {
    const summary = await DailySummary.findOne({
      where: { city: req.params.city },
      order: [["date", "DESC"]],
    });
    if (summary) {
      return res.json(summary);
    }
    return res.status(404).json({ message: "No data available" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
