import express from 'express';
import mongoose from 'mongoose';
import config from './utils/config';
import logger from './utils/logger';
import middleware from './middleware';
import cors from 'cors';
import { corsOptions } from './utils/cors';

import router from './cards/card.routes';

const app = express();

mongoose
  .connect(`${config.MONGODB_URI}`)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error: Error) => {
    logger.error('Could not connect to MongoDB', error);
  });

app.use(cors(corsOptions));
app.use(express.json());

app.use(middleware.requestLogger);

app.use('/cards', router);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
