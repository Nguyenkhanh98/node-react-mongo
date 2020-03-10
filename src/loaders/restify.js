const restify = require('restify');
const finalHandler = require('finalhandler');
const morgan = require('morgan');
const api = require('../api');


module.exports = async (server) => {
  server.use(restify.plugins.acceptParser(server.acceptable));
  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.bodyParser());

  server.pre(async (req, res, next) => {
    const done = finalHandler(req, res);
    morgan(req, res, async (err) => {
      if (err) {
        return done(err);
      }
      await next();
    });
  });
   await api(server);
};
