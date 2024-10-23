const weatherService = require('../services/weatherService');

// Get Weather Data by City Controller
exports.getWeatherByCity = async (req, res) => {
  try {
    const weather = await weatherService.getWeatherByCity(req.params.city);
    if (weather) {
      return res.json(weather);
    }
    return res.status(404).json({ message: 'No data available' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Daily Summary by City Controller
exports.getDailySummaryByCity = async (req, res) => {
  try {
    const summary = await weatherService.getDailySummaryByCity(req.params.city);
    if (summary) {
      return res.json(summary);
    }
    return res.status(404).json({ message: 'No data available' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
