const restifyRouter = require('restify-router');
const errors = require('restify-errors');
const { OAuth2Client } = require('google-auth-library');
const configs = require('../../../configs/index');
const accountService = require('../../../services/account');

const router = new restifyRouter.Router();

router.post('/signup', async (req, res, next) => {
	const response = await accountService.signUp(req.body);
	if (response) {
		res.send('sign up succeess');
	} else {
		return next(new errors.ForbiddenError());
	}
	next();
});

router.post('/googleLogin', async (req, res, next) => {
	console.log(req.body);
	const { idToken } = req.body || '';
	if (idToken === undefined) {
		res.send(422, { message: 'idToken is required' });
	}
	const client = new OAuth2Client(configs.googleService);
	try {
		const loginEmail = await client.verifyIdToken({ idToken, audience: configs.googleService });
		const { email, picture, given_name, family_name, email_verified } = loginEmail.payload;
		const login = await accountService.loginGoogle({ email, firstName: family_name, lastName: given_name, picture });
		console.log(login);
		if (login) {
			res.send(200, { data: { ...login, email_verified }, message: 'Login successfully' });
		} else {
			res.send(500, { message: 'request failure' });
		}
	} catch (error) {
		res.send(401, { data: error, message: 'invalid token' });

		console.log(error);
	}
});

module.exports = router;
