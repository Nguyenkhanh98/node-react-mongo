const restifyRouter = require('restify-router');
const errors = require('restify-errors');
const { OAuth2Client } = require('google-auth-library');
const configs = require('../../../configs');
const logger = require('../../../loggers/bunyan');
const userService = require('../../../services/users');
const { issueJwt } = require('.././../../../lib/utils');
const passport = require('passport');

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

router.post('/google-login', async (req, res) => {
	const { idToken } = req.body || '';

	if (!idToken) {
		return res.send(401, { message: 'idToken is required in body' });
	}
	try {
		const client = new OAuth2Client([configs.googleService, configs.iosClientID]);
		const profile = await client.verifyIdToken({ idToken, audience: [configs.googleService, configs.iosClientID] });

		if (!profile) {
			return res.send(401, { message: 'invalid token' });
		}
		const { email, picture, given_name, family_name, email_verified } = profile.payload;

		const user = await userService.loginGoogle({ email, first_name: family_name, last_name: given_name, picture, email_verified });
		if (!user) {
			return res.send(500, { message: 'something unknown  occurred' });
		}
		const token = issueJwt(user);

	 res.send(200, { data: { user, token }, message: 'login successfully' });
	} catch (error) {
		logger.error(error);
		res.send(401, { message: ' token expired' });
	}
});

module.exports = router;

/**
 * @swagger
 * /v1/auth/google-login:
 *  post:
 *    tags:
 *    - Auth
 *    summary: login with google
 *    requestBody:
 *      description: data to get token
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - idToken
 *            properties:
 *              idToken:
 *                type: string
 *    responses:
 *      '200':
 *          description: Success
 */
