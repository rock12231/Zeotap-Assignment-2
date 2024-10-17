require('dotenv').config()
module.exports = {
    DB_URI: process.env.ENV_DB_URI,
    API_KEY: process.env.ENV_API_KEY,
    URL: process.env.ENV_URL,
  };
  