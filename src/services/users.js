const userModel = require('../models/user');
const logger = require('../loggers/winston');
const response = require('../configs/response');
const userService = {};
const MAX_LIMIT = 30;

userService.getUserById = async (id) => {
	try {
		const user = await userModel.findById(id).where({ is_deleted: false });
		if (user) {
			return response(true, 200, 'get user successfully', user);
		}
		return response(false, 404, 'user is not exist');
	} catch (error) {
		logger.error(error);
		return response(false, 500, 'something unknown occurred');
	}
};

userService.getListUser = async ({ limit, offset }) => {
	limit = limit > MAX_LIMIT ? MAX_LIMIT : limit;
	try {
		const users = await userModel.find().skip(offset).limit(limit);
		if (users) {
			return response(true, 200, 'get user successfully', users);
		}
		return response(false, 500, 'something unknown occurred', users);
	} catch (error) {
		return response(false, 500, 'something unknown occurred');
	}
};
userService.updateUserById = async (id, params) => {
	try {
		const user = await userModel.findById(id).where({ is_deleted: false });
		if (!user) {
			return { isSuccess: false, status: 404, message: 'user is not exist' };
		}
		const { first_name, last_name, phone, location } = user;
		user.first_name = params.first_name || first_name;
		user.last_name = params.last_name || last_name;
		user.phone = params.phone || phone;
		user.location = params.location || location;
		await user.save();
		return response(true, 200, 'update successfully', user);
	} catch (error) {
		return response(false, 500, 'something unknown occurred');
	}
};

userService.deleteUserById = async (id) => {
	try {
		const user = await userModel.findById(id);
		if (!user) {
			return response(false, 404, 'user is not exist');
		}
		user.is_deleted = true;
		await user.save();
		return response(true, 200, 'delete successfully');
	} catch (error) {
		return response(false, 500, 'something unknown occurred');
	}
};

userService.loginGoogle = async (params) => {
	const { email, first_name, last_name, picture, email_verified } = params;
	try {
		let User = await userModel.findOne({ email });
		if (User) {
			User.save({ avatar: picture, email_verified });
		} else {
			User = await userModel.create({ first_name: firstName, last_name: lastName, avatar: picture, email_verified });
		}
		if (User) {
			const { role, _id, email, first_name, last_name, createdAt, updatedAt, avatar } = User;
			const data = { role, _id, email, first_name, last_name, createdAt, updatedAt, avatar };
			return data;
		}
		return false;
	} catch (error) {
		logger.error(error);

		return false;

		return error;
	}
};
module.exports = userService;
