import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import { JwtTokenData } from '../../interfaces';

export const isAuthenticated: RequestHandler = (req, res, next) => {
  const token = req.get('Authorization')?.split(' ')[1];

  try {
    if (!token) {
      const error: any = new Error('Not authenticated');
      error.statusCode = 401;
      throw error;
    }

    const decodedToken = <JwtTokenData>verify(token, 'thisshoudbeasecretkeyandwellstored');

    if (!decodedToken) {
      const error: any = new Error('Not authenticated');
      error.statusCode = 401;
      throw error;
    }

    req.userId = decodedToken.userId;
    next();
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw err;
  }
};
