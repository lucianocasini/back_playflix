const { generateToken } = require('../config/auth');
const {
  getUsers,
  createUser,
  loginUser,
  addFavorite,
  removeFavorite,
  getFavorites,
} = require('../services/user');
const { errorTemplate } = require('../utils/validate');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await getUsers();
    res.send(users);
  } catch (e) {
    next(e);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    const userCreated = await createUser(userData);
    res.status(201).send(userCreated);
  } catch (e) {
    next(e);
  }
};

exports.getLoggedUser = (req, res, next) => {
  try {
    res.send(req.user);
  } catch (e) {
    next(e);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await loginUser(username, password);

    if (!user)
      return res
        .status(400)
        .send(errorTemplate('Usuario o contraseña incorrectos'));

    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = generateToken(userData);
    res.cookie('token', token);
    res.json(userData);
  } catch (e) {
    next(e);
  }
};

exports.logoutUser = (req, res, next) => {
  res.clearCookie('token');
  res.sendStatus(200);
};

exports.addFavorite = async (req, res, next) => {
  try {
    const user = req.user;

    const favoriteData = {
      title: req.body.title,
      poster: req.body.poster,
      contentId: req.body.id,
      contentType: req.body.type,
      userId: user.id,
    };

    const favorite = await addFavorite(favoriteData);
    const { id, title, poster, contentId, contentType } = favorite;
    res.status(201).send({ id, title, poster, contentId, contentType });
  } catch (e) {
    next(e);
  }
};

exports.removeFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    await removeFavorite(id, userId);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

exports.getFavorites = async (req, res, next) => {
  try {
    const { type } = req.query;
    const userId = req.user.id;
    const favorites = await getFavorites(userId, type);
    res.send(favorites);
  } catch (e) {
    next(e);
  }
};
