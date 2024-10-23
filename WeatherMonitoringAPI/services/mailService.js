const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const { promisify } = require('util');
const config = require("../config/config");

// Promisify readFile for ease of use with async/await
const readFile = promisify(fs.readFile);

// SMTP transporter configuration
const transporter = nodemailer.createTransport({
  host: config.MAIL_HOST,
  port: config.MAIL_PORT,
  auth: {
    user: config.MAIL_USER,
    pass: config.MAIL_PASSWORD
  }
});

// Reusable function to send email
const sendMail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log('Mail sent successfully.');
  } catch (error) {
    console.error('Error sending mail:', error.message);
  }
};

// Load and render email template
const renderTemplate = async (templateName, data) => {
  const templatePath = path.join(__dirname, '../templates', `${templateName}.ejs`);
  try {
    const template = await readFile(templatePath, 'utf-8');
    return ejs.render(template, data);
  } catch (error) {
    console.error('Error loading template:', error.message);
    throw error;
  }
};


// Send "Account Created Successfully" email
const sendAccountCreatedMail = async (user) => {
  try {
    const html = await renderTemplate('accountCreated', { user });
    const mailOptions = {
      from: '[email protected]',
      to: user.email,
      subject: 'Account Created Successfully',
      html
    };
    await sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending account created email:', error.message);
  }
};

// Send "Weather Alert" email
const sendWeatherAlertMail = async (alert) => {
  try {
    const html = await renderTemplate('weatherAlert', { alert });
    const mailOptions = {
      from: '[email protected]',
      to: alert.email,
      subject: 'Weather Alert Notification',
      html
    };
    await sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending weather alert email:', error.message);
  }
};

// Send "Weather Report" email
const sendWeatherReportMail = async (user, weatherReport) => {
  try {
    const html = await renderTemplate('weatherReport', { user, weatherReport });
    const mailOptions = {
      from: '[email protected]',
      to: user.email,
      subject: 'Your Weather Report',
      html
    };
    await sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending weather report email:', error.message);
  }
};

// Send "Every Day Report" email
const sendEveryDayReportMail = async (user, report) => {
  try {
    const html = await renderTemplate('everyDayReport', { user, report });
    const mailOptions = {
      from: '[email protected]',
      to: user.email,
      subject: 'Your Daily Report',
      html
    };
    await sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending daily report email:', error.message);
  }
};

module.exports = {
  sendAccountCreatedMail,
  sendWeatherAlertMail,
  sendWeatherReportMail,
  sendEveryDayReportMail
};
