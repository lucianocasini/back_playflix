const axios = require('axios');
const { API_URL, API_KEY } = require('../config/api');
const { imageUrlGenerator } = require('../utils/images');

const getTvShow = async () => {
  const url = `${API_URL}/discover/tv?sort_by=popularity.desc&language=es-ES&api_key=${API_KEY}`;
  const tvshow = await axios.get(url).then((res) => res.data);
  tvshow.results = imageUrlGenerator(tvshow.results);

  return tvshow;
};

const getTvShowDetails = async (twshowId) => {
  const url = `${API_URL}/tv/${twshowId}?language=es-ES&api_key=${API_KEY}`;
  let tvshowDetails = await axios.get(url).then((res) => res.data);
  tvshowDetails = imageUrlGenerator([tvshowDetails])[0];
  tvshowDetails.title = tvshowDetails.name;
  tvshowDetails.release_date = tvshowDetails.first_air_date;

  return tvshowDetails;
};

module.exports = { getTvShow, getTvShowDetails };
