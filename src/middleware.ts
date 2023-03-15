import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import logger from './utils/logger';
import RequestValidators from './interfaces/RequestValidators';
import { ZodError } from 'zod';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info('Method: ', req.method);
  logger.info('Path: ', req.path);
  logger.info('Body: ', req.body);
  logger.info('----');
  next();
};

const validateRequest = (validators: RequestValidators) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.body) {
        req.body = await validators.body.parseAsync(req.body);
      }
      if (validators.params) {
        req.params = await validators.params.parseAsync(req.params);
      }
      next();
    } catch (error) {
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
    res.status(403);
    res.json({ error });
  }
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({ error: error.message });
  next(error);
};

export default {
  requestLogger,
  unknownEndpoint,
  validateRequest,
  errorHandler,
};
