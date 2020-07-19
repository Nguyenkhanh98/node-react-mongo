const restify = require('restify');

const passport = require('passport');
const session = require('client-sessions');
const corsMiddleware = require('restify-cors-middleware');
const passportConfig = require('../configs/passport');
const api = require('../api');
const config = require('../configs');

const log = require('../loggers/winston');

module.exports = async (server) => {
	server.use(restify.plugins.acceptParser(server.acceptable));
	server.use(restify.plugins.queryParser());
	server.use(restify.plugins.bodyParser());
	server.use(session({
		cookieName: 'session',
		secret: config.secret,
		duration: 365 * 24 * 60 * 60 * 1000
	}));
	server.use(passport.initialize());
	server.use(passport.session());
	passportConfig(passport);

	const cors = corsMiddleware({
		preflightMaxAge: 5,
		origins: ['http://localhost:3000']
	});
	server.use(cors.actual);

	server.pre(cors.preflight);
	server.pre((req, res, next) => {
		req.log.info({ req }, 'REQUEST');
		next();
	});
	api(server);
};
