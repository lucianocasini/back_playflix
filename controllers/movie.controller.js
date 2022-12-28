const { getMovies, getMovieDetails } = require('../services/movie.service');
const { isNumeric } = require('../utils/validations');

exports.getMovies = async (req, res, next) => {
  try {
    const movies = await getMovies();
    res.send(movies);
  } catch (e) {
    next(e);
  }
};

exports.getMovieDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isNumeric(id)) return res.sendStatus(400);
    const movieDetails = await getMovieDetails(id);
    res.send(movieDetails);
  } catch (e) {
    next(e);
  }
};
