const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const { validateGetMovie } = require('../validators/movie.validator');

router.get('/', movieController.getMovies);
router.get('/:id', validateGetMovie, movieController.getMovieDetails);

module.exports = router;
