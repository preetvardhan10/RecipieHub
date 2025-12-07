const express = require('express');
const Recipe = require('../models/Recipe');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all recipes with pagination, filtering, and sorting
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Build filter
    const filter = {};
    if (req.query.cuisine) filter.cuisine = req.query.cuisine;
    if (req.query.difficulty) filter.difficulty = req.query.difficulty;
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { tags: { $in: [new RegExp(req.query.search, 'i')] } }
      ];
    }

    // Build sort
    let sort = { createdAt: -1 };
    if (req.query.sortBy === 'rating') sort = { averageRating: -1 };
    if (req.query.sortBy === 'time') sort = { cookingTime: 1 };
    if (req.query.sortBy === 'date') sort = { createdAt: -1 };

    const recipes = await Recipe.find(filter)
      .populate('author', 'name email')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Recipe.countDocuments(filter);

    res.json({
      recipes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get recipes error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Search recipes by ingredients
router.get('/search', async (req, res) => {
  try {
    const { ingredients, cuisine, difficulty } = req.query;

    const filter = {};
    if (cuisine) filter.cuisine = cuisine;
    if (difficulty) filter.difficulty = difficulty;
    if (ingredients) {
      const ingredientList = ingredients.split(',').map(i => i.trim());
      filter['ingredients.name'] = { $in: ingredientList.map(i => new RegExp(i, 'i')) };
    }

    const recipes = await Recipe.find(filter)
      .populate('author', 'name email')
      .limit(50);

    res.json({ recipes });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single recipe
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('author', 'name email bio avatar')
      .populate('reviews.user', 'name email avatar');

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (error) {
    console.error('Get recipe error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create recipe
router.post('/', authenticateToken, async (req, res) => {
  try {
    const recipeData = {
      ...req.body,
      author: req.user.userId
    };

    const recipe = new Recipe(recipeData);
    await recipe.save();
    await recipe.populate('author', 'name email');

    res.status(201).json(recipe);
  } catch (error) {
    console.error('Create recipe error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Update recipe
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Check if user is author or admin
    if (recipe.author.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    Object.assign(recipe, req.body);
    await recipe.save();
    await recipe.populate('author', 'name email');

    res.json(recipe);
  } catch (error) {
    console.error('Update recipe error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete recipe
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Check if user is author or admin
    if (recipe.author.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Delete recipe error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add review/rating
router.post('/:id/reviews', authenticateToken, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Check if user already reviewed
    const existingReview = recipe.reviews.find(
      r => r.user.toString() === req.user.userId
    );

    if (existingReview) {
      existingReview.rating = rating;
      existingReview.comment = comment || '';
    } else {
      recipe.reviews.push({
        user: req.user.userId,
        rating,
        comment: comment || ''
      });
    }

    await recipe.save();
    await recipe.populate('reviews.user', 'name email avatar');

    res.json(recipe);
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Toggle favorite
router.post('/:id/favorite', authenticateToken, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    const index = recipe.favorites.indexOf(req.user.userId);
    if (index > -1) {
      recipe.favorites.splice(index, 1);
    } else {
      recipe.favorites.push(req.user.userId);
    }

    await recipe.save();
    res.json({ isFavorite: index === -1, favoritesCount: recipe.favorites.length });
  } catch (error) {
    console.error('Toggle favorite error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

