const { check } = require('express-validator');
const { validateResult } = require('../utils/validate');

const validateGetMovie = [
  check('id')
    .notEmpty()
    .withMessage('ID de película es requerido')
    .isInt()
    .withMessage('ID debe ser un número entero'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateGetMovie };
