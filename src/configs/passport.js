const fs = require('fs');
const LocalStragy = require('passport-local').Strategy;
const path = require('path');
const {OAuth2Client} = require('google-auth-library');
const GoogleTokenStrategy = require('passport-google-verify-token').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const userModel = require('../models/user');
const configs = require('../configs');
const accountService = require('../services/account');

const clientID = configs.googleService;
const clientIDIos = configs.iosClientID;

const pathToKey= path.join(__dirname, '../..', 'rsa_pub.pem');
console.log(pathToKey);
const publicKey = fs.readFileSync(pathToKey, 'utf8');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicKey,
  algorithms: ['RS256']

};

const strategy = new JwtStrategy(opts,async (payload, done) => {
  const  _id = payload.sub;
  try {
    const user = await userModel.findOne({ _id});
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);

  }


});
module.exports = (passport) => {
	passport.use('local-login', new LocalStragy({ passReqToCallback: true }, async (username, email, password, done) => {
		try {
			const user = await userModel.findOne({ username, email });
			if (!user) {
				return done(null, false, { msg: 'wrong username or email' });
			}
			if (!user.comparePassword(password, (err) => {
				if (err) return done(null, false, { msg: 'wrong password' });
			})) { return done(null, user); }
		} catch (error) {
			log.error(error.message, 'at error passport');
			return done(null, false, JSON.stringify(error));
		}
	}));

	// passport.use(new GoogleTokenStrategy([clientID, clientIDIos], async (parseToken, googleId) => {
	// 	const { email, picture, given_name, family_name, email_verified } = parseToken;
	// 	try {
	// 		const user = await accountService.loginGoogle({ email, firstName: family_name, lastName: given_name, picture });
	// 		if (user) {
  //       console.log('00');
  //     } else {
	// 			done(error, null);
	// 		}
	// 	} catch (error) {
	// 		done(error, null);
	// 	}
  // }));

  passport.use(strategy);
};
