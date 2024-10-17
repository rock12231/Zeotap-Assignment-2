// index.js
const cors = require('cors');
const express = require('express');
const sequelize  = require('./config/database'); 
const weatherRoutes = require('./routes/weather');
const authRoutes = require('./routes/auth'); // Include auth routes
require("./scheduler");
const app = express();
app.use(cors());
app.use(express.json());

// Authentication routes
app.use('/api/auth', authRoutes);

// Weather routes
app.use('/api/weather', weatherRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    await sequelize.sync(); // Sync database
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing the database:', error.message);
  }
});
