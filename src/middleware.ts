import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import logger from './utils/logger';
import { AnyZodObject, ZodError } from 'zod';

const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  logger.info('Method: ', req.method);
  logger.info('Path: ', req.path);
  logger.info('Body: ', req.body);
  logger.info('----');
  next();
};

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        params: req.params,
        test: 'test',
      });
      next();
    } catch (error: any) {
      next(error);
    }
  };
};

const unknownEndpoint = (_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).send({ success: 'false', error: 'Unknown endpoint' });
};

const errorHandler: ErrorRequestHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    res.status(403).json({ error });
  }
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({ error: error.message });
  next(error);
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
