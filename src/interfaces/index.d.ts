/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

interface JwtTokenData {
  userId: string;
  email: string;
}
