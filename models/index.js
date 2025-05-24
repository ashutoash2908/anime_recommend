const sequelize = require('../config/db');
const User = require('./user');
const UserPreferences = require('./userPreferences');
const WatchedAnime = require('./watchedAnime');

// Define relationships
User.hasOne(UserPreferences, { foreignKey: 'userId' });
UserPreferences.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(WatchedAnime, { foreignKey: 'userId' });
WatchedAnime.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  UserPreferences,
  WatchedAnime
};