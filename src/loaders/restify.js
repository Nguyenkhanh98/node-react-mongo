const restify = require('restify');
const finalHandler = require('finalhandler');
const morgan = require('morgan');
const passport = require('passport');
const session = require('client-sessions');
const passportConfig = require('../configs/passport');
const api = require('../api');
const config = require('../configs');

module.exports = async (server) => {
  server.use(restify.plugins.acceptParser(server.acceptable));
  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.bodyParser());
  server.use(session({
    cookieName: 'session',
    secret: config.secret,
    duration: 365 * 24 * 60 * 60 * 1000,
  }));
  server.use(passport.initialize());
  server.use(passport.session());
  passportConfig(passportConfig);
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
