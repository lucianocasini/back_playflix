const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");

router.get("/", userController.getUsers);
router.post("/", userController.createUser);
router.get("/me", authMiddleware, userController.getLoggedUser);
router.post("/login", userController.loginUser);
router.get("/logout", authMiddleware, userController.logoutUser);
router.get("/favorites", authMiddleware, userController.getFavorites);
router.post("/favorites", authMiddleware, userController.addFavorite);
router.delete("/favorites/:id", authMiddleware, userController.removeFavorite);

module.exports = router;
