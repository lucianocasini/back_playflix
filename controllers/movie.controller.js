const { getMovies, getMovieDetails } = require('../services/movie.service');

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
    const movieDetails = await getMovieDetails(id);
    res.send(movieDetails);
  } catch (e) {
    next(e);
  }
};
