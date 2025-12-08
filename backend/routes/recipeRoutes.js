const express = require('express');
const router = express.Router();
const {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  rateRecipe,
  toggleFavorite,
  searchRecipes
} = require('../controllers/recipeController');
const { validateRecipe } = require('../middlewares/validator');
const { authenticate, isOwnerOrAdmin } = require('../middlewares/auth');

router.get('/', getRecipes);
router.get('/search', searchRecipes);
router.get('/:id', getRecipe);
router.post('/', authenticate, validateRecipe, createRecipe);
router.put('/:id', authenticate, isOwnerOrAdmin('Recipe'), validateRecipe, updateRecipe);
router.delete('/:id', authenticate, isOwnerOrAdmin('Recipe'), deleteRecipe);
router.post('/:id/rate', authenticate, rateRecipe);
router.post('/:id/favorite', authenticate, toggleFavorite);

module.exports = router;

