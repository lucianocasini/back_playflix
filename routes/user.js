const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');
const {
  validateRegister,
  validateLogin,
  validateAddFavorite,
} = require('../validators/user.validator');

// Get all users
router.get('/', userController.getUsers);

// Register
router.post('/', validateRegister, userController.createUser);

// Get logged user
router.get('/me', authMiddleware, userController.getLoggedUser);

// Login
router.post('/login', validateLogin, userController.loginUser);

// Logout
router.get('/logout', authMiddleware, userController.logoutUser);

// Get user favorites
router.get('/favorites', authMiddleware, userController.getFavorites);

// Add to favorite
router.post(
  '/favorites',
  [authMiddleware, validateAddFavorite],
  userController.addFavorite
);

// Remove favorite
router.delete('/favorites/:id', authMiddleware, userController.removeFavorite);

module.exports = router;
