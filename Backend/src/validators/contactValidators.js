const { body } = require('express-validator');

const VALID_STATUSES = ['lead', 'prospect', 'client', 'inactif'];

exports.createContactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('Email must be a valid email address'),
  body('status')
    .optional({ checkFalsy: true })
    .isIn(VALID_STATUSES)
    .withMessage(`Status must be one of: ${VALID_STATUSES.join(', ')}`),
];

exports.updateContactValidation = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('Email must be a valid email address'),
  body('status')
    .optional({ checkFalsy: true })
    .isIn(VALID_STATUSES)
    .withMessage(`Status must be one of: ${VALID_STATUSES.join(', ')}`),
];