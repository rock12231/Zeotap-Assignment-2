const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Route to get weather data by city
router.get('/:city', weatherController.getWeatherByCity);

// Route to get daily summary by city
router.get('/summary/:city', weatherController.getDailySummaryByCity);

module.exports = router;