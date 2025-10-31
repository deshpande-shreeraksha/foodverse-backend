const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const favoriteSchema = new mongoose.Schema({
  title: String,
  image: String,
  sourceUrl: String
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

app.get('/api/favorites', async (req, res) => {
  const favorites = await Favorite.find();
  res.json(favorites);
});

app.delete('/api/favorites/:id', async (req, res) => {
  await Favorite.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
