const { getSequelize } = require('../config/database');
const sequelize = getSequelize();
const User = require('./User');
const Recipe = require('./Recipe');
const Review = require('./Review');
const MealPlan = require('./MealPlan');

// Define associations
User.hasMany(Recipe, { foreignKey: 'authorId', as: 'recipes' });
Recipe.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Recipe.hasMany(Review, { foreignKey: 'recipeId', as: 'reviews' });
Review.belongsTo(Recipe, { foreignKey: 'recipeId', as: 'recipe' });

User.hasMany(MealPlan, { foreignKey: 'userId', as: 'mealPlans' });
MealPlan.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Many-to-many relationship for favorites (using a join table)
const RecipeFavorite = sequelize.define('RecipeFavorite', {
  id: {
    type: sequelize.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, { timestamps: true });

User.belongsToMany(Recipe, { through: RecipeFavorite, as: 'favorites', foreignKey: 'userId' });
Recipe.belongsToMany(User, { through: RecipeFavorite, as: 'favoritedBy', foreignKey: 'recipeId' });

// Many-to-many relationship for followers
const UserFollow = sequelize.define('UserFollow', {
  id: {
    type: sequelize.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, { timestamps: true });

User.belongsToMany(User, { 
  through: UserFollow, 
  as: 'followers', 
  foreignKey: 'followingId',
  otherKey: 'followerId'
});

User.belongsToMany(User, { 
  through: UserFollow, 
  as: 'following', 
  foreignKey: 'followerId',
  otherKey: 'followingId'
});

module.exports = {
  sequelize,
  User,
  Recipe,
  Review,
  MealPlan,
  RecipeFavorite,
  UserFollow
};
