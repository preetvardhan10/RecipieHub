const { DataTypes } = require('sequelize');
const { getSequelize } = require('../config/database');
const sequelize = getSequelize();

const Recipe = sequelize.define('Recipe', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ingredients: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: []
  },
  instructions: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: false,
    defaultValue: []
  },
  cookingTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  servings: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    defaultValue: 'medium'
  },
  cuisine: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  averageRating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5
    }
  },
  totalRatings: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true,
  hooks: {
    afterUpdate: async (recipe) => {
      // Recalculate average rating when reviews change
      const Review = require('./Review');
      const reviews = await Review.findAll({
        where: { recipeId: recipe.id }
      });
      if (reviews.length > 0) {
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        recipe.averageRating = (sum / reviews.length).toFixed(2);
        recipe.totalRatings = reviews.length;
        await recipe.save();
      }
    }
  }
});

module.exports = Recipe;
