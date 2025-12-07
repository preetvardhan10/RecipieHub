const express = require('express');
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('followers', 'name email avatar')
      .populate('following', 'name email avatar');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const recipes = await Recipe.find({ author: req.params.id })
      .populate('author', 'name email');

    res.json({ user, recipes });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    if (req.params.id !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Follow/Unfollow user
router.post('/:id/follow', authenticateToken, async (req, res) => {
  try {
    if (req.params.id === req.user.userId) {
      return res.status(400).json({ error: 'Cannot follow yourself' });
    }

    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.userId);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isFollowing = currentUser.following.includes(req.params.id);

    if (isFollowing) {
      currentUser.following.pull(req.params.id);
      userToFollow.followers.pull(req.user.userId);
    } else {
      currentUser.following.push(req.params.id);
      userToFollow.followers.push(req.user.userId);
    }

    await currentUser.save();
    await userToFollow.save();

    res.json({ isFollowing: !isFollowing });
  } catch (error) {
    console.error('Follow error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's recipes
router.get('/:id/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find({ author: req.params.id })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    res.json(recipes);
  } catch (error) {
    console.error('Get user recipes error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's favorites
router.get('/:id/favorites', authenticateToken, async (req, res) => {
  try {
    if (req.params.id !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const recipes = await Recipe.find({ favorites: req.user.userId })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    res.json(recipes);
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

