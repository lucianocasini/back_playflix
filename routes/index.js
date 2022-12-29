const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');
const movieController = require('./movie.routes');
const tvshowController = require('./tvshow.routes');
const searchController = require('./search.routes');

router.use('/user', userRoutes);
router.use('/movie', movieController);
router.use('/tv-show', tvshowController);
router.use('/search', searchController);

module.exports = router;
