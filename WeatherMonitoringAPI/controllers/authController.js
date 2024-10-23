const authService = require('../services/authService');

// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Register Controller
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.register(email, password);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Forgot Password Controller
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const response = await authService.forgotPassword(email);
    res.status(response.status).json({ message: response.message });
  } catch (error) {
    res.status(500).json({ message: 'Error requesting password reset', error });
  }
};

// Reset Password Controller
exports.resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;
  try {
    const response = await authService.resetPassword(resetToken, newPassword);
    res.status(response.status).json({ message: response.message });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error });
  }
};
