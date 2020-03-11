const userModel = require('../models/user');
const log = require('../loggers/bunyan');

module.exports = {
  signUp: async ({
    email, name, password, phone, role,
  }) => {
    try {
      const isUser = await userModel.findOne({ email, name });
      if (isUser) {
        return 'user is not available';
      }

      try {
        const response = await userModel.create({
          email, name, password, phone, role,
        });
        return response;
      } catch (error) {
        log.error(error);
      }
    } catch (error) {
      log.error(error);
    }
  },
};
