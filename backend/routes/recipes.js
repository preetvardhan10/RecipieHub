const express = require('express');
const { Recipe, User, Review, RecipeFavorite } = require('../models');
const { Op } = require('sequelize');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all recipes with pagination, filtering, and sorting
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;

    // Build filter
    const where = {};
    if (req.query.cuisine) where.cuisine = req.query.cuisine;
    if (req.query.difficulty) where.difficulty = req.query.difficulty;
    if (req.query.search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${req.query.search}%` } },
        { description: { [Op.iLike]: `%${req.query.search}%` } },
        { tags: { [Op.contains]: [req.query.search] } }
      ];
    }

    // Build sort
    let order = [['createdAt', 'DESC']];
    if (req.query.sortBy === 'rating') order = [['averageRating', 'DESC']];
    if (req.query.sortBy === 'time') order = [['cookingTime', 'ASC']];
    if (req.query.sortBy === 'date') order = [['createdAt', 'DESC']];

    const { count, rows: recipes } = await Recipe.findAndCountAll({
      where,
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'email']
      }],
      order,
      limit,
      offset
    });

    res.json({
      recipes,
      pagination: {
        page,
        limit,
        total: count,
        pages: Math.ceil(count / limit)
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

    const where = {};
    if (cuisine) where.cuisine = cuisine;
    if (difficulty) where.difficulty = difficulty;
    
    if (ingredients) {
      const ingredientList = ingredients.split(',').map(i => i.trim().toLowerCase());
      // Search in JSONB ingredients array
      where.ingredients = {
        [Op.contains]: ingredientList.map(ing => ({ name: { [Op.iLike]: `%${ing}%` } }))
      };
    }

    const recipes = await Recipe.findAll({
      where,
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'email']
      }],
      limit: 50
    });

    res.json({ recipes });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single recipe
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'email', 'bio', 'avatar']
        },
        {
          model: Review,
          as: 'reviews',
          include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'email', 'avatar']
          }]
        }
      ]
    });

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
      authorId: req.user.userId
    };

    const recipe = await Recipe.create(recipeData);
    await recipe.reload({
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'email']
      }]
    });

    res.status(201).json(recipe);
  } catch (error) {
    console.error('Create recipe error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Update recipe
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Check if user is author or admin
    if (recipe.authorId !== parseInt(req.user.userId) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await recipe.update(req.body);
    await recipe.reload({
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'email']
      }]
    });

    res.json(recipe);
  } catch (error) {
    console.error('Update recipe error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete recipe
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Check if user is author or admin
    if (recipe.authorId !== parseInt(req.user.userId) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await recipe.destroy();
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
    const recipe = await Recipe.findByPk(req.params.id);

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Check if user already reviewed
    const [review, created] = await Review.findOrCreate({
      where: {
        recipeId: recipe.id,
        userId: req.user.userId
      },
      defaults: {
        rating,
        comment: comment || ''
      }
    });

    if (!created) {
      await review.update({ rating, comment: comment || '' });
    }

    // Reload recipe with reviews to recalculate average
    await recipe.reload({
      include: [{
        model: Review,
        as: 'reviews',
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'avatar']
        }]
      }]
    });

    res.json(recipe);
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Toggle favorite
router.post('/:id/favorite', authenticateToken, async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    const [favorite, created] = await RecipeFavorite.findOrCreate({
      where: {
        recipeId: recipe.id,
        userId: req.user.userId
      }
    });

    let isFavorite;
    if (!created) {
      // Already favorited, remove it
      await favorite.destroy();
      isFavorite = false;
    } else {
      isFavorite = true;
    }

    const favoritesCount = await RecipeFavorite.count({
      where: { recipeId: recipe.id }
    });

    res.json({ isFavorite, favoritesCount });
  } catch (error) {
    console.error('Toggle favorite error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
