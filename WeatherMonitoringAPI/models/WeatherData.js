const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import the Sequelize instance

const WeatherData = sequelize.define('WeatherData', {
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  temp: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  feels_like: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  condition: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: true, // Disable auto-generated timestamps
});

module.exports = WeatherData;
