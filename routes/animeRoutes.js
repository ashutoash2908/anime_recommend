const express = require('express');
const { 
  searchAnimeByName, 
  searchAnimeByGenres,
  getRecommendations
} = require('../controllers/animeController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/search', searchAnimeByName);
router.get('/search/genre', searchAnimeByGenres);
router.get('/recommendations', auth, getRecommendations);

module.exports = router;