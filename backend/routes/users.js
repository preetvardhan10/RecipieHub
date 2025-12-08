const express = require('express');
const { User, Recipe, UserFollow } = require('../models');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: User,
          as: 'followers',
          attributes: ['id', 'name', 'email', 'avatar'],
          through: { attributes: [] }
        },
        {
          model: User,
          as: 'following',
          attributes: ['id', 'name', 'email', 'avatar'],
          through: { attributes: [] }
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const recipes = await Recipe.findAll({
      where: { authorId: req.params.id },
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'email']
      }]
    });

    res.json({ user, recipes });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    if (parseInt(req.params.id) !== parseInt(req.user.userId) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.update(req.body);
    const updatedUser = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Follow/Unfollow user
router.post('/:id/follow', authenticateToken, async (req, res) => {
  try {
    if (parseInt(req.params.id) === parseInt(req.user.userId)) {
      return res.status(400).json({ error: 'Cannot follow yourself' });
    }

    const userToFollow = await User.findByPk(req.params.id);
    const currentUser = await User.findByPk(req.user.userId);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const [follow, created] = await UserFollow.findOrCreate({
      where: {
        followerId: req.user.userId,
        followingId: req.params.id
      }
    });

    let isFollowing;
    if (!created) {
      // Already following, unfollow
      await follow.destroy();
      isFollowing = false;
    } else {
      isFollowing = true;
    }

    res.json({ isFollowing });
  } catch (error) {
    console.error('Follow error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's recipes
router.get('/:id/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      where: { authorId: req.params.id },
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'email']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json(recipes);
  } catch (error) {
    console.error('Get user recipes error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's favorites
router.get('/:id/favorites', authenticateToken, async (req, res) => {
  try {
    if (parseInt(req.params.id) !== parseInt(req.user.userId)) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const user = await User.findByPk(req.user.userId, {
      include: [{
        model: Recipe,
        as: 'favorites',
        include: [{
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'email']
        }],
        through: { attributes: [] }
      }]
    });

    res.json(user.favorites || []);
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
