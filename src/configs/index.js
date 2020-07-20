const dotenv = require('dotenv').config();

if (!dotenv) {
	throw new Error('env not found');
}
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const nodeEnv = process.env.NODE_ENV === 'production';

module.exports = {
	host: nodeEnv ? process.env.HOST_PRODUCT : process.env.HOST_DEV,
	port: process.env.PORT || '',
	dbHost: process.env.DBHOST || '',
	secret: process.env.SESSION_SECRET || '',
  googleService: process.env.GOOGLE_SERVICE || '',
  googleSecret: process.env.GOOGLE_SECRET || '',
  callBackUrl: process.env.CALLBACK_URL || ''

};
