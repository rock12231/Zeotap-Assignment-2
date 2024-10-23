const WeatherData = require('../models/WeatherData');
const DailySummary = require('../models/DailySummary');

// Service to get weather data by city
exports.getWeatherByCity = async (city) => {
  try {
    const weather = await WeatherData.findOne({
      where: { city },
      // order: [['createdAt', 'DESC']],
    });
    return weather;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Internal server error');
  }
};

// Service to get daily summary by city
exports.getDailySummaryByCity = async (city) => {
  try {
    const summary = await DailySummary.findOne({
      where: { city },
      order: [['createdAt', 'DESC']],
    });
    return summary;
  } catch (error) {
    console.error('Error fetching daily summary:', error);
    throw new Error('Internal server error');
  }
};
