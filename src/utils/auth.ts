import { NextFunction, Request, Response } from 'express';
import config from './config';

export const verifyHeader = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization === config.HTTP_AUTHORIZATION
  ) {
    return next();
  } else {
    res.status(401).end();
  }
};
