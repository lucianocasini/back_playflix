const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const movieController = require("./movie");
const tvshowController = require("./tvshow");
const searchController = require("./search");

router.use("/user", userRoutes);
router.use("/movie", movieController);
router.use("/tv-show", tvshowController);
router.use("/search", searchController);

module.exports = router;
