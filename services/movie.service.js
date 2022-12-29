const axios = require('axios');
const { API_URL, API_KEY } = require('../config/api');
const { imageUrlGenerator } = require('../utils/images');

const getMovies = async () => {
  const url = `${API_URL}/discover/movie?sort_by=popularity.desc&language=es-ES&api_key=${API_KEY}`;
  const movies = await axios.get(url).then((res) => res.data);
  movies.results = imageUrlGenerator(movies.results);

  return movies;
};

const getMovieDetails = async (movieId) => {
  const url = `${API_URL}/movie/${movieId}?language=es-ES&api_key=${API_KEY}`;
  let movieDetails = await axios.get(url).then((res) => res.data);
  movieDetails = imageUrlGenerator([movieDetails])[0];

  return movieDetails;
};

module.exports = { getMovies, getMovieDetails };
