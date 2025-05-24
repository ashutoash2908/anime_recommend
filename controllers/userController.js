const { UserPreferences } = require('../models');

const updatePreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    const { favoriteGenres } = req.body;
    
    const [preferences, created] = await UserPreferences.findOrCreate({
      where: { userId },
      defaults: { favoriteGenres }
    });
    
    if (!created) {
      preferences.favoriteGenres = favoriteGenres;
      await preferences.save();
    }
    
    res.send(preferences);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getPreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    const preferences = await UserPreferences.findOne({ where: { userId } });
    
    if (!preferences) {
      return res.send({ favoriteGenres: [] });
    }
    
    res.send(preferences);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  updatePreferences,
  getPreferences
};