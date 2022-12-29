const express = require('express');
const router = express.Router();
const tvshowController = require('../controllers/tvshow.controller');
const { validateGetTvshow } = require('../validators/tvshow.validator');

router.get('/', tvshowController.getTvShow);
router.get('/:id', validateGetTvshow, tvshowController.getTvShowDetails);

module.exports = router;
