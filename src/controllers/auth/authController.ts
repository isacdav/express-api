import { hash, compare } from 'bcryptjs';
import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { User } from '../../models';
import { sign } from 'jsonwebtoken';

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error('Validation failed');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const { email, password, name } = req.body;

    const hashedPassword = await hash(password, 12);

    const user = await new User({
      email,
      password: hashedPassword,
      name,
    }).save();

    res.status(201).json({
      success: true,
      message: 'User created',
      userId: user._id,
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error: any = new Error('User not found');
      error.statusCode = 401;
      throw error;
    }

    const isEqual = await compare(password, user.password);
    if (!isEqual) {
      const error: any = new Error('Wrong password');
      error.statusCode = 401;
      throw error;
    }

    const token = sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      'thisshoudbeasecretkeyandwellstored',
      { expiresIn: '1h' },
    );

    res.status(200).json({
      success: true,
      token,
      userId: user._id.toString(),
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
