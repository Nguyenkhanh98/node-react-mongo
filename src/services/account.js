const userModel = require('../models/user');
const log = require('../loggers/bunyan');

const account = {};
account.signUp = async (params) => {
	const {
		email, userName, password, phone, role
	} = params;
	try {
		const isUser = await userModel.findOne({ email, name: userName });
		if (isUser) {
			return 'user is not available';
		}

		try {
			const response = await userModel.create({
				email, name: userName, password, phone, role
			});
			return response;
		} catch (error) {
			log.error(error);
		}
	} catch (error) {
		log.error(error);
	}
};

account.loginGoogle = async (params) => {
	const { email, firstName, lastName, picture } = params;
	console.log(params);
	try {
		let User = await userModel.findOne({ email });
		if (User) {
			User = await userModel.update({ email }, { first_name: firstName, last_name: lastName, avatar: picture });
		} else {
			User = await userModel.create({ email, first_name: firstName, last_name: lastName, avatar: picture });
		}
		if (User) {
			const { role, _id, email, first_name, last_name, createdAt, updatedAt, avatar } = User;
			const data = { role, _id, email, first_name, last_name, createdAt, updatedAt, avatar };
			return data;
		}
		return false;
	} catch (error) {
		return error;
	}
};

module.exports = account;
