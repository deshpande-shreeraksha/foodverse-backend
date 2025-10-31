const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/search', async (req, res) => {
  const { ingredients } = req.query;
  try {
    const response = await axios.get(
      'https://api.spoonacular.com/recipes/findByIngredients',
      {
        params: {
          ingredients,
          number: 10,
          apiKey: process.env.SPOONACULAR_API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

module.exports = router;
