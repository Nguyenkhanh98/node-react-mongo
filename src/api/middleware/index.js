const User = require('../../models/user');
const errors = require('restify-errors');
module.exports = {
	isAuthenticated (req, res, next) {
		if (!req.isAuthenticated()) {
			res.send(401, 'UnAuthorized');
			return;
		};
		return next();
	},

	isAdmin (req, res, next) {
		const role = 'admin';
		if (!req.isAuthenticated()) return next(new errors.ForbiddenError());

		if (req.user.role === 'admin') {}
		return next();
	}
};
