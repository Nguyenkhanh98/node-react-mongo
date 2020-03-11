const mongooseLoader = require('./mongoose');
const logger = require('../loggers/winston');
const restifyLoader = require('./restify');
const dependencyInjection = require('./dependencyInjection');

module.exports = async (restifyServer) => {
  await mongooseLoader();
  logger.info('db loaded');

  const userModel = {
    name: 'userModel',

    /* eslint-disable global-require */
    model: require('../models/user'),
  };
  await dependencyInjection({
    models: [
      userModel,
    ],
  });

  await restifyLoader(restifyServer);
  logger.info('Restify loaded');
};
