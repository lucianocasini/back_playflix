const S = require("sequelize");
const db = require("../config/db");

class UserFavorites extends S.Model {}

UserFavorites.init(
  {
    title: {
      type: S.STRING,
      allowNull: false,
    },
    poster: {
      type: S.STRING,
    },
    contentType: {
      type: S.ENUM("movie", "tv-show"),
      allowNull: false,
    },
    contentId: {
      type: S.INTEGER,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "userFavorites" }
);

module.exports = UserFavorites;
