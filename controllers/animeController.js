const {
  searchAnime,
  searchAnimeByGenre,
  getPopularAnime
} = require('../services/anilistService');
const { UserPreferences, WatchedAnime } = require('../models');

const searchAnimeByName = async (req, res) => {
  try {
    const { name } = req.query;
    const animeList = await searchAnime(name);
    res.send(animeList);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const searchAnimeByGenres = async (req, res) => {
  try {
    const { genre } = req.query;
    const animeList = await searchAnimeByGenre(genre);
    res.send(animeList);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Fetching recommendations for user:", userId);

    // 1. Get user preferences
    const preferences = await UserPreferences.findOne({ where: { userId } });
    
    // 2. If no preferences exist, return popular anime
    if (!preferences || !preferences.favoriteGenres || preferences.favoriteGenres.length === 0) {
      console.log("No preferences found, fetching popular anime");
      const popularAnime = await getPopularAnime();
      return res.json(popularAnime.slice(0, 10));
    }

    // 3. Get watched anime to exclude
    const watchedAnime = await WatchedAnime.findAll({ 
      where: { userId },
      attributes: ['animeId']
    });
    const watchedIds = watchedAnime.map(a => a.animeId);

    // 4. Get recommendations by genre
    const recommendations = [];
    const uniqueGenres = [...new Set(preferences.favoriteGenres)]; // Remove duplicates
    
    for (const genre of uniqueGenres) {
      try {
        const genreAnime = await searchAnimeByGenre(genre);
        const filteredAnime = genreAnime.filter(anime => !watchedIds.includes(anime.id));
        
        // Add only new anime to recommendations
        for (const anime of filteredAnime) {
          if (!recommendations.some(r => r.id === anime.id)) {
            recommendations.push(anime);
          }
        }
      } catch (genreError) {
        console.error(`Failed to fetch genre ${genre}:`, genreError.message);
      }
    }

    // 5. Sort by popularity and return top 10
    recommendations.sort((a, b) => b.popularity - a.popularity);
    res.json(recommendations.slice(0, 10));

  } catch (error) {
    console.error("Recommendation error:", error);
    res.status(500).json({ 
      error: "Failed to get recommendations",
      details: error.message 
    });
  }
};

module.exports = {
  searchAnimeByName,
  searchAnimeByGenres,
  getRecommendations
};