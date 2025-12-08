const express = require('express');
const router = express.Router();
const {
  createReview,
  getRecipeReviews,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');
const { validateReview } = require('../middlewares/validator');
const { authenticate } = require('../middlewares/auth');

router.post('/', authenticate, validateReview, createReview);
router.get('/recipe/:recipeId', getRecipeReviews);
router.put('/:id', authenticate, updateReview);
router.delete('/:id', authenticate, deleteReview);

module.exports = router;

