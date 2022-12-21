const { check } = require('express-validator');
const { User, UserFavorites } = require('../models');
const { validateResult } = require('../utils/validate');

const validateRegister = [
  check('username')
    .notEmpty()
    .withMessage('Ingrese un nombre de usuario')
    .bail()
    .isAlphanumeric()
    .withMessage('El nombre de usuario debe ser alfanumérico')
    .custom(async (value) => {
      const userExists = await User.findOne({
        where: { username: value },
      });
      if (userExists) {
        throw new Error('El usuario ya se encuentra en uso');
      }
      return true;
    }),
  check('email')
    .notEmpty()
    .withMessage('Ingrese su correo electrónico')
    .bail()
    .isEmail()
    .withMessage('Ingrese un email válido')
    .custom(async (value) => {
      const userExists = await User.findOne({
        where: { email: value },
      });
      if (userExists) {
        throw new Error('El email ya se encuentra en uso');
      }
      return true;
    }),
  check('password').notEmpty().withMessage('Ingrese una contraseña'),
  check('confirmPassword')
    .notEmpty()
    .withMessage('Ingrese la confirmación de contraseña')
    .custom((value, { req }) => {
      if (req.body.password !== value) {
        throw new Error('Las contraseñas no coinciden');
      }
      return true;
    }),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateLogin = [
  check('username')
    .notEmpty()
    .withMessage('Ingrese su nombre de usuario')
    .custom(async (value) => {
      const user = await User.findOne({ where: { username: value } });
      if (!user) throw new Error('Usuario o contraseña incorrectos');
    }),
  check('password').notEmpty().withMessage('Ingrese su contraseña'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateAddFavorite = [
  check('id')
    .notEmpty()
    .withMessage('ID de contenido es requerido')
    .bail()
    .isInt()
    .withMessage('ID debe ser un número entero'),
  check('type')
    .notEmpty()
    .withMessage('Tipo de contenido es requerido')
    .bail()
    .isIn(['movie', 'tv-show'])
    .withMessage('Tipo de contenido inválido')
    .custom(async (value, { req }) => {
      const favoriteExists = await UserFavorites.findOne({
        where: {
          contentId: req.body.id,
          contentType: value,
          userId: req.user.id,
        },
      });
      if (favoriteExists)
        throw new Error('Este contenido ya fue añadido a favoritos');
    }),
  check('title').notEmpty().withMessage('Titulo de contenido es requerido'),
  check('poster')
    .notEmpty()
    .withMessage('Poster es requerido')
    .bail()
    .isURL()
    .withMessage('Poster debe ser una URL'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateRegister, validateLogin, validateAddFavorite };
