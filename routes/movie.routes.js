const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');

router.get('/', movieController.getMovies);
router.get('/:id', movieController.getMovieDetails);

module.exports = router;
