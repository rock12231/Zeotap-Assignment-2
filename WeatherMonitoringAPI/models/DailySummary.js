const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import the Sequelize instance

const DailySummary = sequelize.define('DailySummary', {
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  avg_temp: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  max_temp: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  min_temp: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  dominant_condition: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true, // Disable auto-generated timestamps
});

module.exports = DailySummary;
