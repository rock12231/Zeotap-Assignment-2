require('dotenv').config()
module.exports = {
    DB_URI: process.env.ENV_DB_URI,
    API_KEY: process.env.ENV_API_KEY,
    URL: process.env.ENV_URL,

    MAIL_USER: process.env.SMTP_USER,
    MAIL_PASSWORD: process.env.SMTP_PASSWORD,
    MAIL_HOST: process.env.SMTP_HOST,
    MAIL_PORT: process.env.SMTP_PORT,
  };
  