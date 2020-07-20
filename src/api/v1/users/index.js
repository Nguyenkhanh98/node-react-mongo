const restifyRouter = require('restify-router');
const userService = require('../../../services/users');
const logger = require('../../../loggers/winston');
const router = new restifyRouter.Router();
const passport = require('passport');

const LIMIT = 10;
const OFFSET = 0;

router.post('', passport.authenticate('local-login'), (req, res, next) => {
	res.status(200).send('ss');
	next();
});

router.get('/:id', async (req, res, next) => {
	const { id } = req.params || '';
	console.log(req.query);
	if (!id) {
		res.send(422, { message: 'id is required' });
	}

	try {
		const user = await userService.getUserById(id);
		if (user) {
			res.send(200, { data: user, message: 'get user successfully' });
    }
    else {

		res.send(404, { data: user, message: 'not found' });
  }
	} catch (error) {
		logger.error(error);
		res.send(500, { data: error });
	}
});

router.get('', async (req, res, next) => {
	let { limit, offset } = req.query || '';

	limit = limit || LIMIT;
	offset = offset || OFFSET;

	try {
		const users = await userService.getListUser({ limit, offset });
		if (users) {
			res.send(200, { data: users, message: 'list users successfully' });
		}
	} catch (error) {
		logger.error(error);
		res.send(500, { data: error });
	}
});

router.put('/:id', async (req, res, next) => {
	const { id } = req.query || '';
	const params = req.body || '';
	if (!id) {
		res.send(422, { message: 'id is required' });
	}
	try {
		const user = await userService.updateUserById(id, params);
		if (user) {
			res.send(200, { data: user, message: 'update user successfully' });
		}
	} catch (error) {
		logger.error(error);
		res.send(500, { data: error });
	}
});

router.del('/:id', async (req, res, next) => {
	const { id } = req.query || '';
	if (!id) {
		res.send(422, { message: 'id is required' });
	}
	try {
		const user = await userService.deleteUserById(id);
		if (user) {
			res.send(200, { data: user, message: 'delete user successfully' });
		}
	} catch (error) {
		logger.error(error);
		res.send(500);
	}
});

module.exports = router;
