const sequelize = require('../config/database'); // Import the Sequelize instance
const WeatherData = require('./WeatherData');
const DailySummary = require('./DailySummary');
const User = require('./User');

// Sync models with the database
const syncModels = async () => {
  await sequelize.sync();
};

syncModels();

module.exports = {
  sequelize,
  WeatherData,
  DailySummary,
  User,
};
