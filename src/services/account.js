const userModel = require('../models/user');
const log = require('../loggers/bunyan');

const account = {};
account.signUp = async (params) => {
  const {
    email, userName, password, phone, role,
  } = params;
  try {
    const isUser = await userModel.findOne({ email, name: userName });
    if (isUser) {
      return 'user is not available';
    }

    try {
      const response = await userModel.create({
        email, name: userName, password, phone, role,
      });
      return response;
    } catch (error) {
      log.error(error);
    }
  } catch (error) {
    log.error(error);
  }
};

module.exports = account;
