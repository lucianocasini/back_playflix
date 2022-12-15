const { sign, verify } = require('jsonwebtoken');
const TOKEN_PASSPHRASE = process.env.TOKEN_PASSPHRASE;

function generateToken(payload) {
  return sign(payload, TOKEN_PASSPHRASE, { expiresIn: '1d' });
}

function validateToken(token) {
  return verify(token, TOKEN_PASSPHRASE);
}

module.exports = { generateToken, validateToken };
