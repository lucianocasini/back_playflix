const axios = require('axios');
const { API_URL, API_KEY } = require('../config/api');
const { imageUrlGenerator } = require('../utils/images');
const { isNumeric } = require('../utils/validations');

exports.getMovies = (req, res, next) => {
  const url = `${API_URL}/discover/movie?sort_by=popularity.desc&language=es-ES&api_key=${API_KEY}`;
  axios
    .get(url)
    .then((res) => res.data)
    .then((movies) => {
      movies.results = imageUrlGenerator(movies.results);
      res.send(movies);
    })
    .catch(next);
};

exports.getMovieDetails = (req, res, next) => {
  const { id } = req.params;
  if (!isNumeric(id)) return res.sendStatus(400);
  const url = `${API_URL}/movie/${id}?language=es-ES&api_key=${API_KEY}`;
  axios
    .get(url)
    .then((res) => res.data)
    .then((movie) => {
      movie = imageUrlGenerator([movie])[0];
      res.send(movie);
    })
    .catch(next);
};
