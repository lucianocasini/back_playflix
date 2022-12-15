const User = require("./User");
const UserFavorites = require("./UserFavorites");

User.hasMany(UserFavorites);
UserFavorites.belongsTo(User, { foreignKey: "userId" });

module.exports = { User, UserFavorites };
