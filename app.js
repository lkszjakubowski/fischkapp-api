const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config.js');
const logger = require('./utils/logger.js');

const app = express();

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('Could not connect to MongoDB', error);
  });

module.exports = app;
