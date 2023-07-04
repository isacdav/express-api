import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;

  res.status(status).json({ status, message });
};
