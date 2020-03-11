const Logger = require('bunyan');

const Log = new Logger.createLogger({
  name: 'demo',
  serializers: {
    req: Logger.stdSerializers.req,
  },
});

module.exports = Log;
