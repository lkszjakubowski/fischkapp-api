import config from './config';
import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: config.WHITELIST_DOMAIN,
  optionsSuccessStatus: 200,
};
