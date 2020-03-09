const dotenv = require('dotenv').config();

if (!dotenv) {
  throw new Error('env not found');
}
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const nodeEnv = process.env.NODE_ENV === 'production';

module.exports = {
  host: nodeEnv ? process.env.HOST_PRODUCT : process.env.HOST_DEV,
  port: process.env.PORT,
  dbHost: process.env.DBHOST,
};
