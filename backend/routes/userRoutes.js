const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  getUserRecipes,
  toggleFollow,
  updateProfile,
  getFavorites
} = require('../controllers/userController');
const { authenticate } = require('../middlewares/auth');

router.get('/:id', getUserProfile);
router.get('/:id/recipes', getUserRecipes);
router.post('/:id/follow', authenticate, toggleFollow);
router.put('/profile', authenticate, updateProfile);
router.get('/favorites/list', authenticate, getFavorites);

module.exports = router;

