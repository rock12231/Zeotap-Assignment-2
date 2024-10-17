// config/smtpConfig.js
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
require('dotenv').config();

const transporter = nodemailer.createTransport(smtpTransport({
  service: 'Gmail', // or your email service
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
}));

module.exports = transporter;
