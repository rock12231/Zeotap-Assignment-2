const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import the Sequelize instance

const DailySummary = sequelize.define('DailySummary', {
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lon: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  lat: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  feels_like: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  temp_min: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  temp_max: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  pressure: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  humidity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  visibility: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  wind_speed: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  wind_deg: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  wind_gust: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  weather_main: {
    type: DataTypes.STRING,
    allowNull: false
  },
  weather_description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sunrise: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  sunset: {
    type: DataTypes.BIGINT,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = DailySummary;
