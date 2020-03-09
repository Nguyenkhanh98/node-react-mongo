const publicApi = require('./publics');
const userApi = require('./users');
const adminApi = require('./admins');
const { isAuth, isAdmin } = require('./middlewares');

const apiv1 = {};

module.exports = { apiv1 };
