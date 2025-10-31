const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

const app = express(); // ✅ Declare app first

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Debug: Show Mongo URI
console.log('Mongo URI:', process.env.MONGO_URI);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
const recipeRoutes = require('./routes/recipes');
const favoriteRoutes = require('./routes/Favorites'); // ✅ Use correct path and casing

app.use('/api', recipeRoutes);
app.use('/api', favoriteRoutes); // ✅ Now safe to use

// Default route
app.get('/', (req, res) => {
  res.send('Recipe Finder backend is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
