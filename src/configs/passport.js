const LocalStragy = require('passport-local').Strategy;
const userModel = require('../models/user');


module.exports = (passport) => {
  passport.use('local-login', new LocalStragy(async (username, email, password, done) => {
    try {
      const user = await userModel.findOne({ username, email });
      if (!user) {
        return done(null, false, { msg: 'wrong username or email' });
      }
      if (!user.comparePassword(password, (err) => {
        if (err) return done(null, false, { msg: 'wrong password' });
      })) { return done(null, user); }
    } catch (error) {
      return done(null, false, JSON.stringify(error));
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById({ id });
    if (user) {
      done(null, user);
    } else {
      return done(null);
    }
  });
};
