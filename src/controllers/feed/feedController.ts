import { RequestHandler } from 'express';

export const getPosts: RequestHandler = (req, res, next) => {
  res.status(200).json({
    success: true,
  });
};

export const createPost: RequestHandler = (req, res, next) => {
  const name = req.body.name;

  res.status(200).json({
    name: name || 'not provided',
    success: false,
  });
};
