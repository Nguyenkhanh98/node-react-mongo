const winston = require('winston');

const logger = winston.createLogger({
	level: 'debug',
	format: winston.format.combine(
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		winston.format.errors({ stack: true }),
		winston.format.splat(),
		winston.format.json()
	),
	defaultMeta: { service: 'user-service' },
	transports: [
		new winston.transports.File({ filename: 'logs.log' })
	]
});


	logger.add(new winston.transports.Console({
		format: winston.format.combine(
			winston.format.cli(),
			winston.format.splat()
		)
	}));
module.exports = logger;
