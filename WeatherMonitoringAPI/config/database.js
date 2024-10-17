const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.DB_URI, {
  dialect: 'postgres',
  logging: false
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
