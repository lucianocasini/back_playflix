const { validateToken } = require('../utils/auth');

function validateUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  try {
    const user = validateToken(token);
    if (user) {
      req.user = user;
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    res.sendStatus(401);
  }
}

module.exports = validateUser;
