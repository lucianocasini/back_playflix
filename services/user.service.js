const { User, UserFavorites } = require('../models');

const getUsers = () => {
  return User.findAll();
};

const createUser = (userData) => {
  return User.create(userData);
};

const loginUser = async (username, password) => {
  const user = await User.findOne({ where: { username } });
  const isValid = await user.validatePassword(password);
  if (isValid) {
    return user;
  }
};

const getFavorites = async (userId, contentType) => {
  let where = { userId };
  if (contentType) where = { ...where, contentType };

  const favorites = await UserFavorites.findAll({
    where,
    attributes: ['id', 'contentId', 'contentType', 'title', 'poster'],
  });

  return favorites;
};

const addFavorite = async (contentData) => {
  const favorite = await UserFavorites.create(contentData);
  return favorite;
};

const removeFavorite = async (id, userId) => {
  const removedFavorite = await UserFavorites.destroy({
    where: { id, userId },
  });
  return removedFavorite;
};

module.exports = {
  getUsers,
  createUser,
  loginUser,
  getFavorites,
  addFavorite,
  removeFavorite,
};
