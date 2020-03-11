const User = require('../../models/user');
const errors = require('restify-errors');
module.exports = {
  isAuthenticated = async(req, res, next) => {
      if(!req.isAuthenticated()) return false;
  },

  isAdmin =  async(req, res, next) => {
    const role = 'admin';
    if(!req.isAuthenticated()) return next( new errors.ForbiddenError());

    try {
      const user = await User.findOne({email: req.user.email, role: role});
      if(user)
        return next();
      return next(new errors.UnauthorizedError());
    } catch (error) {
        return next( new errors.InternalServerError());
    }
  }
};
