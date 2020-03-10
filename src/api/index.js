const restifyRouter = require('restify-router');
const router = new restifyRouter.Router();
const publicApi = require('./publics');
const userApi = require('./users');
const adminApi = require('./admins');
const { isAuth, isAdmin } = require('./middlewares');

module.exports =async (server) => {
  router.add('/api', publicApi);
  router.add('/admin', adminApi);
  router.add('/user',userApi);
  router.applyRoutes(server);
}
