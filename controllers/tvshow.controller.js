const axios = require("axios");
const { API_URL, API_KEY } = require("../config/api");
const { imageUrlGenerator } = require("../utils/images");
const { isNumeric } = require("../utils/validations");

exports.getTvShow = (req, res, next) => {
  const url = `${API_URL}/discover/tv?sort_by=popularity.desc&language=es-ES&api_key=${API_KEY}`;
  axios
    .get(url)
    .then((res) => res.data)
    .then((tv) => {
      tv.results = imageUrlGenerator(tv.results);
      res.send(tv);
    })
    .catch(next);
};

exports.getTvShowDetails = (req, res, next) => {
  const { id } = req.params;
  if (!isNumeric(id)) return res.sendStatus(400);
  const url = `${API_URL}/tv/${id}?language=es-ES&api_key=${API_KEY}`;
  axios
    .get(url)
    .then((res) => res.data)
    .then((tvshow) => {
      tvshow = imageUrlGenerator([tvshow])[0];
      tvshow.title = tvshow.name;
      tvshow.release_date = tvshow.first_air_date;
      res.send(tvshow);
    })
    .catch(next);
};
