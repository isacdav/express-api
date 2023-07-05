import { body } from 'express-validator';
import { User } from '../../models';

export const createPostValidator = [
  body('title').trim().isLength({ min: 5 }),
  body('content').trim().isLength({ min: 5 }),
];

export const signupValidator = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom(async (value) => {
      const userDoc = await User.findOne({ email: value });
      if (userDoc) {
        return Promise.reject('Email address already exists');
      }
    })
    .normalizeEmail(),
  body('password').trim().isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
  body('name').trim().not().isEmpty(),
];
