const { check } = require('express-validator');

exports.loginValidator = [
  check('email').isEmail().withMessage('E-mail inválido'),
  check('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres')
];