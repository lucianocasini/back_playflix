const express = require("express");
const router = express.Router();
const tvshowController = require("../controllers/tvshowController");

router.get("/", tvshowController.getTvShow);
router.get("/:id", tvshowController.getTvShowDetails);

module.exports = router;
