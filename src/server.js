const restify = require('restify');
const config = require('./configs');
const logger = require('./loggers/winston');
const log = require('./loggers/bunyan');

const server = restify.createServer({
	name: 'personal',
  version: '0.1.0',
});

const startServer = async () => {
	/* eslint-disable global-require */
	await require('./loaders')(server);

	server.listen(config.port || 8080, (err) => {
		if (err) {
			logger.error(err);
			process.exit(1);
		}
		logger.info(`\n${server.name} listening to ${server.url}`);
	});
};

startServer();
