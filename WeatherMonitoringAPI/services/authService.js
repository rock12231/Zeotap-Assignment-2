const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { Op } = require('sequelize');
const mailService = require('./mailService');

// Login Service
exports.login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Error('Invalid credentials');
  }
  
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

// Register Service
exports.register = async (email, password) => {
  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = await User.create({ email, password: hashedPassword });
  await mailService.sendAccountCreatedMail(user);
  return user;
};

// Forgot Password Service
exports.forgotPassword = async (email) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return { status: 404, message: 'User not found' };
  
      const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
      const resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes
  
      user.resetToken = resetToken;
      user.resetTokenExpiry = resetTokenExpiry;
      await user.save();
    //   await mailService.sendAccountCreatedMail(user);
  
      return { status: 200, message: 'Password reset code sent!' };
    } catch (error) {
      throw new Error('Error requesting password reset');
    }
  };
  
  // Reset Password Service
  exports.resetPassword = async (resetToken, newPassword) => {
    try {
      const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
      const user = await User.findOne({
        where: {
          id: decoded.id,
          resetToken: resetToken,
          resetTokenExpiry: { [Op.gt]: Date.now() }
        }
      });
  
      if (!user) return { status: 400, message: 'Invalid or expired token' };
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetToken = null;
      user.resetTokenExpiry = null;
      await user.save();
  
      return { status: 200, message: 'Password reset successfully' };
    } catch (error) {
      throw new Error('Error resetting password');
    }
  };

