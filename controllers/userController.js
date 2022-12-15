const { User, UserFavorites } = require("../models");
const { generateToken } = require("../config/auth");
const { Op } = require("sequelize");

exports.getUsers = (req, res, next) => {
  User.findAll()
    .then((users) => res.send(users))
    .catch(next);
};

exports.createUser = async (req, res, next) => {
  const userExists = await User.findOne({
    where: {
      [Op.or]: [{ username: req.body.username }, { email: req.body.email }],
    },
  });
  if (userExists)
    return res.status(409).send("El usuario o email ya se encuentra en uso");

  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch(next);
};

exports.addFavorite = async (req, res, next) => {
  const { id, type, title, poster } = req.body;
  const user = req.user;
  const favoriteExists = await UserFavorites.findOne({
    where: { contentId: id, contentType: type, userId: user.id },
  }).catch(next);
  if (favoriteExists)
    return res.status(409).send("Este contenido ya fue añadido a favoritos");

  UserFavorites.create({
    title,
    poster,
    contentId: id,
    contentType: type,
    userId: user.id,
  })
    .then(({ id, title, poster, contentId, contentType }) => {
      const favItem = { id, title, poster, contentId, contentType };
      res.status(201).send(favItem);
    })
    .catch(next);
};

exports.removeFavorite = (req, res, next) => {
  const { id } = req.params;
  const user = req.user;
  UserFavorites.destroy({ where: { id, userId: user.id } })
    .then(() => res.sendStatus(204))
    .catch(next);
};

exports.getFavorites = (req, res, next) => {
  const { type } = req.query;
  const user = req.user;
  let where = { userId: user.id };
  if (type) where = { ...where, contentType: type };
  UserFavorites.findAll({
    where,
    attributes: ["id", "contentId", "contentType", "title", "poster"],
  })
    .then((favs) => res.send(favs))
    .catch(next);
};

exports.getLoggedUser = (req, res, next) => {
  res.send(req.user);
};

exports.loginUser = (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ where: { username } })
    .then((user) => {
      if (!user)
        return res.status(400).send("Usuario o contraseña incorrectos");

      user.validatePassword(password).then((isValid) => {
        if (!isValid)
          return res.status(400).send("Usuario o contraseña incorrectos");
        const userData = {
          id: user.id,
          username: user.username,
          email: user.email,
        };
        const token = generateToken(userData);
        res.cookie("token", token);
        res.json(userData);
      });
    })
    .catch(next);
};

exports.logoutUser = (req, res, next) => {
  res.clearCookie("token");
  res.sendStatus(200);
};
