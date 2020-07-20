const restifyRouter = require('restify-router');
const router = new restifyRouter.Router();

const home = require('./home');

const common = require('./v1/common');
const auth = require('./v1/auth');
const users = require('./v1/users');
const histories = require('./v1/histories');
const actions = require('./v1/actions');
const couples = require('./v1/couples');
const messages = require('./v1/messages');

const version1 = '/api/v1';

module.exports = (server) => {
	// router.get('/', home);
	// router.group(version1, function (router) {
	router.add(`${version1}/auth`, auth);
	// router.add('/histories', histories);
	// router.add('/actions', actions);
	router.add(`${version1}/users`, users);
	// router.add('/couples', couples);
	// });
	router.applyRoutes(server);
};
