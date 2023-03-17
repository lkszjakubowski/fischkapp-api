import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const MONGODB_URI = process.env.MONGODB_URI;
const WHITELIST_DOMAIN = process.env.WHITELIST_DOMAIN;

export default { PORT, NODE_ENV, MONGODB_URI, WHITELIST_DOMAIN };
