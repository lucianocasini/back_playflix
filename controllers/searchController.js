const axios = require("axios");
const { API_URL, API_KEY } = require("../config/api");
const { imageUrlGenerator } = require("../utils/images");

exports.search = (req, res, next) => {
  const { query } = req.query;
  if (!query) return res.sendStatus(400);

  const url_movies = `${API_URL}/search/movie?query=${query}&include_adult=false&language=es-ES&api_key=${API_KEY}`;
  const url_tvshow = `${API_URL}/search/tv?query=${query}&include_adult=false&language=es-ES&api_key=${API_KEY}`;

  Promise.all([axios.get(url_movies), axios.get(url_tvshow)])
    .then((results) => {
      const movies = imageUrlGenerator([...results[0].data.results]);
      const tvshow = imageUrlGenerator([...results[1].data.results]);

      res.send({
        movies,
        tvshow,
      });
    })
    .catch(next);
};
