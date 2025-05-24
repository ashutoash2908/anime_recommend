const { User, UserPreferences } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const user = await User.create({ username, email, password });
    await UserPreferences.create({ userId: user.id, favoriteGenres: [] });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).send({ user, token });
  } catch (error) {
    // Improved error logging
    console.error("Detailed error:", error.errors); // Log Sequelize validation errors
    res.status(400).send({ 
      error: error.errors ? error.errors.map(e => e.message) : error.message 
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Unable to login');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { register, login };