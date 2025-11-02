// api/recipes.js
import axios from 'axios';

export default async function handler(req, res) {
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
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Spoonacular error:', error.message);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
}
