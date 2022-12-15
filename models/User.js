const S = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt");

class User extends S.Model {}

User.init(
  {
    username: {
      type: S.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: S.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    salt: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: "user" }
);

User.prototype.validatePassword = function (password) {
  return bcrypt
    .hash(password, this.salt)
    .then((hash) => hash === this.password);
};

User.prototype.generateHash = function (password, salt) {
  return bcrypt.hash(password, salt);
};

User.addHook("beforeCreate", (user) => {
  user.salt = bcrypt.genSaltSync();
  return user
    .generateHash(user.password, user.salt)
    .then((hash) => (user.password = hash));
});

module.exports = User;
