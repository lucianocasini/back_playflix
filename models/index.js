const User = require('./User.model');
const UserFavorites = require('./UserFavorites.model');

User.hasMany(UserFavorites);
UserFavorites.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, UserFavorites };
