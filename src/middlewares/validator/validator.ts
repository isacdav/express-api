import { body } from 'express-validator';

export const createPostValidator = [
  body('title').trim().isLength({ min: 5 }),
  body('content').trim().isLength({ min: 5 }),
];
