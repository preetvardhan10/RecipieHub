const { prisma } = require('../config/database');

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Public
const getUserProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        avatar: true,
        bio: true,
        followers: true,
        following: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user's recipes count
    const recipeCount = await prisma.recipe.count({
      where: { authorId: user.id }
    });

    res.json({
      success: true,
      data: {
        user: {
          ...user,
          recipeCount
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user profile',
      error: error.message
    });
  }
};

// @desc    Get user's recipes
// @route   GET /api/users/:id/recipes
// @access  Public
const getUserRecipes = async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [recipes, totalResults] = await Promise.all([
      prisma.recipe.findMany({
        where: { authorId: req.params.id },
        include: {
          author: {
            select: {
              id: true,
              username: true,
              avatar: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum
      }),
      prisma.recipe.count({
        where: { authorId: req.params.id }
      })
    ]);

    const totalPages = Math.ceil(totalResults / limitNum);

    res.json({
      success: true,
      data: {
        recipes,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalResults,
          limit: limitNum
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user recipes',
      error: error.message
    });
  }
};

// @desc    Follow/Unfollow user
// @route   POST /api/users/:id/follow
// @access  Private
const toggleFollow = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.user.id;

    if (targetUserId === currentUserId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot follow yourself'
      });
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: currentUserId }
    });

    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId }
    });

    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const following = currentUser.following || [];
    const followers = targetUser.followers || [];
    const isFollowing = following.includes(targetUserId);

    // Update both users in a transaction
    await prisma.$transaction([
      prisma.user.update({
        where: { id: currentUserId },
        data: {
          following: isFollowing
            ? { set: following.filter(id => id !== targetUserId) }
            : { set: [...following, targetUserId] }
        }
      }),
      prisma.user.update({
        where: { id: targetUserId },
        data: {
          followers: isFollowing
            ? { set: followers.filter(id => id !== currentUserId) }
            : { set: [...followers, currentUserId] }
        }
      })
    ]);

    res.json({
      success: true,
      message: isFollowing ? 'Unfollowed successfully' : 'Followed successfully',
      data: { isFollowing: !isFollowing }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update follow status',
      error: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { username, bio, avatar } = req.body;
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    const updateData = {};

    if (username && username !== user.username) {
      // Check if username is taken
      const existingUser = await prisma.user.findUnique({
        where: { username }
      });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Username already taken'
        });
      }
      updateData.username = username;
    }

    if (bio !== undefined) updateData.bio = bio;
    if (avatar !== undefined) updateData.avatar = avatar;

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        bio: true,
        role: true
      }
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user: updatedUser }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
};

// @desc    Get user's favorites
// @route   GET /api/users/favorites
// @access  Private
const getFavorites = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { favorites: true }
    });

    const favoriteIds = user.favorites || [];

    if (favoriteIds.length === 0) {
      return res.json({
        success: true,
        data: { favorites: [] }
      });
    }

    const favorites = await prisma.recipe.findMany({
      where: { id: { in: favoriteIds } },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: { favorites }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch favorites',
      error: error.message
    });
  }
};

module.exports = {
  getUserProfile,
  getUserRecipes,
  toggleFollow,
  updateProfile,
  getFavorites
};
