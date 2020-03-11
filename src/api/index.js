const restifyRouter = require('restify-router');

const router = new restifyRouter.Router();
const publicApi = require('./publics');
const userApi = require('./users');
const adminApi = require('./admins');

module.exports = (server) => {
  router.add('/api', publicApi);
  router.add('/api/admin', adminApi);
  router.add('/api/user', userApi);
  router.applyRoutes(server);
};
