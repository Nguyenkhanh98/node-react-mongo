const LocalStragy = require('passport-local').Strategy;
const GoogleTokenStrategy = require('passport-google-verify-token').Strategy;
const userModel = require('../models/user')
const configs = require('../configs');
const accountService = require('../services/account');

const clientID = configs.googleService;
const clientIDIos = configs.iosClientID;
module.exports = (passport) => {
  passport.use('local-login', new LocalStragy({ passReqToCallback: true }, async (username, email, password, done) => {
    try {
      const user = await userModel.findOne({ username, email })
      if (!user) {
        return done(null, false, { msg: 'wrong username or email' })
      }
      if (!user.comparePassword(password, (err) => {
        if (err) return done(null, false, { msg: 'wrong password' })
      })) { return done(null, user) }
    } catch (error) {
      log.error(error.message, 'at error passport')
      return done(null, false, JSON.stringify(error))
    }
  }));

  passport.use( new GoogleTokenStrategy([clientID, clientIDIos ], async(parseToken, googleId, done)=> {
    const { email, picture, given_name, family_name, email_verified } = parseToken;
    console.log('-----------------------------------------');
	try {
    const user = await accountService.loginGoogle({ email, firstName: family_name, lastName: given_name, picture });
		if (user) {
      done(null, user);
		} else {
			done(error, null);
		}
	} catch (error) {
    done(error, null);
	}
  }));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  })

  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    console.log('-----------------------------------------');

    console.log(user);
    if (user) {
      done(null, user)
    } else {
      return done(null)
    }
  })
}
