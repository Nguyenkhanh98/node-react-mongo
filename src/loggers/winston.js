const winston = require('winston');


const myCustomLevels = {
  levels: {
    info: 0,
    trace: 1,
    error: 2,
    bug: 3
  },
  colors: {
    info: 'blue',
    trace: 'green',
    error: 'yellow',
    bug: 'red'
  }
};

const logger = winston.createLogger({
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
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
		new winston.transports.File({ filename: 'logs.log' })
	]
});

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }else{
    logger.add(new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat()
      )
    }));
  }

module.exports = logger;
