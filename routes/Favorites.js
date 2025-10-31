const express = require('express');
const router = express.Router();
const Favorite = require('../models/favorite');

router.post('/favorites', async (req, res) => {
  try {
    const { title, image, sourceUrl } = req.body;
    const newFavorite = new Favorite({ title, image, sourceUrl });
    await newFavorite.save();
    res.status(201).json(newFavorite);
  } catch (err) {
    console.error('Error saving favorite:', err);
    res.status(500).json({ error: 'Failed to save favorite' });
  }
});


// DELETE /api/favorites/:id
router.delete('/favorites/:id', async (req, res) => {
  try {
    await Favorite.findByIdAndDelete(req.params.id);
    res.status(204).end(); // No content
  } catch (err) {
    console.error('Error deleting favorite:', err);
    res.status(500).json({ error: 'Failed to delete favorite' });
  }
});

module.exports = router;
