const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const WatchedAnime = sequelize.define('WatchedAnime', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  animeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  animeTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 10
    }
  }
});

module.exports = WatchedAnime;