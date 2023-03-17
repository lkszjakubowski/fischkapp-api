import { NextFunction, Request, Response } from 'express';

export const verifyHeader = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization === 'pss-this-is-my-secret'
  ) {
    return next();
  } else {
    res.status(401).end();
  }
};
