// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const transporter = require('../config/smtpConfig');
const { Op } = require('sequelize');
require('dotenv').config();

const router = express.Router();

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.status(200).json({ token, message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Send email
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject: 'Password Reset Code',
      text: `Your password reset code is ${resetToken}. It expires in 15 minutes.`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return res.status(500).json({ message: 'Error sending email', err });
      res.status(200).json({ message: 'Password reset code sent!' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error requesting password reset', error });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  const { resetToken, newPassword } = req.body;
  try {
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    const user = await User.findOne({
      where: {
        id: decoded.id,
        resetToken: resetToken,
        resetTokenExpiry: { [Op.gt]: Date.now() }
      }
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error });
  }
});

module.exports = router;
