const userModel = require('../models/user');
const logger = require('../loggers/winston');
const userService = {};
const MAX_LIMIT = 30;
userService.getUserById = async (id) => {
	try {
		const user = await userModel.findById(id);
		if (user) {
			return user;
		}
		return false;
	} catch (error) {
		logger.error(error);
		return false;
	}
};

userService.getListUser = async ({ limit, offset }) => {
	limit = limit > MAX_LIMIT ? MAX_LIMIT : limit;
	try {
		const users = await userModel.find({}).skip(offset).limit(limit);
		if (users) {
			return users;
		}
		return false;
	} catch (error) {
		logger.error(error);
		return false;
	}
};
userService.updateUserById = () => {

};

module.exports = userService;
