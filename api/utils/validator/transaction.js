import { query, body } from 'express-validator';

// Validation rules for GET /api/transactions
export const validateIndex = [
  query('type')
    .optional()
    .isIn(['Stake', 'Borrow', 'Lend'])
    .withMessage('Invalid transaction type')
];

// Validation rules for POST /api/transactions
export const validateCreate = [
  body('transactionType')
    .exists()
    .withMessage('transactionType is required')
    .isIn(['Stake', 'Borrow', 'Lend'])
    .withMessage('Invalid transaction type'),
  body('token')
    .exists()
    .withMessage('token is required')
    .isString()
    .withMessage('token must be a string')
    .notEmpty()
    .withMessage('token cannot be empty'),
  body('amount')
    .exists()
    .withMessage('amount is required')
    .isNumeric()
    .withMessage('amount must be a number')
    .custom((value) => value > 0)
    .withMessage('amount must be positive')
];

// Validation rules for PUT /api/transactions/:id
export const validateUpdate = [
  body('status')
    .exists()
    .withMessage('status is required')
    .isIn(['pending', 'completed', 'failed', 'cancelled'])
    .withMessage('Invalid status'),
  body('description')
    .optional()
    .isString()
    .withMessage('description must be a string')
];