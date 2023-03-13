import express from 'express';
import mongoose from 'mongoose';
import config from './utils/config';
import logger from './utils/logger';

const app = express();

mongoose
  .connect(`${config.MONGODB_URI}`)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error: Error) => {
    logger.error('Could not connect to MongoDB', error);
  });

export default app;
