const axios = require('axios');

const ANILIST_API = 'https://graphql.anilist.co';

const searchAnime = async (searchTerm) => {
  const query = `
    query ($search: String) {
      Page {
        media(search: $search, type: ANIME) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
          }
          genres
          averageScore
          popularity
          episodes
          status
          description
        }
      }
    }
  `;

  try {
    const response = await axios.post(ANILIST_API, {
      query,
      variables: { search: searchTerm }
    });
    return response.data.data.Page.media;
  } catch (error) {
    console.error('Error searching anime:', error);
    throw error;
  }
};

const searchAnimeByGenre = async (genre) => {
  const query = `
    query ($genre: String) {
      Page {
        media(genre: $genre, type: ANIME, sort: POPULARITY_DESC) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
          }
          genres
          averageScore
          popularity
          episodes
          status
          description
        }
      }
    }
  `;

  try {
    const response = await axios.post(ANILIST_API, {
      query,
      variables: { genre }
    });
    return response.data.data.Page.media;
  } catch (error) {
    console.error('Error searching anime by genre:', error);
    throw error;
  }
};

const getPopularAnime = async () => {
  const query = `
    query {
      Page {
        media(type: ANIME, sort: POPULARITY_DESC, perPage: 10) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
          }
          genres
          averageScore
          popularity
          episodes
          status
          description
        }
      }
    }
  `;

  try {
    const response = await axios.post(ANILIST_API, { query });
    return response.data.data.Page.media;
  } catch (error) {
    console.error('Error fetching popular anime:', error);
    throw error;
  }
};

module.exports = {
  searchAnime,
  searchAnimeByGenre,
  getPopularAnime
};